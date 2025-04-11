import {useState} from "react";
import {useNavigate} from "react-router-dom";

function AddNote() {
    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");
    const [tags,setTags] = useState([]);
    const [tagInput,setTagInput] = useState("");
    const [file,setFile] = useState(null);
    const [error,setError] = useState("");

    const navigate = useNavigate();

    const handleAddTag = (e) => {
        e.preventDefault();
        if (tagInput && !tags.includes(tagInput)) {
        setTags([...tags, tagInput]);
        setTagInput("");
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        const allowedTypes = [
        "application/pdf",
        "image/png",
        "image/jpeg",
        "image/jpg",
        "text/plain",
        "application/msword", // .doc
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
        ];

        if(selectedFile && allowedTypes.includes(selectedFile.type)){
            setFile(selectedFile);
            setError("");
        }else{
            setError("Only PDF, text, doc, docx, or image files are allowed");
            setFile(null);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!title || !content){
            setError("Title and content are required");
            return;
        }

        // Simulate note creation – later replace with actual API call
        const newNote = {
            title,
            content,
            tags,
            fileName: file ? file.name : null,
            fileType: file ? file.type : null,
        };

        console.log("Note created:", newNote);

        // Reset form
        setTitle("");
        setContent("");
        setTags([]);
        setFile(null);
        setError("");

        navigate("/");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-2xl space-y-4"
                encType="multipart/form-data"
            >
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center">Add a New Note</h2>

                {error && <p className="text-red-600 text-sm text-center">{error}</p>}

                <input
                type="text"
                placeholder="Note Title"
                className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                />

                <textarea
                placeholder="Write your note here..."
                className="w-full px-4 py-2 h-40 border rounded-md dark:bg-gray-700 dark:text-white"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                />

                {/* Tags */}
                <div>
                <form onSubmit={handleAddTag} className="flex gap-2 mb-2">
                    <input
                    type="text"
                    placeholder="Add tag"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    className="flex-grow px-3 py-1 border rounded-md dark:bg-gray-700 dark:text-white"
                    />
                    <button
                    type="submit"
                    className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                    Add Tag
                    </button>
                </form>

                <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                    <span
                        key={index}
                        className="bg-gray-200 dark:bg-gray-600 text-sm px-3 py-1 rounded-full text-gray-800 dark:text-white"
                    >
                        {tag}
                    </span>
                    ))}
                </div>
                </div>

                {/* File Upload */}
                <input
                type="file"
                accept=".pdf,.png,.jpg,.jpeg,.txt,.doc,.docx"
                onChange={handleFileChange}
                className="w-full"
                />
                {file && (
                <p className="text-sm text-gray-700 dark:text-gray-300">Attached: {file.name}</p>
                )}

                <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
                >
                Save Note
                </button>
            </form>
        </div>
    );
}

export default AddNote;
