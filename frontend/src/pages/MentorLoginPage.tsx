import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';

const MentorLoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const validate = () => {
        if (!email) return "Email is required";
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!isEmail) return "Invalid email format";
        return "";
    };

    const isFormValid = () => {
        const err = validate();
        return err === "";
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const valError = validate();
        if (valError) {
            setError(valError);
            return;
        }

        setIsLoading(true);
        setError('');
        try {
            const response = await fetch(API_BASE_URL + '/api/mentor/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            if (response.ok && data.message && data.message.includes('OTP sent')) {
                navigate('/mentor/verify-otp', { state: { email, type: 'login' } });
            } else if (!response.ok) {
                if (data.message && (data.message.includes('not found') || data.message.includes('not verified'))) {
                    setError('Mentor not found. Please sign up first');
                } else {
                    setError(data.message || 'Login failed. Please try again');
                }
            } else {
                setError('Login failed. Please try again');
            }
        } catch (err) {
            setError('Connection error. Please check your internet and try again');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen p-5 w-full">
            <div className="w-full max-w-[550px] bg-white/70 backdrop-blur-xl border border-white/80 p-10 rounded-3xl shadow-[0_10px_40px_-10px_rgba(40,114,161,0.1)] transition-transform hover:-translate-y-1">
                <h2 className="font-heading text-3xl font-bold bg-gradient-to-br from-green-500 to-green-600 bg-clip-text text-transparent mb-2 text-center tracking-tight">
                    Mentor Login
                </h2>
                <p className="text-base text-text-muted mb-10 text-center font-medium leading-relaxed">
                    Enter your email to get an OTP
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-text-main mb-2 ml-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="example@mail.com"
                            className="w-full p-4 border-2 border-gray-200 bg-white rounded-xl text-base text-text-main font-body transition-all shadow-[0_4px_10px_rgba(0,0,0,0.03)] focus:outline-none focus:border-primary-light focus:ring-4 focus:ring-primary/10"
                            aria-label="Email address"
                        />
                        {error && (
                            <p className="text-danger text-sm mt-2 flex items-center gap-1.5 font-medium">
                                {error}
                            </p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full p-4 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-[14px] text-lg font-heading font-semibold mt-4 shadow-lg hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 transition-all disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none relative overflow-hidden"
                        disabled={isLoading || !isFormValid()}
                    >
                        {isLoading ? 'Sending...' : 'Send OTP'}
                    </button>
                </form>
                <div className="mt-6 text-center text-sm">
                    New here? <Link to="/mentor/signup" className="text-green-600 font-semibold hover:text-green-700 hover:underline transition-colors">Sign up</Link>
                </div>
                <div className="mt-3 text-center text-sm">
                    <Link to="/" className="text-primary font-semibold hover:text-primary-dark hover:underline transition-colors">Back to Home</Link>
                </div>
            </div>
        </div>
    );
};

export default MentorLoginPage;
