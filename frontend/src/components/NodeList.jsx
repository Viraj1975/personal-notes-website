import NoteCard from "./NoteCard";

function NotesList({ notes }) {
    return (
        <div className="grid gap-4">
        {notes.map((note, index) => (
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

export default NotesList;
