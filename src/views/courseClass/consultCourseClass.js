import React from 'react';
import { withRouter } from 'react-router-dom';
import Card from '../../components/card';
import FormGroup from '../../components/form-group';
import CourseClassTable from './courseClassTable';
import CourseClassService from '../../app/service/courseclassService';
import LocalstorageService from '../../app/service/localstorageService';

class ConsultCourseClass extends React.Component {
  state = {
    courseUnit: '',
    name: '',
    teacher: '',
    courseClass: [],
  };

  constructor() {
    super();
    this.service = new CourseClassService();
  }

  search = () => {
    const logedTeacher = LocalstorageService.getItem('_loged_teacher');

    const courseClassFilter = {
      courseUnit: this.state.courseUnit,
      name: this.state.name,
      teacher: logedTeacher.registration,
    };

    this.service
      .search(courseClassFilter)
      .then((res) => {
        this.setState({ courseClass: res.data });
      })
      .catch((erro) => {
        console.log(erro);
      });
  };

  render() {
    return (
      <Card tittle="Consultar Classes">
        <div className="row">
          <div className="col-md-12">
            <div className="bs-componenet">
              <FormGroup htmlFor="inputCurseUnit" label="Curso: *">
                <input
                  type="text"
                  className="form-control"
                  id="inputCurseUnit"
                  value={this.state.courseUnit}
                  onChange={(e) =>
                    this.setState({ courseUnit: e.target.value })
                  }
                  placeholder="Digite o Código do Curso"
                />
              </FormGroup>
              <FormGroup htmlFor="inputCurseUnit" label="Matéria: ">
                <input
                  type="text"
                  className="form-control"
                  id="inputCurseClass"
                  value={this.state.name}
                  onChange={(e) => this.setState({ name: e.target.value })}
                  placeholder="Digite o nome da Matéria"
                />
              </FormGroup>
              <button
                type="button"
                onClick={this.search}
                className="btn btn-success"
              >
                Buscar
              </button>
              <button type="button" className="btn btn-danger">
                Cadastrar
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              <CourseClassTable
                courseClass={this.state.courseClass}
              ></CourseClassTable>
            </div>
          </div>
        </div>
      </Card>
    );
  }
}

export default withRouter(ConsultCourseClass);
