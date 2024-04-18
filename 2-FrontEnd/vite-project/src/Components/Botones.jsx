import "../Styles/Botones.css"
import { Link,Outlet } from "react-router-dom"
import React, { useState } from 'react';


const  Botones =() => {

  const [botonPresionado, setBotonPresionado] = useState(() => {
    const partesRuta = window.location.pathname.split('/');
    return partesRuta[partesRuta.length - 1];
  });
  
  return (
    <>
    <nav className="div-controlador-botones">
          <div className="div-botones">
            <Link to='general' className={botonPresionado === 'general' ? 'boton-presionado' : 'boton'} onClick={() => setBotonPresionado('general')}>General</Link>
            <Link to='actividad' className={botonPresionado === 'actividad' ? 'boton-presionado' : 'boton'} onClick={() => setBotonPresionado('actividad')}>Actividad</Link>
            <Link to='inscripciones' className={botonPresionado === 'inscripciones' ? 'boton-presionado' : 'boton'} onClick={() => setBotonPresionado('inscripciones')}>Inscripciones</Link>
          </div>
    </nav>
    <section>
        <Outlet/>
    </section> 
    </>   
  )
}

export default Botones;
