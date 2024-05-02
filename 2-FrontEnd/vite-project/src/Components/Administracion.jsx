import "../Styles/Inscripciones.css"
import Cursos from "./Cursos";
import Inscripciones from "./Inscripciones";
import AlumnosCurso from "./AlumnosCurso"
import { useState } from "react";

const  Administracion =() => {
    
  const [value,setValue] = useState(0);
  const handleSelectChange = (event) => {
    setValue(parseInt(event.target.value));
  };
  const handleEliminar = (event) => {
    console.log()
  };
  return (
    <div>
        <div className="barra">
            <div className="barra-out">
                <div className="barra-in">
                  <select className="espaciob" value={value} onChange={handleSelectChange}>
                    <option value={0}>Cursos</option>
                    <option value={1}>Inscripciones</option>
                    <option value={2}>Alumnos</option>
                  </select>
                </div>
            </div>
            {value === 0 && <Cursos/>}
            {value === 1 && <Inscripciones/>}
            {value === 2 && <AlumnosCurso/>}
        </div>
    </div>
  )
}

export default Administracion;
