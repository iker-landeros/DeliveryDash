import "../Styles/Analitica.css"
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Calendario from "./Calendario";
import { useState,useEffect } from "react";

const  Analitica =() => {

  const data = [
    { month: 'Enero', horas: 10 },
    { month: 'Febrero', horas: 15 },
    { month: 'Marzo', horas: 20 },
    { month: 'Abril', horas: 18 },
    { month: 'Mayo', horas: 25 },
    { month: 'Junio', horas: 30 },
    { month: 'Julio', horas: 10 },
    { month: 'Agosto', horas: 15 },
    { month: 'Septiembre', horas: 20 },
    { month: 'Octubre', horas: 18 },
    { month: 'Noviembre', horas: 25 },
    { month: 'Diciembre', horas: 30 },
  ];
  const [nc,setNc] = useState([]);
  useEffect(() => {
    fetch('http://deliverydashapi-env.eba-i3jft8cm.us-east-1.elasticbeanstalk.com/nivelescompletados/horas/mes', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token") || ""}`,
      },
    })
      .then(data => data.json())
      .then((data) => {
        setNc(data[0])
      })
  }, [])
  return (
    <div>
      <div className='div-grafica-containersa'>
        <div className='div-graficaana'>
          <div className="div-grafica-calor">
            <div className="div-grafica-tituloa">
              <p>Horas totales por mes</p>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data} margin={{ right: 100}}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="horas" stroke="#2E77BB" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
          
        <div className='div-graficaana'>
            <div className="div-grafica-calor">
              <div className="div-grafica-tituloa">
                <p>Distribución de usuarios conectados</p>
                <Calendario/>
                <div className="linea-gradiante"></div>
                <div className="leyendalinea">
                  <p>1</p>
                  <p>100</p>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Analitica;
