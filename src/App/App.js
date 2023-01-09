import React from 'react';
import './App.css';
import PublicationForm from '../components/PublicationForm/PublicationForm';
import { PublicationsService } from '../-services/publications.service';
import PublicationBlock from '../components/PublicationBlock/PublicationBlock';

class App extends React.Component {

  async render() {
      let response = await PublicationsService.getList();
      let publications = response.publications;
      let publicationBlocks = publications.map((pub)=> <PublicationBlock text={pub.text}/>)
      return (
        <>
          <PublicationForm />
          <hr className='separator'/>
          {publicationBlocks}
        </>
      );
  }
}

export default App;