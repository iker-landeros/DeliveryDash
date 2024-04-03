import React, { useState  } from 'react';
import "../Styles/Calendario.css"
import antes from "../assets/antes.svg"
import despues from "../assets/despues.svg"
const  Calendario =() => {
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
            date: new Date("2024-04-25T06:00:00.000Z"),
            total: 2
          }
      ]);
  const [date, setDate] = useState(new Date());


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
      if (total > 20) {
        return 'red';
      } else if (total === 10) {
        return 'green';
      } else {
        return 'default-color';
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
