import { useState,useRef } from 'react'
import '../Styles/Formulario.css'
import { useNavigate } from 'react-router-dom'
const  Formulario =() => {
  const navigate = useNavigate();
  const loginForm = useRef(null)

  const Login = async (evt) => {
    evt.preventDefault() //previene el evento de la funcion submit
    const form = new FormData(loginForm.current)
    const reponse = await fetch('http://deliverydashapi-env.eba-i3jft8cm.us-east-1.elasticbeanstalk.com/profesor/login',{
        method: "POST",
        body: form
        })
    const data = await reponse.json()
    if(data.token){
        navigate('/Dashboard/general')
        localStorage.setItem('token',data.token)
        
    }else{
        alert('Usuario o contraseña incorrectos')
    }

}

  return (
    <div className='fondo-formulario'>
      <div className='imagen-fondo'>
        <div className='container'>
        <form className='formulario' onSubmit={Login} ref={loginForm}>
            <p>Nombre</p>
            <input type="text" name="mail"></input>
            <p>Contraseña</p>
            <input type="password" name="password"></input>
              <div className='div-boton'>
                <button type='submit'>Enviar</button>
              </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Formulario;
