import {useTheme} from "../context/ThemeContext";
import {Moon,Sun} from "lucide-react"; 

function ThemeToggle(){
    const {theme,toggleTheme} = useTheme();

    return (
        <button
        onClick={toggleTheme}
        className="p-2 rounded bg-gray-200 dark:bg-gray-800"
        >
        {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>
    );
}

export default ThemeToggle;
