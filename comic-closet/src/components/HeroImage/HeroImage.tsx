import Image from 'next/image'
import styles from '../../styles/hero/HeroImage.module.css'
import { montserrat } from '../../fonts/index'

export default function HeroImage() {
return (
	<section className={styles.heroContainer}>
		<Image
			src='/hero-photo.png'
			alt='Amir and his comics'
			className={styles.heroImage}
			fill
			priority
		/>
		
		<h1 className={`${styles.heroTitle} ${montserrat.variable}`}>Comic Closet</h1>
	</section>
)
}