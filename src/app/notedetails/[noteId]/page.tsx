"use client"; 
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Navigation from "../../components/navigation/page";
import Parent from "../../components/Parents";


interface Note {
    name: string;
    description: string;
    lastEdited: string;
    category: string;
    parent: string;
}

const NoteDetails: React.FC = () => {
    const noteId = usePathname().split('/').pop(); 
    const [note, setNote] = useState<Note | null>(null);
    const [editedNote, setEditedNote] = useState<Note | null>(null);
    const [editMode, setEditMode] = useState<boolean>(false);

    useEffect(() => {
        const fetchNoteDetails = async () => {
            try {
                if (!noteId) {
                    throw new Error('Invalid note ID');
                }
                const response = await fetch(`/api/notes/${noteId}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch note details: ${response.status} - ${response.statusText}`);
                }
                const data: Note = await response.json();
                setNote(data);
                setEditedNote(data); // Initialize editedNote with the fetched note data

                console.log('Fetched note details:', data);
            } catch (error: any) {
                console.error('Error fetching note details:', error.message);
            }
        };

        fetchNoteDetails();
    }, [noteId]);

    const handleEditModeToggle = () => {
        if (note) {
            // Enter edit mode: Copy the current note data to editedNote
            setEditedNote({ ...note });
        }
        setEditMode(!editMode);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedNote(prevState => ({
            ...prevState!,
            [name]: value
        }));
    };

    const handleSaveNote = async () => {
        try {
            const response = await fetch(`/api/notes/${noteId}/update`, { 
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedNote),
            });
    
            if (!response.ok) {
                throw new Error(`Failed to update note: ${response.status} - ${response.statusText}`);
            }
    
            // Update the note state with editedNote
            setNote(editedNote);
            setEditMode(false);
        } catch (error: any) {
            console.error('Error updating note:', error.message);
        }
    };

    
    const handleNoteSelect = async (selectedNoteId: string) => {
        console.log("Selected note ID:", selectedNoteId); // Log the selected note ID
    
        try {
            const response = await fetch(`/api/notes/${selectedNoteId}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch parent note details: ${response.status}`);
            }
            const { name } = await response.json();
            console.log("Fetched parent title:", name); // Log the fetched parent title
            setEditedNote(prevState => ({
                ...prevState!,
                parent: name, // Set parent to the title of the selected note
            }));
        } catch (error) {
            console.error('Error fetching parent note details:', error);
        }
    };
    

    if (!note) {
        return <div>Loading...</div>;
    }

    

    return (
        <main className="lg:flex min-h-screenp-24 bg-dark-blue-bg">
            <div className="flex-none">
                <Navigation />
            </div>
            <div className="w-full lg:mx-10 lg:px-5 px-10 lg:my-10 py-5">
                <form autoComplete="off">
                    <br />
                    <input 
                        type="text" 
                        name="name" 
                        value={editMode ? editedNote?.name : note.name} 
                        onChange={handleInputChange}
                        className="focus:outline-none bg-dark-blue-bg text-white text-3xl rounded-lg block w-full p-2.5 placeholder-slate-400" 
                        required 
                        disabled={!editMode}
                    />
                    <br />
                    <input 
                        type="text" 
                        name="description" 
                        value={editMode ? editedNote?.description : note.description} 
                        onChange={handleInputChange}
                        placeholder="Note Description" 
                        className="focus:outline-none bg-dark-blue-bg text-white text-xl rounded-lg block w-full p-2.5 placeholder-slate-400" 
                        disabled={!editMode}
                    />
                    <br />
                    <input 
                        type="text" 
                        name="category" 
                        value={editMode ? editedNote?.category : note.category} 
                        onChange={handleInputChange}
                        placeholder="Note Category" 
                        className="focus:outline-none bg-dark-blue-bg text-white text-xl rounded-lg block w-full p-2.5 placeholder-slate-400" 
                        disabled={!editMode}
                    />
                    <br />
                    <input 
                        type="text" 
                        name="parent" 
                        value={editMode ? editedNote?.parent : note.parent} 
                        onChange={handleInputChange}
                        placeholder="Note Parent" 
                        className="focus:outline-none bg-dark-blue-bg text-white text-xl rounded-lg block w-full p-2.5 placeholder-slate-400" 
                        disabled={!editMode}
                    />
                    <br />
                    {editMode ? (
                        <button 
                            type="button" 
                            className="w-1/3 text-white bg-purple hover:bg-white hover:text-purple font-medium rounded-lg text-md p-2.5 my-10 text-center shadow-xl"
                            onClick={handleSaveNote} // Call handleSaveNote onClick instead of onSubmit
                        >
                            Save Note
                        </button>
                    ) : (
                        <button 
                            type="button" 
                            className="w-1/3 text-white bg-dark-purple hover:bg-white hover:text-purple font-medium rounded-lg text-md p-2.5 my-10 text-center shadow-xl"
                            onClick={handleEditModeToggle}
                        >
                            Edit Note
                        </button>
                    )}
                </form>
            </div>
        </main>
    );
};

export default NoteDetails;

