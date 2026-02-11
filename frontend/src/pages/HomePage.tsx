import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, LogIn, BookOpen } from 'lucide-react';

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-secondary-light font-body">
            {/* Header */}
            <div className="bg-white/70 backdrop-blur-xl border-b border-white/50 sticky top-0 z-40">
                <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center">
                            <BookOpen size={24} className="text-white" />
                        </div>
                        <h1 className="font-heading text-2xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                            Query Management System
                        </h1>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-4">
                <div className="text-center mb-12">
                    <h2 className="font-heading text-4xl md:text-5xl font-bold text-text-main mb-4">
                        Welcome to QMS
                    </h2>
                    <p className="text-lg text-text-muted max-w-2xl mx-auto">
                        Seamlessly connect students with mentors. Choose your role to get started.
                    </p>
                </div>

                {/* Role Selection Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
                    {/* User Card */}
                    <div className="bg-white/70 backdrop-blur-xl border border-white/80 rounded-3xl p-8 shadow-lg hover:-translate-y-2 transition-all">
                        <div className="flex flex-col items-center text-center h-full">
                            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                                <Users className="text-blue-600" size={32} />
                            </div>
                            <h3 className="font-heading text-2xl font-bold text-text-main mb-2">Student</h3>
                            <p className="text-text-muted text-sm mb-8 flex-grow">
                                Submit queries and get help from experienced mentors
                            </p>
                            <div className="flex gap-3 w-full">
                                <button
                                    onClick={() => navigate('/login')}
                                    className="flex-1 py-3 px-4 bg-blue-50 hover:bg-blue-100 border-2 border-blue-200 text-blue-600 font-semibold rounded-xl transition-all"
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => navigate('/signup')}
                                    className="flex-1 py-3 px-4 bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                                >
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Mentor Card */}
                    <div className="bg-white/70 backdrop-blur-xl border border-white/80 rounded-3xl p-8 shadow-lg hover:-translate-y-2 transition-all">
                        <div className="flex flex-col items-center text-center h-full">
                            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                                <BookOpen className="text-green-600" size={32} />
                            </div>
                            <h3 className="font-heading text-2xl font-bold text-text-main mb-2">Mentor</h3>
                            <p className="text-text-muted text-sm mb-8 flex-grow">
                                Guide students and help them overcome their challenges
                            </p>
                            <div className="flex gap-3 w-full">
                                <button
                                    onClick={() => navigate('/mentor/login')}
                                    className="flex-1 py-3 px-4 bg-green-50 hover:bg-green-100 border-2 border-green-200 text-green-600 font-semibold rounded-xl transition-all"
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => navigate('/mentor/signup')}
                                    className="flex-1 py-3 px-4 bg-gradient-to-br from-green-500 to-green-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                                >
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Admin Card */}
                    <div className="bg-white/70 backdrop-blur-xl border border-white/80 rounded-3xl p-8 shadow-lg hover:-translate-y-2 transition-all">
                        <div className="flex flex-col items-center text-center h-full">
                            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                                <LogIn className="text-purple-600" size={32} />
                            </div>
                            <h3 className="font-heading text-2xl font-bold text-text-main mb-2">Admin</h3>
                            <p className="text-text-muted text-sm mb-8 flex-grow">
                                Manage the platform and moderate student-mentor interactions
                            </p>
                            <button
                                onClick={() => navigate('/admin/login')}
                                className="w-full py-3 px-4 bg-gradient-to-br from-purple-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                            >
                                Admin Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
