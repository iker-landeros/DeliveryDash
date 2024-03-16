import { useState,useRef } from 'react'
import '../Styles/Dashboard.css'
import TarjetaDashboard from '../Components/TarjetaDashboard'
import Botones from '../Components/Botones'
import TarjetaLeaderBoard from '../Components/TarjetaLeaderBoard'
const  Dashboard =() => {

  return (
    <div className='fondo-dashboard'>
      <div className='container-dashboard'>
        <div className='container-fecha'>
          <div className='container-fecha-dentro'>
            <p className='boton-fecha'>Enero 20, 2023 - Febrero 20, 2023</p>
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
