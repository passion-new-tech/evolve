// CalendrierEvenements.jsx
import React, { useState,useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from  '@fullcalendar/timegrid';

import interactionPlugin from '@fullcalendar/interaction'; // pour interactivité
import './Calendrier.css';

export default function CalendrierEvenements() {
    const calendarRef= useRef(null);
    const[view,setView]=useState('dayGridMonth');
  const [events, setEvents] = useState([
    { title: 'Programme React', date: '2025-07-01' },
    { title: 'Réunion', date: '2025-07-03' },
  ]);

  const handleDateClick = (info) => {
    const titre = prompt('Nom de l’événement :');
    if (titre) {
      setEvents([...events, { title: titre, date: info.dateStr }]);
    }
  };
   const handleChangeView = (nextView) => {
    setView(nextView);
    const calendarApi = calendarRef.current.getApi();
    calendarApi.changeView(nextView);
  };


  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <h2>Calendrier des programmes et événements</h2>
      <div class="formCalend">
        <div class="main-calend">
            <input type="checkbox" id="menu-toggle"/>
            <label htmlFor='menu-toggle' class="btn-org"> Mes vues : </label>
            <ul class="menu-vues">
                <li onClick={()=>handleChangeView('dayGridMonth')}> Par mois</li>
                <li onClick={()=>handleChangeView('dayGridWeek')}>Par semaine</li>
                <li onClick={()=>handleChangeView('timeGridDay')}> Par jour</li> 

            </ul>
        </div>
      </div>
      <FullCalendar 
      ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin,timeGridPlugin]}
        initialView= "dayGridWeek"
        firstDay={1}
        events={events}
        dateClick={handleDateClick}
        locale='fr' 
        height="auto"
      />
    </div>
  );
}
