import React, { useState } from "react";
import { Link } from "react-router-dom";
import { trpc } from "../services/trpc";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setStatus("");

        if (!email) {
            setError("Email is required");
            return;
        }

        try {
            await trpc.auth.forgotPassword.mutate({
                email,
                resetUrlPrefix: window.location.origin + "/reset-password",
            });
            setStatus("If the email exists, a password reset link has been sent. Please check your inbox.");
        } catch (err) {
            setError(err.message || "Something went wrong. Please try again.");
        }
    };

    return (
        <div className="flex flex-col items-center h-screen bg-white">
            <Link to="/">
                <h1 className="text-4xl font-bold my-8 cursor-pointer">KIVO</h1>
            </Link>

            <div className="w-[350px] border border-gray-300 rounded-md p-6 shadow-md">
                <h1 className="text-2xl font-medium mb-4 text-gray-900">Password Assistance</h1>
                <p className="text-sm text-gray-600 mb-4">Enter the email address associated with your Kivo account.</p>

                {error && <p className="text-red-500 mb-2 text-sm bg-red-50 p-2 rounded">{error}</p>}
                {status && <p className="text-green-600 mb-2 text-sm bg-green-50 p-2 rounded">{status}</p>}

                <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <h5 className="font-bold text-sm mb-1">Email</h5>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border border-gray-400 p-2 rounded-sm focus:outline-amazon_orange w-full text-sm"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    
                    <button
                        type="submit"
                        className="bg-amazon_yellow rounded-sm py-2 font-medium border border-gray-400 shadow-sm hover:bg-amazon_orange mt-2 transition-colors w-full"
                    >
                        Continue
                    </button>
                </form>

                <div className="mt-6 text-xs text-center border-t border-gray-200 pt-4">
                    Remembered your password?{" "}
                    <Link to="/login" className="text-blue-600 hover:underline hover:text-amazon_orange">
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
