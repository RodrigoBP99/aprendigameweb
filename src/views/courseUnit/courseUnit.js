import React from 'react';
import { withRouter } from 'react-router-dom';
import Card from '../../components/card';
import CourseUnitService from '../../app/service/courseunitService';
import CourseClassService from '../../app/service/courseclassService';
import * as messages from '../../components/toastr';
import { AuthContext } from '../../main/authenticationProvider';
import FormGroup from '../../components/form-group';
import CourseUnitCourseClass from '../courseClass/courseUnitCourseClass';
import CourseUnitTeacher from '../teacher/courseUnitTeacher';

class CourseUnit extends React.Component {
  state = {
    courseUnit: {},
    showConfirmDialog: false,
    deletedCourseClass: {},
    courseClassList: [],
    teacherVisibility: false,
    courseClassVisibity: false,
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
          this.getCourseClass();
        })
        .catch((erro) => {
          messages.erroMessage(erro.response.data);
        });
    }
  }

  backButton = () => {
    this.props.history.push('/consult-course');
  };

  getCourseClass = () => {
    this.setState({
      teacherVisibility: false,
      courseClassVisibity: true,
    });
  };

  getTeachers = () => {
    this.setState({
      courseClassVisibity: false,
      teacherVisibility: true,
    });
  };

  render() {
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
            <div id="filterButtons" className="row">
              <button
                type="button"
                className="btn btn-info"
                onClick={this.getCourseClass}
              >
                Turmas <i class="pi pi-list" />
              </button>
              <button
                type="button"
                className="btn btn-info"
                onClick={this.getTeachers}
              >
                Professores <i class="pi pi-users" />
              </button>
            </div>
          </div>
        </Card>

        {this.state.courseClassVisibity === true ? (
          <CourseUnitCourseClass courseUnit={this.state.courseUnit} />
        ) : (
          ''
        )}
        {this.state.teacherVisibility === true ? (
          <CourseUnitTeacher courseUnit={this.state.courseUnit} />
        ) : (
          ''
        )}
      </>
    );
  }
}

CourseUnit.contextType = AuthContext;

export default withRouter(CourseUnit);
