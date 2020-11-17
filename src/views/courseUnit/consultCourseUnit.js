import React from 'react';
import { withRouter } from 'react-router-dom';
import Card from '../../components/card';
import FormGroup from '../../components/form-group';
import CourseUnitTable from './courseUnitTable';
import CourseUnitService from '../../app/service/courseunitService';
import * as messages from '../../components/toastr';
import { AuthContext } from '../../main/authenticationProvider';
import Navbar from '../../components/navbar';

class ConsultCourseUnit extends React.Component {
  state = {
    code: '',
    name: '',
    courseUnitList: [],
  };

  constructor() {
    super();
    this.service = new CourseUnitService();
  }

  search = () => {
    const logedTeacher = this.context.authenticatedUser;

    const courseUnitFilter = {
      code: this.state.code,
      name: this.state.name,
      teacherId: logedTeacher.id,
    };

    this.service
      .search(courseUnitFilter)
      .then((res) => {
        const list = res.data;

        if (list.length < 1) {
          messages.alertMessage('Nenhuma Turma econtrada');
        } else if (list.length === 1) {
          messages.successMessage(`${list.length} Turma foi encontrada`);
        } else {
          messages.successMessage(`${list.length} Turmas foram encontradas`);
        }

        this.setState({ courseUnitList: res.data });
      })
      .catch((erro) => {
        messages.erroMessage(erro.response.data);
      });
  };
  componentDidMount = () => {
    const logedTeacher = this.context.authenticatedUser;

    const courseUnitFilter = {
      code: this.state.code,
      name: this.state.name,
      teacherId: logedTeacher.id,
    };

    this.service
      .search(courseUnitFilter)
      .then((res) => {
        this.setState({ courseUnitList: res.data });
      })
      .catch((erro) => {
        messages.erroMessage(erro.response.data);
      });
  };

  register = () => {
    this.props.history.push('/register-course');
  };

  editCourseClass = (id) => {
    this.props.history.push(`/register-course/${id}`);
  };

  openCourseClass = (id) => {
    this.props.history.push(`/courseUnit/${id}`);
  };

  render() {
    return (
      <>
        <Navbar />
        <Card tittle="Cursos">
          <div className="row">
            <div className="col-md-12">
              <div className="bs-componenet">
                <FormGroup
                  htmlFor="inputCurseUnitCode"
                  label="Código do Curso: *"
                >
                  <input
                    type="text"
                    className="form-control"
                    id="inputCurseUnitCode"
                    value={this.state.code}
                    onChange={(e) => this.setState({ code: e.target.value })}
                    placeholder="Digite o Código do Curso"
                  />
                </FormGroup>
                <FormGroup htmlFor="inputCurseUnitName" label="Nome do Curso: ">
                  <input
                    type="text"
                    className="form-control"
                    id="inputCurseUnitName"
                    value={this.state.name}
                    onChange={(e) => this.setState({ name: e.target.value })}
                    placeholder="Digite o nome do Curso"
                  />
                </FormGroup>
                <button
                  type="button"
                  onClick={this.search}
                  className="btn btn-success"
                >
                  Buscar <i className="pi pi-search" />
                </button>
                <button
                  type="button"
                  className="btn btn-info"
                  onClick={this.register}
                >
                  Cadastrar <i className="pi pi-plus" />
                </button>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="bs-component">
                <CourseUnitTable
                  courseUnit={this.state.courseUnitList}
                  actionEdit={this.editCourseClass}
                  actionOpen={this.openCourseClass}
                ></CourseUnitTable>
              </div>
            </div>
          </div>
          <div></div>
        </Card>
      </>
    );
  }
}

ConsultCourseUnit.contextType = AuthContext;

export default withRouter(ConsultCourseUnit);
