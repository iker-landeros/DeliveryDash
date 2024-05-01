import { useState,useEffect } from "react";
import { useParams  } from 'react-router-dom';
import "../Styles/AlumnosCurso.css"
const AlumnosCurso = () => {
    const [cursos,setCursos] = useState([]);
    const { id } = useParams()
    useEffect(() => {
    fetch(`${import.meta.env.VITE_SECRET}/cursos`, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token") || ""}`,
        },
    })
        .then(data => data.json())
        .then((data) => {
        setCursos(data)
        })
    }, [id])
    const alumnos = [
        {nombre:"Luis",email:"Luis@com"},
        {nombre:"Carlos",email:"Carlos@com"},
        {nombre:"Andres",email:"Andres@com"},
        {nombre:"Tona",email:"Tona@com"}
    ]
    return (
        <div className="alumnos-tabla">
            <div className="botones-ac">
            <select className=''>
              {cursos.map(tag =>
                <option key={tag.cursoID}
                 value={tag.cursoID}
                 >{tag.nombre}</option>
              )}
            </select>
            <button>Eliminar</button>
            </div>
            {alumnos.map(alumno =>
            <div>
                <p>{alumno.email}</p>
                <p>{alumno.nombre}</p>
            </div>
            )}
        </div>
    );
  };
export default AlumnosCurso;