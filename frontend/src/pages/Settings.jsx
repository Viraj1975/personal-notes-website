import {useState,useEffect} from "react";

function Settings() {
    const user = JSON.parse(localStorage.getItem("user"));

    const [name,setName] = useState(user?.name || "");
    const [email,setEmail] = useState(user?.email || "");
    const [theme,setTheme] = useState("light");

    const handleSave = (e) => {
        e.preventDefault();

        // You'd make a PUT/PATCH API call here to update the user
        console.log("Settings saved:",{name,email,theme});

        // Optional: Update localStorage user
        const updatedUser = {...user,name,email};
        localStorage.setItem("user",JSON.stringify(updatedUser));

        alert("Settings saved successfully!");
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "light";
        setTheme(savedTheme);
    }, []);

    const handleThemeChange = (e) => {
        const selectedTheme = e.target.value;
        setTheme(selectedTheme);
        localStorage.setItem("theme", selectedTheme);
        document.documentElement.classList.toggle("dark", selectedTheme === "dark");
    };

    return (
        <div className="max-w-3xl mx-auto p-6 mt-10 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Settings</h2>

            <form onSubmit={handleSave} className="space-y-4">
                <div>
                <label className="block mb-1 text-sm font-semibold text-gray-700 dark:text-gray-200">Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
                />
                </div>

                <div>
                <label className="block mb-1 text-sm font-semibold text-gray-700 dark:text-gray-200">Email</label>
                <input
                    type="email"
                    value={email}
                    disabled // Email is usually non-editable
                    className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white cursor-not-allowed"
                />
                </div>

                <div>
                <label className="block mb-1 text-sm font-semibold text-gray-700 dark:text-gray-200">Theme</label>
                <select
                    value={theme}
                    onChange={handleThemeChange}
                    className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
                >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                </select>
                </div>

                <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
                >
                Save Settings
                </button>
            </form>
        </div>
    );
}

export default Settings;
