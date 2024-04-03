import { Link,Outlet } from "react-router-dom"
import React, { useState } from 'react';
import "../Styles/Botones.css"
const  Botones =() => {
  const [botonPresionado, setBotonPresionado] = useState('general');
  return (
    <>
    <nav className="div-controlador-botones">
          <div className="div-botones">
            <Link to='general' className={botonPresionado === 'general' ? 'boton-presionado' : 'boton'} onClick={() => setBotonPresionado('general')}>General</Link>
            <Link to='analitica' className={botonPresionado === 'analitica' ? 'boton-presionado' : 'boton'} onClick={() => setBotonPresionado('analitica')}>Analítica</Link>
          </div>
    </nav>
    <section>
        <Outlet/>
    </section> 
    </>   
  )
}

export default Botones;
