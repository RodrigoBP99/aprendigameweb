import React from 'react';

export default (props) => {
  const rows = props.presenc.map((presenc) => {
    return (
      <tr key={presenc.id}>
        <td>{props.presenc.indexOf(presenc) + 1}</td>
        <td>{presenc.code}</td>
        <td>
          {presenc.courseClass.code} <br /> {presenc.courseClass.name}
        </td>
        <td> {presenc.date} </td>
        <td> {presenc.hour} </td>
        <td>
          {presenc.student.registration} <br /> {presenc.student.name}
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
          <th scope="col">Turma</th>
          <th scope="col">Data</th>
          <th scope="col">Hora</th>
          <th scope="col">Aluno</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};
