import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';

const MentorSignupPage: React.FC = () => {
    const [fields, setFields] = useState({
        name: '',
        age: '',
        gender: '',
        email: '',
        phone: '',
        location: '',
        organization: '',
        designation: '',
        experience: '',
    });
    const [errors, setErrors] = useState<any>({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const validate = () => {
        let newErrors: any = {};
        if (!fields.name) newErrors.name = "Name is required";
        if (!fields.age || parseInt(fields.age) < 18 || parseInt(fields.age) > 80) newErrors.age = "Age must be 18-80";
        if (!fields.gender) newErrors.gender = "Gender is required";
        if (!fields.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) newErrors.email = "Invalid email format";
        if (!fields.phone || !/^\d{10}$/.test(fields.phone)) newErrors.phone = "Phone must be 10 digits";
        if (!fields.location) newErrors.location = "Location is required";
        if (!fields.organization) newErrors.organization = "Organization is required";
        if (!fields.designation) newErrors.designation = "Designation is required";
        if (!fields.experience) newErrors.experience = "Experience is required";
        return newErrors;
    };

    const isFormValid = () => {
        const errs = validate();
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const valErrors = validate();
        if (Object.keys(valErrors).length > 0) {
            setErrors(valErrors);
            return;
        }

        setIsLoading(true);
        setErrors({});
        try {
            const response = await fetch(API_BASE_URL + '/api/mentor/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(fields),
            });

            const data = await response.json();
            if (data.message && data.message.includes('OTP sent')) {
                localStorage.setItem('temp_mentor_data', JSON.stringify(fields));
                navigate('/mentor/verify-otp', { state: { email: fields.email, type: 'signup' } });
            } else {
                alert(data.message || 'Signup failed');
            }
        } catch (err) {
            alert('Connection error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: any) => {
        setFields({ ...fields, [e.target.name]: e.target.value });
    };

    return (
        <div className="flex justify-center items-center min-h-screen p-5 w-full">
            <div className="w-full max-w-[550px] bg-white/70 backdrop-blur-xl border border-white/80 p-8 rounded-3xl shadow-[0_10px_40px_-10px_rgba(40,114,161,0.1)] transition-transform hover:-translate-y-1">
                <h2 className="font-heading text-3xl font-bold bg-gradient-to-br from-green-500 to-green-600 bg-clip-text text-transparent mb-2 text-center tracking-tight">
                    Become a Mentor
                </h2>
                <p className="text-base text-text-muted mb-6 text-center font-medium leading-relaxed">
                    Fill in your details to guide students
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-text-main mb-1.5 ml-1">Full Name</label>
                        <input
                            name="name"
                            value={fields.name}
                            onChange={handleChange}
                            className="w-full p-3.5 border-2 border-gray-200 bg-white rounded-xl text-base text-text-main font-body transition-all shadow-[0_4px_10px_rgba(0,0,0,0.03)] focus:outline-none focus:border-primary-light focus:ring-4 focus:ring-primary/10"
                        />
                        {errors.name && <p className="text-danger text-xs mt-1 ml-1 font-medium">{errors.name}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-text-main mb-1.5 ml-1">Age</label>
                            <input
                                name="age"
                                type="number"
                                value={fields.age}
                                onChange={handleChange}
                                className="w-full p-3.5 border-2 border-gray-200 bg-white rounded-xl text-base text-text-main font-body transition-all shadow-[0_4px_10px_rgba(0,0,0,0.03)] focus:outline-none focus:border-primary-light focus:ring-4 focus:ring-primary/10"
                            />
                            {errors.age && <p className="text-danger text-xs mt-1 ml-1 font-medium">{errors.age}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-text-main mb-1.5 ml-1">Gender</label>
                            <select
                                name="gender"
                                value={fields.gender}
                                onChange={handleChange}
                                className="w-full p-3.5 border-2 border-gray-200 bg-white rounded-xl text-base text-text-main font-body transition-all shadow-[0_4px_10px_rgba(0,0,0,0.03)] focus:outline-none focus:border-primary-light focus:ring-4 focus:ring-primary/10 appearance-none"
                            >
                                <option value="">Select</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                            {errors.gender && <p className="text-danger text-xs mt-1 ml-1 font-medium">{errors.gender}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-text-main mb-1.5 ml-1">Email</label>
                            <input
                                name="email"
                                type="email"
                                value={fields.email}
                                onChange={handleChange}
                                className="w-full p-3.5 border-2 border-gray-200 bg-white rounded-xl text-base text-text-main font-body transition-all shadow-[0_4px_10px_rgba(0,0,0,0.03)] focus:outline-none focus:border-primary-light focus:ring-4 focus:ring-primary/10"
                            />
                            {errors.email && <p className="text-danger text-xs mt-1 ml-1 font-medium">{errors.email}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-text-main mb-1.5 ml-1">Phone</label>
                            <input
                                name="phone"
                                value={fields.phone}
                                onChange={handleChange}
                                maxLength={10}
                                className="w-full p-3.5 border-2 border-gray-200 bg-white rounded-xl text-base text-text-main font-body transition-all shadow-[0_4px_10px_rgba(0,0,0,0.03)] focus:outline-none focus:border-primary-light focus:ring-4 focus:ring-primary/10"
                            />
                            {errors.phone && <p className="text-danger text-xs mt-1 ml-1 font-medium">{errors.phone}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-text-main mb-1.5 ml-1">Location</label>
                        <input
                            name="location"
                            value={fields.location}
                            onChange={handleChange}
                            placeholder="City, State"
                            className="w-full p-3.5 border-2 border-gray-200 bg-white rounded-xl text-base text-text-main font-body transition-all shadow-[0_4px_10px_rgba(0,0,0,0.03)] focus:outline-none focus:border-primary-light focus:ring-4 focus:ring-primary/10"
                        />
                        {errors.location && <p className="text-danger text-xs mt-1 ml-1 font-medium">{errors.location}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-text-main mb-1.5 ml-1">Organization</label>
                        <input
                            name="organization"
                            value={fields.organization}
                            onChange={handleChange}
                            placeholder="e.g., ABC Corporation"
                            className="w-full p-3.5 border-2 border-gray-200 bg-white rounded-xl text-base text-text-main font-body transition-all shadow-[0_4px_10px_rgba(0,0,0,0.03)] focus:outline-none focus:border-primary-light focus:ring-4 focus:ring-primary/10"
                        />
                        {errors.organization && <p className="text-danger text-xs mt-1 ml-1 font-medium">{errors.organization}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-text-main mb-1.5 ml-1">Designation</label>
                            <input
                                name="designation"
                                value={fields.designation}
                                onChange={handleChange}
                                placeholder="e.g., Senior Developer"
                                className="w-full p-3.5 border-2 border-gray-200 bg-white rounded-xl text-base text-text-main font-body transition-all shadow-[0_4px_10px_rgba(0,0,0,0.03)] focus:outline-none focus:border-primary-light focus:ring-4 focus:ring-primary/10"
                            />
                            {errors.designation && <p className="text-danger text-xs mt-1 ml-1 font-medium">{errors.designation}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-text-main mb-1.5 ml-1">Experience (Years)</label>
                            <input
                                name="experience"
                                value={fields.experience}
                                onChange={handleChange}
                                placeholder="e.g., 5"
                                className="w-full p-3.5 border-2 border-gray-200 bg-white rounded-xl text-base text-text-main font-body transition-all shadow-[0_4px_10px_rgba(0,0,0,0.03)] focus:outline-none focus:border-primary-light focus:ring-4 focus:ring-primary/10"
                            />
                            {errors.experience && <p className="text-danger text-xs mt-1 ml-1 font-medium">{errors.experience}</p>}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full p-4 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-[14px] text-lg font-heading font-semibold mt-6 shadow-lg hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 transition-all disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none relative overflow-hidden"
                        disabled={isLoading || !isFormValid()}
                    >
                        {isLoading ? 'Processing...' : 'Register & Get OTP'}
                    </button>
                </form>
                <div className="mt-6 text-center text-sm">
                    Already a mentor? <Link to="/mentor/login" className="text-green-600 font-semibold hover:text-green-700 hover:underline transition-colors">Login</Link>
                </div>
                <div className="mt-3 text-center text-sm">
                    <Link to="/" className="text-primary font-semibold hover:text-primary-dark hover:underline transition-colors">Back to Home</Link>
                </div>
            </div>
        </div>
    );
};

export default MentorSignupPage;
