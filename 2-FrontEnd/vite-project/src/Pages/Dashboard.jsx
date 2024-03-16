import '../Styles/Dashboard.css'
import Botones from '../Components/Botones'
import fecha from "../assets/fecha.svg"
const  Dashboard =() => {

  return (
    <div className='fondo-dashboard'>
      <div className='container-dashboard'>
        <div className='container-fecha'>
          <div className='container-fecha-dentro'>
            <button className='boton-fecha'><img src={fecha}></img>Enero 20, 2023 - Febrero 20, 2023</button>
            <button className='boton-descarga'>Descargar</button>
          </div>
        </div>
        <p className='dashboard-titulo'>Dashboard</p>
        <div>
          <Botones/>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
