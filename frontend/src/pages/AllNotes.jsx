import {useState,useEffect} from "react";
import {useNavigate} from "react-router-dom";
import SearchBar from "../components/SearchBar";
import TagFilter from "../components/TagFilter";
import NotesList from "../components/NotesList";
import EmptyState from "../components/EmptyState";

function AllNotes() {
    const [notes,setNotes] = useState([]);
    const [searchTerm,setSearchTerm] = useState("");
    const [selectedTag,setSelectedTag] = useState("All");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if(!token){
            navigate("/login");
        }

        // Dummy notes; replace with API call later
        const dummyNotes = [
            {
                id: 1,
                title: "React Cheatsheet",
                content: "Hooks, Context, useEffect tips",
                tags: ["React", "WebDev"],
                fileUrl: "", // You can add a sample file url
            },
            {
                id: 2,
                title: "Resume",
                content: "Updated resume for 2024",
                tags: ["Personal"],
                fileUrl: "/files/resume.pdf", // Example PDF
            },
        ];

        setNotes(dummyNotes);
    },[navigate]);

    const uniqueTags = ["All", ...new Set(notes.flatMap((n) => n.tags))];

    const filteredNotes = notes.filter((note) => {
        const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTag = selectedTag === "All" || note.tags.includes(selectedTag);
        return matchesSearch && matchesTag;
    });

    return (
        <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">All Notes</h1>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <TagFilter tags={uniqueTags} selectedTag={selectedTag} setSelectedTag={setSelectedTag} />
        {filteredNotes.length ? (
            <NotesList notes={filteredNotes} />
        ) : (
            <EmptyState message="No notes found." />
        )}
        </div>
    );
}

export default AllNotes;
