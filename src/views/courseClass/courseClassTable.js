import React from 'react';

export default (props) => {
  const rows = props.courseClass.map((courseClass) => {
    return (
      <tr key={courseClass.id}>
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
          <button
            type="button"
            onClick={(e) => props.actionEdit(courseClass.id)}
            className="btn btn-success"
          >
            Editar
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={(e) => props.actionOpen(courseClass.id)}
          >
            Abrir
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={(e) => props.actionDelete(courseClass)}
          >
            Deletar
          </button>
        </td>
      </tr>
    );
  });
  return (
    <table className="table table-hover">
      <thead>
        <tr>
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
