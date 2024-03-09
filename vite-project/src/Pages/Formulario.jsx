import { useState } from 'react'
import '../App.css'
const  Formulario =() => {
  const Login = () => {
    console.log(nombre)
    console.log(contraseña)
  }

  const [nombre, setNombre] = useState('');
  const [contraseña, setContraseña] = useState('');

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  const handleContraseñaChange = (event) => {
    setContraseña(event.target.value);
  };

  return (
    <div className='fondo-formulario'>
      <div className='imagen-fondo'>
        <div className='container'>
          <div className='formulario'>
            <p>Nombre</p>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={handleNombreChange}
            />
            <p>Contraseña</p>
            <input
              type="password"
              id="contraseña"
              value={contraseña}
              onChange={handleContraseñaChange}
            ></input>
            <div className='div-boton'>
              <button onClick={Login}>Enviar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Formulario;
