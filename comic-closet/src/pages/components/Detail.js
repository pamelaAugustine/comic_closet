import PropTypes from 'prop-types';
import Moment from 'react-moment';
import styles from '@/styles/Comic.module.css';

export default function Detail(props) {
    const {title, issueNumber, publishDate, creators} = props
    const lastNameString = creators.map(creator => creator.name).map(names => {
        const lastName = names.split(' ');
        lastName.shift();
        return lastName;
      
    })
    return (
        <>
        <div className={styles.content}>
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.details}>
                <p>Issue: {issueNumber}</p>
                <p>Published: <Moment format="MMMM DD, YYYY">{publishDate}</Moment></p>
                <p>Creators: {lastNameString.join(', ')}</p>
            </div>


        </div>
        </>
    )
}

Detail.propTypes = {
    title: PropTypes.string,
    issueNumber: PropTypes.number,
    publishDate: PropTypes.string,
    creators: PropTypes.array
}