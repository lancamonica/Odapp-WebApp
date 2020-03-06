import React from "react";
import "./style.css";

function PatientsItem({ patient, onClickDelete, onClickUpdate }) {
  return (
    <li className="patient-item">
      <div className="user-info">
        <span>Nome: {patient.name}</span> <br />
        <span>Idade: {patient.age}</span> <br />
        <span>Cidade: {patient.city}</span> <br />
        <span>Estado: {patient.state}</span> <br />
        <div className="button">
          <button className="button-item" onClick={onClickUpdate}>
            Editar
          </button>
          <button className="button-item" onClick={onClickDelete}>
            Excluir
          </button>
        </div>
      </div>
    </li>
  );
}

export default PatientsItem;
