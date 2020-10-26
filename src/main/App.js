import React from 'react';
import 'bootswatch/dist/flatly/bootstrap.css';
import Routes from './rotas';
import '../custom.css';
import Navbar from '../components/navbar';

import 'toastr/build/toastr.css';
import 'toastr/build/toastr.min.js';

class App extends React.Component {
  render() {
    return (
      <>
        <Navbar />
        <div className="container">
          <Routes />
        </div>
      </>
    );
  }
}

export default App;
