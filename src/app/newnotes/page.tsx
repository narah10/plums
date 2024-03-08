"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import Navigation from "../components/navigation/page";
import TextEditor from '../components/TextEditor';

export default function NewNote() {
    const [formData, setFormData] = useState({
        noteName: '',
        noteDescription: '',
        noteCategory: '',
        noteContent:'',
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleContentChange = (content: string) => {
        setFormData({
          ...formData,
          noteContent: content,
        });
      };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
        const { noteName: noteTitle, noteDescription, noteCategory, noteContent } = formData; 
          const createdDate = new Date()
          
          const response = await fetch('/api/notes/create', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ noteTitle, noteDescription, createdDate, noteCategory, noteContent }),
          });
  
          if (!response.ok) {
              throw new Error(`Failed to add task: ${response.status} - ${response.statusText}`)
          }
  
          // Clear form data after successful submission
          setFormData({
            noteName: '',
            noteDescription: '',
            noteCategory: '',
            noteContent:'',
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
            <form autoComplete="off" onSubmit={handleSubmit}>
                <br></br>
                <input type="text"  name="noteName" value={formData.noteName} onChange={handleChange} placeholder="Title" className="focus:outline-none bg-dark-blue-bg text-white text-3xl rounded-lg block w-full p-2.5 placeholder-slate-400" required />
                <br></br>
                <input type="text" name="noteDescription" value={formData.noteDescription} onChange={handleChange} placeholder="Note Description" className="focus:outline-none bg-dark-blue-bg text-white text-xl rounded-lg block w-full p-2.5 placeholder-slate-400" />
                <br></br>
                <input type="text" name="noteCategory" value={formData.noteCategory} onChange={handleChange} placeholder="Note Category" className="focus:outline-none bg-dark-blue-bg text-white text-xl rounded-lg block w-full p-2.5 placeholder-slate-400" />
                <br></br>
                <TextEditor handleEditorChange={handleContentChange}/>
                <button type="submit" className="w-1/3 text-white bg-purple hover:bg-white hover:text-purple font-medium rounded-lg text-md p-2.5 my-10  text-center shadow-xl">Add New Note</button>
            </form>
            </div>
        </main>
    );
}
