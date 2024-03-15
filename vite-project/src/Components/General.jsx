import "../Styles/Botones.css"
import { useState } from "react";
import TarjetaDashboard from "./TarjetaDashboard";
import TarjetaLeaderBoard from "./TarjetaLeaderBoard";
const  General =() => {

  return (
    <div>
    <div className='div-tarjetas'>
        <TarjetaDashboard colorDeFondo={"#F6BA27"} titulo="Lorem ipsum" dato="100" porcentaje={"120"}/>
        <TarjetaDashboard colorDeFondo={"#D44D56"} titulo="Lorem ipsum" dato="100" porcentaje={"120"}/>
        <TarjetaDashboard colorDeFondo={"#0053B1"} titulo="Lorem ipsum" dato="100" porcentaje={"120"}/>
        <TarjetaDashboard colorDeFondo={"#52BEDA"} titulo="Lorem ipsum" dato="100" porcentaje={"120"}/>
    </div>
    <div className='div-grafica-containers'>
        <div className='div-grafica'>
            <div className='div-grafica-titulo'>
            <p>Jugadores nuevos por mes</p>
            </div>
        </div>
        <div className='div-leaderboard'>
            <div className='leaderboard-centrar'>
                <p>Usuarios que mas jugaron</p>
            </div>
            <div className='leaderboard-titulo'>
                <p>Username</p>
                <p>Horas</p>
            </div>
            <TarjetaLeaderBoard usuario={"Luis"} horas={"5"}/>
            <TarjetaLeaderBoard usuario={"Luis"} horas={"1"}/>
            <TarjetaLeaderBoard usuario={"Luis"} horas={"2"}/>
            <TarjetaLeaderBoard usuario={"Luis"} horas={"3"}/>
            <TarjetaLeaderBoard usuario={"Luis"} horas={"4"}/>
        </div>
    </div>
    </div>
  )
}

export default General;
