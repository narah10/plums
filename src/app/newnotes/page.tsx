"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import Navigation from "../components/navigation/page";
import TextEditor from '../components/TextEditor';

interface NoteFormData {
    noteName: string;
    noteDescription: string;
    noteCategory: string;
}

export default function NewNote() {
    const [formData, setFormData] = useState({
        taskName: '',
        taskDescription: '',
        taskCategory: '',
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
          const { taskName: noteTitle, taskDescription: noteDescription } = formData;
          const createdDate = new Date()
          
          const response = await fetch('/api/notes/create', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ noteTitle, noteDescription, createdDate }),
          });
  
          if (!response.ok) {
              throw new Error(`Failed to add task: ${response.status} - ${response.statusText}`)
          }
  
          // Clear form data after successful submission
          setFormData({
              taskName: '',
              taskDescription: '',
              taskCategory: '',
          });

          console.log('Task added successfully');
      } catch (error: any) {
          console.error('Error adding task:', error.message);
      }
  }
    return (
        <main className="lg:flex min-h-screenp-24 bg-dark-blue-bg">
            <div className="flex-none">
                <Navigation />
            </div>
            <div className="w-full lg:mx-10 lg:px-5 px-10 lg:my-10 py-5">
            <form onSubmit={handleSubmit}>
                <br></br>
                <input type="text" name="taskName" value={formData.taskName} onChange={handleChange} placeholder="Task Name" className="bg-gray-50 shadow-xl border border-gray-300 text-slate-700 text-sm rounded-lg block w-full p-2.5 placeholder-slate-400" required />
                <br></br>
                <input type="text" name="taskDescription" value={formData.taskDescription} onChange={handleChange} placeholder="Task Description" className="bg-gray-50 shadow-xl border border-gray-300 text-slate-700 text-sm rounded-lg block w-full p-2.5 placeholder-slate-400" required />
                <br></br>
                <input type="text" name="taskCategory" value={formData.taskCategory} onChange={handleChange} placeholder="Task Category" className="bg-gray-50 shadow-xl border border-gray-300 text-slate-700 text-sm rounded-lg block w-full p-2.5 placeholder-slate-400" required />
                <br></br>
                <TextEditor />
                <button type="submit" className="w-1/2 text-white bg-purple hover:bg-white hover:text-purple font-medium rounded-lg text-md p-2.5 my-10  text-center shadow-xl">Add New Note</button>
            </form>
            </div>
        </main>
    );
}
