import React from 'react';
import { withRouter } from 'react-router-dom';
import Card from '../components/card';
import FormGroup from '../components/form-group';

import TeacherService from '../app/service/teacherService';
import { successMessage, erroMessage } from '../components/toastr';

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

  validate() {
    const msgs = [];

    if (!this.state.name) {
      msgs.push('O campo nome é obrigatorio');
    }

    if (!this.state.registration) {
      msgs.push('O campo Matricula é obrigatorio');
    }

    if (!this.state.password || !this.state.passwordRepet) {
      msgs.push('Preencha os campos de senha');
    } else if (this.state.password !== this.state.passwordRepet) {
      msgs.push('As senhas devem ser iguais');
    }

    return msgs;
  }

  register = () => {
    const msgs = this.validate();

    if (msgs && msgs.length > 0) {
      msgs.forEach((msg, index) => {
        erroMessage(msg);
      });
      return false;
    }

    const teacher = {
      name: this.state.name,
      registration: this.state.registration,
      password: this.state.password,
    };

    this.service
      .save(teacher)
      .then((res) => {
        successMessage('Usuario cadastrado com sucesso, faça o login');
        this.props.history.push('/login');
      })
      .catch((erro) => {
        erroMessage(erro.response.data);
      });
  };

  cancelRegister = () => {
    this.props.history.push('/login');
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
                    placeholder="Usuario da Silva Teste"
                    className="form-control"
                    value={this.state.name}
                    onChange={(e) => this.setState({ name: e.target.value })}
                  />
                </FormGroup>
                <FormGroup label="Matricula: *" htmlFor="inputRegistration">
                  <input
                    type="text"
                    id="inputRegistration"
                    name="registration"
                    placeholder="TH15468"
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
                  Salvar
                </button>
                <button
                  onClick={this.cancelRegister}
                  type="button"
                  className="btn btn-danger"
                >
                  Cancelar
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
