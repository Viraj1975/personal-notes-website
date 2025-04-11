function SearchBar({searchTerm,setSearchTerm}) {
    return (
        <input
            type="text"
            placeholder="Search notes..."
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
    );
}
export default SearchBar;
