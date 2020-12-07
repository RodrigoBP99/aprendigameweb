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
    deletedTeacher: {},
    teacherList: [],
    includeTeacherRegistration: '',
    showDeleteCourseDialog: false,
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

  openDeleteConfirmation = (teacher) => {
    this.setState({ showDeleteConfirmDialog: true });
    this.setState({ deletedTeacher: teacher });
  };

  cancelDeleteTeacher = () => {
    this.setState({
      showDeleteConfirmDialog: false,
      showDeleteCourseDialog: false,
      deletedTeacher: {},
    });
  };

  deleteTeacher = () => {
    const teacherList = this.state.teacherList;

    if (teacherList.length === 1) {
      this.courseUnitService
        .deleteCourseUnit(this.props.courseUnit.id)
        .then((res) => {
          messages.successMessage('Curso deletado com sucesso!');
          this.props.history.push('/consult-course');
        })
        .catch((erro) => {
          messages.erroMessage(erro.response.data);
        });
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

  openConfirmationDeleteCourse = () => {
    this.setState({ showDeleteCourseDialog: true });
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

        this.setState({
          teacherList: teacherList,
          includeTeacherRegistration: '',
        });

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
          onClick={this.cancelDeleteTeacher}
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
                  actionDelete={
                    this.state.teacherList.length === 1
                      ? this.openConfirmationDeleteCourse
                      : this.openDeleteConfirmation
                  }
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
              <h4>Você deseja mesmo sair do Curso?</h4>
            </Dialog>

            <Dialog
              header="Confirmação"
              visible={this.state.showDeleteCourseDialog}
              style={{ width: '50vw' }}
              modal={true}
              onHide={() => this.setState({ showDeleteCourseDialog: false })}
              footer={footerDialog}
            >
              <h4>
                Se você sair irá deletar o Curso, você tem certeza que deseja
                sair?!
              </h4>
              <h5>
                Ao deletar o curso todas as turmas serão apagadas. Assim como os
                questionarios e presenças dessas turmas!
              </h5>
            </Dialog>

            <Dialog
              header="Adicionar Professor"
              visible={this.state.showAddConfirmDialog}
              style={{ width: '50vw' }}
              modal={true}
              onHide={() =>
                this.setState({
                  showAddConfirmDialog: false,
                  includeTeacherRegistration: '',
                })
              }
              footer={footerDialogAdd}
            >
              <h4>Digite a matrícula do professor que deseja incluir</h4>
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
