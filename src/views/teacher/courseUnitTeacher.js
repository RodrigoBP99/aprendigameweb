import React from 'react';
import { withRouter } from 'react-router-dom';
import Card from '../../components/card';
import * as messages from '../../components/toastr';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { AuthContext } from '../../main/authenticationProvider';
import TeacherService from '../../app/service/teacherService';
import CourseUnitService from '../../app/service/courseunitService';
import TeacherTable from './teacherTable';
import LocalStorageService from '../../app/service/localstorageService';

class CourseUnitTeacher extends React.Component {
  state = {
    showDeleteConfirmDialog: false,
    showAddConfirmDialog: false,
    deletedTeacher: null,
    teacherList: [],
    includeTeacherRegistration: '',
  };

  constructor() {
    super();
    this.service = new TeacherService();
    this.courseUnitService = new CourseUnitService();
  }

  componentDidMount() {
    const courseUnit = this.props.courseUnit;

    const teacherFilter = {
      courseUnitId: courseUnit.id,
    };

    this.service
      .search(teacherFilter)
      .then((res) => {
        this.setState({ teacherList: res.data });
      })
      .catch((erro) => {
        messages.erroMessage(erro.response.data);
      });

    LocalStorageService.clearItem();
  }

  openConfirmation = (teacher) => {
    this.setState({ showDeleteConfirmDialog: true });
    this.setState({ deletedTeacher: teacher });
  };

  cancelDeleteCourseClass = () => {
    this.setState({ showDeleteConfirmDialog: false, deletedCourseClass: {} });
  };

  deleteTeacher = () => {
    const teacherList = this.state.teacherList;

    if (teacherList.length === 1) {
      messages.erroMessage('Não é possivel deixar o curso sem professores');
    } else {
      this.courseUnitService
        .removeteacher(this.props.courseUnit, this.state.deletedTeacher)
        .then((res) => {
          const index = teacherList.indexOf(this.state.deletedTeacher);
          teacherList.splice(index, 1);

          this.setState({
            teacherList: teacherList,
            showDeleteConfirmDialog: false,
          });

          messages.successMessage('Professor(a) deletado(a) com sucesso');
          this.backButton();
        })
        .catch((erro) => {
          messages.erroMessage('Erro ao executar Ação');
        });
    }
  };

  openConfirmationAdd = () => {
    this.setState({ showAddConfirmDialog: true });
  };

  cancelAddTeacher = () => {
    this.setState({
      showAddConfirmDialog: false,
      includeTeacherRegistration: '',
    });
  };

  registerTeacher = () => {
    const courseUnit = this.props.courseUnit;
    const teacherRegistration = this.state.includeTeacherRegistration;

    this.courseUnitService
      .includeTeacher(courseUnit, teacherRegistration)
      .then((res) => {
        const teacherList = this.state.teacherList;
        teacherList.push(res.data);

        console.log(teacherList);
        console.log(res.data);

        this.setState({ teacherList: teacherList });

        messages.successMessage('Professor incluido com sucesso!');
      })
      .catch((erro) => {
        messages.erroMessage(erro.response.data);
      });
  };

  backButton = () => {
    this.props.history.push('/consult-course');
  };

  render() {
    const footerDialog = (
      <div>
        <Button
          label="Confirmar"
          icon="pi pi-check"
          onClick={this.deleteTeacher}
        />
        <Button
          label="Cancelar"
          icon="pi pi-times"
          onClick={this.cancelDeleteCourseClass}
          className="p-button-secondary"
        />
      </div>
    );

    const footerDialogAdd = (
      <div>
        <Button
          label="Confirmar"
          icon="pi pi-check"
          onClick={this.registerTeacher}
        />
        <Button
          label="Cancelar"
          icon="pi pi-times"
          onClick={this.cancelAddTeacher}
          className="p-button-secondary"
        />
      </div>
    );

    return (
      <>
        <Card tittle="Professores">
          <div className="row">
            <div className="col-lg-12">
              <div className="bs-component">
                <button
                  id="buttonRegister"
                  type="button"
                  className="btn btn-warning"
                  onClick={this.openConfirmationAdd}
                >
                  <i className="pi pi-plus" />
                </button>
                <TeacherTable
                  teacherLoged={this.context.authenticatedUser}
                  teacher={this.state.teacherList}
                  actionDelete={this.openConfirmation}
                ></TeacherTable>
              </div>
            </div>
          </div>
          <div>
            <Dialog
              header="Confirmação"
              visible={this.state.showDeleteConfirmDialog}
              style={{ width: '50vw' }}
              modal={true}
              onHide={() => this.setState({ showDeleteConfirmDialog: false })}
              footer={footerDialog}
            >
              Você deseja mesmo deletar essa Turma?
            </Dialog>

            <Dialog
              header="Adicionar Professor"
              visible={this.state.showAddConfirmDialog}
              style={{ width: '50vw' }}
              modal={true}
              onHide={() => this.setState({ showAddConfirmDialog: false })}
              footer={footerDialogAdd}
            >
              Digite a matricula do professor que deseja incluir
              <input
                type="text"
                placeholder="TH0000"
                className="form-control"
                value={this.state.includeTeacherRegistration}
                onChange={(e) =>
                  this.setState({ includeTeacherRegistration: e.target.value })
                }
              />
            </Dialog>
          </div>
        </Card>
      </>
    );
  }
}

CourseUnitTeacher.contextType = AuthContext;

export default withRouter(CourseUnitTeacher);
