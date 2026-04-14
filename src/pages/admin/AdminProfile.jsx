import React, { useState, useEffect } from 'react';
import { trpc } from '../../services/trpc';
import { User, Mail, Phone, MapPin, Shield } from 'lucide-react';

const AdminProfile = () => {
    const [profile, setProfile] = useState({ username: '', email: '', phoneNumber: '', address: '', isAdmin: false });
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { user } = await trpc.auth.me.query();
                setProfile({
                    username: user.username || '',
                    email: user.email || '',
                    phoneNumber: user.phoneNumber || '',
                    address: user.address || '',
                    isAdmin: user.isAdmin
                });
            } catch (error) {
                console.error("Failed to fetch profile", error);
            }
        };
        fetchProfile();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await trpc.auth.updateProfile.mutate({
                username: profile.username,
                email: profile.email,
                phoneNumber: profile.phoneNumber,
                address: profile.address
            });
            setMessage('Profile updated successfully!');
            setIsEditing(false);
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            setMessage('Failed to update profile: ' + error.message);
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-6">
            <div className="p-8 border-b border-gray-100 bg-gray-50 flex items-center space-x-6">
                <div className="w-24 h-24 rounded-full bg-amazon_yellow flex items-center justify-center text-4xl font-bold text-gray-800 shadow-md">
                    {profile.username ? profile.username.charAt(0).toUpperCase() : 'A'}
                </div>
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">{profile.username || 'Admin User'}</h2>
                    <p className="text-gray-500 mt-1 flex items-center">
                        <Mail className="w-4 h-4 mr-2" /> {profile.email}
                    </p>
                    {profile.isAdmin && (
                        <span className="mt-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-700">
                            <Shield className="w-4 h-4 mr-1" /> Super Admin
                        </span>
                    )}
                </div>
                <div className="ml-auto">
                    <button 
                        onClick={() => setIsEditing(!isEditing)} 
                        className="px-6 py-2 bg-black text-white hover:bg-gray-800 rounded-lg font-medium transition-colors shadow-sm"
                    >
                        {isEditing ? 'Cancel Editing' : 'Edit Profile'}
                    </button>
                </div>
            </div>

            <div className="p-8">
                {message && (
                    <div className={`mb-6 p-4 rounded-lg font-medium ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Username */}
                        <div>
                            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                                <User className="w-4 h-4 mr-2 text-gray-400" /> Username
                            </label>
                            <input 
                                disabled={!isEditing}
                                type="text" 
                                value={profile.username}
                                onChange={(e) => setProfile({...profile, username: e.target.value})}
                                className={`w-full p-3 rounded-lg border ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-amazon_yellow bg-white' : 'border-transparent bg-gray-50'} transition-all`}
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                                <Mail className="w-4 h-4 mr-2 text-gray-400" /> Email Address
                            </label>
                            <input 
                                disabled={!isEditing}
                                type="email" 
                                value={profile.email}
                                onChange={(e) => setProfile({...profile, email: e.target.value})}
                                className={`w-full p-3 rounded-lg border ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-amazon_yellow bg-white' : 'border-transparent bg-gray-50'} transition-all`}
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                                <Phone className="w-4 h-4 mr-2 text-gray-400" /> Phone Number
                            </label>
                            <input 
                                disabled={!isEditing}
                                type="tel" 
                                value={profile.phoneNumber}
                                onChange={(e) => setProfile({...profile, phoneNumber: e.target.value})}
                                placeholder="Not provided"
                                className={`w-full p-3 rounded-lg border ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-amazon_yellow bg-white' : 'border-transparent bg-gray-50'} transition-all`}
                            />
                        </div>

                        {/* Address */}
                        <div className="md:col-span-2">
                            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                                <MapPin className="w-4 h-4 mr-2 text-gray-400" /> Primary Address
                            </label>
                            <textarea 
                                disabled={!isEditing}
                                rows={3}
                                value={profile.address}
                                onChange={(e) => setProfile({...profile, address: e.target.value})}
                                placeholder="Not provided"
                                className={`w-full p-3 rounded-lg border ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-amazon_yellow bg-white' : 'border-transparent bg-gray-50'} transition-all`}
                            />
                        </div>
                    </div>

                    {isEditing && (
                        <div className="pt-4 border-t border-gray-100 flex justify-end">
                            <button type="submit" className="px-8 py-3 bg-amazon_yellow hover:bg-amazon_orange text-black font-bold rounded-lg shadow-sm transition-colors">
                                Save Profile Changes
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default AdminProfile;
