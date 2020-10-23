import React from 'react';

import Routes from './rotas';
import Navbar from '../components/navbar';

import 'bootswatch/dist/flatly/bootstrap.css';
import '../custom.css';

class App extends React.Component {
  render() {
    return (
      <>
        <Navbar />
        <div>
          <Routes />
        </div>
      </>
    );
  }
}

export default App;
