import "../Styles/Calendario.css"
import React, { useState,useEffect  } from 'react';
import antes from "../assets/antes.svg"
import despues from "../assets/despues.svg"

const  Calendario =() => {
  const [dias, setDias] = useState([]);
    const [usuarios, setUsuarios] = useState([
        {
          id: 1,
          date: new Date("2024-04-02T06:00:00.000Z"),
          total: 100
        },
        {
          id: 2,
          date: new Date("2024-04-03T06:00:00.000Z"),
          total: 20
        },
        {
          id: 3,
          date: new Date("2024-04-26T06:00:00.000Z"),
          total: 76
        },
        {
          id: 4,
          date: new Date("2024-04-01T06:00:00.000Z"),
          total: 23
        },
        {
          id: 5,
          date: new Date("2024-04-13T06:00:00.000Z"),
          total: 43
        },
        {
          id: 6,
          date: new Date("2024-04-12T06:00:00.000Z"),
          total: 23
        },
        {
          id: 7,
          date: new Date("2024-04-20T06:00:00.000Z"),
          total: 87
        }
      ]);
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    fetch('http://deliverydashapi-env.eba-i3jft8cm.us-east-1.elasticbeanstalk.com/nivelescompletados/total/tiempo/dia', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token") || ""}`,
      },
    })
      .then(data => data.json())
      .then((data) => {
        setDias(data)
        console.log(dias)
      })
  }, [])
  const months = [
    "Enero", "Febrero", "Marzo", 
    "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre",
    "Octubre", "Noviembre", "Diciembre"
  ];
  const prevMonth = () => {
    const currDate = new Date();
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
    if(total > 0 && total <= 20) {
      return '#81C3EA';
    } else if (total > 20 && total <= 40) {
      return '#5A92B5';
    } else if (total > 40 && total <= 60) {
      return '#337F9E';
    } else if (total > 60 && total <= 80) {
      return '#106D87';
    } else if (total > 80) {
      return '#00546E';
    }
  };
  
  const usuario = usuarios.find(usuario => usuario.date.getTime() === day.getTime());
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
      {renderCalendar()}
    </div>
  );
}

export default Calendario;
