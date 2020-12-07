import React from 'react';
import { withRouter } from 'react-router-dom';
import TeacherService from '../app/service/teacherService';
import { AuthContext } from '../main/authenticationProvider';
import Navbar from '../components/navbar';

class Home extends React.Component {
  state = {
    classesLength: 0,
    teacher: {},
  };

  constructor() {
    super();
    this.teacherService = new TeacherService();
  }

  componentDidMount = () => {
    const teacher = this.context.authenticatedUser;
    this.setState({ teacher: teacher });
  };

  render() {
    return (
      <>
        <Navbar />
        <div className="jumbotron">
          <center>
            <h1 className="display-3">
              Bem vindo!
              <br />
              Professor(a) <i>{this.state.teacher.name}</i>
            </h1>
          </center>
          <p className="lead">Esse é seu sistema de controle de Turmas e Cursos.</p>
          <hr className="my-4" />
          <p>
            E essa é sua área administrativa, utilize um dos menus ou botões
            abaixo para navegar pelo sistema.
          </p>
          <p className="lead">
            <a
              className="btn btn-primary btn-lg"
              href="#/consult-course"
              role="button"
            >
              <i className="fa fa-users"></i> Cursos
            </a>
            <a
              className="btn btn-warning btn-lg"
              href="#/consult-classes"
              role="button"
            >
              <i className="fa fa-users"></i> Turmas
            </a>
          </p>
        </div>
      </>
    );
  }
}

Home.contextType = AuthContext;

export default withRouter(Home);
