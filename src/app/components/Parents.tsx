import React, { useState, useEffect } from 'react';

interface Note {
  id: string;
  name: string;
}

interface Props {
  onSelect: (value: string) => void;
  disabled?: boolean;
  initialSelectedValue?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export default function Parents({ onSelect }: Props) {
  const [parents, setParents] = useState<Note[]>([]);
  const [disabled, setDisabled] = React.useState(false);
  const [value, setValue] = React.useState('');


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
        setParents(data)
        }
        catch(error:any){
            console.error(`Error fetchin items: ${error.message}`)
        }
    }
    fetchNotes();
}, []);


  return (
    <select onChange={(e) => onSelect(e.target.value)} name="parent" id="parent" className="bg-dark-blue-bg border border-gray-300 text-white text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5 mt-5" >
      <option value="">Select a Parent Note</option>
      {parents.map((note) => (
        <option key={note.id} value={note.id}>
          {note.name}
        </option>
      ))}
    </select>
  )
}