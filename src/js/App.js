import React, { useEffect, useState, } from 'react';

import '../css/styles.css';
import api from './api';

function App() {

  const [temperatura, setTemp] = useState([]);
  const [tempMin, setTempMin] = useState([]);
  const [tempMax, setTempMax] = useState([]);
  const [tempMed, setTempMed] = useState([]);
  let dia = new Date().getDate();
  let mes = new Date().getMonth() + 1;
  const ano = new Date().getFullYear();
  if (dia < 10) dia = '0' + dia;
  if (mes < 10) mes = '0' + mes;
  const hoje = dia + '.' + mes + '.' + ano;


  useEffect(() => {
    api.get('/now').then(response => {
      setTemp(response.data);
    })
  }, []);

  useEffect(() => {
    api.get('/min').then(response => {
      setTempMin(response.data);
    })
  }, []);

  useEffect(() => {
    api.get('/max').then(response => {
      setTempMax(response.data);

    })
  }, []);

  useEffect(() => {
    api.get(`/med/${hoje}`).then(response => {
      setTempMed(response.data);
    })
  }, []);

  function acertaTemp(temp) {
    temp = temp.replace('}', '.');
    temp = temp.replace(']', '0');
    return temp;
  }
  return (
    <div>
      <div className="container">
        <h1>WebTemp </h1>
        {
          temperatura.map(temp => (
            <div key={temp.id} className="cols12">
              <span >Temperatura Atual</span>
              <div className="card-image center">
                <span className="minTemp" >{temp.temp}ºC</span>
              </div>
              <span className="minTempHora"  >Ultima atualização {temp.data} às {temp.hora}</span>
            </div>
          ))}
        <section className="container grid grid-template-columns-3">
          {
            tempMin.map(temp => (
              <div key={temp.id} className="colm4" >
                <span >Temperatura Mínima </span>
                <div >
                  <span className="minTemp" >{temp.temp}ºC</span>
                </div>
                <span className="minTempHora" >Em {temp.data} às {temp.hora}</span>
              </div>
            ))}
          {
            tempMed.map(temp => (
              <div key={1} className="colm4">
                <span >Temperatura Média</span>
                <div >
                  <span className="minTemp">{acertaTemp(temp.temp)}ºC</span>
                </div>
                <span className="minTempHora"  >Média do dia {hoje}</span>
              </div>
            ))}

          {
            tempMax.map(temp => (
              <div key={temp.id} className="colm4">
                <span > Temperatura Máxima</span>
                <div >
                  <span className="minTemp" >{temp.temp}ºC</span>
                </div>
                <span className="minTempHora">Em {temp.data} às {temp.hora}</span>
              </div>
            ))
          }
        </section>
      </div>
    </div>
  );
}

export default App;
