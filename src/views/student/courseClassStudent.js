import React from 'react';
import { withRouter } from 'react-router-dom';
import Card from '../../components/card';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import * as messages from '../../components/toastr';
import { AuthContext } from '../../main/authenticationProvider';
import CourseClassService from '../../app/service/courseclassService';
import StudentTable from './studentTable';

class CourseClassStudent extends React.Component {
  state = {
    studentList: [],
    courseClass: {},
    showAddConfirmDialog: false,
    includeStudentRegistration: '',
    showDeleteConfirmDialog: false,
    deletedStudent: {},
  };

  constructor() {
    super();
    this.courseClassService = new CourseClassService();
  }

  componentDidMount() {
    const courseClass = this.props.courseClass;
    this.setState({
      courseClass: courseClass,
      studentList: courseClass.students,
    });
  }

  openDeleteConfirmation = (student) => {
    this.setState({ showDeleteConfirmDialog: true });
    this.setState({ deletedStudent: student });
  };

  cancelDeleteStudent = () => {
    this.setState({ showDeleteConfirmDialog: false, deletedStudent: {} });
  };

  deleteStudent = () => {
    this.courseClassService
      .removeStudent(this.state.courseClass, this.state.deletedStudent)
      .then((res) => {
        const studentList = this.state.studentList;
        const index = studentList.indexOf(this.state.deletedStudent);
        studentList.splice(index, 1);

        this.setState({
          studentList: studentList,
          showDeleteConfirmDialog: false,
        });

        messages.successMessage('Estudante foi tirado da turma com sucesso!');
      })
      .catch((erro) => {
        messages.erroMessage(erro.response.data);
      });
  };

  openConfirmationAdd = () => {
    this.setState({ showAddConfirmDialog: true });
  };

  cancelAddStudent = () => {
    this.setState({
      showAddConfirmDialog: false,
      includeStudentRegistration: '',
    });
  };

  registerStudent = () => {
    const courseClass = this.state.courseClass;
    const studentRegistration = this.state.includeStudentRegistration;

    this.courseClassService
      .includeStudent(courseClass, studentRegistration)
      .then((res) => {
        const studentList = this.state.studentList;
        studentList.push(res.data);

        this.setState({
          studentList: studentList,
          includeStudentRegistration: '',
        });

        messages.successMessage('Aluno incluido com sucesso!');
      })
      .catch((erro) => {
        messages.erroMessage(erro.response.data);
      });
  };

  render() {
    const footerDialogDelete = (
      <div>
        <Button
          label="Confirmar"
          icon="pi pi-check"
          onClick={this.deleteStudent}
        />
        <Button
          label="Cancelar"
          icon="pi pi-times"
          onClick={this.cancelDeleteStudent}
          className="p-button-secondary"
        />
      </div>
    );

    const footerDialogAdd = (
      <div>
        <Button
          label="Confirmar"
          icon="pi pi-check"
          onClick={this.registerStudent}
        />
        <Button
          label="Cancelar"
          icon="pi pi-times"
          onClick={this.cancelAddStudent}
          className="p-button-secondary"
        />
      </div>
    );
    return (
      <>
        <Card tittle="Alunos">
          <div className="row">
            <div className="col-lg-12">
              <div className="bs-component">
                <button
                  id="buttonRegister"
                  type="button"
                  className="btn btn-warning"
                  onClick={this.openConfirmationAdd}
                >
                  <i className="pi pi-plus" />
                </button>
                <StudentTable
                  student={this.state.studentList}
                  actionDelete={this.openDeleteConfirmation}
                />
              </div>
            </div>
            <Dialog
              header="Adicionar Aluno"
              visible={this.state.showAddConfirmDialog}
              style={{ width: '50vw' }}
              modal={true}
              onHide={() => this.setState({ showAddConfirmDialog: false })}
              footer={footerDialogAdd}
            >
              <h4>Digite a matrícula do Aluno que deseja incluir</h4>
              <input
                type="text"
                placeholder="ST0000"
                className="form-control"
                value={this.state.includeStudentRegistration}
                onChange={(e) =>
                  this.setState({ includeStudentRegistration: e.target.value })
                }
              />
            </Dialog>

            <Dialog
              header="Adicionar Aluno"
              visible={this.state.showDeleteConfirmDialog}
              style={{ width: '50vw' }}
              modal={true}
              onHide={() =>
                this.setState({
                  showAddConfirmDialog: false,
                  includeStudentRegistration: '',
                })
              }
              footer={footerDialogDelete}
            >
              <h4>Tem certeza que dejeza retirar o aluno da Turma?</h4>
            </Dialog>
          </div>
        </Card>
      </>
    );
  }
}

CourseClassStudent.contextType = AuthContext;

export default withRouter(CourseClassStudent);
