import React from 'react';
import './PublicationBlock.css';

class PublicationBlock extends React.Component {

    render() {
        return (
            <div className="publicationBlock">
                <p className='publicationText'>
                    {this.props.text}
                </p>
            </div>
        );
    }
}

export default PublicationBlock;
