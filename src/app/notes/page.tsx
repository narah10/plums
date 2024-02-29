'use client'
import React, { useState, useEffect } from 'react';
import Navigation from "../components/navigation/page";
import SearchBar from "../components/SearchBar";
import notesData from "../../data/topics.json";
import AddTaskBtn from '../components/Add-Task-Btn';


interface Note {
    name: string;
    description: string;
    last_edited: string;
}

function Notes() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);

    useEffect(() => {
        setNotes(notesData);
        setFilteredNotes(notesData);
    }, []);

    const handleSearch = (keyword: string) => {
        const filtered = notes.filter((note) =>
            note.name.toLowerCase().includes(keyword.toLowerCase()) ||
            note.description.toLowerCase().includes(keyword.toLowerCase())
        );
        setFilteredNotes(filtered);
    };



    return (
        <main className="lg:flex min-h-screenp-24 bg-dark-blue-bg">
            <div className="flex-none">
                <Navigation />
            </div>
            <div className="w-full lg:mx-10 lg:px-5 px-10 lg:my-10 py-5">
                <h1 className="text-white text-4xl font-semibold py-5 my-2">My Notes</h1>
                <SearchBar onSearch={handleSearch} />
            <AddTaskBtn />
                <div className="mt-4">
                    {filteredNotes.map((note, index) => (
                        <div key={index} className="bg-list-bg hover:bg-tips-purple rounded-lg p-4 shadow-lg mb-4">
                            <div className="flex flex-col lg:flex-row lg:items-center">
                                <div className="lg:w-1/3 mb-2 lg:mb-0">
                                    <h2 className="text-xl font-semibold mb-2">{note.name}</h2>
                                </div>
                                <div className="lg:w-2/3 lg:pl-4">
                                    <p className="text-gray-700 mb-2"><span className="font-semibold">Description:</span> {note.description}</p>
                                    <p className="text-gray-500"><span className="font-semibold">Last Edited:</span> {note.last_edited}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}

export default Notes;

