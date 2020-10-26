import React from 'react';
import Card from '../components/card';
import FormGroup from '../components/form-group';
import { withRouter } from 'react-router-dom';

import TeacherService from '../app/service/teacherService';
import LocalStorageService from '../app/service/localstorageService';
import { successMessage, erroMessage } from '../components/toastr';

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
        LocalStorageService.addItem('_loged_teacher', res.data);
        successMessage('Você logou com sucesso');
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
            <Card title="Login">
              <div className="row">
                <div className="col-lg-12">
                  <div className="bs-component">
                    <fieldset>
                      <div className="form-group">
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

                        <button
                          onClick={this.entrar}
                          className="btn btn-success"
                        >
                          Entrar
                        </button>
                        <button
                          onClick={this.prepareRegister}
                          className="btn btn-danger"
                        >
                          Cadastrar
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

export default withRouter(Login);
