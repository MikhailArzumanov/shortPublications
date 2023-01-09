import React from 'react';
import { getValById } from '../../-functions/getValById';
import { Publication } from '../../-models/publication.model';
import { PublicationsService } from '../../-services/publications.service';
import './PublicationForm.css';

const TEXT_FIELD_ID = "textField";

class PublicationForm extends React.Component {
    
    async publicate(){
        let text = getValById(TEXT_FIELD_ID);
        let publication = new Publication(null, text, null, null, []);
        let response = await PublicationsService.publicate(publication);
        if(response) window.location.reload();
    }

    render() {
        return (
            <div className="publicationForm">
                <textarea id={TEXT_FIELD_ID}>

                </textarea>
                <button onClick={this.publicate}>
                    Опубликовать
                </button>
            </div>
        );
    }
}

export default PublicationForm;
