import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { trpc } from "../services/trpc";
const Login = () => {
    const [loginId, setLoginId] = useState(""); // Use email or username for login
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const signIn = async (e) => {
        e.preventDefault();
        setError("");

        if (!loginId || !password) {
            setError("Please fill in all fields");
            return;
        }

        try {
            const response = await trpc.auth.login.mutate({
                loginId: loginId,
                password,
            });

            // Store token in localStorage
            localStorage.setItem("access_token", response.token);

            alert("Login successful!");
            navigate("/"); // redirect to homepage
        } catch (err) {
            console.error(err);
            if (err.message && err.message.includes("is not valid JSON")) {
                setError("API Configuration Error: The server returned an HTML error page. Please correctly set your VITE_API_URL environment variable on your live server to point to your Railway backend (e.g. https://your-railway-url.app/trpc).");
            } else {
                setError(err.message || "Invalid credentials. Please try again.");
            }
        }
    };

    return (
        <div className="flex flex-col items-center h-screen bg-white">
            <Link to="/">
                <h1 className="text-4xl font-bold my-8 cursor-pointer">KIVO</h1>
            </Link>

            <div className="w-[350px] border border-gray-300 rounded-md p-6 shadow-md">
                <h1 className="text-3xl font-medium mb-4">Sign-In</h1>

                {error && <p className="text-red-500 mb-2 text-sm">{error}</p>}

                <form className="flex flex-col space-y-3" onSubmit={signIn}>
                    <h5 className="font-bold">Email or Username</h5>
                    <input
                        type="text"
                        value={loginId}
                        onChange={(e) => setLoginId(e.target.value)}
                        className="border border-gray-400 p-2 rounded-sm focus:outline-amazon_orange"
                        placeholder="Enter your email or username"
                        required
                    />

                    <div className="flex justify-between items-center w-full">
                        <h5 className="font-bold mb-1">Password</h5>
                        <Link to="/forgot-password" className="text-xs text-blue-600 hover:text-amazon_orange hover:underline mb-1">Forgot your password?</Link>
                    </div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-gray-400 p-2 rounded-sm focus:outline-amazon_orange"
                        placeholder="Enter your password"
                        required
                    />

                    <button
                        type="submit"
                        className="bg-amazon_yellow rounded-sm py-2 font-medium border border-gray-500 shadow-sm hover:bg-amazon_orange mt-2"
                    >
                        Sign In
                    </button>
                </form>

                <p className="text-xs mt-4 text-gray-600">
                    By signing-in you agree to KIVO's Conditions of Use & Sale. Please see our Privacy Notice.
                </p>

                <button
                    onClick={() => navigate("/signup")}
                    className="w-full bg-gray-100 rounded-sm py-2 font-medium border border-gray-400 shadow-sm hover:bg-gray-200 mt-4 text-xs"
                >
                    Create your KIVO account
                </button>
            </div>
        </div>
    );
};

export default Login;
