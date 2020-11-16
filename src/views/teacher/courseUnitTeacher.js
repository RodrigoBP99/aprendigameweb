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
    showConfirmDialog: false,
    deletedTeacher: {},
    teacherList: [],
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

  registerTeacher = (courseUnitCode) => {
    //this.props.history.push('/register-class/');
    console.log(this.state.teacherList);
  };

  openConfirmation = (teacher) => {
    this.setState({ showConfirmDialog: true, deleteTeacher: teacher });
  };

  cancelDeleteCourseClass = () => {
    this.setState({ showConfirmDialog: false, deletedCourseClass: {} });
  };

  deleteTeacher = () => {
    console.log(this.state.deletedTeacher);
    // this.courseUnitService
    //   .removeteacher(this.props.courseUnit, this.state.deletedTeacher)
    //   .then((res) => {
    //     const teacherList = this.state.teacherList;
    //     const index = teacherList.indexOf(this.state.deletedTeacher);
    //     teacherList.splice(index, 1);

    //     this.setState({
    //       teacherList: teacherList,
    //       showConfirmDialog: false,
    //     });

    //     messages.successMessage('Professor(a) deletado(a) com sucesso');
    //   })
    //   .catch((erro) => {
    //     messages.erroMessage('Erro ao executar Ação');
    //   });
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
                  onClick={(e) =>
                    this.registerTeacher(this.props.courseUnit.code)
                  }
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
      </>
    );
  }
}

CourseUnitTeacher.contextType = AuthContext;

export default withRouter(CourseUnitTeacher);
