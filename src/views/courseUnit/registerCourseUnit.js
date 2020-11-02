import React from 'react';
import Card from '../../components/card';
import FormGroup from '../../components/form-group';
import { withRouter } from 'react-router-dom';
import CourseUnitService from '../../app/service/courseunitService';
import * as messages from '../../components/toastr';
import { AuthContext } from '../../main/authenticationProvider';

class RegisterCourseUnit extends React.Component {
  state = {
    id: null,
    name: '',
    code: '',
    update: false,
  };

  constructor() {
    super();
    this.service = new CourseUnitService();
  }

  componentDidMount() {
    const params = this.props.match.params;
    if (params.id) {
      this.service
        .getById(params.id)
        .then((res) => {
          this.setState({ ...res.data, update: true });
        })
        .catch((erro) => {
          messages.erroMessage(erro.response.data);
        });
    }
  }

  cancelRegister = () => {
    this.props.history.push('/consult-course');
  };

  saveCourseUnit = () => {
    const logedTeacher = this.context.authenticatedUser;

    const { name, code } = this.state;

    const courseUnit = {
      name,
      code,
      teacherId: logedTeacher.id,
    };

    try {
      this.service.validate(courseUnit);
    } catch (error) {
      const message = error.messages;
      message.forEach((msg) => {
        messages.erroMessage(msg);
      });
      return false;
    }

    this.service
      .save(courseUnit)
      .then((res) => {
        messages.successMessage('Curso cadastrada com sucesso');
        this.props.history.push('/consult-course');
      })
      .catch((erro) => {
        messages.erroMessage(erro.response.data);
      });
  };

  updateCourseClass = () => {
    const { name, code, id, teacherId } = this.state;

    const courseClass = {
      name,
      code,
      id,
      teacherId,
    };

    this.service
      .update(courseClass)
      .then((res) => {
        messages.successMessage('Turma atualizada com sucesso');
        this.props.history.push('/consult-course');
      })
      .catch((erro) => {
        messages.erroMessage(erro.response.data);
      });
  };

  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({ [name]: value });
  };

  render() {
    return (
      <Card tittle={this.state.update ? 'Atualizar Curso' : 'Cadastrar Curso'}>
        <div className="row">
          <div className="col-md-12">
            <FormGroup htmlFor="inputName" label="Nome: *">
              <input
                type="text"
                value={this.state.name}
                onChange={this.handleChange}
                name="name"
                id="inputName"
                className="form-control"
                placeholder="Nome do Curso"
              />
            </FormGroup>
            <FormGroup htmlFor="inputCode" label="Código: *">
              <input
                type="text"
                value={this.state.code}
                onChange={this.handleChange}
                name="code"
                id="inputCode"
                className="form-control"
                placeholder="CU00000"
              />
            </FormGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            {this.state.update ? (
              <button
                type="button"
                className="btn btn-warning"
                onClick={this.updateCourseClass}
              >
                Atualizar <i className="pi pi-save" />
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-success"
                onClick={this.saveCourseUnit}
              >
                Salvar <i className="pi pi-save" />
              </button>
            )}
            <button
              type="button"
              className="btn btn-danger"
              onClick={this.cancelRegister}
            >
              Cancelar <i className="pi pi-times" />
            </button>
          </div>
        </div>
      </Card>
    );
  }
}

RegisterCourseUnit.contextType = AuthContext;

export default withRouter(RegisterCourseUnit);
