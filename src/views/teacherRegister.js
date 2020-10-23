import React from 'react';
import Card from '../components/card';
import FormGroup from '../components/form-group';

class TeacherRegister extends React.Component {
  state = {
    name: '',
    registration: '',
    password: '',
    passwordRepet: '',
  };

  register = () => {
    console.log(this.state);
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
                <button type="button" className="btn btn-danger">
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

export default TeacherRegister;
