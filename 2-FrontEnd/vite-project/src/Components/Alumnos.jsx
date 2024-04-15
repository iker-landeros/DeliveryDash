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
      <button className="barrain-boton2" onClick={handleOnEliminar}>Eliminar</button>
    </div>
    <div className="tabla">
        <div className="tablain">
          <p className="tabladato"></p>
          <p className="tabladato">ID</p>
          <p className="tabladato">Nombre</p>
          <p className="tabladato">Correo</p>
        </div>
        {alumnos.map(alumno =>
          <div className="tablain" key={alumno.alumnoID}>
            <input type="checkbox" 
            className="tabladato" 
            onChange={handleCheckboxChange}
            key={alumno.alumnoID} 
            id={alumno.alumnoID}></input>
            <p className="tabladato">{alumno.alumnoID}</p>
            <p className="tabladato">{alumno.nickname}</p>
            <p className="tabladato">{alumno.mail}</p>
          </div>    
        )}
    </div>
    </>
  )
}

export default Alumnos;
