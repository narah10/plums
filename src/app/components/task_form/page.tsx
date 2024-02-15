"use client";
import React, { useState } from 'react';

export default function AddNewTask() {
        const [formData, setFormData] = useState({
          taskName: '',
          taskDescription: '',
          taskCategory: '',
          taskNotes: '',
          taskImages: '',
          taskAttachments: '',
          taskLinks: [] as string[],
        });
      
        const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
          const { name, value } = event.target;
          if (name === 'taskLinks') {
            setFormData({
              ...formData,
              [name]: [...formData.taskLinks, value],
            });
          } else {
            setFormData({
              ...formData,
              [name]: value,
            });
          }
        };
      
        const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          console.log(formData);
        };
    return (
        <div id='add-task-container' className="bg-gradient-to-b from-purple to-dark-blue-bg p-8 rounded-xl shadow-xl md:max-w-4xl m-auto fixed inset-10 justify-center">
            <h1 className="text-white text-3xl font-bold text-center">Add New Task</h1>
            <form onSubmit={handleSubmit}>
                <br></br>
                <label htmlFor="task-name" className="block mb-2 text-md font-medium text-white">Task Name</label>
                <input type="text" name="taskName" value={formData.taskName} onChange={handleChange} placeholder="Task Name" className="bg-gray-50 shadow-xl border border-gray-300 text-slate-700 text-sm rounded-lg block w-full p-2.5 placeholder-slate-400" required/>
                <br></br>
                <label htmlFor="task-description" className="block mb-2 text-md font-medium text-white">Task Description</label>
                <input type="text" name="taskDescription" value={formData.taskDescription} onChange={handleChange} placeholder="Task Description" className="bg-gray-50 shadow-xl border border-gray-300 text-slate-700 text-sm rounded-lg block w-full p-2.5 placeholder-slate-400" required/>
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
                <label htmlFor="task-notes" className="block mb-2 text-md font-medium text-white">Add Notes</label>
                <textarea name="taskNotes" value={formData.taskNotes} onChange={handleChange} className="bg-gray-50 shadow-xl border border-gray-300 text-slate-700 text-sm rounded-lg block w-full p-2.5" />
                <br></br>
                <div className="flex flex-col text-center mt-5 md:flex-row md:justify-around md:align-middle">
                    <label htmlFor="task-images" className="mb-5 md:mb-2 px-5 py-3 text-md font-medium bg-purple hover:bg-white hover:text-purple text-white rounded-md shadow-xl cursor-pointer">Add Images</label>
                    <input type="file" name="taskImages" value={formData.taskImages} onChange={handleChange} className="hidden" id="task-images" multiple />

                    <label htmlFor="task-attachments" className="mb-5 md:mb-2 px-5 py-3 text-md font-medium bg-purple hover:bg-white hover:text-purple text-white rounded-md shadow-xl cursor-pointer">Add Attachments</label>
                    <input type="file" name="taskAttachments" value={formData.taskAttachments} onChange={handleChange} className="hidden" id="task-attachments" multiple />

                    <label htmlFor="task-links" className="mb-5 md:mb-2 px-5 py-3 text-md font-medium bg-purple hover:bg-white hover:text-purple text-white rounded-md shadow-xl cursor-pointer">Add Links</label>
                    <input type="url" name="taskLinks" value={formData.taskLinks} onChange={handleChange} className="hidden" id="task-links" multiple />
                    <ul>
                        {formData.taskLinks.map((link, index) => (
                        <li key={index}>{link}</li>
                        ))}
                    </ul>
                </div>
                <button type="submit" className="w-full text-white bg-purple hover:bg-white hover:text-purple font-medium rounded-lg text-md p-2.5 my-10  text-center shadow-xl">Add Task</button>
            </form>
        </div>
    );
}