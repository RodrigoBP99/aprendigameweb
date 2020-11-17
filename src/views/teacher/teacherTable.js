import React from 'react';

export var show = false;

export default (props) => {
  const rows = props.teacher.map((teacher) => {
    return (
      <tr key={teacher.id}>
        <td>{props.teacher.indexOf(teacher) + 1}</td>
        <td>{teacher.registration}</td>
        <td>{teacher.name}</td>
        <td>
          {/* <button
            type="button"
            onClick={(e) => props.actionEdit(teacher.id)}
            className="btn btn-warning"
          >
            Editar <i className="pi pi-pencil" />
          </button> */}
          {teacher.id === props.teacherLoged.id
            ? (show = false)
            : (show = true)}
          <button
            type="button"
            hidden={show}
            onClick={(e) => props.actionDelete(teacher)}
            className="btn btn-danger"
          >
            Sair <i class="pi pi-user-minus" />
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
          <th scope="col">Matricula</th>
          <th scope="col">Nome</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};
