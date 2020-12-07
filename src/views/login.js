import React from 'react';
import Card from '../components/card';
import FormGroup from '../components/form-group';
import { withRouter } from 'react-router-dom';

import TeacherService from '../app/service/teacherService';
import { erroMessage } from '../components/toastr';

import { AuthContext } from '../main/authenticationProvider';

class Login extends React.Component {
  state = {
    registration: '',
    password: '',
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
        this.context.iniciateSession(res.data);
        this.props.history.push('/home');
      })
      .catch((erro) => {
        erroMessage(erro.response.data);
      });
  };

  prepareRegister = () => {
    this.props.history.push('/teacher-register');
  };

  render() {
    return (
      <div className="row">
        <div
          className="col-md-6"
          style={{ position: 'relative', left: '300px' }}
        >
          <div className="bs-docs-section">
            <Card tittle="Login">
              <div className="row">
                <div className="col-lg-12">
                  <div className="bs-component">
                    <fieldset>
                      <div className="form-group">
                        <FormGroup
                          label="Matrícula: *"
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
                            placeholder="Digite sua Matrícula"
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

                        <button
                          type="button"
                          onClick={this.entrar}
                          className="btn btn-success"
                        >
                          Entrar <i className="pi pi-sign-in" />
                        </button>
                        <button
                          type="button"
                          onClick={this.prepareRegister}
                          className="btn btn-info"
                        >
                          Cadastrar <i className="pi pi-user-plus" />
                        </button>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

Login.contextType = AuthContext;

export default withRouter(Login);
