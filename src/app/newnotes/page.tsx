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
    const [formData, setFormData] = useState<NoteFormData>({
        noteName: '',
        noteDescription: '',
        noteCategory: '',
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        console.log(`handleChange: name=${name}, value=${value}`);
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const { noteName, noteDescription } = formData;
            const createdDate = new Date();
            console.log(`handleSubmit: formData=${JSON.stringify(formData)}`);
            
            const response = await fetch('/api/notes/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ noteName, noteDescription, createdDate }),
            });
    
            if (!response.ok) {
                throw new Error(`Failed to add note: ${response.status} - ${response.statusText}`);
            }
    
            // Clear form data after successful submission
            setFormData({
                noteName: '',
                noteDescription: '',
                noteCategory: '',
            });
    
            console.log('Note added successfully');
        } catch (error: any) {
            console.error('Error adding note:', error.message);
        }
    };

    return (
        <main className="lg:flex min-h-screenp-24 bg-dark-blue-bg">
            <div className="flex-none">
                <Navigation />
            </div>
            <div className="w-full lg:mx-10 lg:px-5 px-10 lg:my-10 py-5">
                <form onSubmit={handleSubmit}>
                    <input
                        className="text-black border-2 border-gray-200 rounded w-1/2 py-2 px-4 text-gray-700 focus:outline-none focus:bg-white"
                        type="text"
                        name='noteName'
                        placeholder='Title'
                        value={formData.noteName}
                        onChange={handleChange}
                    />
                    <br></br>
                    <input
                     className="text-black"
                        type="text"
                        name='noteDescription'
                        placeholder='Brief Description'
                        value={formData.noteDescription}
                        onChange={handleChange}
                    />
                    <br></br>
                    <input
                    className="text-black"
                        type="text"
                        name='noteCategory'
                        placeholder='Add Category'
                        value={formData.noteCategory}
                        onChange={handleChange}
                    />
                    <br></br>
                    <TextEditor />
                    <button
                        type="submit"
                        className="w-full text-white bg-purple hover:bg-white hover:text-purple font-medium rounded-lg text-md p-2.5 my-10  text-center shadow-xl"
                    >
                        Add Note
                    </button>
                </form>
            </div>
        </main>
    );
}
