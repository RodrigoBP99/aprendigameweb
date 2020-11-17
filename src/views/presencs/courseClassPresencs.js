import React from 'react';
import { withRouter } from 'react-router-dom';
import Card from '../../components/card';
import * as messages from '../../components/toastr';
import { AuthContext } from '../../main/authenticationProvider';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import PresencService from '../../app/service/presencService';
import PresencTable from './presencTable';

class CourseClassPresenc extends React.Component {
  state = {
    presencList: [],
    showConfirmDeleteDialog: false,
    deletedPresenc: {},
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

  openDeleteConfirmation = (presenc) => {
    this.setState({ showConfirmDeleteDialog: true, deletedPresenc: presenc });
  };

  cancelDeletePresenc = () => {
    this.setState({ showConfirmDeleteDialog: false, deletedPresenc: {} });
  };

  deletePresenc = () => {
    this.service
      .deletePresenc(this.state.deletedPresenc.id)
      .then((res) => {
        const presencList = this.state.presencList;
        const index = presencList.indexOf(this.state.deletedPresenc);
        presencList.splice(index, 1);

        this.setState({
          presencList: presencList,
          showConfirmDeleteDialog: false,
        });

        messages.successMessage('Presença apagada com sucesso!');
      })
      .catch((erro) => {
        messages.erroMessage(erro.response.data);
      });
  };

  render() {
    const footerDialog = (
      <div>
        <Button
          label="Confirmar"
          icon="pi pi-check"
          onClick={this.deletePresenc}
        />
        <Button
          label="Cancelar"
          icon="pi pi-times"
          onClick={this.cancelDeletePresenc}
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
                <PresencTable
                  presenc={this.state.presencList}
                  actionDelete={this.openDeleteConfirmation}
                ></PresencTable>
              </div>
            </div>
            <Dialog
              header="Confirmação"
              visible={this.state.showConfirmDeleteDialog}
              style={{ width: '50vw' }}
              modal={true}
              onHide={() => this.setState({ showConfirmDeleteDialog: false })}
              footer={footerDialog}
            >
              Você deseja mesmo deletar essa Presença?
            </Dialog>
          </div>
        </Card>
      </>
    );
  }
}

CourseClassPresenc.contextType = AuthContext;

export default withRouter(CourseClassPresenc);
