import React, {Fragment, useState, useEffect} from 'react';
import Formulario from './components/Formulario/formulario';
import Cita from './components/Cita/cita';
// import PropTypes from 'prop-types';

function App() {
  //  Citas en Local Storage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales) {
    citasIniciales = [];
  }

  //  Arreglo de citas, toda la lógica la hacemos en "App.js" porque su contenedor ppal (one-half column) se ubica aquí mismo en la posición 2, lado derecho; aquí visualizamos el consolidado de todas las citas.
  const [citas, guardarCitas] = useState(citasIniciales);

  //  Use Effect (es un hook) para realizar ciertas operaciones cuando el state cambia
  useEffect(() => {
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));
    if(citasIniciales) {
      localStorage.setItem('citas', JSON.stringify(citas));
    } else {
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [citas]); // debemos pasarle un array vacio para poder hacer varias consultas.(api para "ciclar")

  //  Función que tome las citas actuales y agregue las nuevas
  const crearCita = (cita) => {
    guardarCitas([...citas, cita]);
  }

  //  Función que elimina una cita por su ID
  const eliminarCita = (id) => {
    const nuevasCitas = citas.filter(cita => cita.id !== id);
    guardarCitas(nuevasCitas);
  }

  //  Mensaje condicional
  const titulo = citas.length === 0 ? 'NO hay citas' : 'Administra tus citas';

  return (
    <Fragment>
      <h1>Administrador de Citas para Mascotas</h1>
      
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario
              crearCita =  {crearCita}
            />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map(cita => (
              <Cita
                key={cita.id}
                cita={cita}
                eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
// Formulario.propTypes = {
//   crearCita: PropTypes.func.isRequired
// }

export default App;
