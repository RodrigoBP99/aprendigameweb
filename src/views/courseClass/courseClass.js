import React from 'react';
import { withRouter } from 'react-router-dom';
import Card from '../../components/card';
import CourseClassService from '../../app/service/courseclassService';
import QuizzService from '../../app/service/quizzService';
import * as messages from '../../components/toastr';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { AuthContext } from '../../main/authenticationProvider';
import FormGroup from '../../components/form-group';
import QuizzTable from '../quizz/quizzTable';

class CourseClass extends React.Component {
  state = {
    courseClass: {},
    showConfirmDialog: false,
    deletedQuizz: {},
    quizzList: [],
  };

  constructor() {
    super();
    this.service = new CourseClassService();
    this.quizzService = new QuizzService();
  }

  async componentDidMount() {
    const params = this.props.match.params;
    if (params.id) {
      await this.service
        .getById(params.id)
        .then((res) => {
          this.setState({ courseClass: res.data });
        })
        .catch((erro) => {
          messages.erroMessage(erro.response.data);
        });
    }

    const quizzFilter = {
      courseClassId: this.state.courseClass.id,
    };

    this.quizzService
      .search(quizzFilter)
      .then((res) => {
        const list = res.data;

        if (list.length < 1) {
          messages.alertMessage('Nenhum quizz econtrada');
        } else if (list.length === 1) {
          messages.successMessage(`${list.length} Quizz foi encontrada`);
        } else {
          messages.successMessage(`${list.length} Quizzs foram encontradas`);
        }

        this.setState({ quizzList: res.data });
      })
      .catch((erro) => {
        messages.erroMessage(erro.response.data);
      });
  }

  editQuizz = (id) => {
    //this.props.history.push(`/register-class/${id}`);
    console.log('Editar Questionario');
  };

  openQuizz = (id) => {
    //this.props.history.push(`/courseClass/${id}`);
    console.log('Abrir questionario');
  };

  registerQuizz = () => {
    console.log('Criar novo Questionario');
  };

  openConfirmation = (quizz) => {
    this.setState({ showConfirmDialog: true, deletedQuizz: quizz });
  };

  cancelDeleteQuizz = () => {
    this.setState({ showConfirmDialog: false, deletedQuizz: {} });
  };

  deleteQuizz = () => {
    this.service
      .deleteCourseClass(this.state.deletedQuizz.id)
      .then((res) => {
        const quizzList = this.state.quizzList;
        const index = quizzList.indexOf(this.state.deletedQuizz);
        quizzList.splice(index, 1);

        this.setState({
          quizzList: quizzList,
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
      <>
        <Card tittle="Turma">
          <div className="row">
            <div className="col-md-6">
              <FormGroup label="Nome">
                <input
                  type="text"
                  className="form-control"
                  disabled={true}
                  value={this.state.courseClass.name}
                />
              </FormGroup>
            </div>
            <div className="col-md-6">
              <FormGroup label="Código">
                <input
                  type="text"
                  className="form-control"
                  disabled={true}
                  value={this.state.courseClass.code}
                />
              </FormGroup>
            </div>
          </div>
          <h3>
            <center>Curso</center>
          </h3>
          <div className="row">
            <div className="col-md-2">
              <FormGroup label="Código">
                <input
                  type="text"
                  className="form-control"
                  disabled={true}
                  value={
                    this.state.courseClass.courseUnit
                      ? this.state.courseClass.courseUnit.code
                      : '-------'
                  }
                />
              </FormGroup>
            </div>
            <div className="col-md-8">
              <FormGroup label="Nome">
                <input
                  type="text"
                  className="form-control"
                  disabled={true}
                  value={
                    this.state.courseClass.courseUnit
                      ? this.state.courseClass.courseUnit.name
                      : '-------'
                  }
                />
              </FormGroup>
            </div>
          </div>
          <h3>
            <center>Professor</center>
          </h3>
          <div className="row">
            <div className="col-md-2">
              <FormGroup label="Matricula">
                <input
                  type="text"
                  className="form-control"
                  disabled={true}
                  value={
                    this.state.courseClass.teacher
                      ? this.state.courseClass.teacher.registration
                      : '-------'
                  }
                />
              </FormGroup>
            </div>
            <div className="col-md-8">
              <FormGroup label="Nome">
                <input
                  type="text"
                  className="form-control"
                  disabled={true}
                  value={
                    this.state.courseClass.teacher
                      ? this.state.courseClass.teacher.name
                      : '-------'
                  }
                />
              </FormGroup>
            </div>
          </div>
        </Card>
        <Card tittle="Questionarios">
          <div className="row">
            <div className="col-lg-12">
              <div className="bs-component">
                <button
                  id="buttonRegister"
                  type="button"
                  className="btn btn-warning"
                  onClick={this.registerQuizz}
                >
                  <i className="pi pi-plus" />
                </button>
                <QuizzTable
                  quizz={this.state.quizzList}
                  actionEdit={this.editQuizz}
                  actionOpen={this.openQuizz}
                  actionDelete={this.openConfirmation}
                ></QuizzTable>
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

CourseClass.contextType = AuthContext;

export default withRouter(CourseClass);
