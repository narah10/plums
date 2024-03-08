'use client'
import React, { useState, useEffect } from 'react';
import Navigation from "../components/navigation/page";
import SearchBar from "../components/SearchBar";
import Link from 'next/link';
import notesData from "../../data/topics.json";
import AddTaskBtn from '../components/Add-Task-Btn';


interface Note {
    name: string;
    description: string;
    lastEdited: string;
    id: string;
}

function Notes() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);

    useEffect(() => {
        const fetchNotes = async()=> {
            try{
                const response = await fetch(`/api/notes`, {
                    next: { revalidate :3600},
                })
            if (!response.ok){
                throw new Error(
                    `Failed to fetch items: ${response.status}`
                )
            }
            const data = await response.json();
            console.log(data)
            setNotes(data)
            setFilteredNotes(data)
            }
            catch(error:any){
                console.error(`Error fetchin items: ${error.message}`)
            }
        }
        fetchNotes();
    }, []);

    const handleSearch = (keyword: string) => {
        const filtered = notes.filter((note) =>
            note.name.toLowerCase().includes(keyword.toLowerCase()) ||
            note.description.toLowerCase().includes(keyword.toLowerCase())
        );
        setFilteredNotes(filtered);
    };

    const handleDelete = async (id: string, title: string) => {
        if (!window.confirm(`Delete ${title}?`)) {
            return;
        }
        try {
            const apiUrl = `/api/notes/${id}/delete`;
            console.log(id)
            const requestData = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const response = await fetch(apiUrl, requestData);

            if (!response.ok) {
                throw new Error(
                    `Failed to delete ${title} - ${response.statusText}`
                );
            }

            // Remove the deleted note from the state
            setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
            setFilteredNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
            console.log('Note deleted successfully');
        } catch (error) {
            console.error(error);
            alert("Something went wrong while deleting the note.");
        }
    };
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        const month: number = date.getMonth() + 1;
        const day: number = date.getDate();
        const year: number = date.getFullYear();
        
        // Pad single digit month/day with leading zero
        const formattedMonth: string = month < 10 ? `0${month}` : month.toString();
        const formattedDay: string = day < 10 ? `0${day}` : day.toString();
    
        return `${formattedMonth}/${formattedDay}/${year}`;
    }


    return (
        <main className="lg:flex min-h-screenp-24 bg-dark-blue-bg">
            <div className="flex-none">
                <Navigation />
            </div>
            <div className="w-full lg:mx-10 lg:px-5 px-10 lg:my-10 py-5">
                <h1 className="text-white text-4xl font-semibold py-5 my-2">My Notes</h1>
                <div className="w-full flex">
                <SearchBar onSearch={handleSearch} />
                <button className="text-white bottom-2.5 bg-btn-purple hover:bg-tips-purple  focus:outline-nonefont-medium rounded-lg text-md px-4 py-2 ml-3"><Link href="/newnotes">New Note</Link></button>
                </div>
                <div className="mt-4">
                    {filteredNotes.map((note, index) => (
                        <>
                        <Link key={index} 
                            href={`/notedetails?noteId=${note.id}`}
                            as={`/notedetails/${note.id}`}
                        onClick={()=>{console.log(note.id)}}>
                        <div key={note.id} className="bg-list-bg hover:bg-tips-purple rounded-lg p-4 shadow-lg mb-4">
                            <div className="flex flex-col lg:flex-row lg:items-center">
                                <div className="lg:w-1/3 mb-2 lg:mb-0">
                                    <h2 className="text-xl font-semibold mb-2">{note.name}</h2>
                                </div>
                                <div className="lg:w-2/3 lg:pl-4">
                                    <p className="text-gray-700 mb-2"><span className="font-semibold">Description:</span> {note.description}</p>
                                    <p className="text-gray-500"><span className="font-semibold">Last Edited: </span>{formatDate(note.lastEdited)}</p>
                                </div>
                            </div>
                        </div>
                        </Link>
                        <button className="text-red-500 font-semibold" onClick={() => handleDelete(note.id, note.name)}>Delete</button>
                    </>
                    ))}
                </div>
            </div>
        </main>
    );
}

export default Notes;

