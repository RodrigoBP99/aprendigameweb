import React from 'react';
import { withRouter } from 'react-router-dom';
import Card from '../../components/card';
import * as messages from '../../components/toastr';
import { AuthContext } from '../../main/authenticationProvider';
import StudentService from '../../app/service/studentService';
import StudentTable from './studentTable';

class CourseClassStudent extends React.Component {
  state = {
    studentList: [],
  };

  constructor() {
    super();
    this.service = new StudentService();
  }

  componentDidMount() {
    const courseClass = this.props.courseClass;

    const studentFilter = {
      courseClassId: courseClass.id,
    };

    this.service
      .search(studentFilter)
      .then((res) => {
        this.setState({ studentList: res.data });
      })
      .catch((erro) => {
        messages.erroMessage(erro.response.data);
      });
  }

  render() {
    return (
      <>
        <Card tittle="Questionarios">
          <div className="row">
            <div className="col-lg-12">
              <div className="bs-component">
                <StudentTable student={this.state.studentList} />
              </div>
            </div>
          </div>
        </Card>
      </>
    );
  }
}

CourseClassStudent.contextType = AuthContext;

export default withRouter(CourseClassStudent);
