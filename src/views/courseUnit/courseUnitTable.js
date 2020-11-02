import React from 'react';

export default (props) => {
  const rows = props.courseUnit.map((courseUnit) => {
    return (
      <tr key={courseUnit.id}>
        <td>{courseUnit.code}</td>
        <td>{courseUnit.name}</td>
        <td>
          <button
            type="button"
            className="btn btn-success"
            onClick={(e) => props.actionOpen(courseUnit.id)}
          >
            Abrir <i className="pi pi-check" />
          </button>
          <button
            type="button"
            onClick={(e) => props.actionEdit(courseUnit.id)}
            className="btn btn-warning"
          >
            Editar <i className="pi pi-pencil" />
          </button>
          {/* <button
            type="button"
            className="btn btn-danger"
            onClick={(e) => props.actionDelete(courseUnit)}
          >
            <i className="pi pi-trash" />
          </button> */}
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
          <th scope="col">Ações</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};
