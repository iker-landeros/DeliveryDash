import "../Styles/Calendario.css"
import React, { useState,useEffect  } from 'react';
import antes from "../assets/antes.svg"
import despues from "../assets/despues.svg"
import { useParams } from "react-router-dom";


const  Calendario =() => {
  const { id } = useParams();
  const [dias, setDias] = useState([]);
  const [updatedArray, setUpdatedArray] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SECRET}/nivelescompletados/total/tiempo/dia`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
            },
          }
        );
        const data = await response.json();
        setDias(data);
        const updatedArray2 = data.map((item,index) => ({
          id: index + 1,
          date: (() => {
            const fecha = new Date(item.fecha);
            fecha.setDate(fecha.getDate() + 1); // Sumar 1 día a la fecha
            return new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), 0, 0, 0); // Establecer la hora a las 00:00
          })(),
          total: item.usuarios,
        }));
        setUpdatedArray(updatedArray2);
      } catch (err) {
        setError(err);
      } finally {
        setIsFetching(false);
      }
    };

    fetchData();
  }, [id]);

  const [date, setDate] = useState(new Date());
  const months = [
    "Enero", "Febrero", "Marzo", 
    "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre",
    "Octubre", "Noviembre", "Diciembre"
  ];
  const prevMonth = () => {
    const currDate = new Date(date);
    currDate.setMonth(date.getMonth() - 1);
    setDate(currDate);
  }

  const nextMonth = () => {
    const currDate = new Date(date);
    currDate.setMonth(date.getMonth() + 1);
    setDate(currDate);
  }

  const weekDays = [
    "Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"
  ];


  const renderDay = (day) => {
  const classNames = ['day-calendar'];
  const getBackgroundColor = (total) => {
    if(total > 0 && total <= 1) {
      return '#81C3EA';
    } else if (total > 1 && total <= 2) {
      return '#5A92B5';
    } else if (total > 2 && total <= 3) {
      return '#337F9E';
    } else if (total > 3 && total <= 4) {
      return '#106D87';
    } else if (total > 5) {
      return '#00546E';
    }
  };
  const usuario = updatedArray.find(usuario => usuario.date.getTime() === day.getTime());
  const backgroundColor = usuario ? getBackgroundColor(usuario.total) : 'default-color';
  return (
      <li key={day} className={classNames.join('')}>
        <div>
          {usuario ? (
            <div>
              <div className={'relevance-circle'} style={{ backgroundColor }}>
                <p className='tooltipText'>{usuario.total}</p>
              </div>
            </div>
          ) : (
            <p>{day.getDate()}</p>
          )}
        </div>
      </li>
    );
  };

  const renderCalendar = () => {
    const totalDays = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const monthStartsOn = new Date(date.getFullYear(), date.getMonth(), 1).getDay();

    const days = [];


    for (let i = monthStartsOn; i > 0; i--) {
        days.push(
          <li key={i}></li>
        ); 
      }

    for (let i = 1; i <= totalDays; i++) {
      const currentDay = new Date(date.getFullYear(), date.getMonth(), i);
      days.push(renderDay(currentDay));
    }

    return (
      <div className='days'>
        <div >
          <div className='container-fechas'>
            <button className='boton-prepo' onClick={prevMonth}><img className='antes-depues' src={antes}></img></button>
                <p className='texto-calendario'>{months[date.getMonth()]} {date.getFullYear()}</p>
            <button className='boton-prepo' onClick={nextMonth}><img className='antes-depues' src={despues}></img></button>
          </div>
        </div>
        <ul>
          {weekDays.map(day => (
            <li className='negritas' key={day}>{day}</li>
          ))}
        </ul>
        <ul>
            {days}
        </ul>
      </div>
    );
  };

  return (
    <div className="calendar">
      {isFetching && <p>Cargando...</p>}
      {error && <p>Error: {error.message}</p>}
      {renderCalendar()}
    </div>
  );
}

export default Calendario;
