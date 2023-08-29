import { useState, useContext } from 'react'
import { favoritesContext, favoritesContextType } from '../../context/favorties'
import { FaBolt, FaBars } from 'react-icons/fa'
import styles from '../../styles/header/Navigation.module.css'
import { montserrat } from '../../fonts/index'

export default function Navigation() {
	const [showNav, setShowNav] = useState<boolean>(false);
	const context = useContext<favoritesContextType | null>(favoritesContext)

	function toggleNav(): void {
		setShowNav(prev => !prev);
	}

	return (
		<div className={`${styles.navigationContainer} ${montserrat.variable}`}>
			<nav className={showNav ? `${styles.mainNav} ${styles.active}` : `${styles.mainNav}`}>
				<a href="" target="_blank" className={styles.navLink}>Home</a>
				<a href="" target="_blank" className={styles.navLink}>Shop</a>
			</nav>
			<div className={styles.favoritesContainer}>
				<FaBolt />
				<span className={styles.favoritesCaption}>My Favorites</span>
				<span className={styles.favoritesNumber}>({context?.favorites.length})</span>
			</div>
			<button className={styles.mobileMenuButton} onClick={toggleNav}>
				<FaBars />
			</button>
		</div>
	)
}