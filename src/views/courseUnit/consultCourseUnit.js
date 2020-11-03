import React from 'react';
import { withRouter } from 'react-router-dom';
import Card from '../../components/card';
import FormGroup from '../../components/form-group';
import CourseUnitTable from './courseUnitTable';
import CourseUnitService from '../../app/service/courseunitService';
import * as messages from '../../components/toastr';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { AuthContext } from '../../main/authenticationProvider';

class ConsultCourseUnit extends React.Component {
  state = {
    code: '',
    name: '',
    showConfirmDialog: false,
    deletedCourseUnit: {},
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
    console.log('Editar Curso');
  };

  openCourseClass = (id) => {
    this.props.history.push(`/courseUnit/${id}`);
  };

  openConfirmation = (courseClass) => {
    this.setState({ showConfirmDialog: true, deletedCourseUnit: courseClass });
  };

  cancelDeleteCourseClass = () => {
    this.setState({ showConfirmDialog: false, deletedCourseUnit: {} });
  };

  deleteCourseClass = () => {
    this.service
      .deleteCourseClass(this.state.deletedCourseUnit.id)
      .then((res) => {
        const courseUnitList = this.state.courseUnitList;
        const index = courseUnitList.indexOf(this.state.deletedCourseUnit);
        courseUnitList.splice(index, 1);

        this.setState({
          courseUnitList: courseUnitList,
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
                //actionDelete={this.openConfirmation}
              ></CourseUnitTable>
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

ConsultCourseUnit.contextType = AuthContext;

export default withRouter(ConsultCourseUnit);
