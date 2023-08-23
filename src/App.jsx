import React, { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import './style.css';
import { FiMapPin } from 'react-icons/fi';
import api from './services/api';
import {fireStore} from './firebase';
import { addDoc, collection, getDocs, onSnapshot, query } from 'firebase/firestore';
import { useEffect } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});
  const [ceps, setCeps] = useState([]);

  useEffect(()=>{
    getdb();
  },[])

  async function addCep(data){ 
    data.cep = data.cep.replace('-','');
    const ref = collection(fireStore,'Cep');
    console.log(data);
    await addDoc(ref, data).then(() => {
      console.log("Deu certo");
    })
  }


  async function handlesearch() {
    if (input === '') {
      alert('Preencha algum cep');
      return;
    }
    const index = ceps.findIndex((val) => 
      val.cep === input
    );
    if(index === -1){
      try {
        const response = await api.get(`${input}/json`);
        addCep(response.data);
        setCep(response.data);
        setInput('');
      } catch {
        alert('Erro ao buscar cep');
        setInput('');
      }
    }
    else{
      //console.log('Achou');
      setCep(ceps[index])
    }
    
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      handlesearch();
    }
  }


  async function getdb(){
    let lista = [];
    const ref = query(collection(fireStore,'Cep'));
    const querySnapshot = onSnapshot(collection(fireStore,'Cep'), async () => {
      const snapshot = await getDocs(ref);
      snapshot.forEach(doc => {
      lista.push(doc.data())
      });
      setCeps(lista);
      lista.map((val, i) => {
        console.log(val.complemento);
      })
    });
    
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
          onKeyPress={handleKeyPress} // Adiciona o evento enter
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
