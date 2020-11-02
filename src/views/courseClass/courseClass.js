import React from 'react';
import { withRouter } from 'react-router-dom';
import Card from '../../components/card';
import CourseClassService from '../../app/service/courseclassService';
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
    courseClassList: [],
    quizzList: {},
  };

  constructor() {
    super();
    this.service = new CourseClassService();
  }

  componentDidMount() {
    const params = this.props.match.params;
    if (params.id) {
      this.service
        .getById(params.id)
        .then((res) => {
          this.setState({ courseClass: res.data, update: true });
          console.log(this.state.courseClass);
        })
        .catch((erro) => {
          messages.erroMessage(erro.response.data);
        });
    }
  }

  editQuizz = (id) => {
    //this.props.history.push(`/register-class/${id}`);
    console.log('Editar Questionario');
  };

  openQuizz = (id) => {
    //this.props.history.push(`/courseClass/${id}`);
    console.log('Abrir questionario');
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
        const courseClassList = this.state.courseClassList;
        const index = courseClassList.indexOf(this.state.deletedQuizz);
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
          <div className="row">
            <div className="col-lg-12">
              <div className="bs-component">
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
