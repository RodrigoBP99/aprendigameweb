import React from 'react';

export default (props) => {
  const rows = props.quizz.map((quizz) => {
    return (
      <tr key={quizz.id}>
        <td>{quizz.code}</td>
        <td>{quizz.tittle}</td>
        <td>
          <button
            type="button"
            className="btn btn-success"
            onClick={(e) => props.actionOpen(quizz.id)}
          >
            Abrir <i className="pi pi-check" />
          </button>
          <button
            type="button"
            onClick={(e) => props.actionEdit(quizz.id)}
            className="btn btn-warning"
          >
            Editar <i className="pi pi-pencil" />
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
          <th scope="col">Titulo</th>
          <th scope="col">Ações</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};
