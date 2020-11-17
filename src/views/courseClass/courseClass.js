import React from 'react';
import { withRouter } from 'react-router-dom';
import Card from '../../components/card';
import CourseClassService from '../../app/service/courseclassService';
import * as messages from '../../components/toastr';
import { AuthContext } from '../../main/authenticationProvider';
import FormGroup from '../../components/form-group';
import CourseClassQuizz from '../quizz/courseClassQuizz';
import CourseClassPresencs from '../presencs/courseClassPresencs';
import CourseClassStudent from '../student/courseClassStudent';

class CourseClass extends React.Component {
  state = {
    courseClass: {},
    showConfirmDialog: false,
    deletedQuizz: {},
    quizzList: [],
    studentVivibility: false,
    presencsVivibility: false,
    quizzVivibility: false,
  };

  constructor() {
    super();
    this.service = new CourseClassService();
  }

  async componentDidMount() {
    const params = this.props.match.params;
    if (params.id) {
      await this.service
        .getById(params.id)
        .then((res) => {
          this.setState({ courseClass: res.data });
          this.getQuizz();
        })
        .catch((erro) => {
          messages.erroMessage(erro.response.data);
        });
    }
  }

  backButton = () => {
    this.props.history.push('/consult-classes');
  };

  getQuizz = () => {
    this.setState({
      presencsVivibility: false,
      studentVivibility: false,
      quizzVivibility: true,
    });
  };

  getStudents = () => {
    this.setState({
      quizzVivibility: false,
      presencsVivibility: false,
      studentVivibility: true,
    });
  };

  getPresencs = () => {
    this.setState({
      quizzVivibility: false,
      studentVivibility: false,
      presencsVivibility: true,
    });
  };

  render() {
    return (
      <>
        <Card tittle="Turma">
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
            <div id="filterButtons" className="row">
              <button
                type="button"
                className="btn btn-info"
                onClick={this.getQuizz}
              >
                Questionarios <i class="pi pi-list" />
              </button>
              <button
                type="button"
                className="btn btn-info"
                onClick={this.getStudents}
              >
                Alunos <i class="pi pi-users" />
              </button>
              <button
                type="button"
                className="btn btn-info"
                onClick={this.getPresencs}
              >
                Presenças <i class="pi pi-calendar" />
              </button>
            </div>
          </div>
        </Card>
        {this.state.quizzVivibility === true ? (
          <CourseClassQuizz courseClass={this.state.courseClass} />
        ) : (
          ''
        )}

        {this.state.presencsVivibility === true ? (
          <CourseClassPresencs courseClass={this.state.courseClass} />
        ) : (
          ''
        )}

        {this.state.studentVivibility === true ? (
          <CourseClassStudent courseClass={this.state.courseClass} />
        ) : (
          ''
        )}
      </>
    );
  }
}

CourseClass.contextType = AuthContext;

export default withRouter(CourseClass);
