import React from 'react';
import { withRouter } from 'react-router-dom';
import Card from '../../components/card';
import CourseUnitService from '../../app/service/courseunitService';
import CourseClassService from '../../app/service/courseclassService';
import CourseClassTable from '../courseClass/courseClassTable';
import * as messages from '../../components/toastr';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { AuthContext } from '../../main/authenticationProvider';
import FormGroup from '../../components/form-group';
import LocalStorageService from '../../app/service/localstorageService';

class CourseUnit extends React.Component {
  state = {
    courseUnit: {},
    showConfirmDialog: false,
    deletedCourseClass: {},
    courseClassList: [],
  };

  constructor() {
    super();
    this.service = new CourseUnitService();
    this.courseClassService = new CourseClassService();
  }

  async componentDidMount() {
    const params = this.props.match.params;
    if (params.id) {
      await this.service
        .getById(params.id)
        .then((res) => {
          this.setState({ courseUnit: res.data });
        })
        .catch((erro) => {
          messages.erroMessage(erro.response.data);
        });
    }

    const courseClassFilter = {
      courseUnit: this.state.courseUnit.code,
    };

    this.courseClassService
      .search(courseClassFilter)
      .then((res) => {
        const list = res.data;

        if (list.length < 1) {
          messages.alertMessage('Nenhuma Turma econtrada');
        } else if (list.length === 1) {
          messages.successMessage(`${list.length} Turma foi encontrada`);
        } else {
          messages.successMessage(`${list.length} Turmas foram encontradas`);
        }

        this.setState({ courseClassList: res.data });
      })
      .catch((erro) => {
        messages.erroMessage(erro.response.data);
      });
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
        <Card tittle="Curso">
          <button
            id="buttonBackPress"
            type="button"
            className="btn btn-danger"
            onClick={this.backButton}
          >
            <i className="pi pi-arrow-left" />
          </button>
          <div className="row">
            <div className="col-md-6">
              <FormGroup label="Nome">
                <input
                  type="text"
                  className="form-control"
                  disabled={true}
                  value={this.state.courseUnit.name}
                />
              </FormGroup>
            </div>
            <div className="col-md-6">
              <FormGroup label="Código">
                <input
                  type="text"
                  className="form-control"
                  disabled={true}
                  value={this.state.courseUnit.code}
                />
              </FormGroup>
            </div>
          </div>
        </Card>
        <Card tittle="Turmas">
          <div className="row">
            <div className="col-lg-12">
              <div className="bs-component">
                <button
                  id="buttonRegister"
                  type="button"
                  className="btn btn-warning"
                  onClick={(e) =>
                    this.registerCourseClass(this.state.courseUnit.code)
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

CourseUnit.contextType = AuthContext;

export default withRouter(CourseUnit);
