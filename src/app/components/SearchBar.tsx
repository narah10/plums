'use client'
import React, { useState } from 'react';

interface SearchBarProps {
    onSearch: (keyword: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Call the onSearch function passed from the Home component
        onSearch(searchTerm);
    };

    return (
        <form className="w-full max-w-md ml-0" onSubmit={handleSubmit}>   
            <div className="relative">
                <input type="search" id="default-search" className="block w-full p-4 text-sm rounded-lg placeholder-gray-400 text-black" placeholder="Topic Name..." value={searchTerm} onChange={handleChange} required />
                <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-btn-purple hover:bg-tips-purple  focus:outline-nonefont-medium rounded-lg text-sm px-4 py-2">Search</button>
            </div>
        </form>
    );
}

export default SearchBar;
