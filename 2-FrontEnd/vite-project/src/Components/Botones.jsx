import "../Styles/Botones.css"
const  Botones =({opcion,setOpcion}) => {

  return (
    <div className="div-botones">
            <button className={opcion===0 ? 'boton-presionado':'boton'} onClick={() =>{setOpcion(0)}}>General</button>
            <button className={opcion===1 ? 'boton-presionado':'boton'} onClick={() =>{setOpcion(1)}}>Analítica</button>
    </div>
  )
}

export default Botones;
