import React from 'react';
import Card from '../../components/card';
import FormGroup from '../../components/form-group';
import { withRouter } from 'react-router-dom';
import CourseClassService from '../../app/service/courseclassService';
import LocalstorageService from '../../app/service/localstorageService';
import * as messages from '../../components/toastr';

class RegisterCourseClass extends React.Component {
  state = {
    id: null,
    name: '',
    code: '',
    courseUnitCode: '',
  };

  constructor() {
    super();
    this.service = new CourseClassService();
  }

  cancelRegister = () => {
    this.props.history.push('/consult-classes');
  };

  saveCourseClass = () => {
    const logedTeacher = LocalstorageService.getItem('_loged_teacher');

    const { name, code, courseUnitCode } = this.state;

    const courseClass = {
      name,
      code,
      courseUnitCode,
      teacherId: logedTeacher.id,
    };

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

  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({ [name]: value });
  };

  render() {
    return (
      <Card tittle="Cadastrar Turma">
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
                placeholder="Educação Física"
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
                placeholder="CL1557"
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
                placeholder="CU0087"
              />
            </FormGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <button
              type="button"
              className="btn btn-success"
              onClick={this.saveCourseClass}
            >
              Salvar
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={this.cancelRegister}
            >
              Cancelar
            </button>
          </div>
        </div>
      </Card>
    );
  }
}

export default withRouter(RegisterCourseClass);
