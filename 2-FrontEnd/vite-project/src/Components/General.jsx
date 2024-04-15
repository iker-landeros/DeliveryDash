import "../Styles/General.css"
import { useState,useEffect } from "react";
import TarjetaDashboard from "./TarjetaDashboard";
import TarjetaLeaderBoard from "./TarjetaLeaderBoard";
import { BarChart } from '@mui/x-charts/BarChart';

const  General =() => {
  const [jt, setJt] = useState([]);
  const [tt, setTt] = useState([]);
  const [sesiones, setSesiones] = useState([]);
  const [leader, setLeader] = useState([]);

  useEffect(() => {
      fetch('http://deliverydashapi-env.eba-i3jft8cm.us-east-1.elasticbeanstalk.com/alumnos/subscribed/total', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token") || ""}`,
        },
      })
        .then(data => data.json())
        .then((data) => {
          setJt(data[0])
        })
    }, [])

  useEffect(() => {
    fetch('http://deliverydashapi-env.eba-i3jft8cm.us-east-1.elasticbeanstalk.com/alumnos/total', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token") || ""}`,
      },
    })
      .then(data => data.json())
      .then((data) => {
        setTt(data[0])
      })
  }, [])

  useEffect(() => {
    fetch('http://deliverydashapi-env.eba-i3jft8cm.us-east-1.elasticbeanstalk.com/sesiones/time', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token") || ""}`,
      },
    })
      .then(data => data.json())
      .then((data) => {
        setSesiones(data)
        console.log(data)
      })
  }, [])

  useEffect(() => {
    fetch('http://deliverydashapi-env.eba-i3jft8cm.us-east-1.elasticbeanstalk.com/alumnos/subscribed/stars', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token") || ""}`,
      },
    })
      .then(data => data.json())
      .then((data) => {
        setLeader(data)
        console.log(data)
      })
  }, [])
  const jugadores = [
      {"id":1, "usuario" : "usuario 1", "horas" : 20},
      {"id":2, "usuario" : "usuario 2", "horas" : 30},
      {"id":3, "usuario" : "usuario 3", "horas" : 40},
      {"id":4, "usuario" : "usuario 4", "horas" : 50},
      {"id":5, "usuario" : "usuario 5", "horas" : 60}
  ]
  return (
    <div>
        <div className='div-tarjetas'>
            <TarjetaDashboard id={1} titulo="Jugadores totales" dato={jt.alumnoCount} porcentaje={30}/>
            <TarjetaDashboard id={2} titulo="Jugadores Inscritos" dato={tt.alumnoCount} porcentaje={30}/>
            <TarjetaDashboard id={3} titulo="Sesiones totales" dato={sesiones.mensaje} porcentaje={30}/>
            <TarjetaDashboard id={4} titulo="Lorem Ipsum" dato={10} porcentaje={30}/>
        </div>
        <div className='div-grafica-containers'>
            <div className='div-grafica'>
                <div className='div-grafica-titulo'>
                    <p>Jugadores nuevos por mes</p>
                </div>
                <div className="div-grafica-imagen">
                    <BarChart
                        xAxis={[{ scaleType: 'band', data: ['group A'] }]}
                        series={[{ data: [4] }, { data: [1] }, { data: [2] }]}
                        width={500}
                        height={300}
                        />
                </div>
            </div>
            <div className='div-leaderboard'>
                <div className="leaderboard-container">
                  <div className='leaderboard-centrar'>
                      <p>Usuarios que mas jugaron</p>
                  </div>
                  <div className='leaderboard-titulo'>
                      <p className="dash-negritas">Username</p>
                      <p  className="dash-negritas">Horas</p>
                  </div>
                  {sesiones.map(sesion => 
                              <TarjetaLeaderBoard key={sesion.nickname} usuario={sesion.nickname} horas={sesion.totalTiempoSesion}/>
                  )}
                </div>
            </div>
        </div>
    </div>
  )
}

export default General;
