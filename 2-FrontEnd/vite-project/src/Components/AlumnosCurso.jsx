import { useState,useEffect } from "react";
import { useParams  } from 'react-router-dom';
import { Toaster, toast } from "sonner";
import "../Styles/AlumnosCurso.css"
const AlumnosCurso = () => {
    const { id } = useParams()
    const [alumnos,setAlumnos] = useState([]);
    const [alumnoEliminar,setAlumnoEliminar] = useState(null);


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

    const handleOnEliminar = async (evt) => {
      if(alumnoEliminar === null){
        toast.error('Error al borrar alumno')    
      }
      else{
  
      evt.preventDefault();
      const response = await fetch(`${import.meta.env.VITE_SECRET}/inscripciones/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify({
          ids:alumnoEliminar
        }),
      });
      const responseData = await response.json();
      if (responseData) console.log(responseData)
        toast.success('alumno borrado exitosamente')
      }
    };

    useEffect(() => {
      fetchApi(`${import.meta.env.VITE_SECRET}/inscripciones/curso`,
      id,setAlumnos,true)
    }, [id])

    const alumnoAEliminar = (e) =>{
      setAlumnoEliminar(e)
    } 
    return (
      <>
      <div className="botonoutac">
        <div className="botoninac">
          <Toaster richColors/>
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
                <div key={alumno.id} className="tarjeta-alumnos">
                    <input type="radio" name="curso"
                    className="alumno-radio-button"
                    onClick={()=>{alumnoAEliminar(alumno.id)}}>  
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

