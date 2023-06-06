import Image from 'next/image';
import Button from './Button';
import Detail from './Detail';
import styles from '@/styles/Comic.module.css';
import { ComicData } from '../types/shared_types'

type comicDataProps = {
  comicData: ComicData
}

export function Comic({ comicData }: comicDataProps) {
    if(!comicData) return null;

    const altText = `${comicData.title} cover art`
    const thumbnailSrc = `${comicData.thumbnail.path}.${comicData.thumbnail.extension}`

    return (

        <div className={styles.slide} data-test-id='comic-parent'>

            <div className={styles.imgCont}>
                <Image
                    src={thumbnailSrc}
                    alt={altText}
                    className={styles.img}
                    width={125}
                    height={188}
                />
                <Button />
            </div>

            <Detail
                key={comicData.id}
                title={comicData.title}
                issueNumber={comicData.issueNumber}
                publishDate={comicData.publishDate}
                creators={comicData.creators}
            />

        </div>

    )
}

