import React, { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import './style.css';
import { FiMapPin } from 'react-icons/fi';

import api from './services/api';

function App() {
  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function handlesearch() {
    if (input === '') {
      alert('Preencha algum cep');
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput('');
    } catch {
      alert('Erro ao buscar cep');
      setInput('');
    }
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      handlesearch();
    }
  }

  return (
    <div className="container">
      <h1 className="title">
        Buscador Cep
        <FiMapPin color="rgb(188, 0, 8)" style={{ transform: 'rotate(40deg)' }} />
      </h1>

      <div className="container-input">
        <input
          type="search"
          placeholder="Digite seu CEP..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress} // Adiciona o evento onKeyPress
          required
        />

        <button className="button-search" onClick={handlesearch}>
          <BsSearch size={25} color="white" />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>

          <span>{cep.logradouro}</span>
          {Object.keys(cep.complemento).length > 0 && <span>Complemento: {cep.complemento}</span>}
          <span>
            {cep.localidade} - {cep.uf}
          </span>
        </main>
      )}
    </div>
  );
}

export default App;
