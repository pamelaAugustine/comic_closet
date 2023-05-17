import { FaBolt } from 'react-icons/fa'
import styles from '@/styles/Comic.module.css'
import React, { useState } from 'react' 


export default function Button(){
    return (
        <button className={styles.icon}>
            <FaBolt  className={styles.boltIcon}/>
        </button>     
    )
}


