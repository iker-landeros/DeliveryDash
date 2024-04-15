import '../Styles/TarjetaLeaderBoard.css'
import Avatar from "../assets/Avatar.svg"

const  TarjetaLeaderBoard =({usuario,horas}) => {

  return (
    <div className='tarjetaleaderboard'> 
        <div className='foto-nombre'>
            <img src={Avatar}></img>
            <p>{usuario}</p>
        </div>
        <p>{horas}</p>
    </div>
  )
}

export default TarjetaLeaderBoard;
