import React from 'react';

export default (props) => {
  const rows = props.courseClass.map((courseClass) => {
    return (
      <tr key={courseClass.id}>
        <td>{courseClass.code}</td>
        <td>{courseClass.name}</td>
        <td>{courseClass.courseUnit.name}</td>
        <td>{courseClass.teacher.name}</td>
        <td></td>
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
