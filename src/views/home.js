import React from 'react';
import { withRouter } from 'react-router-dom';

import TeacherService from '../app/service/teacherService';

class Home extends React.Component {
  state = {
    classesLength: 0,
  };

  constructor() {
    super();
    this.teacherService = new TeacherService();
  }

  render() {
    return (
      <div className="jumbotron">
        <h1 className="display-3">Bem vindo!</h1>
        <p className="lead">Esse é seu sistema de controle de Turmas.</p>
        <hr className="my-4" />
        <p>
          E essa é sua área administrativa, utilize um dos menus ou botões
          abaixo para navegar pelo sistema.
        </p>
        <p className="lead">
          <a className="btn btn-primary btn-lg" href="#/home" role="button">
            <i className="fa fa-users"></i> Cursos
          </a>
          <a
            className="btn btn-warning btn-lg"
            href="#/consult-classes"
            role="button"
          >
            <i className="fa fa-users"></i> Turmas
          </a>
          <a className="btn btn-danger btn-lg" href="#/home" role="button">
            <i className="fa fa-users"></i> Questionarios
          </a>
        </p>
      </div>
    );
  }
}

export default withRouter(Home);
