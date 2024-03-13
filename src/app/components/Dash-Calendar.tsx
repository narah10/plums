'use client'

import Navigation from "../components/navigation/page";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { Draggable, DropArg } from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useState, useEffect } from 'react'
import { EventSourceInput } from '@fullcalendar/core/index.js'

interface Event {
  title: string;
  start: Date | string;
  allDay: boolean;
  id: number;
}

export default function DashCalendar() {
  const [allEvents, setAllEvents] = useState<Event[]>([])
  const [showModal, setShowModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [idToDelete, setIdToDelete] = useState<number | null>(null)
  const [newEvent, setNewEvent] = useState<Event>({
      title: '',
      start: '',
      allDay: false,
      id: 0
  })

  const [isLargeScreen, setIsLargeScreen] = useState(true);
    
  useEffect(() => {
    function handleResize() {
      setIsLargeScreen(window.innerWidth > 1600);
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [isSmallScreen, setIsSmallScreen] = useState(true);
    
  useEffect(() => {
    function handleResize() {
      setIsSmallScreen(window.innerWidth < 1025);
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try{
          const response = await fetch('/api/events/get')
          if (!response.ok) {
            throw new Error(`Failed to fetch events: ${response.status} - ${response.statusText}`);
          }
          const data = await response.json()
          console.log(data)
          setAllEvents(data)
      }
      catch(error:any){
        console.error(`Error fetchin items: ${error.message}`)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="text-purple">
        {isLargeScreen ? (
            <div className="grid grid-cols-12 w-full m-auto overflow-visible">
            <div className="col-span-12">
                <FullCalendar
                plugins={[
                    dayGridPlugin,
                    interactionPlugin,
                    timeGridPlugin
                ]}
                headerToolbar={{
                    left: 'prev,next',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek'
                }}
                events={allEvents as EventSourceInput}
                aspectRatio={1.3}
                handleWindowResize={true}
                />
            </div>
            </div>
        ): (
          <div className="w-max m-auto">
            <FullCalendar
                plugins={[
                    dayGridPlugin,
                    interactionPlugin,
                    timeGridPlugin
                ]}
                headerToolbar={{
                    left: 'prev,next',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek'
                }}
                events={allEvents as EventSourceInput}
                aspectRatio={.9}
                handleWindowResize={true}
                />
          </div>
      )
    }
      {isSmallScreen ? (
        <div className="w-max m-auto hidden">
        <FullCalendar plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]} /> 
      </div>
      ): null}
  </div>
)}