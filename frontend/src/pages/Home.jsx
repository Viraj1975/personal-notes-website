import NotesList from "../components/NotesList";
import FloatingAddButton from "../components/FloatingAddButton";

const dummyNotes = [
    {
        title: "React Tips",
        content: "Remember to use useEffect for side effects.",
        tags: ["React", "Study"],
    },
    {
        title: "Grocery List",
        content: "Eggs, Milk, Bread, Butter",
        tags: ["Personal"],
    },
    ];

    function Home() {
    return (
        <div className="p-6 max-w-3xl mx-auto">
        <NotesList notes={dummyNotes} />
        <FloatingAddButton />
        </div>
    );
}

export default Home;
