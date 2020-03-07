import React, { useState, useEffect } from "react";
import api from "./services/api";
import PatientsItem from "../src/components/PatientsItem";
import PatientsForm from "../src/components/PatientsForm";
import "./global.css";
import "./App.css";
import "./Sidebar.css";
import "./Main.css";
import Header from "../src/components/Header";
import Search from "./components/Search";

function App() {
  const [patients, setPatients] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [clearSearch, setClearSearch] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editPatient, setEditPatient] = useState({
    name: "",
    age: "",
    city: "",
    state: "",
    _id: null
  });

  async function loadPatients() {
    const response = await api.get("/patients");
    setPatients(response.data);
  }

  useEffect(() => {
    loadPatients();
  }, []);

  async function handleAddPatients(data) {
    await api.post("/patients", data);
    setClearSearch(false);
    setSearchText("");
    await loadPatients();
  }

  async function handleDeletePatient(patientId) {
    await api.delete(`/patient/${patientId}`);
    await loadPatients();
    alert("Paciente excluido com sucesso");
    setClearSearch(false);
    setSearchText("");
  }

  async function onClickUpdatePatient(patient) {
    setEdit(true);
    setEditPatient(patient);
  }

  async function handleUpdatePatient(patient) {
    await api.put(`/patient/${patient.id}`, {
      name: patient.name,
      age: patient.age,
      city: patient.city,
      state: patient.state
    });
    alert("Paciente atualizado com sucesso!.");

    await loadPatients();
    setEdit(false);
    setClearSearch(false);
    setSearchText("");
    setEditPatient({
      name: "",
      age: "",
      city: "",
      state: "",
      _id: null
    });
  }

  async function searchName() {
    if (searchText !== "") {
      const patient = patients.find(
        patient =>
          patient.name.toLowerCase() === searchText.toLowerCase().trim()
      );
      if (patient === undefined) {
        alert("Paciente não encontrado.");
        setSearchText("");
      } else {
        setPatients([patient]);
        setClearSearch(true);
      }
    }
  }

  async function loadList() {
    if (clearSearch && searchText === "") {
      await loadPatients();
      setClearSearch(false);
    }
  }

  return (
    <div id="app">
      <div className="header">
        <Header text="Odapp Challenge" />
      </div>
      <aside>
        <PatientsForm
          onSubmitForm={edit ? handleUpdatePatient : handleAddPatients}
          edit={edit}
          editPatient={editPatient}
        />
      </aside>
      <main>
        <Search
          text={searchText}
          onChangeSearchText={e => setSearchText(e.target.value)}
          onClickSearch={clearSearch ? loadList : searchName}
        />
        <ul>
          {patients.map(patient => (
            <PatientsItem
              key={patient._id}
              patient={patient}
              onClickDelete={() => handleDeletePatient(patient._id)}
              onClickUpdate={() => onClickUpdatePatient(patient)}
            />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
