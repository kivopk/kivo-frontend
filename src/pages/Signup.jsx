import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { trpc } from "../services/trpc";
const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const register = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!username || !email || !password) {
            setError("All fields are required");
            return;
        }

        try {
            await trpc.auth.register.mutate({
                username,
                email,
                password,
            });

            setSuccess("Account created successfully! Redirecting to login...");
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (err) {
            console.error(err);
            if (err.message && err.message.includes("is not valid JSON")) {
                setError("API Configuration Error: The server returned an HTML error page. Please correctly set your VITE_API_URL environment variable on your live server to point to your Railway backend.");
            } else {
                setError(err.message || "Registration failed. User may already exist.");
            }
        }
    };

    return (
        <div className="flex flex-col items-center h-screen bg-white">
            <Link to="/">
                <h1 className="text-4xl font-bold my-8 cursor-pointer">KIVO</h1>
            </Link>

            <div className="w-[350px] border border-gray-300 rounded-md p-6">
                <h1 className="text-3xl font-medium mb-4">Create Account</h1>

                {error && <p className="text-red-500 mb-2 text-sm">{error}</p>}
                {success && <p className="text-green-500 mb-2 text-sm">{success}</p>}

                <form className="flex flex-col space-y-3" onSubmit={register}>
                    <h5 className="font-bold">Username</h5>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="border border-gray-400 p-1 rounded-sm focus:outline-amazon_orange"
                        placeholder="Enter username"
                    />

                    <h5 className="font-bold">Email</h5>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-gray-400 p-1 rounded-sm focus:outline-amazon_orange"
                        placeholder="Enter your email"
                    />

                    <h5 className="font-bold">Password</h5>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-gray-400 p-1 rounded-sm focus:outline-amazon_orange"
                        placeholder="At least 6 characters"
                    />

                    <button
                        type="submit"
                        className="bg-amazon_yellow rounded-sm py-1 font-medium border border-gray-500 shadow-sm hover:bg-amazon_orange mt-2"
                    >
                        Continue
                    </button>
                </form>

                <div className="mt-4 text-xs">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600 hover:underline">
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
