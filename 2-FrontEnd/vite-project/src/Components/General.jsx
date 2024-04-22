import "../Styles/General.css"
import { useState,useEffect } from "react";
import TarjetaDashboard from "./TarjetaDashboard";
import TarjetaLeaderBoard from "./TarjetaLeaderBoard";
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useParams } from "react-router-dom";

const  General =() => {
  const [jt, setJt] = useState([]);
  const [tt, setTt] = useState([]);
  const [et, setEt] = useState([]);
  const [nc, setNc] = useState([]);

  const [pn, setPn] = useState([]); 
  const [leaders, setLeaders] = useState([]);

  const { id } = useParams();

  const fetchData = (url, setData) => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token") || ""}`,
      },
    })
    .then(data => data.json())
    .then((data) => {
      setData(data);
    })
  };  
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
        setJt(data[0])
      })
  }, [])

  useEffect(() => {
    fetch('http://deliverydashapi-env.eba-i3jft8cm.us-east-1.elasticbeanstalk.com/nivelescompletados/total/tiempo', {
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
    fetch('http://deliverydashapi-env.eba-i3jft8cm.us-east-1.elasticbeanstalk.com/nivelescompletados/stars', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token") || ""}`,
      },
    })
      .then(data => data.json())
      .then((data) => {
        setEt(data[0])
      })
  }, [])

  useEffect(() => {
    fetch('http://deliverydashapi-env.eba-i3jft8cm.us-east-1.elasticbeanstalk.com/nivelescompletados/total', {
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

  useEffect(() => {
    fetchData('http://deliverydashapi-env.eba-i3jft8cm.us-east-1.elasticbeanstalk.com/alumnos/time', setLeaders);
  }, []);

  useEffect(() => {
    fetchData('http://deliverydashapi-env.eba-i3jft8cm.us-east-1.elasticbeanstalk.com/nivelescompletados/total/nivel', setPn);
  }, []);


  useEffect(() => {
    const saveGames = () => {
      fetch('http://deliverydashapi-env.eba-i3jft8cm.us-east-1.elasticbeanstalk.com/alumnos/subscribed/time', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify({
          cursoID: id 
        }),
      })
        .then((res) => res.json())
        .then((result) => setLeaders(result))
        .catch((err) => console.log('error'))
    }
    saveGames()
  },[id]);
  return (
    <div>
        <div className='div-tarjetas'>
            <TarjetaDashboard id={1} titulo="Jugadores totales" dato={jt.alumnoCount}/>
            <TarjetaDashboard id={2} titulo="Minutos totales" dato={tt.minutos}/>
            <TarjetaDashboard id={3} titulo="Estrellas totales" dato={et.estrellasTotales}/>
            <TarjetaDashboard id={4} titulo="Niveles Completados" dato={nc.NivelesCompletados}/>
        </div>
        <div className='div-grafica-containers'>
            <div className='div-grafica'>
                <div className='div-grafica-titulo'>
                    <p>Tiempo promedio por nivel</p>
                </div>
                <div className="div-grafica-imagen">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      width={500}
                      height={300}
                      data={pn}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="nivel" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="promedio" fill="#0053B1" activeBar={<Rectangle fill="#52BEDA" stroke="#52BEDA" />} />
                    </BarChart>
                  </ResponsiveContainer>
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
                  {leaders.map(leader => 
                              <TarjetaLeaderBoard key={leader.nickname} usuario={leader.nickname} horas={leader.tiempoTotal}/>
                  )}
                </div>
            </div>
        </div>
    </div>
  )
}

export default General;
