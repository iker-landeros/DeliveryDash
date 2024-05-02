import "../Styles/Alumnos.css"
import { useState,useEffect } from "react";
import Card from "./CardUser"
import CardCurso from "./CardCurso"
import CardProf from "./CardProfesor"
const  Inscripciones = () => {
  const [alumnos,setAlumnos] = useState([]);
  const [profesores,setProfesores] = useState([]);
  const [cursos, setCursos] = useState([]);

  const fetchApi = async (url,setFunction,isArray) =>{
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token") || ""}`,
        }
      })
      const result = await response.json();
      setFunction(isArray ? result : result[0]);
    } catch (err){
      console.log('error', err);
    }
  }
  const fetchApiPost = async (url,data) =>{
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify(
          data 
        ),
      })
      const result = await response.json();
      console.log(result)
    } catch (err){
      console.log('error', err);
    }
  }
  useEffect(() => {
    fetchApi(`${import.meta.env.VITE_SECRET}/alumnos`,setAlumnos,true)
    fetchApi(`${import.meta.env.VITE_SECRET}/cursos`,setCursos,true)
    fetchApi(`${import.meta.env.VITE_SECRET}/profesores`,setProfesores,true)
  },[]);

  const [searchValue, setSearchValue] = useState('');

  const onChangeUsuario = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchValue(value); 
  };

  const filteredAlumnos = alumnos.filter(alumno =>
    alumno.nickname.toLowerCase().includes(searchValue)
  );

  const [userIDS,setUserIDS] = useState(null);
  const handleCardUser = (cnt) => {
    setUserIDS(cnt)
  };

  const users = filteredAlumnos.map(alumno =>
    <Card key={alumno.alumnoID} user={alumno} 
    handleClickUser={handleCardUser}/>
  );

  
  const [searchValueC, setSearchValueC] = useState('');

  //Curso
  const onChangeCurso = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchValueC(value); 
  };
  const filteredCursos = cursos.filter(curso =>
    curso.nombre.toLowerCase().includes(searchValueC) 
  );

  const [cursoIDS,setCursoIDS] = useState(null);
  const handleCardCurso = (cnt) => {
    setCursoIDS(cnt)
  };
  const cursos2 = filteredCursos.map(alumno =>
    <CardCurso key={alumno.cursoID} user={alumno} 
    handleClickCurso={handleCardCurso}/>
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


  const [profesorIDS,setProfesorIDS] = useState(null);
  
  const handleCardProf = (cnt) => {
    setProfesorIDS(cnt)
  };


  const teachers = filteredProfesor.map(alumno =>
    <CardProf key={alumno.cursoID} user={alumno}
      handleClickProf={handleCardProf}/>
  );

  const agregarAlumno = () => {
    console.log(profesorIDS,userIDS,cursoIDS)
    const data = {alumnoID:userIDS,
            profesorID:profesorIDS,
            cursoID:cursoIDS}
    fetchApiPost(`${import.meta.env.VITE_SECRET}/inscripciones`,data)
  }
  return (
    <>
    <div className="botonout">
      <div className="botonin">
        <button className="barrain-boton2" onClick={agregarAlumno}>Agregar alumno</button>
      </div>
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

export default Inscripciones;