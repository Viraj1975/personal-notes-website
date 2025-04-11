import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

function FloatingAddButton() {
    return (
        <Link
        to="/add"
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition"
        >
        <Plus size={24} />
        </Link>
    );
}

export default FloatingAddButton;
