import Head from 'next/head'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useState, useEffect, useRef } from 'react'
import { favoritesContext } from '../context/favorties'
import { ComicData } from '../types/shared_types'
import Header from '../components/Header/Header'
import HeroImage from '../components/HeroImage/HeroImage'
import Intro from '../components/Common/Intro'
import Filter from '../components/Filter/Filter'
import Comic from '../components/Comic/Comic'
import Favorites from '../components/Filter/Favorites'
import Footer from '../components/Footer/Footer'
import Pager from '../components/Pager/Pager'
import  useMarvelApi  from '../hooks/useMarvelApi';
import styles from '../styles/home/Home.module.css'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-display'
})

const md5 = require('md5');

export const getStaticProps: GetStaticProps = async() => {
  	const timestamp: number = Date.now();
	const hash: string = md5(`${timestamp}${process.env.PRIVATE_API_KEY}${process.env.PUBLIC_API_KEY}`)
	const publicKey = process.env.PUBLIC_API_KEY
	const requiredParameters = `ts=${timestamp}&apikey=${publicKey}&hash=${hash}`
	const comicLimit = 15;

	let API_URL: string = `https://gateway.marvel.com/v1/public/comics?limit=${comicLimit}&offset=0&${requiredParameters}`

	return { props: { API_URL, requiredParameters, comicLimit } }
}

export default function Home({ API_URL, requiredParameters, comicLimit }: InferGetStaticPropsType<typeof getStaticProps>) {
	const [query, setQuery] = useState<string>(API_URL);
	const [favorites, setFavorites] = useState<ComicData[]>([]);	
	const [characterId, setCharacterId] = useState<string>('');
	const [creatorId, setCreatorId] = useState<string>('');
	const [offset, setOffset] = useState<number>(0)
	const { isLoading, serverError, comics, total } = useMarvelApi(query);
	let initialRender = useRef(true);

	//Get favorited comics from local storage
	useEffect(() => {
		const favoriteComicsList = localStorage.getItem("Favorite_Comics");
		if (favoriteComicsList) {
			setFavorites(JSON.parse(favoriteComicsList));
		}
	}, []);

	useEffect(() => {
		if (!initialRender.current) {
			let newQuery: string;		
			if (characterId !== '' && creatorId === '') {
				newQuery=`https://gateway.marvel.com/v1/public/characters/${characterId}/comics?limit=${comicLimit}&offset=${offset}&${requiredParameters}`
			} else if (characterId === '' && creatorId !== '') {
				newQuery=`https://gateway.marvel.com/v1/public/creators/${creatorId}/comics?limit=${comicLimit}&offset=${offset}&${requiredParameters}`
			} else if (characterId !== '' && creatorId !== '') {
				newQuery = `https://gateway.marvel.com/v1/public/creators/${creatorId}/comics?limit=${comicLimit}&offset=${offset}&characters=${characterId}&${requiredParameters}`
			} else {
				newQuery = `https://gateway.marvel.com/v1/public/comics?limit=${comicLimit}&offset=${offset}&${requiredParameters}`;
			}
			setQuery(newQuery);
		}

		return () => {
			initialRender.current = false;
		}
	}, [comicLimit, requiredParameters, characterId, creatorId, offset])

	function updateFilter(event: React.ChangeEvent): void {
		const target = event.target as HTMLSelectElement;
		const id = target.value;
		const name = target.name;

		//Offset reset to zero when filtering
		setOffset(0);
		name === 'characterFilter' ? setCharacterId(id) : setCreatorId(id)
	}

	function handlePagination(event: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>): void {
		const target = event.currentTarget;
		const name = target.name;

		if (name === 'prev') {
			if (offset === 0) {
				return;
			} else {
				setOffset(prev => prev - comicLimit);
			}
		} else {
			if (offset + 15 > total) {
				return;
			} else {
				setOffset(prev => prev + comicLimit);
			}
		}
	}

	const contextValue = {
		favorites,
		setFavorites
	}

	return (
		<>
			<Head>
				<title>Comic Closet</title>
				<meta name="description" content="Final Project for CMS React Training course" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<favoritesContext.Provider value={contextValue}>
				<Header />
				<HeroImage />

				<main className={styles.main}>
					<Intro />
						<div className={styles.gridContainer}>
							<Filter updateFilter={updateFilter}/>
							<div className={!isLoading && !serverError && comics.length > 0 ? styles.slides : styles.messageContainer}>
								{
									isLoading ? <h2 className={`${styles.notification} ${montserrat.variable}`}>Loading Comics!</h2>
									: !isLoading && serverError ? <h2 className={`${styles.notification} ${montserrat.variable}`}>Error loading comics!</h2>
									: !isLoading && !serverError && comics.length === 0 ? <h2 className={`${styles.notification} ${montserrat.variable}`}>No comics that match your filter!</h2>
									: comics.map(comic =>
										<Comic 
											key={comic.id}
											comicData={comic}
										/>
									)
								}
							</div>
							<div className={styles.desktopFavorites}>
								<Favorites handleCloseButtonClick={() => null} />
							</div>
							<Pager totalComics={total} firstComicIndex={offset} comicLimit={comicLimit} handlePagination={handlePagination}/>
						</div>
				</main>
				
				<Footer />
			</favoritesContext.Provider>
		</>
	)
}

