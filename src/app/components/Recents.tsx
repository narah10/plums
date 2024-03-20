'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Note {
  name: string;
  description: string;
  lastEdited: string;
  id: string;
  favorited: boolean;
}

export default function Recents() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(`/api/notes`, {
          next: { revalidate: 3600 },
        });
        if (!response.ok) {
          throw new Error(
            `Failed to fetch items: ${response.status}`
          );
        }
        const data = await response.json();
        const recentNotes = data;
        // Set both notes and filteredNotes to favorited notes
        setNotes(recentNotes);
      } catch (error: any) {
        console.error(`Error fetching items: ${error.message}`);
      }
    };
    fetchNotes();
  }, []);

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
  <section className="bg-gray text-black rounded-lg p-5 my-5 ml-0 w-full">
    <h1 className="text-2xl">Recents</h1>
    <div className="flex flex-col m-3">
      {notes.length === 0 ? (
        <ul className="[&>*:nth-child(odd)]:bg-slate-200">
          <li className="m-2 flex justify-between py-1 px-3">Loading<span className="text-slate-400">03/18/2018</span></li>
          <li className="m-2 flex justify-between py-1 px-3">Loading<span className="text-slate-400">03/18/2018</span></li>
          <li className="m-2 flex justify-between py-1 px-3">Loading<span className="text-slate-400">03/18/2018</span></li>
        </ul>
      ) : (
        <ul className="[&>*:nth-child(odd)]:bg-slate-200">
          {notes
            .sort((a, b) => new Date(b.lastEdited).getTime() - new Date(a.lastEdited).getTime()) // Sort notes by lastEdited in descending order
            .slice(0, 3) // Take only the first three notes
            .map((note) => (
              <Link className="m-2 flex justify-between py-1 px-3"  key={note.id} href={`/notedetails?noteId=${note.id}`} as={`/notedetails/${note.id}`}
              onClick={()=>{console.log(note.id)}}>
                {note.name}
                <span className="text-slate-400">{formatDate(note.lastEdited)}</span>
              </Link>
          ))}
        </ul>
      )}
    </div>
  </section>
);


}