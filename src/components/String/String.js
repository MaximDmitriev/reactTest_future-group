import React from 'react';

const StringLine = ({id, firstName, lastName, email, phone, onShowItems}) => {

  return (
    <tr onClick={onShowItems}>
      <td>{id}</td>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{email}</td>
      <td>{phone}</td>
    </tr>
  )
}

export default StringLine;