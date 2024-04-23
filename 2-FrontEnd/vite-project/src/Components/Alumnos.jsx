import "../Styles/Alumnos.css"
import { useState,useEffect } from "react";

const  Alumnos =() => {
  const [alumnos,setAlumnos] = useState([]);
  useEffect(() => {
    fetch('http://deliverydashapi-env.eba-i3jft8cm.us-east-1.elasticbeanstalk.com/alumnos/subscribed', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token") || ""}`,
      },
    })
      .then(data => data.json())
      .then((data) => {
        setAlumnos(data)
        console.log(data)
      })
  }, [])
  const [curso, setCurso] = useState([]);
  useEffect(() => {
    fetch('http://deliverydashapi-env.eba-i3jft8cm.us-east-1.elasticbeanstalk.com/cursos', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token") || ""}`,
      },
    })
      .then(data => data.json())
      .then((data) => {
        setCurso(data)
        console.log(curso)
        console.log(data)
      })
  }, [])
  const handleOnAgregar = () => {
    console.log("Agregando",idsSeleccionados)
  };
  const handleOnEliminar = () => {
    console.log("Elminando",idsSeleccionados)
  };
  const [idsSeleccionados, setIdsSeleccionados] = useState([]);

  const handleCheckboxChange = (event) => {
    const id = event.target.id;
    if (event.target.checked) {
      setIdsSeleccionados([...idsSeleccionados, id]);
    } else {
      setIdsSeleccionados(idsSeleccionados.filter(item => item !== id));
    }
  };
  return (
    <>
      <div className="barrain">
      <button className="barrain-boton2" onClick={handleOnAgregar}>Agregar alumno</button>
    </div>
    <div className="tabla">
        <div className="tablain">
          <div className="columna">
            <p className="tabladato">Alumno</p>
            {alumnos.map(alumno =>
              <div className="tablain" key={alumno.alumnoID}>
                <div className="tabladatocheck">
                  <input type="checkbox"  
                  onChange={handleCheckboxChange}
                  key={alumno.alumnoID} 
                  id={alumno.alumnoID}></input>
                  <p>{alumno.nickname}</p>
                </div>
              </div>    
            )}
          </div>
          <div className="columna">
            <p className="tabladato">Curso</p>
                {curso.map(usuario =>
                <div className="tablain" key={usuario.cursoID}>
                  <div className="tabladatocheck">
                    <input type="checkbox"  
                    onChange={handleCheckboxChange}
                    key={usuario.cursoID} 
                    id={usuario.cursoID}></input>
                    <p>{usuario.nombre}</p>
                  </div>
                </div>   
                )}
          </div>
          <div className="columna">
            <p className="tabladato">Profesor</p>
                {curso.map(usuario =>
                <div className="tablain" key={usuario.cursoID}>
                  <div className="tabladatocheck">
                    <input type="checkbox"  
                    onChange={handleCheckboxChange}
                    key={usuario.cursoID} 
                    id={usuario.cursoID}></input>
                    <p>{usuario.nombre}</p>
                  </div>
                </div>   
                )}
          </div>
        </div>
    </div>
    </>
  )
}

export default Alumnos;
{/* <button className="barrain-boton2" onClick={handleOnEliminar}>Eliminar</button>*/}