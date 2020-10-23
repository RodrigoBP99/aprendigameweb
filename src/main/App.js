import React from 'react';

import Routes from './rotas';

import 'bootswatch/dist/flatly/bootstrap.css';
import '../custom.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <Routes />
      </div>
    );
  }
}

export default App;
