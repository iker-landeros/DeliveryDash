import '../Styles/TarjetaLeaderBoard.css'

const  TarjetaLeaderBoard =({usuario,horas}) => {

  return (
    <div className='tarjetaleaderboard'> 
        <div className='foto-nombre'>
            <p>{usuario}</p>
            <p>{horas}</p>
        </div>
    </div>
  )
}

export default TarjetaLeaderBoard;
