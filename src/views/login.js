import React from 'react';
import Card from '../components/card';
import FormGroup from '../components/form-group';
import { withRouter } from 'react-router-dom';

import TeacherService from '../app/service/teacherService';

class Login extends React.Component {
  state = {
    registration: '',
    password: '',
    messageErro: null,
  };

  constructor() {
    super();
    this.service = new TeacherService();
  }

  entrar = () => {
    this.service
      .authenticate({
        registration: this.state.registration,
        password: this.state.password,
      })
      .then((res) => {
        localStorage.setItem('loged_teacher', JSON.stringify(res.data));
        this.props.history.push('/home');
      })
      .catch((erro) => {
        this.setState({ messageErro: erro.response.data });
      });
  };

  prepareRegister = () => {
    this.props.history.push('/teacher-register');
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div
            className="col-md-6"
            style={{ position: 'relative', left: '300px' }}
          >
            <div className="bs-docs-section">
              <Card tittle="Login">
                <div className="row">
                  <span>{this.state.messageErro}</span>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <fieldset>
                      <FormGroup
                        label="Matricula: *"
                        htmlFor="exampleInputRegistration"
                      >
                        <input
                          type="text"
                          value={this.state.registration}
                          onChange={(e) =>
                            this.setState({ registration: e.target.value })
                          }
                          className="form-control"
                          id="exampleInputRegistration"
                          aria-describedby="registration-help"
                          placeholder="Digite sua Matricula"
                        />
                      </FormGroup>
                      <FormGroup
                        label="Senha: *"
                        htmlFor="exampleInputPassword"
                      >
                        <input
                          type="password"
                          value={this.state.password}
                          onChange={(e) =>
                            this.setState({ password: e.target.value })
                          }
                          className="form-control"
                          id="exampleInputPassword"
                          placeholder="Digite sua Senha"
                        />
                      </FormGroup>

                      <button onClick={this.entrar} className="btn btn-success">
                        Entrar
                      </button>
                      <button
                        onClick={this.prepareRegister}
                        className="btn btn-danger"
                      >
                        Cadastrar
                      </button>
                    </fieldset>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
