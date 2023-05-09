import { FaBolt } from 'react-icons/fa'
import styles from '@/styles/Comic.module.css'


export default function Button(){
    return (
        <button className={styles.icon}>
            <FaBolt  className={styles.boltIcon}/>
        </button>     
    )
}


