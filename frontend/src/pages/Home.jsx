import NoteCard from "../components/NoteCard";

const dummyNotes = [
    {
        title: "React Tips",
        content: "Remember to use useEffect for side effects.",
        tags: ["React","Study"],
    },
    {
        title: "Grocery List",
        content: "Eggs, Milk, Bread, Butter",
        tags: ["Personal"],
    },
];

function Home() {
    return (
        <div className="p-6 grid gap-4">
        {dummyNotes.map((note,index) => (
            <NoteCard
            key={index}
            title={note.title}
            content={note.content}
            tags={note.tags}
            />
        ))}
        </div>
    );
}

export default Home;
