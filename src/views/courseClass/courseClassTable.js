import React from 'react';

export var show = false;

export default (props) => {
  const rows = props.courseClass.map((courseClass) => {
    return (
      <tr key={courseClass.id}>
        <td>{props.courseClass.indexOf(courseClass) + 1}</td>
        <td>{courseClass.code}</td>
        <td>{courseClass.name}</td>
        <td>
          {courseClass.courseUnit === null
            ? '-------'
            : courseClass.courseUnit.name}
          <br />
          {courseClass.courseUnit === null ? '' : courseClass.courseUnit.code}
        </td>
        <td>
          {courseClass.teacher === null ? '-------' : courseClass.teacher.name}
          <br />
          {courseClass.teacher === null ? '' : courseClass.teacher.registration}
        </td>
        <td>
          {props.teacherLoged.id === courseClass.teacher.id
            ? (show = false)
            : (show = true)}
          <button
            type="button"
            disabled={show}
            className="btn btn-success"
            onClick={(e) => props.actionOpen(courseClass.id)}
          >
            Abrir <i className="pi pi-check" />
          </button>

          <button
            type="button"
            disabled={show}
            onClick={(e) => props.actionEdit(courseClass.id)}
            className="btn btn-warning"
          >
            Editar <i className="pi pi-pencil" />
          </button>

          <button
            type="button"
            disabled={show}
            className="btn btn-danger"
            onClick={(e) => props.actionDelete(courseClass)}
          >
            <i className="pi pi-trash" />
          </button>
        </td>
      </tr>
    );
  });
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">Nº</th>
          <th scope="col">Código</th>
          <th scope="col">Nome</th>
          <th scope="col">Curso</th>
          <th scope="col">Professor</th>
          <th scope="col">Ações</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};
