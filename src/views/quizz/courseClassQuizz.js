import React from 'react';
import { withRouter } from 'react-router-dom';
import Card from '../../components/card';
import * as messages from '../../components/toastr';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { AuthContext } from '../../main/authenticationProvider';
import QuizzService from '../../app/service/quizzService';
import QuizzTable from './quizzTable';
import LocalStorageService from '../../app/service/localstorageService';

class CourseClassQuizz extends React.Component {
  state = {
    showConfirmDialog: false,
    deletedQuizz: {},
    quizzList: [],
  };

  constructor() {
    super();
    this.quizzService = new QuizzService();
  }

  async componentDidMount() {
    const courseClass = this.props.courseClass;

    const quizzFilter = {
      courseClassId: courseClass.id,
    };

    this.quizzService
      .search(quizzFilter)
      .then((res) => {
        this.setState({ quizzList: res.data });
      })
      .catch((erro) => {
        messages.erroMessage(erro.response.data);
      });
  }

  editQuizz = (id) => {
    //this.props.history.push(`/register-class/${id}`);
    console.log(id);
  };

  openQuizz = (id) => {
    //this.props.history.push(`/courseClass/${id}`);
    console.log('Abrir questionario');
  };

  registerQuizz = () => {
    const courseClass = this.props.courseClass;
    LocalStorageService.addItem('courseClass', courseClass);
    this.props.history.push(`/register-quizz`);
  };

  openConfirmation = (quizz) => {
    this.setState({ showConfirmDialog: true, deletedQuizz: quizz });
    console.log('Quizz: ', quizz);
  };

  cancelDeleteQuizz = () => {
    this.setState({ showConfirmDialog: false, deletedQuizz: {} });
  };

  delete = () => {
    this.quizzService
      .deleteQuizz(this.state.deletedQuizz.id)
      .then((res) => {
        const quizzList = this.state.quizzList;
        const index = quizzList.indexOf(this.state.deletedQuizz);
        quizzList.splice(index, 1);

        this.setState({
          quizzList: quizzList,
          showConfirmDialog: false,
        });

        messages.successMessage('Quizz apagado com sucesso!');
      })
      .catch((erro) => {
        messages.erroMessage('Erro ao apagar o Quizz');
      });
  };

  render() {
    const footerDialog = (
      <div>
        <Button label="Confirmar" icon="pi pi-check" onClick={this.delete} />
        <Button
          label="Cancelar"
          icon="pi pi-times"
          onClick={this.cancelDeleteQuizz}
          className="p-button-secondary"
        />
      </div>
    );

    return (
      <>
        <Card tittle="Questionarios">
          <div className="row">
            <div className="col-lg-12">
              <div className="bs-component">
                <button
                  id="buttonRegister"
                  type="button"
                  className="btn btn-warning"
                  onClick={(e) => this.registerQuizz(this.state.courseClass)}
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

CourseClassQuizz.contextType = AuthContext;

export default withRouter(CourseClassQuizz);
