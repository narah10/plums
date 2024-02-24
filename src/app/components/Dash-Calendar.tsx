'use client'

import Navigation from "../components/navigation/page";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { Draggable, DropArg } from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useState } from 'react'
// import { Dialog, Transition } from '@headlessui/react'
// import { CheckIcon, ExclamationTriangleIcon } from '@heroicons/react/20/solid'
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

function handleDateClick(arg: { date: Date, allDay: boolean }) {
  setNewEvent({ ...newEvent, start: arg.date, allDay: arg.allDay, id: new Date().getTime() })
  setShowModal(true)
}

function addEvent(data: DropArg) {
  const event = { ...newEvent, start: data.date.toISOString(), title: data.draggedEl.innerText, allDay: data.allDay, id: new Date().getTime() }
  setAllEvents([...allEvents, event])
}

  return (
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
                // nowIndicator={true}
                // editable={true}
                // droppable={true}
                // selectable={true}
                // selectMirror={true}
                dateClick={handleDateClick}
                drop={(data) => addEvent(data)}
                />
            </div>
            </div>
  )
}