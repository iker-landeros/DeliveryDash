import '../Styles/Dashboard.css'
import MenuBotones from '../Components/MenuBotones'
import PopUpDescargar from '../Components/PopUpDescargar'
import { useState,useEffect } from "react";
import { Link, useParams, useNavigate  } from 'react-router-dom';
const  Dashboard = () => {
  const navigate = useNavigate();
  const { id } = useParams()
  const [cursos,setCursos] = useState([]);
  const cursos2 = [
    {id:1,curso:"curso 1"},
    {id:2,curso:"curso 2"},
    {id:3,curso:"curso 3"},
    {id:4,curso:"curso 4"}
  ]
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
        setCursos(data)
      })
  }, [])

  const [value2,setValue2] = useState(1);
  const handleSelectChange = (event) => {
    setValue2(parseInt(event.target.value));
    console.log(value2)
    navigate(`/Dashboard/${parseInt(event.target.value)}`);
  };

  return (
    <div className='fondo-dashboard'>
      <div className='container-dashboard'>
        <div className='container-fecha'>
          <div className='container-fecha-dentro'>
            <select className='boton-fecha' id="cars" name="cars" onClick={handleSelectChange}>
              {cursos2.map(tag =>
                <option key={tag.id}
                 value={tag.id}
                 >{tag.curso}</option>
              )}
            </select>
            <button className="boton-descarga"><PopUpDescargar/></button>
          </div>
        </div>
        <p className='dashboard-titulo'>Dashboard {id}</p>
        <div>
          <MenuBotones/>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
