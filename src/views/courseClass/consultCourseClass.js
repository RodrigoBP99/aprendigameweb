import React from 'react';
import { withRouter } from 'react-router-dom';
import Card from '../../components/card';
import FormGroup from '../../components/form-group';
import CourseClassTable from './courseClassTable';

class ConsultCourseClass extends React.Component {
  render() {
    const courseClass = [
      {
        code: 'CL15204',
        name: 'Teste',
        courseUnit: {
          name: 'CourseUnit',
        },
        teacher: { name: 'Teacher' },
      },
    ];

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
                  aria-describedby="courseUnitHelp"
                  placeholder="Digite o Código do Curso"
                />
              </FormGroup>
              <FormGroup htmlFor="inputCurseUnit" label="Matéria: ">
                <input
                  type="text"
                  className="form-control"
                  id="inputCurseClass"
                  aria-describedby="courseClassHelp"
                  placeholder="Digite o nome da Matéria"
                />
              </FormGroup>
              <button type="button" className="btn btn-success">
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
              <CourseClassTable courseClass={courseClass}></CourseClassTable>
            </div>
          </div>
        </div>
      </Card>
    );
  }
}

export default withRouter(ConsultCourseClass);
