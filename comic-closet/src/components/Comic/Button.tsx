import { useContext } from 'react'
import { FaBolt } from 'react-icons/fa'
import { ComicData } from '../../types/shared_types'
import { favoritesContext, favoritesContextType } from '../../context/favorties'
import styles from '../../styles/comic/Comic.module.css'

type buttonProps = {
	comicData: ComicData;
	isFavorite: boolean;
	isFavoritesFull: boolean;
}

type AddToFavorites = () => void;
type RemoveFromFavorites = () => void;

export default function Button({ comicData, isFavorite, isFavoritesFull }: buttonProps) {

	const context = useContext<favoritesContextType | null>(favoritesContext)

	const addToFavorites: AddToFavorites = () => {
        if (isFavoritesFull || !context) return;

        context.setFavorites(prevFavorites => {
            const newFavorites: ComicData[] = [...prevFavorites, { ...comicData }];
            localStorage.setItem(
                "Favorite_Comics",
                JSON.stringify(newFavorites)
            );
            return newFavorites;
        });
    }

	const removeFromFavorites: RemoveFromFavorites = () => {
        if (!context) return;

        context.setFavorites(prevFavorites => {
            const newFavorites: ComicData[] = [...prevFavorites];
            const index: number = prevFavorites.findIndex(favorite => favorite.id === comicData.id);
            
            if (index !== -1) {
                newFavorites.splice(index, 1);
                localStorage.setItem(
                    "Favorite_Comics",
                    JSON.stringify(newFavorites)
                );
            }

            return newFavorites;
        });
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