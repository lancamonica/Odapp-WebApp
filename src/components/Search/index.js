import React from "react";
import "./style.css";

function Search({ text, onClickSearch, onChangeSearchText }) {
  return (
    <div className="search">
      <input
        onChange={onChangeSearchText}
        className="search-input"
        placeholder="Digite um nome"
        value={text}
      />
      <button onClick={onClickSearch} className="button-search">
        Buscar
      </button>
    </div>
  );
}

export default Search;
