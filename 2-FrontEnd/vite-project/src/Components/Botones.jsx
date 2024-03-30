import { Link,Outlet } from "react-router-dom"
import React, { useState } from 'react';
import "../Styles/General.css"
const  Botones =({opcion,setOpcion}) => {
  const [botonPresionado, setBotonPresionado] = useState('general');
  return (
    <>
    <nav className="div-botones">
            <Link to='general' className={botonPresionado === 'general' ? 'boton-presionado' : 'boton'} onClick={() => setBotonPresionado('general')}>General</Link>
            <Link to='analitica' className={botonPresionado === 'analitica' ? 'boton-presionado' : 'boton'} onClick={() => setBotonPresionado('analitica')}>Analítica</Link>
    </nav>
    <section>
        <Outlet/>
    </section> 
    </>   
  )
}

export default Botones;
