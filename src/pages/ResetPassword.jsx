import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { trpc } from "../services/trpc";

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [status, setStatus] = useState("");
    const [error, setError] = useState("");
    const [token, setToken] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const tokenParam = searchParams.get("token");
        if (tokenParam) {
            setToken(tokenParam);
        } else {
            setError("Invalid or missing reset token.");
        }
    }, [searchParams]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setStatus("");

        if (newPassword.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            await trpc.auth.resetPassword.mutate({
                token,
                newPassword,
            });
            setStatus("Password reset successfully! Redirecting to sign in...");
            setTimeout(() => {
                navigate("/login");
            }, 3000);
        } catch (err) {
            setError(err.message || "Failed to reset password. The token may be expired.");
        }
    };

    return (
        <div className="flex flex-col items-center h-screen bg-white">
            <Link to="/">
                <h1 className="text-4xl font-bold my-8 cursor-pointer">KIVO</h1>
            </Link>

            <div className="w-[350px] border border-gray-300 rounded-md p-6 shadow-md">
                <h1 className="text-2xl font-medium mb-4 line-clamp-1">Create New Password</h1>
                
                {error && <p className="text-red-500 mb-2 text-sm bg-red-50 p-2 rounded">{error}</p>}
                {status && <p className="text-green-600 mb-2 text-sm bg-green-50 p-2 rounded font-medium">{status}</p>}

                <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <h5 className="font-bold text-sm mb-1">New Password</h5>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="border border-gray-400 p-2 rounded-sm focus:outline-amazon_orange w-full"
                            placeholder="At least 6 characters"
                            required
                        />
                    </div>
                    
                    <div>
                        <h5 className="font-bold text-sm mb-1">Re-enter Password</h5>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="border border-gray-400 p-2 rounded-sm focus:outline-amazon_orange w-full"
                            placeholder="Confirm new password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={!token}
                        className={`bg-amazon_yellow rounded-sm py-2 font-medium border border-gray-400 shadow-sm w-full mt-2 transition-colors ${!token ? 'opacity-50 cursor-not-allowed' : 'hover:bg-amazon_orange'}`}
                    >
                        Save changes and sign in
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
