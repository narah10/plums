"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import Navigation from "../components/navigation/page";
// import TextEditor from '../components/TextEditor';
import dynamic from 'next/dynamic';
import Parent from "../components/Parents"

const TextEditor = dynamic(() => import("../components/TextEditor"), {
    ssr: false,
  });

// Define a type for the usePathname hook
type UsePathname = () => string;

// Import usePathname conditionally for client-side usage
let usePathname: UsePathname | undefined;
if (typeof window !== 'undefined') {
    // TypeScript requires dynamic import syntax for conditional imports
    import('next/navigation').then(module => {
        usePathname = module.usePathname;
    });
}

export default function NewNote() {
    const [formData, setFormData] = useState({
        noteName: '',
        noteDescription: '',
        noteCategory: '',
        noteContent:'',
        noteImages: [] as string[],
        noteAttachments: [] as File[],
        parent: '',
        newTagName: '',
        selectedTag: null as { id: string; name: string } | null,
        tags: [] as { id: string; name: string }[],
    });


    useEffect(() => {
        fetchTags();
    }, []); // Fetch tags on component mount

    const fetchTags = async () => {
        try {
            const response = await fetch('/api/tags');
            if (!response.ok) {
                throw new Error(`Failed to fetch tags: ${response.status} - ${response.statusText}`);
            }
            const tagsData = await response.json();
            setFormData({
                ...formData,
                tags: tagsData,
            });
        } catch (error: any) {
            console.error('Error fetching tags:', error.message);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        if (value !== "create_new_tag") {
            const selectedTag = formData.tags.find(tag => tag.name === value);
            if (selectedTag) {
                console.log('Selected Tag ID:', selectedTag.id);
                setFormData({
                    ...formData,
                    selectedTag,
                });
            }
        } else {
            // If "create_new_tag" is selected, set selectedTag to null
            setFormData({
                ...formData,
                selectedTag: null,
            });
        }
    };

    const handleContentChange = (content: string, images: string[]) => {
        setFormData({
          ...formData,
          noteContent: content,
          noteImages: images,
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const { noteName, noteDescription, noteCategory, noteContent, noteImages, noteAttachments } = formData;
            const createdDate = new Date();

            // Create the note with the selected tag information
            const response = await fetch('/api/notes/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    noteTitle: noteName,
                    noteDescription,
                    createdDate,
                    noteCategory,
                    noteContent,
                    noteImages,
                    noteAttachments,
                    parent: formData.parent,
                    tagId: formData.selectedTag ? formData.selectedTag.id : null, // Pass the selected tag ID
                    tagName: formData.selectedTag ? formData.selectedTag.name : null, // Pass the selected tag name
                }),
            });

            if (!response.ok) {
                throw new Error(`Failed to add task: ${response.status} - ${response.statusText}`);
            }

            // Clear form data after successful submission
            setFormData({
                noteName: '',
                noteDescription: '',
                noteCategory: '',
                noteContent:'',
                noteImages: [],
                noteAttachments: [],
                parent: '',
                newTagName: '',
                selectedTag: null,
                tags: [],
            });

            console.log('Task added successfully');
        } catch (error: any) {
            console.error('Error adding task:', error.message);
        }
    }

    const handleNewTagSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const { newTagName } = formData;
            const response = await fetch('/api/tags/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: newTagName }),
            });

            if (!response.ok) {
                throw new Error(`Failed to create tag: ${response.status} - ${response.statusText}`);
            }

            console.log('Tag created successfully');
            fetchTags(); // Fetch tags again to update the dropdown options
            setFormData({
                ...formData,
                newTagName: '',
            });
        } catch (error: any) {
            console.error('Error creating tag:', error.message);
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
            setFormData(prevState => ({
                ...prevState,
                parent: name, // Set parent to the title of the selected note
            }));
        } catch (error) {
            console.error('Error fetching parent note details:', error);
        }
    };    
    

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
                    <select
                            name="selectedTag"
                            value={formData.selectedTag ? formData.selectedTag.name : ''}
                            onChange={handleChange}
                            className="focus:outline-none bg-grayish-purple text-white text-xl rounded-lg mb-5 block w-1/5 p-2.5 placeholder-slate-400"
                        >
                            <option value="create_new_tag">Create New Tag</option>
                            {formData.tags.map(tag => (
                                <option key={tag.id} value={tag.name}>{tag.name}</option>
                            ))}
                        </select>
                        <br></br>
                        <TextEditor content="" handleEditorChange={handleContentChange}/>

                        <Parent onSelect={handleNoteSelect} />
                    <button type="submit" className="w-1/3 text-white bg-purple hover:bg-white hover:text-purple font-medium rounded-lg text-md p-2.5 my-10  text-center shadow-xl">Add New Note</button>
                </form>
                {formData.selectedTag === null && (
                            <form onSubmit={handleNewTagSubmit}>
                                <input
                                    type="text"
                                    name="newTagName"
                                    value={formData.newTagName}
                                    onChange={handleChange}
                                    placeholder="New Tag Name"
                                    className="focus:outline-none bg-dark-blue-bg text-white text-xl rounded-lg block w-full p-2.5 placeholder-slate-400"
                                />
                                <button type="submit" className="text-white bg-purple hover:bg-white hover:text-purple font-medium rounded-lg text-md p-2.5 mt-3 text-center shadow-xl">
                                    Create New Tag
                                </button>
                        </form>)}
            </div>
        </main>
    );
}
