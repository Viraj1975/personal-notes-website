import {useState} from "react";

import WelcomeBanner from '../components/WelcomeBanner';
import SearchBar from "../components/SearchBar";
import TagFilter from "../components/TagFilter";
import NotesList from "../components/NotesList";
import EmptyState from "../components/EmptyState";
import FloatingAddButton from "../components/FloatingAddButton"


const dummyNotes = [
    {title: "React Tips",content: "useEffect for side effects",tags: ["React","Study"]},
    {title: "Groceries",content: "Eggs, Milk, Bread",tags: ["Personal"]},
];

function Home() {
    const [searchTerm,setSearchTerm] = useState("");
    const [selectedTag,setSelectedTag] = useState("All");

    const uniqueTags = [...new Set(dummyNotes.flatMap((n) => n.tags))];

    const filteredNotes = dummyNotes.filter((note) => {
        const matchSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchTag = selectedTag==="All" || note.tags.includes(selectedTag);
        return matchSearch && matchTag;
    });

    return (
    <div className="p-6 max-w-3xl mx-auto">
        <WelcomeBanner />
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <TagFilter tags={uniqueTags} selectedTag={selectedTag} setSelectedTag={setSelectedTag} />
        {filteredNotes.length ? <NotesList notes={filteredNotes} /> : <EmptyState />}
        <FloatingAddButton />
        </div>
    );
}

export default Home;
