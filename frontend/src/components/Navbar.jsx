import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="bg-blue-600 text-white p-4 shadow-md">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
            <Link to="/" className="text-lg font-bold">
            Personal Notes
            </Link>
            <div className="space-x-4">
            <Link to="/" className="hover:underline">
                Home
            </Link>
            <Link to="/add" className="hover:underline">
                Add Note
            </Link>
            </div>
        </div>
        </nav>
    );
}

export default Navbar;
