import {useState} from "react";
import {useNavigate,Link} from "react-router-dom";

function Login() {
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try{
            const response = await fetch("http://localhost:5000/api/login",{
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if(!response.ok){
                throw new Error(data.message || "Login failed");
            }

            localStorage.setItem("authToken", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            navigate("/profile");
        }catch(err){
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <form
                onSubmit={handleLogin}
                className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md"
            >
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
                Sign In
                </h2>

                {error && (
                <div className="mb-4 text-red-600 text-center text-sm">{error}</div>
                )}

                <input
                type="email"
                placeholder="Email"
                className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />

                <input
                type="password"
                placeholder="Password"
                className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />

                <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                >
                Login
                </button>

                <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
                Don't have an account?{" "}
                <Link to="/signup" className="text-blue-600 hover:underline">
                    Sign up here
                </Link>
                </p>
            </form>
        </div>
    );
}

export default Login;
