import React from 'react';
import { formatDate } from '../../-functions/formatDate';
import './PublicationBlock.css';

class PublicationBlock extends React.Component {

    render() {
        let publication = this.props.publication;
        let containment = publication.text;
        let authorName = publication.author.username;
        let date = formatDate(publication.setTime);
        return (
            <div className="publicationBlock">
                <p className='publicationText'>
                    {containment}
                </p>
                <hr />
                <div className='lowerLine'>
                <p>Автор: {authorName}</p>
                <p>Дата:  {date}</p>
                </div>
            </div>
        );
    }
}

export default PublicationBlock;
