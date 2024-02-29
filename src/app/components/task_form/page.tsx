"use client";
import React, { useState } from 'react';
import TextEditor from '../TextEditor';

export default function AddNewTask() {
    const [formData, setFormData] = useState({
        taskName: '',
        taskDescription: '',
        taskCategory: 'Select Category',
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
              taskCategory: 'Select Category',
          });

          console.log('Task added successfully');
      } catch (error: any) {
          console.error('Error adding task:', error.message);
      }
  }

    return (
        <div id='add-task-container' className="z-50 bg-gradient-to-b from-purple to-dark-blue-bg p-8 rounded-xl shadow-xl md:max-w-4xl m-auto fixed inset-10 justify-center">
            <h1 className="text-white text-3xl font-bold text-center">Add New Task</h1>
            <form onSubmit={handleSubmit}>
                <br></br>
                <label htmlFor="task-name" className="block mb-2 text-md font-medium text-white">Task Name</label>
                <input type="text" name="taskName" value={formData.taskName} onChange={handleChange} placeholder="Task Name" className="bg-gray-50 shadow-xl border border-gray-300 text-slate-700 text-sm rounded-lg block w-full p-2.5 placeholder-slate-400" required />
                <br></br>
                <label htmlFor="task-description" className="block mb-2 text-md font-medium text-white">Task Description</label>
                <input type="text" name="taskDescription" value={formData.taskDescription} onChange={handleChange} placeholder="Task Description" className="bg-gray-50 shadow-xl border border-gray-300 text-slate-700 text-sm rounded-lg block w-full p-2.5 placeholder-slate-400" required />
                <br></br>
                <label htmlFor="task-category" className="block mb-2 text-md font-medium text-white">Task category</label>
                <select name="taskCategory" value={formData.taskCategory} onChange={handleChange} className="bg-gray-50 shadow-xl border border-gray-300 text-slate-400 text-sm rounded-lg block w-full p-2.5">
                    <option value="Select Category" className="text-slate-300">Select Category</option>
                    <option value="Math" className="text-slate-700">Math</option>
                    <option value="Coding" className="text-slate-700">Coding</option>
                    <option value="Faith" className="text-slate-700">Faith</option>
                    <option value="Cooking" className="text-slate-700">Cooking</option>
                    <option value="Spanish" className="text-slate-700">Spanish</option>
                </select>
                <br></br>
                <TextEditor />

                <button type="submit" className="w-full text-white bg-purple hover:bg-white hover:text-purple font-medium rounded-lg text-md p-2.5 my-10  text-center shadow-xl">Add Task</button>
            </form>
        </div>
    );
}
