import React from 'react';
import { withRouter } from 'react-router-dom';
import Card from '../../components/card';
import FormGroup from '../../components/form-group';

import TeacherService from '../../app/service/teacherService';
import * as messages from '../../components/toastr';

class TeacherRegister extends React.Component {
  state = {
    name: '',
    registration: '',
    password: '',
    passwordRepet: '',
  };

  constructor() {
    super();
    this.service = new TeacherService();
  }

  register = () => {
    const teacher = {
      name: this.state.name,
      registration: this.state.registration,
      password: this.state.password,
    };

    const passwordRepet = this.state.passwordRepet;

    try {
      this.service.validate(teacher, passwordRepet);
    } catch (error) {
      const message = error.messages;
      message.forEach((msg) => {
        messages.erroMessage(msg);
      });
      return false;
    }

    this.service
      .save(teacher)
      .then((res) => {
        messages.successMessage('Usuario cadastrado com sucesso, faça o login');
        this.props.history.push('/');
      })
      .catch((erro) => {
        messages.erroMessage(erro.response.data);
      });
  };

  cancelRegister = () => {
    this.props.history.push('/');
  };

  render() {
    return (
      <div className="container">
        <Card tittle="Cadastro Professor">
          <div className="row">
            <div className="col-lg-12">
              <div className="bs-component">
                <FormGroup label="Nome: *" htmlFor="inputName">
                  <input
                    type="text"
                    id="inputName"
                    name="name"
                    placeholder="Usuario de Teste"
                    className="form-control"
                    value={this.state.name}
                    onChange={(e) => this.setState({ name: e.target.value })}
                  />
                </FormGroup>
                <FormGroup label="Matrícula: *" htmlFor="inputRegistration">
                  <input
                    type="text"
                    id="inputRegistration"
                    name="registration"
                    placeholder="TH00000"
                    className="form-control"
                    onChange={(e) =>
                      this.setState({ registration: e.target.value })
                    }
                  />
                </FormGroup>
                <FormGroup label="Senha: *" htmlFor="inputPassword">
                  <input
                    type="password"
                    id="inputPassword"
                    name="password"
                    placeholder="**********"
                    className="form-control"
                    onChange={(e) =>
                      this.setState({ password: e.target.value })
                    }
                  />
                </FormGroup>
                <FormGroup
                  label="Repetir Senha: *"
                  htmlFor="inputPasswordRepet"
                >
                  <input
                    type="password"
                    id="inputPasswordRepet"
                    name="passwordRepet"
                    placeholder="**********"
                    className="form-control"
                    onChange={(e) =>
                      this.setState({ passwordRepet: e.target.value })
                    }
                  />
                </FormGroup>
                <button
                  onClick={this.register}
                  type="button"
                  className="btn btn-success"
                >
                  Salvar <i className="pi pi-save" />
                </button>
                <button
                  onClick={this.cancelRegister}
                  type="button"
                  className="btn btn-danger"
                >
                  Cancelar <i className="pi pi-times" />
                </button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

export default withRouter(TeacherRegister);
