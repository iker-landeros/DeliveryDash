import '../Styles/Formulario.css'
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import icono from "../assets/icono.png"
const  Formulario =() => {
  const navigate = useNavigate();
  const loginForm = useRef(null)

  const Login = async (evt) => {
    evt.preventDefault()
    const form = new FormData(loginForm.current)
    const reponse = await fetch('http://deliverydashapi-env.eba-i3jft8cm.us-east-1.elasticbeanstalk.com/profesores/login',{
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
          <div className='container-in'>
            <div className='div-imagen-f'>
              <img src={icono}></img>
            </div>
            <form className='formulario' onSubmit={Login} ref={loginForm}>
              <div>
              <p>Nombre</p>
              <input type="text" name="mail"></input>
              <p>Contraseña</p>
              <input type="password" name="password"></input>
                <div className='div-boton'>
                  <button type='submit'>Enviar</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Formulario;