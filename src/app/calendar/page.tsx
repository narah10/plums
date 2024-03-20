'use client'

import Navigation from "../components/navigation/page";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { Draggable, DropArg } from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon, ExclamationTriangleIcon } from '@heroicons/react/20/solid'
import { EventSourceInput } from '@fullcalendar/core/index.js'
import { PrismaClient } from '@prisma/client';
import { title } from "process";

const prisma = new PrismaClient();

interface Event {
  title: string;
  start: Date | string;
  allDay: boolean;
  id: string;
}

export default function Calendar() {
    const [allEvents, setAllEvents] = useState<Event[]>([])
    const [showModal, setShowModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    let [idToDelete, setIdToDelete] = useState<string>('');
    let [idToEdit, setIdToEdit] = useState<string>('')
    const [newEvent, setNewEvent] = useState<Event>({
        title: '',
        start: '',
        allDay: false,
        id: ''
    })
    const [editableEvent, setEditableEvent] = useState<Event>({
      title: '',
      start: '',
      allDay: false,
      id: '',
    });
    

    console.log(newEvent.id);
    const [isLargeScreen, setIsLargeScreen] = useState(true);
    
    useEffect(() => {
      function handleResize() {
        setIsLargeScreen(window.innerWidth > 1024);
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


  function handleDateClick(arg: { date: Date, allDay: boolean }) {
    setNewEvent({ ...newEvent, start: arg.date, allDay: arg.allDay, id: '' })
    setShowModal(true)
  }

  function addEvent(data: DropArg) {
    const event = { ...newEvent, start: data.date.toISOString(), title: data.draggedEl.innerText, allDay: data.allDay, id: '' }
    setAllEvents([...allEvents, event])
  }

  function handleDeleteModal(data: { event: { id: string } }) {
    setShowDeleteModal(true);
    if (data.event.id !== null) {
      setIdToDelete(data.event.id);
    }
    console.log(data.event.id);
  }


  async function handleDelete(idToDelete: string, title: string) {
    try {
      if (!window.confirm(`Delete ${title}?`)) {
        return;
      }
      
      const apiUrl = `/api/events/${idToDelete}/delete`;
      
      const requestData = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };
      
      const response = await fetch(apiUrl, requestData);
  
      if (!response.ok) {
        throw new Error(`Failed to delete ${title} - ${response.statusText}`);
      }
  
      setAllEvents(allEvents.filter(event => event.id !== idToDelete));
      setShowDeleteModal(false);
      console.log('Event deleted successfully');
    } catch (error) {
      console.error(error)
      alert("Something went wrong while deleting the event.");
    }
  }

  function handleCloseModal() {
    setShowModal(false)
    setNewEvent({
      title: '',
      start: '',
      allDay: false,
      id: ''
    })
    setShowDeleteModal(false)
    // setIdToDelete(null)
    setShowEditModal(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewEvent({
      ...newEvent,
      title: e.target.value
    })
  }
  
  // function handleDeleteModal(data: { event: { id: string } }) {
  //   setShowDeleteModal(true);
  //   if (data.event.id !== null) {
  //     setIdToDelete(data.event.id);
  //   }
  //   console.log(data.event.id);
  // }

  function handleEditModal(data: { event: { id: string } }) {
    setShowEditModal(true);
    if (data.event.id !== null) {
      setIdToEdit(data.event.id);
    }
    console.log(data.event.id);
  }

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEditableEvent({
      ...editableEvent,
      title: e.target.value
    });
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Event updated successfully");
    setAllEvents(allEvents.map(event => event.id === editableEvent.id ? editableEvent : event));
    setShowEditModal(false);
    setEditableEvent({
      title: '',
      start: '',
      allDay: false,
      id: '',
    });
    try {
      const { id, title } = editableEvent;
      const response = await fetch(`/api/events/${idToDelete}/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      });
      console.log("something is happening: edit")
      if (!response.ok) {
        throw new Error(`Failed to update event: ${response.status} - ${response.statusText}`);
      }
      console.log('Event updated successfully');
      
    } catch (error: any) {
      console.error("Error updating event:", error.message)
    }
  }
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Event created successfully");
    setAllEvents([...allEvents, newEvent])
    setShowModal(false);
    setNewEvent({
      title: '',
      start: '',
      allDay: false,
      id: ''
    });
    try {
      const { title, start, allDay } = newEvent;
      console.log(title, start, allDay)
      const response = await fetch('/api/events/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, start, allDay }),
      });
      console.log("something is happening")
      if (!response.ok) {
        throw new Error(`Failed to create event: ${response.status} - ${response.statusText}`);
      }

      console.log('Event created successfully');
    } catch (error: any) {
      console.error("Error creating event:", error.message)
    }
  }


  return (
  <main className="lg:flex min-h-screenp-24 bg-dark-blue-bg">
  <div className="flex-none">
    <Navigation />
  </div>
  <div className="w-full lg:mx-10 lg:px-5 px-10 lg:my-10 py-5 text-purple flex min-h-screen flex-col items-center justify-between">
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
      
                dateClick={handleDateClick}
                drop={(data) => addEvent(data)}
                eventClick={(data) => handleDeleteModal(data)}
                />
            </div>
            </div>
        ): (
            <div className="w-full text-sm">
            <FullCalendar
            height='100vh'
            initialView='timeGridDay'
            plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
            headerToolbar={{ 
                left: 'prev,next', 
                center: 'title',
                right: 'timeGridDay'
            }}
            events={allEvents as EventSourceInput}
            dateClick={handleDateClick}
            drop={(data) => addEvent(data)}
            eventClick={(data) => handleDeleteModal(data)}
          /> 
          </div>
        )}


        {/* update Delete Modal */}
        <Transition.Root show={showDeleteModal} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={setShowDeleteModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"

            >
              <div className="fixed inset-0 bg-dark-blue-bg bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg
                   bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
                  >
                    <div className="bg-white text-dark-blue-bg px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center 
                      justify-center rounded-full bg-slate-100 sm:mx-0 sm:h-10 sm:w-10">
                          <ExclamationTriangleIcon className="h-6 w-6 text-lighter-blue" aria-hidden="true" />
                        </div>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                            Delete Event
                          </Dialog.Title>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              Are you sure you want to delete this event?
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button type="button" className="inline-flex w-full justify-center rounded-md bg-lighter-blue px-3 py-2 text-sm 
                      font-semibold text-white shadow-sm hover:bg-dark-blue-bg sm:ml-3 sm:w-auto" onClick={() => handleDelete(String(idToDelete), title)}>
                        Delete
                      </button>
                      <button type="button" className="inline-flex w-full justify-center rounded-md bg-lighter-blue px-3 py-2 text-sm 
                      font-semibold text-white shadow-sm hover:bg-dark-blue-bg sm:ml-3 sm:w-auto" onClick={() => handleEditModal({ event: { id: String(idToDelete) } })}>
                        Edit
                      </button>
                      <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white text-dark-blue-bg border-2- px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-lighter-blue hover:text-white sm:mt-0 sm:w-auto"
                        onClick={handleCloseModal}
                      >
                        Cancel
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* end update delete modal */}
        {/* start edit modal */}
        <Transition.Root show={showEditModal} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={setShowEditModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-dark-blue-bg bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 text-dark-blue-bg">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                    <div>
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                        <CheckIcon className="h-6 w-6 text-btn-purple" aria-hidden="true" />
                      </div>
                      <div className="mt-3 text-center sm:mt-5">
                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                          Update Event
                        </Dialog.Title>
                        <form action="submit" onSubmit={handleUpdate}>
                          <div className="mt-2">
                            <input
                              type="text"
                              name="title"
                              className="block w-full rounded-md border-0 border-purple py-1.5 text-slate-900 
                              shadow-sm ring-1 ring-inset ring-btn-purple placeholder:text-slate-400  
                              sm:text-sm sm:leading-6"
                              value={editableEvent.title}
                              onChange={handleEditChange}
                              placeholder="Enter New Title"
                            />
                          </div>
                          <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                            <button
                              type="submit"
                              className="inline-flex w-full justify-center rounded-md bg-btn-purple px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-tips-purple focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple sm:col-start-2 disabled:opacity-25"
                              disabled={editableEvent.title === ''}
                              onClick={() => setShowEditModal(false)}
                            >
                              Update
                            </button>
                            <button
                              type="button"
                              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-btn-purple hover:bg-tips-purple hover:text-white sm:col-start-1 sm:mt-0"
                              onClick={handleCloseModal}
                            >
                              Cancel
                            </button>
                          </div>
                        </form>

                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
        {/* end edit modal */}

        {/* create modal */}
        <Transition.Root show={showModal} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={setShowModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-dark-blue-bg bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 text-dark-blue-bg">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                    <div>
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                        <CheckIcon className="h-6 w-6 text-btn-purple" aria-hidden="true" />
                      </div>
                      <div className="mt-3 text-center sm:mt-5">
                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                          Add Event
                        </Dialog.Title>
                        <form action="submit" onSubmit={handleSubmit}>
                          <div className="mt-2">
                            <input type="text" name="title" className="block w-full rounded-md border-0 border-purple py-1.5 text-slate-900 
                            shadow-sm ring-1 ring-inset ring-btn-purple placeholder:text-slate-400  
                            sm:text-sm sm:leading-6"
                              value={newEvent.title} onChange={(e) => handleChange(e)} placeholder="Title" />
                          </div>
                          <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                            <button
                              type="submit"
                              className="inline-flex w-full justify-center rounded-md bg-btn-purple px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-tips-purple focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple sm:col-start-2 disabled:opacity-25"
                              disabled={newEvent.title === ''}
                            >
                              Create
                            </button>
                            <button
                              type="button"
                              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-btn-purple hover:bg-tips-purple hover:text-white sm:col-start-1 sm:mt-0"
                              onClick={handleCloseModal}

                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
        </div>
  </main >
  )
}