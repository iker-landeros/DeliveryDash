import '../Styles/TarjetaDashboard.css'
const  TarjetaDashboard =({titulo,dato,porcentaje,colorDeFondo}) => {

  return (
    <div className='tarjeta-dashboard' style={{ backgroundColor: colorDeFondo }}>
        <div>
            <p>{titulo}</p>
            <p className='texto-negrita'>{dato}</p>
            <p>+{porcentaje}% más que el mes pasado</p>
        </div>
    </div>
  )
}

export default TarjetaDashboard;
