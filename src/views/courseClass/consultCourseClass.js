import React from 'react';
import { withRouter } from 'react-router-dom';
import Card from '../../components/card';
import FormGroup from '../../components/form-group';
import CourseClassTable from './courseClassTable';
import CourseClassService from '../../app/service/courseclassService';
import LocalstorageService from '../../app/service/localstorageService';
import * as messages from '../../components/toastr';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

class ConsultCourseClass extends React.Component {
  state = {
    courseUnit: '',
    name: '',
    showConfirmDialog: false,
    deletedCourseClass: {},
    courseClassList: [],
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
      teacher: logedTeacher.id,
    };

    this.service
      .search(courseClassFilter)
      .then((res) => {
        this.setState({ courseClassList: res.data });
        messages.successMessage(
          `Foram encontrados ${this.state.courseClassList.length} Turmas`
        );
      })
      .catch((erro) => {
        messages.erroMessage(erro.response.data);
      });
  };

  componentDidMount = () => {
    this.search();
  };

  register = () => {
    this.props.history.push('/register-class');
  };

  editCourseClass = (id) => {
    this.props.history.push(`/register-class/${id}`);
  };

  openCourseClass = (id) => {
    console.log('ir para pagina da Classe');
  };

  openConfirmation = (courseClass) => {
    this.setState({ showConfirmDialog: true, deletedCourseClass: courseClass });
  };

  cancelDeleteCourseClass = () => {
    this.setState({ showConfirmDialog: false, deletedCourseClass: {} });
  };

  deleteCourseClass = () => {
    this.service
      .deleteCourseClass(this.state.deletedCourseClass.id)
      .then((res) => {
        const courseClassList = this.state.courseClassList;
        const index = courseClassList.indexOf(this.state.deletedCourseClass);
        courseClassList.splice(index, 1);

        this.setState({
          courseClassList: courseClassList,
          showConfirmDialog: false,
        });

        messages.successMessage('Classe deletada com sucesso');
      })
      .catch((erro) => {
        messages.erroMessage('Erro ao tentar deletar a Classe');
      });
  };

  render() {
    const footerDialog = (
      <div>
        <Button
          label="Confirmar"
          icon="pi pi-check"
          onClick={this.deleteCourseClass}
        />
        <Button
          label="Cancelar"
          icon="pi pi-times"
          onClick={this.cancelDeleteCourseClass}
          className="p-button-secondary"
        />
      </div>
    );

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
              <button
                type="button"
                className="btn btn-danger"
                onClick={this.register}
              >
                Cadastrar
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              <CourseClassTable
                courseClass={this.state.courseClassList}
                actionEdit={this.editCourseClass}
                actionOpen={this.openCourseClass}
                actionDelete={this.openConfirmation}
              ></CourseClassTable>
            </div>
          </div>
        </div>
        <div>
          <Dialog
            header="Confirmação"
            visible={this.state.showConfirmDialog}
            style={{ width: '50vw' }}
            modal={true}
            onHide={() => this.setState({ showConfirmDialog: false })}
            footer={footerDialog}
          >
            Você deseja mesmo deletar essa Turma?
          </Dialog>
        </div>
      </Card>
    );
  }
}

export default withRouter(ConsultCourseClass);
