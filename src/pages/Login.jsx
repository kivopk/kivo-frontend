import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { trpc } from "../services/trpc";
import { motion } from "framer-motion";

const Login = () => {
    const [loginId, setLoginId] = useState("");
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

            localStorage.setItem("access_token", response.token);
            navigate("/"); // redirect to homepage
        } catch (err) {
            console.error("Login error:", err);
            if (err.message && (err.message.includes("is not valid JSON") || err.message.includes("Failed to fetch"))) {
                setError("API Connection Error: Cannot reach the backend. Please check your VITE_API_URL settings.");
            } else {
                setError(err.message || "Invalid credentials. Please try again.");
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
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Member Sign In</p>
                </div>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-2xl shadow-2xl">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 text-xs font-bold uppercase tracking-widest mb-6">
                            {error}
                        </div>
                    )}

                    <form className="flex flex-col gap-6" onSubmit={signIn}>
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Email or Username</label>
                            <input
                                type="text"
                                value={loginId}
                                onChange={(e) => setLoginId(e.target.value)}
                                className="bg-white/5 border border-white/10 p-4 rounded-lg focus:outline-none focus:border-white transition-colors text-sm"
                                placeholder="Enter your credentials"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Password</label>
                                <Link to="/forgot-password" size="xs" className="text-[10px] font-black uppercase tracking-widest text-gray-600 hover:text-white transition-colors">Forgot?</Link>
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-white/5 border border-white/10 p-4 rounded-lg focus:outline-none focus:border-white transition-colors text-sm"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-white text-black py-4 font-black uppercase tracking-widest hover:bg-gray-200 transition-all text-sm mt-4"
                        >
                            Sign In
                        </button>
                    </form>

                    <div className="mt-12 pt-8 border-t border-white/10 text-center">
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-6">Don't have an account?</p>
                        <button
                            onClick={() => navigate("/signup")}
                            className="w-full border border-white/20 py-4 font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all text-sm"
                        >
                            Create Account
                        </button>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest leading-relaxed">
                        By signing-in you agree to Kivo's Conditions of Use & Sale.<br />Please see our Privacy Notice.
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;

