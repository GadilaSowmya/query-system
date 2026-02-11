import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMentor } from '../context/MentorContext';
import { API_BASE_URL } from '../config';
import { LogOut, User, Mail, Phone, MapPin, Briefcase, Award, Clock } from 'lucide-react';

const MentorDashboardPage: React.FC = () => {
    const { mentor, logout, updateMentor } = useMentor();
    const navigate = useNavigate();

    // Fetch fresh mentor data from backend on component load
    React.useEffect(() => {
        if (!mentor?.email) {
            navigate('/mentor/login');
            return;
        }

        const fetchMentorProfile = async () => {
            try {
                // Try to fetch from profile endpoint
                const response = await fetch(API_BASE_URL + '/api/mentor/auth/profile', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: mentor.email }),
                });

                if (response.ok) {
                    const profileData = await response.json();
                    const mentorObj = profileData.mentor || profileData;
                    
                    // Update context with fresh data from backend
                    updateMentor({
                        mentorId: mentorObj.mentorId || mentorObj.mentor_id || mentor.mentorId,
                        name: mentorObj.name || mentor.name,
                        age: mentorObj.age !== undefined ? mentorObj.age : mentor.age,
                        gender: mentorObj.gender || mentor.gender,
                        phone: mentorObj.phone || mentor.phone,
                        addressLine: mentorObj.addressLine || mentor.addressLine,
                        city: mentorObj.city || mentor.city,
                        state: mentorObj.state || mentor.state,
                        pinCode: mentorObj.pinCode || mentor.pinCode,
                        country: mentorObj.country || mentor.country,
                        organization: mentorObj.organization || mentor.organization,
                        designation: mentorObj.designation || mentor.designation,
                        experience: mentorObj.experience !== undefined ? mentorObj.experience : mentor.experience,
                    });
                }
            } catch (err) {
                console.log('Profile fetch completed with fallback data');
            }
        };

        fetchMentorProfile();
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (!mentor) {
        return null;
    }

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-green-50 to-green-100 p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-br from-green-600 to-green-700 bg-clip-text text-transparent">
                            Mentor Dashboard
                        </h1>
                        <p className="text-gray-600 mt-1">Welcome, {mentor.name}!</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors"
                    >
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Profile Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white/80 backdrop-blur-xl border border-white/80 p-6 rounded-2xl shadow-lg">
                            <div className="text-center mb-6">
                                <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                    <User size={48} className="text-white" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800">{mentor.name}</h2>
                                <p className="text-green-600 font-semibold mt-1">{mentor.designation}</p>
                            </div>

                            <div className="space-y-4">
                                {/* Email */}
                                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                                    <Mail size={20} className="text-green-600 flex-shrink-0" />
                                    <div>
                                        <p className="text-xs text-gray-600">Email</p>
                                        <p className="text-sm font-medium text-gray-800 break-all">{mentor.email}</p>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                                    <Phone size={20} className="text-green-600 flex-shrink-0" />
                                    <div>
                                        <p className="text-xs text-gray-600">Phone</p>
                                        <p className="text-sm font-medium text-gray-800">{mentor.phone}</p>
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                                    <MapPin size={20} className="text-green-600 flex-shrink-0" />
                                    <div>
                                        <p className="text-xs text-gray-600">Location</p>
                                        <p className="text-sm font-medium text-gray-800">
                                            {mentor.city}, {mentor.state} {mentor.pinCode}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Details Card */}
                    <div className="lg:col-span-2">
                        <div className="bg-white/80 backdrop-blur-xl border border-white/80 p-6 rounded-2xl shadow-lg">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6">Professional Information</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Organization */}
                                <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Briefcase size={20} className="text-green-600" />
                                        <p className="text-sm text-gray-600 font-medium">Organization</p>
                                    </div>
                                    <p className="text-lg font-semibold text-gray-800">{mentor.organization}</p>
                                </div>

                                {/* Experience */}
                                <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Clock size={20} className="text-green-600" />
                                        <p className="text-sm text-gray-600 font-medium">Experience</p>
                                    </div>
                                    <p className="text-lg font-semibold text-gray-800">{mentor.experience} years</p>
                                </div>

                                {/* Age */}
                                <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                                    <div className="flex items-center gap-2 mb-2">
                                        <User size={20} className="text-green-600" />
                                        <p className="text-sm text-gray-600 font-medium">Age</p>
                                    </div>
                                    <p className="text-lg font-semibold text-gray-800">{mentor.age} years</p>
                                </div>

                                {/* Gender */}
                                <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Award size={20} className="text-green-600" />
                                        <p className="text-sm text-gray-600 font-medium">Gender</p>
                                    </div>
                                    <p className="text-lg font-semibold text-gray-800 capitalize">{mentor.gender}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Queries Section */}
                <div className="mt-6 bg-white/80 backdrop-blur-xl border border-white/80 p-6 rounded-2xl shadow-lg">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Available Queries</h3>
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No queries assigned yet</p>
                        <p className="text-gray-400 text-sm mt-2">You'll see student queries here when they request mentorship</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MentorDashboardPage;
