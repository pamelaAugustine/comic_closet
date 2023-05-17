import PropTypes from 'prop-types';
import Moment from 'react-moment';
import styles from '@/styles/Comic.module.css';

export default function Detail(props) {
    const {title, issueNumber, publishDate, creators} = props;
    let lastName;
    let lastNameString;

    if(creators != null) {
        lastNameString = creators.map(creator => creator.name).map(names => {
                console.log(creators.name)
                lastName = names.split(' ');
                lastName.shift();
                console.log(lastName)
                return lastName;      
            })
        lastName = lastNameString.join(', ')
    }
    else {
        lastName = 'Coming Soon!'
    }

    return (
        <>
        <div className={styles.content}>
            <h3 className={styles.title}>{title}</h3>

            <div className={styles.details}>
                <p><strong>Issue:</strong> {issueNumber}</p>
                <p><strong>Published:</strong> <Moment format="MMMM DD, YYYY">{publishDate}</Moment></p>
                <p><strong>Creators:</strong> {lastName} </p>
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