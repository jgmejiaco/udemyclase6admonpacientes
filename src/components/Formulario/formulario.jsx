import React, {Fragment, useState} from 'react'
import uuid from 'uuid/dist/v4';
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {
    //  Crear el State de Citas
    //  cita: nombre del STATE (objeto)
    //  actualizarCita: es una función que midifca el state
    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    });

    //  Crear el State de validación
    //  error: nombre del STATE
    //  actualizarError: es una función que midifca el state
    const [error, actualizarError] = useState(false); // Inicia como "false" por no se ha ingresado ningún dato.


    //  Función que se ejecuta, cada que el usuario escribe en un input
    const actualizarState = (e) => {
        actualizarCita({
             // se copia el valor para tomar los valores de cada uno de los inputs, de no hacerlo, una entrada, reescribe la anterior
            ...cita,
            [e.target.name]: e.target.value,
        })
    }

    //  Extraer los valores del formulario (Desestructurar objetos es separar cada clave, se convierte en variable individual y así podemos saber su valor)
    const {mascota, propietario, fecha, hora, sintomas} =  cita;

    //  Se crea la función que detecte el evento enviar datos del formulario
    const submitCita = (e) => {
        e.preventDefault(); //  Se usa, en este caso, para esconder que los datos de un formulario, se visualicen en la URL (Método "GET")
        // alert('Enviando datos del formulario');

        // Validar (Trim se usa para eliminar los campos vacios)
        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === '') {
            actualizarError(true);
            return; // El return se usa para terminar el ciclo o condicional
        }

        //  Eliminar el mensaje previo de error para volver a llenar los datos
        actualizarError(false);

        // Asignar un ID (instalamos la libreria uuid) para generar automáticamente los ID, no deben ser manuales.
        cita.id = uuid();

        // Crear la cita
        crearCita(cita);

        // Reiniciar el form
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        });
    }

    return ( 
        <Fragment>
            <h2>Desde el componente del Formulario</h2>

            {/* Ternario */}
            { error ? <p className="alerta-error">Todos Los campos son obligatorios</p>
            : null }

            <form action="" onSubmit={submitCita}>
                <label htmlFor="">Nombre Mascota</label>
                <input
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre Mascota"
                    onChange={actualizarState}
                    value={mascota}
                />
                {/*========================================*/}
                <label htmlFor="">Nombre Dueño</label>
                <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre Dueño Mascota"
                    onChange={actualizarState}
                    value={propietario}
                />
                {/*========================================*/}
                <label htmlFor="">Fecha de Alta</label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}
                />
                {/*========================================*/}
                <label htmlFor="">Hora de Alta</label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}
                />
                {/*========================================*/}
                <label htmlFor="">Síntomas</label>
                <textarea
                    name="sintomas"
                    // id=""
                    // cols="30"
                    // rows="10"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={sintomas}
                ></textarea>
                {/*========================================*/}
                <button
                    type="submit"
                    name=""
                    className="u-full-width button-primary"
                >Agendar Cita</button>
                {/*========================================*/}
            </form>
        </Fragment>
     );
}
Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}
 
export default Formulario;