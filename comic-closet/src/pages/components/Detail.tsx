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
            <h3 className={styles.title} data-test-id='comic-title'>{title}</h3>

            <div className={styles.details}>
                <p data-test-id='comic-issueNumber'><strong>Issue:</strong> {issueNumber}</p>
                <p data-test-id='comic-publishDate'><strong>Published:</strong> <Moment format="MMMM DD, YYYY">{publishDate}</Moment></p>
				{creators.items.length >= 1 &&
                <p data-test-id='comic-creators'><strong>Creators:</strong> {creators.items.map((creator: CreatorItem) => creator.name).join(', ')}</p>
                }
                {creators.items.length <= 0 &&
                <p><strong>Creators:</strong> Coming Soon!</p>
                }
            </div>

        </div>
        </>
    )
} 