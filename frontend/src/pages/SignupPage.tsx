import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';


const SignupPage: React.FC = () => {
    const [fields, setFields] = useState({
        full_name: '',
        age: '',
        gender: '',
        qualification: '',
        college_name: '',
        address_line: '',
        city: '',
        state: '',
        pin_code: '',
        country: 'India',
        mobile_number: '',
        email: '',
    });
    const [errors, setErrors] = useState<any>({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const validate = () => {
        let newErrors: any = {};
        if (!fields.full_name) newErrors.full_name = "Full name is required";
        if (!fields.age || parseInt(fields.age) < 16 || parseInt(fields.age) > 80) newErrors.age = "Age must be 16-80";
        if (!fields.gender) newErrors.gender = "Gender is required";
        if (!fields.qualification) newErrors.qualification = "Qualification is required";
        if (!fields.college_name) newErrors.college_name = "College name is required";
        if (!fields.address_line) newErrors.address_line = "Address/Area is required";
        if (!fields.city) newErrors.city = "City is required";
        if (!fields.state) newErrors.state = "State is required";
        if (!fields.pin_code || !/^\d{6}$/.test(fields.pin_code)) newErrors.pin_code = "PIN code must be 6 digits";
        if (!fields.country) newErrors.country = "Country is required";
        if (!fields.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) newErrors.email = "Invalid email format";
        if (!fields.mobile_number || !/^\d{10}$/.test(fields.mobile_number)) newErrors.mobile_number = "Mobile number must be 10 digits";
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
            const response = await fetch(API_BASE_URL + '/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: fields.full_name,
                    age: fields.age,
                    gender: fields.gender,
                    qualification: fields.qualification,
                    college: fields.college_name,
                    addressLine: fields.address_line,
                    city: fields.city,
                    state: fields.state,
                    pinCode: fields.pin_code,
                    country: fields.country,
                    mobile: fields.mobile_number,
                    email: fields.email
                }),
            });

            const data = await response.json();
            if (data.message && data.message.includes('OTP sent')) {
                localStorage.setItem('temp_user_data', JSON.stringify(fields));
                navigate('/verify-otp', { state: { email: fields.email, type: 'signup' } });
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
                <h2 className="font-heading text-3xl font-bold bg-gradient-to-br from-primary to-primary-dark bg-clip-text text-transparent mb-2 text-center tracking-tight">
                    Create Your Account
                </h2>
                <p className="text-base text-text-muted mb-6 text-center font-medium leading-relaxed">
                    Please fill in your correct details
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-text-main mb-1.5 ml-1">Full Name</label>
                        <input
                            name="full_name"
                            value={fields.full_name}
                            onChange={handleChange}
                            className="w-full p-3.5 border-2 border-gray-200 bg-white rounded-xl text-base text-text-main font-body transition-all shadow-[0_4px_10px_rgba(0,0,0,0.03)] focus:outline-none focus:border-primary-light focus:ring-4 focus:ring-primary/10"
                        />
                        {errors.full_name && <p className="text-danger text-xs mt-1 ml-1 font-medium">{errors.full_name}</p>}
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
                                className="w-full p-3.5 border-2 border-gray-200 bg-white rounded-xl text-base text-text-main font-body transition-all shadow-[0_4px_10px_rgba(0,0,0,0.03)] focus:outline-none focus:border-primary-light focus:ring-4 focus:ring-primary/10 appearance-none bg-no-repeat bg-[right_1rem_center]"
                            >
                                <option value="">Select</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                            {errors.gender && <p className="text-danger text-xs mt-1 ml-1 font-medium">{errors.gender}</p>}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm border-gray-200 font-semibold text-text-main mb-1.5 ml-1">Qualification</label>
                        <input
                            name="qualification"
                            value={fields.qualification}
                            onChange={handleChange}
                            className="w-full p-3.5 border-2 border-gray-200 bg-white rounded-xl text-base text-text-main font-body transition-all shadow-[0_4px_10px_rgba(0,0,0,0.03)] focus:outline-none focus:border-primary-light focus:ring-4 focus:ring-primary/10"
                        />
                        {errors.qualification && <p className="text-danger text-xs mt-1 ml-1 font-medium">{errors.qualification}</p>}
                    </div>
                    <div>
                        <label className="block text-sm border-gray-200 font-semibold text-text-main mb-1.5 ml-1">College Name</label>
                        <input
                            name="college_name"
                            value={fields.college_name}
                            onChange={handleChange}
                            className="w-full p-3.5 border-2 border-gray-200 bg-white rounded-xl text-base text-text-main font-body transition-all shadow-[0_4px_10px_rgba(0,0,0,0.03)] focus:outline-none focus:border-primary-light focus:ring-4 focus:ring-primary/10"
                        />
                        {errors.college_name && <p className="text-danger text-xs mt-1 ml-1 font-medium">{errors.college_name}</p>}
                    </div>
                    
                    {/* Address Section */}
                    <div className="border-t-2 border-gray-100 pt-4 mt-2">
                        <h3 className="text-sm font-bold text-text-main mb-3 ml-1 tracking-wide">Address Details</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm border-gray-200 font-semibold text-text-main mb-1.5 ml-1">Street / Area / Locality</label>
                                <input
                                    name="address_line"
                                    value={fields.address_line}
                                    onChange={handleChange}
                                    placeholder="e.g., Flat 12, abc Street, xyz Nagar"
                                    className="w-full p-3.5 border-2 border-gray-200 bg-white rounded-xl text-base text-text-main font-body transition-all shadow-[0_4px_10px_rgba(0,0,0,0.03)] focus:outline-none focus:border-primary-light focus:ring-4 focus:ring-primary/10"
                                />
                                {errors.address_line && <p className="text-danger text-xs mt-1 ml-1 font-medium">{errors.address_line}</p>}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm border-gray-200 font-semibold text-text-main mb-1.5 ml-1">City</label>
                                    <input
                                        name="city"
                                        value={fields.city}
                                        onChange={handleChange}
                                        placeholder="e.g., Mumbai"
                                        className="w-full p-3.5 border-2 border-gray-200 bg-white rounded-xl text-base text-text-main font-body transition-all shadow-[0_4px_10px_rgba(0,0,0,0.03)] focus:outline-none focus:border-primary-light focus:ring-4 focus:ring-primary/10"
                                    />
                                    {errors.city && <p className="text-danger text-xs mt-1 ml-1 font-medium">{errors.city}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm border-gray-200 font-semibold text-text-main mb-1.5 ml-1">State</label>
                                    <div className="relative">
                                        <select
                                            name="state"
                                            value={fields.state}
                                            onChange={handleChange}
                                            style={{ backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")", backgroundPosition: 'right 0.75rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
                                            className="w-full p-3.5 pr-10 border-2 border-gray-200 bg-white rounded-xl text-base text-text-main font-body transition-all shadow-[0_4px_10px_rgba(0,0,0,0.03)] focus:outline-none focus:border-primary-light focus:ring-4 focus:ring-primary/10 hover:border-gray-300 cursor-pointer appearance-none"
                                        >
                                            <option value="">Select State</option>
                                            <option value="Andhra Pradesh">Andhra Pradesh</option>
                                            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                            <option value="Assam">Assam</option>
                                            <option value="Bihar">Bihar</option>
                                            <option value="Chhattisgarh">Chhattisgarh</option>
                                            <option value="Goa">Goa</option>
                                            <option value="Gujarat">Gujarat</option>
                                            <option value="Haryana">Haryana</option>
                                            <option value="Himachal Pradesh">Himachal Pradesh</option>
                                            <option value="Jharkhand">Jharkhand</option>
                                            <option value="Karnataka">Karnataka</option>
                                            <option value="Kerala">Kerala</option>
                                            <option value="Madhya Pradesh">Madhya Pradesh</option>
                                            <option value="Maharashtra">Maharashtra</option>
                                            <option value="Manipur">Manipur</option>
                                            <option value="Meghalaya">Meghalaya</option>
                                            <option value="Mizoram">Mizoram</option>
                                            <option value="Nagaland">Nagaland</option>
                                            <option value="Odisha">Odisha</option>
                                            <option value="Punjab">Punjab</option>
                                            <option value="Rajasthan">Rajasthan</option>
                                            <option value="Sikkim">Sikkim</option>
                                            <option value="Tamil Nadu">Tamil Nadu</option>
                                            <option value="Telangana">Telangana</option>
                                            <option value="Tripura">Tripura</option>
                                            <option value="Uttar Pradesh">Uttar Pradesh</option>
                                            <option value="Uttarakhand">Uttarakhand</option>
                                            <option value="West Bengal">West Bengal</option>
                                            <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                                            <option value="Chandigarh">Chandigarh</option>
                                            <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
                                            <option value="Delhi">Delhi</option>
                                            <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                                            <option value="Ladakh">Ladakh</option>
                                            <option value="Lakshadweep">Lakshadweep</option>
                                            <option value="Puducherry">Puducherry</option>
                                        </select>
                                    </div>
                                    {errors.state && <p className="text-danger text-xs mt-1 ml-1 font-medium">{errors.state}</p>}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm border-gray-200 font-semibold text-text-main mb-1.5 ml-1">PIN Code</label>
                                    <input
                                        name="pin_code"
                                        value={fields.pin_code}
                                        onChange={handleChange}
                                        placeholder="6-digit code"
                                        maxLength={6}
                                        className="w-full p-3.5 border-2 border-gray-200 bg-white rounded-xl text-base text-text-main font-body transition-all shadow-[0_4px_10px_rgba(0,0,0,0.03)] focus:outline-none focus:border-primary-light focus:ring-4 focus:ring-primary/10"
                                    />
                                    {errors.pin_code && <p className="text-danger text-xs mt-1 ml-1 font-medium">{errors.pin_code}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm border-gray-200 font-semibold text-text-main mb-1.5 ml-1">Country</label>
                                    <input
                                        name="country"
                                        value={fields.country}
                                        onChange={handleChange}
                                        className="w-full p-3.5 border-2 border-gray-200 bg-white rounded-xl text-base text-text-main font-body transition-all shadow-[0_4px_10px_rgba(0,0,0,0.03)] focus:outline-none focus:border-primary-light focus:ring-4 focus:ring-primary/10"
                                    />
                                    {errors.country && <p className="text-danger text-xs mt-1 ml-1 font-medium">{errors.country}</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm border-gray-200 font-semibold text-text-main mb-1.5 ml-1">Mobile Number</label>
                            <input
                                name="mobile_number"
                                value={fields.mobile_number}
                                onChange={handleChange}
                                className="w-full p-3.5 border-2 border-gray-200 bg-white rounded-xl text-base text-text-main font-body transition-all shadow-[0_4px_10px_rgba(0,0,0,0.03)] focus:outline-none focus:border-primary-light focus:ring-4 focus:ring-primary/10"
                            />
                            {errors.mobile_number && <p className="text-danger text-xs mt-1 ml-1 font-medium">{errors.mobile_number}</p>}
                        </div>
                        <div>
                            <label className="block text-sm border-gray-200 font-semibold text-text-main mb-1.5 ml-1">Email ID</label>
                            <input
                                name="email"
                                value={fields.email}
                                onChange={handleChange}
                                className="w-full p-3.5 border-2 border-gray-200 bg-white rounded-xl text-base text-text-main font-body transition-all shadow-[0_4px_10px_rgba(0,0,0,0.03)] focus:outline-none focus:border-primary-light focus:ring-4 focus:ring-primary/10"
                            />
                            {errors.email && <p className="text-danger text-xs mt-1 ml-1 font-medium">{errors.email}</p>}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full p-4 bg-gradient-to-br from-primary to-primary-dark text-white rounded-[14px] text-lg font-heading font-semibold mt-6 shadow-lg hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 transition-all disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none relative overflow-hidden"
                        disabled={isLoading || !isFormValid()}
                    >
                        {isLoading ? 'Processing...' : 'Register & Get OTP'}
                    </button>
                </form>
                <div className="mt-6 text-center text-sm">
                    Already have an account? <Link to="/login" className="text-primary font-semibold hover:text-primary-dark hover:underline transition-colors">Login</Link>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
