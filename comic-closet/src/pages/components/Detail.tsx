import PropTypes from 'prop-types';
import Moment from 'react-moment';
import styles from '@/styles/Comic.module.css';
import {ComicCreator, Date, CreatorItem} from '../types/shared_types'


type DetailProps = {
	title?: string,
	issueNumber?: number,
	publishDate?: Date[],
	creators?: ComicCreator[]
}
export default function Detail(props: DetailProps) {
    const {title, issueNumber, publishDate, creators} = props;

    return (
        <>
        <div className={styles.content}>
            <h3 className={styles.title}>{title}</h3>

            <div className={styles.details}>
                <p><strong>Issue:</strong> {issueNumber}</p>
                <p><strong>Published:</strong> <Moment format="MMMM DD, YYYY">{publishDate[0].date}</Moment></p>
				{creators != null &&
                <p><strong>Creators:</strong> {creators.items.map((creator: CreatorItem) => creator.name).join(', ')}</p>
            }
            </div>

        </div>
        </>
    )
} 