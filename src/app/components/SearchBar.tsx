export default function SearchBar(){
    return(
    <form className="w-full max-w-md mx-auto">   
    <div className="relative">
        <input type="search" id="default-search" className="block w-full p-4 text-sm rounded-lg placeholder-gray-400 text-black" placeholder="Topic Name..." required />
        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-btn-purple hover:bg-tips-purple  focus:outline-nonefont-medium rounded-lg text-sm px-4 py-2">Search</button>
    </div>
</form>
    )
}

