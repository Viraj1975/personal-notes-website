function TagFilter({tags,selectedTag,setSelectedTag}){
    return (
        <div className="flex gap-2 mt-4 flex-wrap">
            {["All", ...tags].map((tag,i) => (
            <button
                key={i}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 rounded-full text-sm border ${
                selectedTag === tag ? "bg-blue-600 text-white" : "bg-white"
                }`}
            >
                {tag}
            </button>
            ))}
        </div>
    );
}
export default TagFilter;
