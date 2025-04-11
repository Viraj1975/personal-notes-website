import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Default profile image (you can replace this with your own path or a URL)
const DEFAULT_AVATAR =
  "https://www.gravatar.com/avatar/?d=mp&f=y"; // Gravatar's mystery person image

function Profile() {
    const [user,setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if(!storedUser){
            navigate("/login");
        }else{
            setUser(JSON.parse(storedUser));
        }
    }, [navigate]);

    if(!user) return null;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-sm text-center">
                {/* Profile Avatar */}
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                <img
                    src={user.avatar || DEFAULT_AVATAR}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full"
                />
                </div>

                {/* Name & Email */}
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {user.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
            </div>
        </div>
    );
}

export default Profile;
