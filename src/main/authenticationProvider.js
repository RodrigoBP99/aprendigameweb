import React from 'react';
import AuthService from '../app/service/authService';

export const AuthContext = React.createContext();
export const AuthConsumer = AuthContext.Consumer;

const AuthProvider = AuthContext.Provider;

class AuthenticationProvider extends React.Component {
  state = {
    authenticatedUser: null,
    isAuthenticated: false,
  };

  iniciateSession = (user) => {
    AuthService.login(user);
    this.setState({ isAuthenticated: true, authenticatedUser: user });
  };

  finishSession = () => {
    AuthService.removeAuthenticatedUser();
    this.setState({ isAuthenticated: false, authenticatedUser: null });
  };

  render() {
    const context = {
      authenticatedUser: this.state.authenticatedUser,
      isAuthenticated: this.state.isAuthenticated,
      iniciateSession: this.iniciateSession,
      finishSession: this.finishSession,
    };
    return <AuthProvider value={context}>{this.props.children}</AuthProvider>;
  }
}

export default AuthenticationProvider;
