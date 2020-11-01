import React from 'react';
import Card from '../../components/card';
import FormGroup from '../../components/form-group';
import { withRouter } from 'react-router-dom';
import CourseClassService from '../../app/service/courseclassService';
import * as messages from '../../components/toastr';
import { AuthContext } from '../../main/authenticationProvider';

class RegisterCourseClass extends React.Component {
  state = {
    id: null,
    name: '',
    code: '',
    teacherId: null,
    courseUnitCode: '',
    update: false,
  };

  constructor() {
    super();
    this.service = new CourseClassService();
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
    this.props.history.push('/consult-classes');
  };

  saveCourseClass = () => {
    const logedTeacher = this.context.authenticatedUser;

    const { name, code, courseUnitCode } = this.state;

    const courseClass = {
      name,
      code,
      courseUnitCode,
      teacherId: logedTeacher.id,
    };

    try {
      this.service.validate(courseClass);
    } catch (error) {
      const message = error.messages;
      message.forEach((msg) => {
        messages.erroMessage(msg);
      });
      return false;
    }

    this.service
      .save(courseClass)
      .then((res) => {
        messages.successMessage('Turma cadastrada com sucesso');
        this.props.history.push('/consult-classes');
      })
      .catch((erro) => {
        messages.erroMessage(erro.response.data);
      });
  };

  updateCourseClass = () => {
    const { name, code, courseUnitCode, id, teacherId } = this.state;

    const courseClass = {
      name,
      code,
      courseUnitCode,
      id,
      teacherId,
    };

    this.service
      .update(courseClass)
      .then((res) => {
        messages.successMessage('Turma atualizada com sucesso');
        this.props.history.push('/consult-classes');
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
      <Card tittle={this.state.update ? 'Atualizar Turma' : 'Cadastrar Turma'}>
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
                placeholder="Nome da Turma"
              />
            </FormGroup>
          </div>
          <div className="col-md-6">
            <FormGroup htmlFor="inputCode" label="Código: *">
              <input
                type="text"
                value={this.state.code}
                onChange={this.handleChange}
                name="code"
                id="inputCode"
                className="form-control"
                placeholder="CL00000"
              />
            </FormGroup>
          </div>
          <div className="col-md-6">
            <FormGroup input="inputCourseUnitCode" label="Código do Curso: *">
              <input
                type="text"
                name="courseUnitCode"
                value={this.state.courseUnitCode}
                onChange={this.handleChange}
                id="inputCourseUnitCode"
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
                onClick={this.saveCourseClass}
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

RegisterCourseClass.contextType = AuthContext;

export default withRouter(RegisterCourseClass);
