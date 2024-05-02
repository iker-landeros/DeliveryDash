import '../Styles/Formulario.css'
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import icono from "../assets/icono.png"
import aulify from "../assets/aulify.png"
const  Formulario =() => {
  const navigate = useNavigate();
  const loginForm = useRef(null)

  const Login = async (evt) => {
    evt.preventDefault()
    const form = new FormData(loginForm.current)
    const reponse = await fetch(`https://e0foiighd7.execute-api.us-east-1.amazonaws.com/login`,{
        method: "POST",
        body: form
        })
    const data = await reponse.json()
    console.log(data)
    if(data.token){
        navigate('/Dashboard/1')
        localStorage.setItem('token',data.token)
        localStorage.setItem('admin',data.isAdmin)
        
    }else{
        alert('Usuario o contraseña incorrectos')
    }

  }

  return (
  <div className='fondo-formulario'>
    <div className='container'>

      <div className='aulify-image-out'>
        <div className='aulify-image'>
          <img className='imagen-alu' src={aulify}></img>
          <img className='imagen-logo-head' src={icono}></img>
        </div>
      </div>

      <div className='imagen-formulario'>

        <div className='div-imagen-f'>
          <img src={icono} className='imagen-grande'></img>
        </div>

        <form className='formulario' onSubmit={Login} ref={loginForm}>
          <div>
            <p>Nombre</p>
            <input type="text" name="mail"></input>
            <p>Contraseña</p>
            <input type="password" name="password"></input>
            <div className='div-boton'>
              <button type='submit'>Iniciar sesión</button>
            </div>
          </div>
        </form>

      </div>
    </div>
  </div>
  )
}

export default Formulario;