import { useEffect, useState } from 'react';
import './App.css';

function ContadorGame() {
  const [puntos, setPuntos] = useState(0);
  const [record, setRecord] = useState(0);
  const [activo, setActivo] = useState(false);
  const [inicio, setInicio] = useState(-1);
  const [segundos, setSegundos] = useState(5);

  useEffect(() => {
    let temporizador: NodeJS.Timer;
    if (!activo && inicio > 0) {
      temporizador = setInterval(() => {
        setInicio(prevInicio => prevInicio - 1);
      }, 1000);
    } else if (inicio === 0 && !activo) {
      setActivo(true);
      setSegundos(5);
    }
    return () => clearInterval(temporizador);
  }, [inicio, activo]);

  useEffect(() => {
    let temporizador: NodeJS.Timer;
    if (activo && segundos > 0) {
      temporizador = setInterval(() => {
        setSegundos(prevSegundos => prevSegundos - 1);
      }, 1000);
    } else if (segundos === 0) {
      if (record < puntos) {
        setRecord(puntos);
      }
      setActivo(false);
    }
    return () => clearInterval(temporizador);
  }, [segundos, activo]);

  function iniciarJuego() {
    setPuntos(0);
    setInicio(3);
  }

  return (
    <div>
      <h1>Desafío de Clicks</h1>
      <h2>Récord: {record}</h2>
      <h3>Puntos: {puntos}</h3>
      <button onClick={iniciarJuego}>Iniciar</button>
      <button 
        onClick={() => setPuntos(puntos + 1)} 
        disabled={!activo}
      >
        ¡Haz click!
      </button>
      {
        !activo && inicio > 0 && <p>Comienza en: {inicio}</p>
      }
      <p>Tiempo restante: {segundos} segundos</p>
    </div>
  );
}

export default ContadorGame;
