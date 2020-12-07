import React from 'react';
import Card from '../../components/card';
import FormGroup from '../../components/form-group';
import { withRouter } from 'react-router-dom';
import QuizzService from '../../app/service/quizzService';
// import * as messages from '../../components/toastr';
import { AuthContext } from '../../main/authenticationProvider';
import LocalStorageService from '../../app/service/localstorageService';

class RegisterCourseUnit extends React.Component {
  state = {
    id: null,
    tittle: '',
    code: '',
    courseClassId: null,
    courseClassCode: '',
    update: false,
  };

  constructor() {
    super();
    this.service = new QuizzService();
  }

  async componentDidMount() {
    const courseClass = await LocalStorageService.getItem('courseClass');
    this.setState({
      courseClassId: courseClass.id,
      courseClassCode: courseClass.code,
    });

    const params = this.props.match.params;

    if (params.id) {
      console.log('Quizz Id: ', params.id);
    }
  }

  cancelRegister = (id) => {
    this.props.history.push(`/courseClass/${id}`);
  };

  saveQuizz = () => {
    const { tittle, code, courseClassId } = this.state;

    const quizz = {
      tittle,
      code,
      courseClassId,
    };

    console.log('Salvar: ', quizz);
    //salvar questões e respostas
  };

  updateQuizz = () => {
    const { tittle, code, id, courseClassId } = this.state;

    const courseClass = {
      tittle,
      code,
      id,
      courseClassId,
    };

    console.log('Atualizar: ', courseClass);
  };

  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({ [name]: value });
  };

  render() {
    return (
      <>
        <Card
          tittle={this.state.update ? 'Atualizar Quizz' : 'Cadastrar Quizz'}
        >
          <div className="row">
            <div className="col-md-12">
              <FormGroup htmlFor="inputTittle" label="Título do Quizz: *">
                <input
                  type="text"
                  name="tittle"
                  id="inputTittle"
                  value={this.state.tittle}
                  onChange={this.handleChange}
                  className="form-control"
                  placeholder="Título do Questionario"
                />
              </FormGroup>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <FormGroup htmlFor="inputCode" label="Código do Quizz: *">
                <input
                  type="text"
                  value={this.state.code}
                  onChange={this.handleChange}
                  name="code"
                  id="inputCode"
                  className="form-control"
                  placeholder="QZ00000"
                />
              </FormGroup>
            </div>
            <div className="col-md-6">
              <FormGroup
                htmlFor="inputCourseClassCode"
                label="Código da Turma: *"
              >
                <input
                  type="text"
                  value={this.state.courseClassCode}
                  onChange={this.handleChange}
                  disabled={true}
                  name="code"
                  id="inputCourseClassCode"
                  className="form-control"
                  placeholder="CU00000"
                />
              </FormGroup>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              {this.state.update ? (
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={this.updateQuizz}
                >
                  Atualizar <i className="pi pi-save" />
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={this.saveQuizz}
                >
                  Salvar <i className="pi pi-save" />
                </button>
              )}
              <button
                type="button"
                className="btn btn-danger"
                onClick={(e) => this.cancelRegister(this.state.courseClassId)}
              >
                Cancelar <i className="pi pi-times" />
              </button>
            </div>
          </div>
        </Card>
        <Card tittle="Questão 1">
          <div className="row">
            <div className="col-md-12">
              <input type="text" className="form-control" />
            </div>
          </div>
          <div className="col-md=12">
            <div className="col-md-12">
              <FormGroup>
                <input
                  type="radio"
                  for="answerOneQuestionOne"
                  name="correctAnswer"
                  value="CORRECT"
                />
                <input
                  type="text"
                  id="answerOneQuestionOne"
                  className="form-control"
                  placeholder="Resposta 1"
                />
              </FormGroup>
              <FormGroup>
                <input
                  type="radio"
                  for="answerTwoQuestionOne"
                  name="correctAnswer"
                  value="CORRECT"
                />
                <input
                  type="text"
                  id="answerTwoQuestionOne"
                  className="form-control"
                  placeholder="Resposta 1"
                />
              </FormGroup>
              <FormGroup>
                <input
                  type="radio"
                  for="answerThreeQuestionOne"
                  name="correctAnswer"
                  value="CORRECT"
                />
                <input
                  type="text"
                  id="answerThreeQuestionOne"
                  className="form-control"
                  placeholder="Resposta 1"
                />
              </FormGroup>
              <FormGroup>
                <input
                  type="radio"
                  for="answerFourQuestionOne"
                  name="correctAnswer"
                  value="CORRECT"
                />
                <input
                  type="text"
                  id="answerFourQuestionOne"
                  className="form-control"
                  placeholder="Resposta 1"
                />
              </FormGroup>
            </div>
          </div>
        </Card>
      </>
    );
  }
}

RegisterCourseUnit.contextType = AuthContext;

export default withRouter(RegisterCourseUnit);
