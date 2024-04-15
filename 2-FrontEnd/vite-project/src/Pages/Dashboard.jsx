import '../Styles/Dashboard.css'
import Botones from '../Components/Botones'
import PopUpDescargar from '../Components/PopUpDescargar'
import { CSVLink } from 'react-csv';

const  Dashboard =() => {


  const handleMonthChange = (e) =>{
    console.log(e.target.value)
  };
  


  return (
    <div className='fondo-dashboard'>
      <div className='container-dashboard'>
        <div className='container-fecha'>
          <div className='container-fecha-dentro'>
            <input className='boton-fecha' type='month' onChange={handleMonthChange}></input>
            <button className="boton-descarga"><PopUpDescargar/></button>
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
