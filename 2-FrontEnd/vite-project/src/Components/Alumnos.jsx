import "../Styles/Alumnos.css"
import { useState,useEffect } from "react";
import Card from "./CardUser"
import CardCurso from "./CardCurso"
import CardProf from "./CardProfesor"
const  Alumnos =() => {
  const [alumnos,setAlumnos] = useState([]);
  const [profesores,setProfesores] = useState([]);
  const [input,setInput] = useState([]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_SECRET}/alumnos/subscribed`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token") || ""}`,
      },
    })
      .then(data => data.json())
      .then((data) => {
        setAlumnos(data)
      })
  }, [])
  const [cursos, setCursos] = useState([]);
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
  }, [])
  useEffect(() => {
    fetch(`${import.meta.env.VITE_SECRET}/profesores`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token") || ""}`,
      },
    })
      .then(data => data.json())
      .then((data) => {
        setProfesores(data)
      })
  }, [])

  const [searchValue, setSearchValue] = useState(''); // Estado para el valor de búsqueda


  //Usuario
  const onChangeUsuario = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchValue(value); 
  };
  const filteredAlumnos = alumnos.filter(alumno =>
    alumno.nickname.toLowerCase().includes(searchValue)
  );

  const users = filteredAlumnos.map(alumno =>
    <Card key={alumno.alumnoID} user={alumno} />
  );
  const [searchValueC, setSearchValueC] = useState(''); // Estado para el valor de búsqueda

  //Curso
  const onChangeCurso = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchValueC(value); 
  };
  const filteredCursos = cursos.filter(curso =>
    curso.nombre.toLowerCase().includes(searchValueC) 
  );

  const cursos2 = filteredCursos.map(alumno =>
    <CardCurso key={alumno.cursoID} user={alumno} />
  );

  //Profesor
  const [searchValueP, setSearchValueP] = useState('');
  const onChangeProfesor = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchValueP(value); 

  };
  const filteredProfesor = profesores.filter(curso =>
    curso.fName.toLowerCase().includes(searchValueP)
  );
  const teachers = filteredProfesor.map(alumno =>
    <CardProf key={alumno.cursoID} user={alumno} />
  );

  return (
    <>
    <div className="barrain">
      <button className="barrain-boton2">Agregar alumno</button>
    </div>
    <div className="tabla">
        <div className="tablain">
          <div className="columna">
            <p className="tabladato">Alumno</p>
            <input onChange={onChangeUsuario} className="inputdato"></input>
            <div className="user-cards">
              {users}
            </div>    
          </div>
          <div className="columna">
            <p className="tabladato">Curso</p>
            <input onChange={onChangeCurso} className="inputdato"></input>
            <div className="user-cards">
              {cursos2}
            </div>
          </div>
          <div className="columna">
            <p className="tabladato">Profesor</p>
            <input onChange={onChangeProfesor} className="inputdato"></input>
            <div className="user-cards">
              {teachers}
            </div>
          </div>
        </div>
    </div>
    </>
  )
}

export default Alumnos;
{/* <button className="barrain-boton2" onClick={handleOnEliminar}>Eliminar</button>*/}