import Image from 'next/image';
import Button from './Button';
import Detail from './Detail';
import styles from '@/styles/Comic.module.css';
import {ComicCreator, Date, ComicThumbnail} from '../types/shared_types'

type Props = {
    id: number,
    key: number
    title?: string,
	issueNumber?: number,
	publishDate?: Date[],
	creators?: ComicCreator[],
	thumbnail?: ComicThumbnail[]
}

export function Comic(props: Props) {
    const { id, title, issueNumber, publishDate, creators, thumbnail } = props;
    const altText = `${title} cover art`
    const thumbnailSrc = `${thumbnail.path}.${thumbnail.extension}`

    return (

        <div className={styles.slide}>

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
                key={id}
                title={title}
                issueNumber={issueNumber}
                publishDate={publishDate}
                creators={creators}
            />

        </div>

    )
}

