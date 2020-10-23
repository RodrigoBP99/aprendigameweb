import React from 'react';
import { withRouter } from 'react-router-dom';

class Home extends React.Component {
  render() {
    return (
      <div class="jumbotron">
        <h1 class="display-3">Bem vindo!</h1>
        <p class="lead">Esse é seu sistema de questionarios.</p>
        <hr class="my-4" />
        <p>
          E essa é sua área administrativa, utilize um dos menus ou botões
          abaixo para navegar pelo sistema.
        </p>
        <p class="lead">
          <a class="btn btn-primary btn-lg" href="#/home" role="button">
            <i class="fa fa-users"></i> Cadastrar Classe
          </a>
          <a class="btn btn-danger btn-lg" href="#/home" role="button">
            <i class="fa fa-users"></i> Cadastrar Questionario
          </a>
        </p>
      </div>
    );
  }
}

export default withRouter(Home);
