import '../Styles/Dashboard.css'
import MenuBotones from '../Components/MenuBotones'
import PopUpDescargar from '../Components/PopUpDescargar'
import { useState,useEffect } from "react";
import { Link, useParams, useNavigate  } from 'react-router-dom';
const  Dashboard = () => {
  const navigate = useNavigate();
  const { id } = useParams()
  const [cursos,setCursos] = useState([]);
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

  const handleSelectChange = (event) => {
    navigate(`/Dashboard/${parseInt(event.target.value)}`);
  };

  const handleOnSignOut = () =>{
    localStorage.removeItem('admin')
    localStorage.removeItem('token')
    navigate('/');
  };
  return (
    <div className='fondo-dashboard'>
      <div className='container-dashboard'>
        <div className='container-fecha'>
          <div className='container-fecha-dentro'>
            <select className='boton-fecha' onClick={handleSelectChange}>
              {cursos.map(tag =>
                <option key={tag.cursoID}
                 value={tag.cursoID}
                 >{tag.nombre}</option>
              )}
            </select>
            <button className="boton-descarga"><PopUpDescargar/></button>
            <button className='boton-descarga' onClick={handleOnSignOut}>cerrar sesión</button>
          </div>
        </div>
        <p className='dashboard-titulo'>Dashboard</p>
        <div>
          <MenuBotones/>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
