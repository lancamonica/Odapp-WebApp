import React, { useState, useEffect } from "react";

function PatientsForm({ onSubmitForm, edit, editPatient }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [id, setId] = useState(0);

  async function handleSubmit(e) {
    e.preventDefault();
    if (name === "" || age === "" || city === "" || state === "") {
      alert("Por favor preencha todos os campos");
    } else {
      await onSubmitForm({
        name,
        age,
        city,
        state,
        id
      });
      setName("");
      setAge("");
      setCity("");
      setState("");
    }
  }

  useEffect(() => {
    patientEdit(editPatient);
  }, [edit]);

  function patientEdit(patient) {
    if (patient !== undefined) {
      setName(patient.name);
      setAge(patient.age);
      setCity(patient.city);
      setState(patient.state);
      setId(patient._id);
    }
  }

  return (
    <div>
      <strong>{edit ? "Editar Paciente" : "Novo Paciente"}</strong>
      <form>
        <div className="input-block">
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            name="name"
            id="name"
            required
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div className="input-block">
          <label htmlFor="age">Idade</label>
          <input
            type="number"
            name="age"
            id="age"
            required
            value={age}
            onChange={e => setAge(e.target.value)}
          />
        </div>

        <div className="input-block">
          <label htmlFor="city">Cidade</label>
          <input
            type="text"
            name="city"
            id="city"
            required
            value={city}
            onChange={e => setCity(e.target.value)}
          />
        </div>

        <div className="input-block">
          <label htmlFor="state">Estado</label>
          <input
            type="text"
            name="state"
            id="state"
            required
            value={state}
            onChange={e => setState(e.target.value)}
          />
        </div>

        <button onClick={handleSubmit}>
          {edit ? "Atualizar" : "Cadastrar"}
        </button>
      </form>
    </div>
  );
}

export default PatientsForm;
