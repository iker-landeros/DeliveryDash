import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import "../Styles/Barchart.css"
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
const BarChartGraph = () => {
    const { id } = useParams();
    const [pn, setPn] = useState([]); 

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
      fetchApi(`${import.meta.env.VITE_SECRET}/nivelescompletados/promedio/nivel/curso`,
      id,setPn,true)
    },[id]);
  
    return (
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
    )
}
export default BarChartGraph;