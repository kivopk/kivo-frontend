import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { trpc } from "../services/trpc";
import { motion } from "framer-motion";

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

            setSuccess("Account created successfully! Redirecting...");
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (err) {
            console.error("Signup error:", err);
            if (err.message && (err.message.includes("is not valid JSON") || err.message.includes("Failed to fetch"))) {
                setError("API Connection Error: Cannot reach the backend. Please check your VITE_API_URL settings.");
            } else {
                setError(err.message || "Registration failed. User may already exist.");
            }
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 font-sans relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute inset-0 bg-[url('/images/gaming/hero.png')] bg-cover bg-center opacity-20 blur-sm"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40"></div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 w-full max-w-md"
            >
                <div className="text-center mb-12">
                    <Link to="/" className="inline-block">
                        <h1 className="text-5xl font-black uppercase tracking-tighter italic mb-2">Kivo</h1>
                    </Link>
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Join the Community</p>
                </div>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-2xl shadow-2xl">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 text-xs font-bold uppercase tracking-widest mb-6 text-center">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="bg-green-500/10 border border-green-500/50 text-green-500 p-4 text-xs font-bold uppercase tracking-widest mb-6 text-center">
                            {success}
                        </div>
                    )}

                    <form className="flex flex-col gap-6" onSubmit={register}>
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="bg-white/5 border border-white/10 p-4 rounded-lg focus:outline-none focus:border-white transition-colors text-sm"
                                placeholder="Choose a handle"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-white/5 border border-white/10 p-4 rounded-lg focus:outline-none focus:border-white transition-colors text-sm"
                                placeholder="you@example.com"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-white/5 border border-white/10 p-4 rounded-lg focus:outline-none focus:border-white transition-colors text-sm"
                                placeholder="Min. 6 characters"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-white text-black py-4 font-black uppercase tracking-widest hover:bg-gray-200 transition-all text-sm mt-4"
                        >
                            Create Account
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                            Already a member?{" "}
                            <Link to="/login" className="text-white hover:underline ml-1">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Signup;

