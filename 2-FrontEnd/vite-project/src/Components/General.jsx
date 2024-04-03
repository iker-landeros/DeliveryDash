import "../Styles/General.css"
import { useState } from "react";
import TarjetaDashboard from "./TarjetaDashboard";
import TarjetaLeaderBoard from "./TarjetaLeaderBoard";
import { BarChart } from '@mui/x-charts/BarChart';
const  General =() => {
    const tarjetas = [
        {"id":1, "dato" : 10, "porcentaje" : 20},
        {"id":2, "dato" : 20, "porcentaje" : 30},
        {"id":3, "dato" : 30, "porcentaje" : 50},
        {"id":4, "dato" : 40, "porcentaje" : 70}
    ]
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
            {tarjetas.map(tarjeta => 
                            <TarjetaDashboard key={tarjeta.id} id={tarjeta.id} titulo="Lorem ipsum" dato={tarjeta.dato} porcentaje={tarjeta.porcentaje}/>
            )}
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
                <div className='leaderboard-centrar'>
                    <p>Usuarios que mas jugaron</p>
                </div>
                <div className='leaderboard-titulo'>
                    <p className="dash-negritas">Username</p>
                    <p  className="dash-negritas">Horas</p>
                </div>
                {jugadores.map(jugador => 
                            <TarjetaLeaderBoard id={jugador.id} usuario={jugador.usuario} horas={jugador.horas}/>
                )}
            </div>
        </div>
    </div>
  )
}

export default General;
