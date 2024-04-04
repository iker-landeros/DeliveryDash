import '../Styles/TarjetaDashboard.css'
const  TarjetaDashboard =({id,titulo,dato,porcentaje,colorDeFondo}) => {
  const obtenerColorFondo = (id) => {
    switch (id) {
      case 1:
        return '#F6BA27';
      case 2:
        return '#D44D56';
      case 3:
        return '#0053B1';
      case 4 :
        return '#52BEDA'
      default:
        return ''; 
    }
  };

  return (
    <div className='tarjeta-dashboard' style={{ backgroundColor: obtenerColorFondo(id)}}>
        <div className='tarjeta-dashboard-inner'>
            <p className='texto-titulo'>{titulo}</p>
            <p className='texto-negrita'>{dato}</p>
            <p>+{porcentaje}% más que el mes pasado</p>
        </div>
    </div>
  )
}

export default TarjetaDashboard;
