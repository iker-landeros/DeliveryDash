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
            id: 2,
            date: new Date("2024-04-25T06:00:00.000Z"),
            total: 20
          }
      ]);

  const [selectedDate, setSelectedDate] = useState(null);


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

  const handleDateClick = (day) => {
    setDate(day);
  };

  const isDateSelected = (day) => {
    return selectedDate && selectedDate.getTime() === day.getTime();
  };

  const renderDay = (day) => {

    const classNames = ['day-calendar'];
  
    if (isDateSelected(day)) {
      classNames.push('selected-day');
    }

    if(usuarios.some(usuario => usuario.date.getTime() === day.getTime())) {
        classNames.push('has-cita'); 
      }

    return (
      <li key={day} className={classNames.join(' ')} onClick={() => handleDateClick(day)}>
        <div width={"100%"} height={"100%"} spacing={"-25px"}>
        {usuarios.some(usuario => usuario.date.getTime() === day.getTime()) ? (
    <div>
        <div className="relevance-circle">
            <p className='tooltipText'>{usuarios.find(usuario => usuario.date.getTime() === day.getTime()).total}</p>
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

    // Clear the array at the beginning
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
      <div>
        <div className='container-fechas'>
            <button className='boton-prepo' onClick={prevMonth}><img className='antes-depues' src={antes}></img></button>
                <p className='texto-calendario'>{months[date.getMonth()]} {date.getFullYear()}</p>
            <button className='boton-prepo' onClick={nextMonth}><img className='antes-depues' src={despues}></img></button>
        </div>
        <ul>
          {weekDays.map(day => (
            <li className='negritas' key={day}>{day}</li>
          ))}
        </ul>
        <ul className="days">
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
