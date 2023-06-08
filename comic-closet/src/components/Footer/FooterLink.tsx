import styles from '../../styles/footer/Footer.module.css'
import { montserrat } from '../../fonts/index'

type FooterLinkType = {
	url: string;
	text: string;
}

export default function FooterLink({ url, text }: FooterLinkType) {
	return (
		<a href={url} target='_blank'className={`${styles.link} ${montserrat.variable}`}>{text}</a>
	)
}