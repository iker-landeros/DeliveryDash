import "../Styles/LeaderBoard.css"
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import TarjetaLeaderBoard from "./TarjetaLeaderBoard";
const LeaderBoard = () => {

    const { id } = useParams();
    const [leaders, setLeaders] = useState([]);

    const fetchApi = async (url,data,setFunction,isArray) =>{
        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("token") || ""}`,
            },
            body: JSON.stringify({
              cursoID: data 
            }),
          })
          const result = await response.json();
          setFunction(isArray ? result : result[0]);
        } catch (err){
          console.log('error', err);
        }
    }

    useEffect(() => {
        fetchApi(`${import.meta.env.VITE_SECRET}/alumnos/subscribed/time`,
        id,setLeaders,true)
    },[id]);
    
    return (
    <div className='div-leaderboard'>
        <div>
          <div className='leaderboard-centrar'>
              <p>Usuarios que más jugaron</p>
          </div>
          <div className='leaderboard-titulo'>
              <p className="dash-negritas">Username</p>
              <p  className="dash-negritas">Horas</p>
          </div>
          {leaders.map(leader => 
                      <TarjetaLeaderBoard key={leader.nickname} usuario={leader.nickname} horas={leader.tiempoTotal}/>
          )}
        </div>
    </div>

    )
}
export default LeaderBoard;