import { useState,useEffect } from "react";
import { useParams  } from 'react-router-dom';
import "../Styles/AlumnosCurso.css"
const AlumnosCurso = () => {
    const { id } = useParams()
    const [alumnos,setAlumnos] = useState([]);
    const fetchApi = async (url,data,setFunction,isArray) =>{
        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("token") || ""}`,
            },
            body: JSON.stringify({
              cursoID: data 
            }),
          })
          const result = await response.json();
          setFunction(isArray ? result : result[0]);
        } catch (err){
          console.log('error', err);
        }
      }

    useEffect(() => {
            fetchApi(`${import.meta.env.VITE_SECRET}/alumnos/byCurso`,
            id,setAlumnos,true)
        }, [id])
    console.log(alumnos)
    const [alumnoEliminar,setAlumnoEliminar] = useState(0);
    const handleOnEliminar = () => {
      console.log(alumnoEliminar)
    }
    const alumnoAEliminar = (e) =>{
      setAlumnoEliminar(e)
    } 
    return (
      <>
      <div className="botonoutac">
        <div className="botoninac">
          <button className="barrain-boton2" onClick={handleOnEliminar}>Eliminar</button>
        </div>
      </div>
      <div className="tabla"> 
            <div className="nombre-columnas">
                <p className="alumno-texto-negritas">Alumno</p>
                <p className="alumno-texto-negritas">Correo</p>
            </div>  
            <div className="tablacompleta">
              {alumnos.map(alumno =>
                <div key={alumno.alumnoID} className="tarjeta-alumnos">
                    <input type="radio" name="curso"
                    className="alumno-radio-button"
                    onClick={()=>{alumnoAEliminar(alumno.alumnoID)}}>  
                    </input>
                    <p  className="alumno-texto">{alumno.nickname}</p>
                    <p className="alumno-texto">{alumno.mail}</p>
                </div>
              )}
            </div>
      </div>
      </>
    );
  };
export default AlumnosCurso;

