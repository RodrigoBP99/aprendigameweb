import React from 'react';
import 'bootswatch/dist/flatly/bootstrap.css';
import Routes from './routes';
import '../custom.css';
import Navbar from '../components/navbar';
import AuthenticationProvider from './authenticationProvider';

import 'toastr/build/toastr.css';
import 'toastr/build/toastr.min.js';

import 'primereact/resources/themes/nova-alt/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

class App extends React.Component {
  render() {
    return (
      <AuthenticationProvider>
        <Navbar />
        <div className="container">
          <Routes />
        </div>
      </AuthenticationProvider>
    );
  }
}

export default App;
