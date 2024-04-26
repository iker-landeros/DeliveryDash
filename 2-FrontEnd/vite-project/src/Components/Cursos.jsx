import "../Styles/Cursos.css"
import AgregarCurso from "./AgregarCurso";
import { useState,useEffect } from "react";

const  Cursos =() => {
  const [curso, setCurso] = useState([]);
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
        setCurso(data)
      })
  }, [])
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
  const handleOnEliminar2 = async (evt) => {
    evt.preventDefault();
    const data = { idsSeleccionados };
    const response = await fetch(`${import.meta.env.VITE_SECRET}/cursos/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token") || ""}`,
      },
      body: JSON.stringify({
        cursoID: data.idsSeleccionados[0] 
      }),
    });
    const responseData = await response.json();
    if (responseData) console.log(responseData);
  };

  return (
    <>
      <div className="barrain">
        <button className="barrain-boton2"><AgregarCurso/></button>
        <button className="barrain-boton2"onClick={handleOnEliminar2}>Eliminar</button>
      </div>

      <div className="tabla2">
          <div className="tablain2">
            <p className="tabladato2"></p>
            <p className="tabladato2">Nombre</p>
            <p className="tabladato2">Fecha Inicio</p>
            <p className="tabladato2">Fecha Final</p>
          </div>
          {curso.map(usuario =>
            <div className="tablain2" key={usuario.cursoID}>
              <input type="checkbox" 
              className="tabladato2" 
              key={usuario.cursoID} 
              id={usuario.cursoID}
              onChange={handleCheckboxChange}></input>
              <p className="tabladato2">{usuario.nombre}</p>
              <p className="tabladato2">{usuario.dateInicio}</p>
              <p className="tabladato2">{usuario.dateFinal}</p>
            </div>    
          )}
      </div>
    </>
  )
}

export default Cursos;
