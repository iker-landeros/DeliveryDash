import "../Styles/Cursos.css"
import AgregarCurso from "./AgregarCurso";
import { useState,useEffect } from "react";

const  Cursos =() => {
  const [curso, setCurso] = useState([]);
  const [idsSeleccionados, setIdsSeleccionados] = useState([]);
  
  const handleCheckboxChange = (event) => {
    const id = event.target.id;
    if (event.target.checked) {
      setIdsSeleccionados([...idsSeleccionados, id]);
    } else {
      setIdsSeleccionados(idsSeleccionados.filter(item => item !== id));
    }
  };
  const [isDelete,SetIsDelete] = useState(0)
  const handleOnEliminar = async (evt) => {
    const ids = idsSeleccionados.join(',');

    evt.preventDefault();
    const response = await fetch(`${import.meta.env.VITE_SECRET}/cursos/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token") || ""}`,
      },
      body: JSON.stringify({
        ids:ids
      }),
    });
    const responseData = await response.json();
    if (responseData)
    SetIsDelete(1);
  };
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
      SetIsDelete(4)
  }, [isDelete])
  const AddCurso = (cnt) => {
    SetIsDelete(cnt)
  }
  return (
    <div className="curso-fondo">
      <div className="barrain2">
        <div className="barrain23">
          <button className="barrain-boton2"><AgregarCurso handleClickAdd={AddCurso}/></button>
          <button className="barrain-boton2"onClick={handleOnEliminar}>Eliminar</button>
        </div>
      </div>

      <div className="tabla2">
          <div className="tablain2">
            <p className="tabladato2"></p>
            <p className="tabladato2">Nombre</p>
            <p className="tabladato2">Fecha Inicio</p>
            <p className="tabladato2">Fecha Final</p>
          </div>
          <div className="tablacompleta">
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
      </div>
    </div>
  )
}

export default Cursos;
