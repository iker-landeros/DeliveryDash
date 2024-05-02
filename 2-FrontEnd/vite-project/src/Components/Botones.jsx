import "../Styles/Botones.css"
import React, { useState,useEffect } from 'react';
const  Botones =({opcion,setOpcion}) => {  
  const  [val,setVal] = useState(0);
  useEffect(() =>{
    setVal(localStorage.getItem('admin'))
  },[val])
  return (
    <>
    {val == 1 ? (
      <div className="div-controlador-botones">
        <div className="div-botones">
          <button className={opcion === 0 ? 'boton-presionado' : 'boton'} onClick={() => setOpcion(0)}>General</button>
          <button className={opcion === 1 ? 'boton-presionado' : 'boton'} onClick={() => setOpcion(1)}>Actividad</button>
          <button className={opcion === 2 ? 'boton-presionado' : 'boton'} onClick={() => setOpcion(2)}>Administración</button>
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
