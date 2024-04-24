import "../Styles/Botones.css"
import { Link,Outlet } from "react-router-dom"
import React, { useState } from 'react';

const  val = localStorage.getItem('admin')
console.log(val)
const  Botones =({opcion,setOpcion}) => {  
  return (
    <>
    {val === 1 ? (
    <div className="div-controlador-botones">
          <div className="div-botones">
            <button className={opcion === 0 ? 'boton-presionado' : 'boton'} onClick={() => setOpcion(0)}>General</button>
            <button className={opcion === 1 ? 'boton-presionado' : 'boton'} onClick={() => setOpcion(1)}>Actividad</button>
            <button className={opcion === 2 ? 'boton-presionado' : 'boton'} onClick={() => setOpcion(2)}>Inscripciones</button>
          </div>
    </div>
    ):(
      <div className="div-controlador-botones">
      <div className="div-botones">
        <button className={opcion === 0 ? 'boton-presionado' : 'boton'} onClick={() => setOpcion(0)}>General</button>
        <button className={opcion === 1 ? 'boton-presionado' : 'boton'} onClick={() => setOpcion(1)}>Actividad</button>
      </div>
</div>    
    )}
    </>   
  )
}

export default Botones;
