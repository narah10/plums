"use client"; 
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Navigation from "../../components/navigation/page";
import TextEditor from '../../components/TextEditor';
import Parent from "../../components/Parents";

interface Note {
    name: string;
    description: string;
    lastEdited: string;
    category: string;
    content: string;
    images: string[];
    attachments: string[];
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
                // Ensure that the content field is included in the initial state of editedNote
                setEditedNote({
                    ...data,
                    content: '', // Initialize content field to an empty string
                });
                setNote(data);
            } catch (error: any) {
                console.error('Error fetching note details:', error.message);
            }
        };
    
        fetchNoteDetails();
    }, [noteId]);
    
    
    const handleEditModeToggle = () => {
        if (note) {
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
    const handleEditorChange = (content: string) => {
        setEditedNote(prevState => ({
            ...prevState!,
            content: content
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
    

    if (!note) {
        return <div>Loading...</div>;
    }
    console.log(note.content)
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
                    {/* <div>
                        {note.images.map((image, index) => (
                            <img key={index} src={image} alt={`Image ${index + 1}`} />
                        ))}
                    </div>
                    <br />
                    <div>
                        {note.attachments.map((attachment, index) => (
                            <a key={index} href={attachment} target="_blank" rel="noopener noreferrer">{`Attachment ${index + 1}`}</a>
                        ))}
                    </div> */}
                    {/* <br /> */}
                    <input 
                        type="text" 
                        name="parent" 
                        value={editMode ? editedNote?.parent : note.parent} 
                        onChange={handleInputChange}
                        placeholder="Note Parent" 
                        className="focus:outline-none bg-dark-blue-bg text-white text-xl rounded-lg block w-full p-2.5 placeholder-slate-400" 
                        disabled={!editMode}
                    />
                    {/* <br /> */}
                    <br />
                    <TextEditor handleEditorChange={handleEditorChange} content={note.content} />

                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    {editMode ? (
                        <button 
                            type="button" 
                            className="w-1/3 text-white bg-purple hover:bg-white hover:text-purple font-medium rounded-lg text-md p-2.5 my-10 text-center shadow-xl"
                            onClick={handleSaveNote}
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

