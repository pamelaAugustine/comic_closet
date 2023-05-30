import Image from 'next/image';
import Button from './Button';
import Detail from './Detail';
import styles from '@/styles/Comic.module.css';

type Props = {
    id: number,
    title: string,
    issueNumber: number,
    publishDate: string,
    creators: string[],
    thumbnail: string
}

export function Comic(props: Props) {
    const { id, title, issueNumber, publishDate, creators, thumbnail } = props;
    const altText = `${title} cover art`

    return (

        <div className={styles.slide}>

            <div className={styles.imgCont}>
                <Image
                    src={thumbnail}
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

