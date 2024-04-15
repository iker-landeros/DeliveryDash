import "../Styles/Inscripciones.css"
import Cursos from "./Cursos";
import Alumnos from "./Alumnos";
import { useState } from "react";

const  Inscripciones =() => {
    
  const [value,setValue] = useState(0);
  const handleSelectChange = (event) => {
    setValue(parseInt(event.target.value));
  };
  const handleEliminar = (event) => {
    console.log()
  };
  return (
    <div >
        <div className="barra">
            <div className="barrain">
                <select className="espaciob" value={value} onChange={handleSelectChange}>
                  <option value={0} >Cursos</option>
                  <option value={1}>Alumnos</option>
                </select>
            </div>
            {value === 0 && <Cursos/>}
            {value === 1 && <Alumnos/>}
        </div>
    </div>
  )
}

export default Inscripciones;
