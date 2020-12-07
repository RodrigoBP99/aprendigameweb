import React from 'react';

export default (props) => {
  const rows = props.quizz.map((quizz) => {
    return (
      <tr key={quizz.id}>
        <td>{quizz.code}</td>
        <td>{quizz.title}</td>
        <td>{quizz.amountOfQuestions}</td>
        <td>{quizz.value}</td>
        <td>
          <button
            type="button"
            className="btn btn-success"
            onClick={(e) => props.actionOpen(quizz.id)}
          >
            Abrir <i className="pi pi-check" />
          </button>
          {/* <button
            type="button"
            onClick={(e) => props.actionEdit(quizz.id)}
            className="btn btn-warning"
          >
            Editar <i className="pi pi-pencil" />
          </button> */}
          <button
            type="button"
            onClick={(e) => props.actionDelete(quizz)}
            className="btn btn-danger"
          >
            Deletar <i className="pi pi-trash" />
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
          <th scope="col">Título</th>
          <th scope="col">Nº Questões</th>
          <th scope="col">Valor</th>
          <th scope="col">Ações</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};
