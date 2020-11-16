import React from 'react';
import { withRouter } from 'react-router-dom';
import Card from '../../components/card';
import * as messages from '../../components/toastr';
import { AuthContext } from '../../main/authenticationProvider';
import PresencService from '../../app/service/presencService';
import PresencTable from './presencTable';

class CourseClassPresenc extends React.Component {
  state = {
    presencList: [],
  };

  constructor() {
    super();
    this.service = new PresencService();
  }

  componentDidMount() {
    const courseClass = this.props.courseClass;

    const presencFilter = {
      courseClassId: courseClass.id,
    };

    this.service
      .search(presencFilter)
      .then((res) => {
        this.setState({ presencList: res.data });
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
                <PresencTable presenc={this.state.presencList}></PresencTable>
              </div>
            </div>
          </div>
        </Card>
      </>
    );
  }
}

CourseClassPresenc.contextType = AuthContext;

export default withRouter(CourseClassPresenc);
