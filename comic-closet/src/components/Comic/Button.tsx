import { useContext } from 'react'
import { FaBolt } from 'react-icons/fa'
import { ComicData } from '../../types/shared_types'
import { favoritesContext, favoritesContextType } from '../../context/favorties'
import styles from '../../styles/comic/Comic.module.css'

type buttonProps = {
	comicData: ComicData;
	isFavorite: ComicData;
	isFavoritesFull: boolean;
}

type addToFavorites = () => void
type removeFromFavorites = () => void;

export default function Button({ comicData, isFavorite, isFavoritesFull }: buttonProps) {

	const context = useContext<favoritesContextType>(favoritesContext)

	function addToFavorites(): addToFavorites {
		if(isFavoritesFull) return;

		context.setFavorites(prevFavorites => {
			const newFavorites: ComicData[] = [...prevFavorites, {...comicData}]
			localStorage.setItem(
				"Favorite_Comics",
				JSON.stringify(newFavorites)
			);
			return newFavorites;
		});
	}

	function removeFromFavorites(): removeFromFavorites {
		context.setFavorites(prevFavorites => {
			const newFavorites: ComicData[] = [...prevFavorites]
			const index: number = prevFavorites.findIndex(favorite => favorite.id === comicData.id);
			newFavorites.splice(index, 1);
			localStorage.setItem(
				"Favorite_Comics",
				JSON.stringify(newFavorites)
			);
			return newFavorites;
		});
		return;
	}
	
	return (
		<button
			className={`${styles.cta} ${isFavorite && styles.selected} ${isFavoritesFull && !isFavorite && styles.disabled}`}
			onClick={!isFavorite ? addToFavorites : removeFromFavorites}
		>
			<FaBolt />
		</button>
	)
}