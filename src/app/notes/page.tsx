'use client'
import React, { useState, useEffect } from 'react';
import Navigation from "../components/navigation/page";
import SearchBar from "../components/SearchBar";
import Link from 'next/link';
import Image from 'next/image';
import FavoriteIcon from '@mui/icons-material/Favorite'; 
import Note from '../../models/note';

// interface Note {
//     id: string;
//     name: string;
//     description: string | null;
//     category: string | null;
//     content: string | null;
//     createdAt: Date;
//     lastEdited: Date | null;
//     favorited: boolean; 
// }

function Notes() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
    const [tag, setTag] = useState({
        selectedTag: null as { id: string; name: string } | null,
        tags: [] as { id: string; name: string }[],
    });

    useEffect(() => {
        fetchTags();
    }, []); // Fetch tags on component mount

    useEffect(() => {
        fetchNotes();
    }, [tag.selectedTag]); // Fetch notes when the selected tag changes

    const fetchTags = async () => {
        try {
            const response = await fetch('/api/tags');
            if (!response.ok) {
                throw new Error(`Failed to fetch tags: ${response.status} - ${response.statusText}`);
            }
            const tagsData = await response.json();
            setTag({
                ...tag,
                tags: tagsData,
            });
        } catch (error: any) {
            console.error('Error fetching tags:', error.message);
        }
    };

    const fetchNotes = async () => {
        try {
            let url = '/api/notes';
            if (tag.selectedTag) {
                url += `?tagId=${tag.selectedTag.id}`;
            }
            const response = await fetch(url, {
                next: { revalidate: 3600 },
            });
            if (!response.ok) {
                throw new Error(`Failed to fetch notes: ${response.status}`);
            }
            const data = await response.json();
            setNotes(data);
            setFilteredNotes(data);
        } catch (error: any) {
            console.error(`Error fetching notes: ${error.message}`);
        }
    };

    const handleSearch = (keyword: string) => {
        const filtered = notes.filter((note) =>
            note.name.toLowerCase().includes(keyword.toLowerCase()) ||
            note.description.toLowerCase().includes(keyword.toLowerCase())
        );
        setFilteredNotes(filtered);
    };

    const handleTags = (event: React.ChangeEvent<HTMLSelectElement>) => {
        // const { name, value } = event.target;
        // setTag(prevTag => ({
        //     ...prevTag,
        //     [name]: value,
        // }));
        console.log(notes);
        const selectedTagId = event.target.value;
        const selectedTag = tag.tags.find(tag => tag.id === selectedTagId);
        if (selectedTag) {
            const filtered = notes.filter(note => note.labelIDs?.includes(selectedTag.id));
            setFilteredNotes(filtered);
        } else {
            // If no tag is selected, show all notes
            setFilteredNotes(notes);
        }
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

    const handleFavorite = async (id: string) => {
        try {
            const noteToUpdate = notes.find(note => note.id === id);
            if (!noteToUpdate) {
                console.error(`Note with id ${id} not found.`);
                return;
            }

            const updatedNotes = notes.map(note =>
                note.id === id ? { ...note, favorited: !note.favorited } : note
            );
            setNotes(updatedNotes);
            setFilteredNotes(updatedNotes);
            let noteId = id;
            const apiUrl = `/api/notes/${noteId}/favorite`;
            const requestData = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const response = await fetch(apiUrl, requestData);

            if (!response.ok) {
                throw new Error(`Failed to update favorite state of note ${noteId}`);
            }
        } catch (error) {
            console.error("Error handling favorite:", error);
            alert("Something went wrong while favoriting the note.");
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
                    <button className="text-white bottom-2.5 bg-btn-purple hover:bg-tips-purple  focus:outline-nonefont-medium rounded-lg text-md px-4 py-2 ml-3">
                        <Link href="/newnotes">New Note</Link>
                    </button>
                    <select
                        name="selectedTag"
                        value={tag.selectedTag ? tag.selectedTag.id : ''}
                        onChange={handleTags}
                        className="focus:outline-none bg-grayish-purple text-white text-xl rounded-lg block w-1/5 p-2.5 ml-3"
                    >
                        <option value="">Select Tag</option>
                        {tag.tags.map(tag => (
                            <option key={tag.id} value={tag.id}>{tag.name}</option>
                        ))}
                    </select>
                </div>
                <div className="mt-4">
                    {filteredNotes.map((note, index) => (
                        <div className='grid grid-cols-[80%_5%_5%] gap-7' key={note.id}>
                            <Link
                                href={`/notedetails?noteId=${note.id}`}
                                as={`/notedetails/${note.id}`}
                                onClick={()=>{console.log(note.id)}}
                            >
                                <div key={note.id} className=" bg-list-bg hover:bg-tips-purple rounded-lg p-4 shadow-lg mb-4">
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
                            <button className="text-red-500 font-semibold" onClick={() => handleFavorite(note.id)}>
                                <FavoriteIcon color={note.favorited ? "secondary" : "action"} />
                            </button>
                            <button className="text-red-500 font-semibold" onClick={() => handleDelete(note.id, note.name)}>
                                <Image alt="" src={'/assets/delete.svg'} width="20" height="20" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}

export default Notes;

