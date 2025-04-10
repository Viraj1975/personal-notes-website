function NoteCard({title,content,tags}){
    return (
        <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 space-y-2">
            <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            <p className="text-gray-600">{content}</p>
            {tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag,index) => (
                    <span
                        key={index}
                        className="bg-blue-100 text-blue-700 px-2 py-1 text-sm rounded-full"
                    >
                        #{tag}
                    </span>
                    ))}
                </div>
            )}
        </div>
    );
}

export default NoteCard;