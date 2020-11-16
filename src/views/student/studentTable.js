import React from 'react';

export default (props) => {
  const rows = props.student.map((student) => {
    return (
      <tr key={student.id}>
        <td>{props.student.indexOf(student) + 1}</td>
        <td>{student.registration}</td>
        <td>{student.name}</td>
        <td> {student.schoolName} </td>
        <td>
          {student.courseUnit.code} <br /> {student.courseUnit.name}
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
          <th scope="col">Instituição</th>
          <th scope="col">Curso</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};
