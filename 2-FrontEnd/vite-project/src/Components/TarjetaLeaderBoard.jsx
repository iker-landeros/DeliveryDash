import '../Styles/TarjetaLeaderBoard.css'
import Avatar from "../assets/Avatar.svg"

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
