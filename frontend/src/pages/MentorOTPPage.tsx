import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMentor } from '../context/MentorContext';
import { API_BASE_URL } from '../config';

const MentorOTPPage: React.FC = () => {
    const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
    const [timer, setTimer] = useState(300); // 5 minutes
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const navigate = useNavigate();
    const location = useLocation();
    const { login: mentorLogin } = useMentor();

    const email = location.state?.email;
    const type = location.state?.type || 'login';

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(prev => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleOtpChange = (value: string, index: number) => {
        if (!/^[0-9]*$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = async () => {
        const otpValue = otp.join('');
        if (otpValue.length !== 6) {
            setError('Please enter all 6 digits');
            return;
        }

        setIsSubmitting(true);
        setError('');
        try {
            const endpoint = type === 'signup' ? '/api/mentor/auth/verify-signup-otp' : '/api/mentor/auth/verify-login-otp';
            const response = await fetch(API_BASE_URL + endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp: otpValue }),
            });

            const data = await response.json();
            // Check if response indicates success (flexible checking for different response formats)
            const isSuccess = response.ok || data.success || (data.message && (data.message.includes('successful') || data.message.includes('verified')));
            
            if (isSuccess) {
                if (type === 'login') {
                    // Fetch complete mentor profile after successful login OTP verification
                    try {
                        const profileResponse = await fetch(API_BASE_URL + '/api/mentor/auth/profile', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ email }),
                        });
                        
                        const profileData = await profileResponse.json();
                        
                        // Extract mentor info from profile response
                        const mentor = profileData.mentor || profileData;
                        const mentorData = {
                            mentorId: mentor.mentorId || mentor.mentor_id || '',
                            name: mentor.name || '',
                            age: mentor.age || 0,
                            gender: mentor.gender || '',
                            email: email,
                            phone: mentor.phone || '',
                            location: mentor.location || '',
                            organization: mentor.organization || '',
                            designation: mentor.designation || '',
                            experience: mentor.experience || 0,
                        };
                        const authToken = data.token || data.authToken || '';
                        mentorLogin(mentorData, authToken);
                    } catch (profileErr) {
                        // Fallback if profile fetch fails
                        const mentorData = {
                            mentorId: data.mentorId || data.mentor?.mentorId || '',
                            name: data.name || data.mentor?.name || '',
                            age: data.age || data.mentor?.age || 0,
                            gender: data.gender || data.mentor?.gender || '',
                            email: email,
                            phone: data.phone || data.mentor?.phone || '',
                            location: data.location || data.mentor?.location || '',
                            organization: data.organization || data.mentor?.organization || '',
                            designation: data.designation || data.mentor?.designation || '',
                            experience: data.experience || data.mentor?.experience || 0,
                        };
                        const authToken = data.token || data.authToken || '';
                        mentorLogin(mentorData, authToken);
                    }
                    navigate('/mentor/dashboard');
                } else {
                    // After signup verification, go to login page
                    navigate('/mentor/login');
                }
            } else {
                setError(data.message || 'Verification failed');
            }
        } catch (err) {
            setError('Connection error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen p-5 w-full">
            <div className="w-full max-w-[550px] bg-white/70 backdrop-blur-xl border border-white/80 p-10 rounded-3xl shadow-[0_10px_40px_-10px_rgba(40,114,161,0.1)] transition-transform hover:-translate-y-1">
                <h2 className="font-heading text-3xl font-bold bg-gradient-to-br from-green-500 to-green-600 bg-clip-text text-transparent mb-2 text-center tracking-tight">
                    Verify Your Email
                </h2>
                <p className="text-base text-text-muted mb-2 text-center font-medium">
                    Enter the OTP sent to {email}
                </p>
                <p className="text-sm text-text-muted mb-8 text-center">
                    {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}
                </p>

                <div className="flex gap-3 justify-center mb-8">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => { if (el) inputRefs.current[index] = el; }}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleOtpChange(e.target.value, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            className="w-12 h-12 border-2 border-gray-200 bg-white rounded-lg text-center text-xl font-bold text-text-main focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all"
                        />
                    ))}
                </div>

                {error && (
                    <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm font-medium mb-6 text-center">
                        {error}
                    </div>
                )}

                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting || otp.some(d => !d)}
                    className="w-full p-4 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-[14px] text-lg font-heading font-semibold mt-4 shadow-lg hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 transition-all disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none relative overflow-hidden"
                >
                    {isSubmitting ? 'Verifying...' : 'Verify OTP'}
                </button>

                <div className="mt-6 text-center text-sm">
                    <button
                        className="text-green-600 font-semibold hover:text-green-700 hover:underline transition-colors"
                        onClick={() => {
                            setOtp(new Array(6).fill(''));
                            setError('');
                        }}
                    >
                        Clear
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MentorOTPPage;
