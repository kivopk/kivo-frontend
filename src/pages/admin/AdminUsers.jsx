import React, { useState, useEffect } from 'react';
import { trpc } from '../../services/trpc';
import { User as UserIcon, Shield, Clock, Trash2 } from 'lucide-react';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const data = await trpc.admin.getAllUsers.query();
            setUsers(data);
        } catch (error) {
            console.error("Failed to fetch users", error);
        }
    };

    // Auto-refresh user list every 5 seconds to see when people login/register
    useEffect(() => {
        fetchUsers();
        const interval = setInterval(fetchUsers, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleDeleteUser = async (userId) => {
        if (!window.confirm("Are you sure you want to permanently delete this user? All their orders and data will be lost.")) return;
        
        try {
            await trpc.admin.deleteUser.mutate({ id: userId });
            setUsers(users.filter(u => u.id !== userId));
        } catch (error) {
            alert('Failed to delete user: ' + error.message);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col h-full">
            <div className="p-6 border-b border-gray-100 bg-gray-50 rounded-t-xl">
                <h2 className="text-xl font-bold text-gray-800">User Profiles Explorer</h2>
                <p className="text-sm text-gray-500 mt-1">Live tracking of registered profiles.</p>
            </div>

            <div className="flex-1 overflow-auto p-6">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
                        <tr>
                            <th className="p-4 font-semibold text-sm">Profile ID</th>
                            <th className="p-4 font-semibold text-sm">Credentials</th>
                            <th className="p-4 font-semibold text-sm">Role Status</th>
                            <th className="p-4 font-semibold text-sm">Joined At</th>
                            <th className="p-4 font-semibold text-sm text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                <td className="p-4 text-sm text-gray-500 font-medium">#{user.id}</td>
                                <td className="p-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                            <UserIcon className="w-4 h-4" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-gray-800">{user.username || "No Username"}</span>
                                            <span className="text-xs text-gray-500">{user.email}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    {user.isAdmin ? (
                                        <span className="flex items-center w-max px-2 py-1 rounded-md text-xs font-bold bg-purple-100 text-purple-700">
                                            <Shield className="w-3 h-3 mr-1" /> Admin
                                        </span>
                                    ) : (
                                        <span className="flex items-center w-max px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600">
                                            Customer
                                        </span>
                                    )}
                                </td>
                                <td className="p-4 text-sm text-gray-500 flex items-center">
                                    <Clock className="w-4 h-4 mr-2" />
                                    {new Date(user.createdAt).toLocaleString()}
                                </td>
                                <td className="p-4 text-right">
                                    <button 
                                        onClick={() => handleDeleteUser(user.id)}
                                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                        title="Delete User"
                                    >
                                        <Trash2 className="w-5 h-5 mx-auto" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminUsers;
