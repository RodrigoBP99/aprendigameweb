import React from 'react';
import { withRouter } from 'react-router-dom';
import Card from '../../components/card';
import CourseClassService from '../../app/service/courseclassService';
import CourseClassTable from '../courseClass/courseClassTable';
import * as messages from '../../components/toastr';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { AuthContext } from '../../main/authenticationProvider';
import LocalStorageService from '../../app/service/localstorageService';

class CourseUnitCourseClass extends React.Component {
  state = {
    showConfirmDialog: false,
    deletedCourseClass: {},
    courseClassList: [],
  };

  constructor() {
    super();
    this.courseClassService = new CourseClassService();
  }

  componentDidMount() {
    const courseUnit = this.props.courseUnit;

    const courseClassFilter = {
      courseUnit: courseUnit.code,
    };

    this.courseClassService
      .search(courseClassFilter)
      .then((res) => {
        this.setState({ courseClassList: res.data });
      })
      .catch((erro) => {
        messages.erroMessage(erro.response.data);
      });

    LocalStorageService.clearItem();
  }

  editCourseClass = (id) => {
    this.props.history.push(`/register-class/${id}`);
  };

  openCourseClass = (id) => {
    this.props.history.push(`/courseClass/${id}`);
  };

  registerCourseClass = (courseUnitCode) => {
    LocalStorageService.addItem('courseUnit', courseUnitCode);
    this.props.history.push('/register-class/');
  };

  openConfirmation = (courseClass) => {
    this.setState({ showConfirmDialog: true, deletedCourseClass: courseClass });
  };

  cancelDeleteCourseClass = () => {
    this.setState({ showConfirmDialog: false, deletedCourseClass: {} });
  };

  deleteCourseClass = () => {
    this.service
      .deletecourseUnit(this.state.deletedCourseClass.id)
      .then((res) => {
        const quizzList = this.state.quizzList;
        const index = quizzList.indexOf(this.state.deletedCourseClass);
        quizzList.splice(index, 1);

        this.setState({
          quizzList: quizzList,
          showConfirmDialog: false,
        });

        messages.successMessage('Turma deletada com sucesso');
      })
      .catch((erro) => {
        messages.erroMessage('Erro ao tentar deletar a Turma');
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
      <>
        <Card tittle="Turmas">
          <div className="row">
            <div className="col-lg-12">
              <div className="bs-component">
                <button
                  id="buttonRegister"
                  type="button"
                  className="btn btn-warning"
                  onClick={(e) =>
                    this.registerCourseClass(this.props.courseUnit.code)
                  }
                >
                  <i className="pi pi-plus" />
                </button>
                <CourseClassTable
                  courseClass={this.state.courseClassList}
                  teacherLoged={this.context.authenticatedUser}
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
      </>
    );
  }
}

CourseUnitCourseClass.contextType = AuthContext;

export default withRouter(CourseUnitCourseClass);
