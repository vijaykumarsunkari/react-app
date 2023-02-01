import React from "react";

export default function Row(props) {
  function handleDelete() {
    props.onDelete(props.id);
  }
  function handleEdit() {
    props.onEdit(props.id);
  }
  return (
    <tr>
      <td>{props.id}</td>
      <td>{props.name}</td>
      <td>{props.age}</td>
      <td>
        <button onClick={handleEdit}>Edit</button>
      </td>
      <td>
        <button onClick={handleDelete}>Delete</button>
      </td>
    </tr>
  );
}
