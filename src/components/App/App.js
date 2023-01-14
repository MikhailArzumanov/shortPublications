import React from 'react';
import './App.css';
import PublicationForm from '../PublicationForm/PublicationForm';
import { PublicationsService } from '../../-services/publications.service';
import PublicationBlock from '../PublicationBlock/PublicationBlock';

class App extends React.Component {
  publications = [];

  async componentDidMount(){
    let response = await PublicationsService.getList();
    this.publications = response.publications;
    this.forceUpdate();
  }

  render() {
    let publicationBlocks = this.publications.map((pub)=> <PublicationBlock key={pub.id} publication={pub}/>)
    return (
      <div>
        <PublicationForm />
        <hr className='separator'/>
        {publicationBlocks}
      </div>
    );
  }
}

export default App;