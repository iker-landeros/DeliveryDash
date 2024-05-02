import "../Styles/General.css"
import { useState,useEffect } from "react";
import TarjetaDashboard from "./TarjetaDashboard";
import TarjetaLeaderBoard from "./TarjetaLeaderBoard";
import { useParams } from "react-router-dom";
import BarChartGraph from "./BarChartGraph"
import LeaderBoard from "./LeaderBoard";
const  General =() => {
  const { id } = useParams();

  const [jt, setJt] = useState([]);
  const [tt, setTt] = useState([]);
  const [et, setEt] = useState([]);
  const [nc, setNc] = useState([]);

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
    
    fetchApi(`${import.meta.env.VITE_SECRET}/alumnos/total/curso`,
    id,setJt)

    fetchApi(`${import.meta.env.VITE_SECRET}/nivelescompletados/total/nivel/curso`,
    id,setNc)

    fetchApi(`${import.meta.env.VITE_SECRET}/nivelescompletados/total/tiempo/curso`,
    id,setTt)

    fetchApi(`${import.meta.env.VITE_SECRET}/nivelescompletados/stars/total/curso`,
    id,setEt)

  },[id]);
  return (
    <div>
        <div className='div-tarjetas'>
            <TarjetaDashboard id={1} titulo="Jugadores totales" dato={jt?.alumnoCount || 0}/>
            <TarjetaDashboard id={2} titulo="Minutos totales" dato={tt?.minutos || 0}/>
            <TarjetaDashboard id={3} titulo="Estrellas totales" dato={et?.estrellasTotales || 0}/>
            <TarjetaDashboard id={4} titulo="Niveles Completados" dato={nc?.NivelesCompletados || 0}/>
        </div>
        <div className='div-grafica-containers'>
            <BarChartGraph/>
            <LeaderBoard/>
        </div>
    </div>
  )
}

export default General;
