import React, { useCallback, useState } from 'react'
import { FaEnvelope, FaEye, FaEyeSlash, FaLock, FaSpinner, FaUser } from 'react-icons/fa';
import { FaCalendarDays, FaFacebookF, FaGoogle, FaMusic, FaTicket, FaUsers } from 'react-icons/fa6';
import { useForm } from 'react-hook-form';
import { useAuth } from "../hooks/useAuth"
import { addUser, loginUser } from '../services/userApis';
import { useNavigate, Navigate } from 'react-router';
import { useAuthContext } from '../context/authContext';

export default function Auth() {
    const [loginPage, setLoginPage] = useState(true);

    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Navigate to="/user" />;
    }

    return (
        <>
            {/* login section */}
            <div className="pt-28 pb-20 text-white min-h-screen flex items-center justify-center px-6 py-10 relative">
                {/* Background Glow */}
                <div className="glow-1" />
                <div className="glow-2" />
                {/* login section */}
                <div className="relative z-10 w-full max-w-4xl grid lg:grid-cols-2 overflow-hidden rounded-[25px] shadow-2xl shadow-cyan-500/10 glass">
                    {/* Left Side */}
                    <div className="hidden lg:flex flex-col justify-center p-14 relative overflow-hidden">
                        <div className="absolute inset-0 bg-linear-to-br from-cyan-500/10 to-purple-500/10" />
                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-14 h-14 rounded-2xl bg-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                                    <FaCalendarDays className="text-white text-xl" />
                                </div>
                                <h1 className="text-4xl font-black">
                                    Event<span className="text-cyan-400">Hub</span>
                                </h1>
                            </div>
                            <h2 className="text-5xl font-black leading-tight mb-6">
                                Manage &amp;
                                <span className="gradient-text block">Explore Events</span>
                            </h2>
                            <p className="text-gray-300 text-lg leading-relaxed max-w-lg mb-10">
                                Discover concerts, startup meetups, workshops, AI conferences,
                                festivals, gaming tournaments, and premium live events.
                            </p>
                            {/* Features */}
                            <div className="space-y-5">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                                        <FaTicket />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Easy Ticket Booking</h3>
                                        <p className="text-gray-400 text-sm">
                                            Book and manage tickets instantly.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
                                        <FaMusic />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Premium Events</h3>
                                        <p className="text-gray-400 text-sm">
                                            Access trending and exclusive events.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center text-pink-400">
                                        <FaUsers />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Community Access</h3>
                                        <p className="text-gray-400 text-sm">
                                            Connect with creators and attendees.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Right Side */}
                    <div className="p-8 md:p-14">
                        {/* Top Buttons */}
                        <div className="flex items-center justify-center mb-10">
                            <div className="glass p-2 rounded-2xl flex gap-2">
                                <button onClick={() => setLoginPage(true)} className={`${loginPage ? "bg-cyan-500 text-white" : ""} px-8 py-3 rounded-xl font-semibold hover:shadow-lg text-gray-300 hover:shadow-cyan-500/20 hover:text-white transition`}>
                                    Login
                                </button>
                                <button onClick={() => setLoginPage(false)} className={`${!loginPage ? "bg-cyan-500 text-white" : ""} px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/20 text-gray-300 hover:text-white transition`}>
                                    Register
                                </button>
                            </div>
                        </div>
                        {/* Login Form */}
                        {loginPage ? <Login />
                            : <Register />}
                    </div>
                </div>
            </div>
        </>
    )
}

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoding] = useState(false);
    const { setData } = useAuthContext()
    const navigate = useNavigate();

    const { register, reset, formState: { errors }, handleSubmit } = useForm();

    const userLogin = useCallback(async (data) => {
        setIsLoding(true);
        try {
            let user = await loginUser(data);
            if (user) {
                localStorage.setItem("token", user.data.accessToken);
                setData({ auth: true, user: user.data });
                navigate(-1)
                reset();
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoding(false);
        }

    }, [])

    return (
        <>
            <div className="max-w-md mx-auto">
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-black mb-3">Welcome Back 👋</h2>
                    <p className="text-gray-400">
                        Login to continue exploring amazing events.
                    </p>
                </div>
                {/* Form */}
                <form className="space-y-6" onSubmit={handleSubmit(userLogin)}>
                    {/* Email */}

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Email Address
                        </label>

                        <div className="relative">
                            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

                            <input
                                type="email"
                                placeholder="admin@example.com"
                                className="w-full bg-slate-900 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:border-cyan-500 transition"
                                {...register("email", { required: true })}
                            />
                            {errors.email && <p className='text-red-500'>Email is required</p>}
                        </div>
                    </div>

                    {/* Password */}

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Password
                        </label>

                        <div className="relative">
                            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="w-full bg-slate-900 border border-white/10 rounded-xl py-4 pl-12 pr-12 text-white outline-none focus:border-cyan-500 transition"
                                {...register("password", { required: true })}
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                            >
                                {showPassword ? (
                                    <FaEyeSlash />
                                ) : (
                                    <FaEye />
                                )}
                            </button>
                        </div>
                        {errors.password && <p className='text-red-500'>password is required</p>}
                    </div>
                    {/* Options */}
                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2 text-gray-400">
                            <input type="checkbox" className="accent-cyan-500" />
                            Remember Me
                        </label>
                        <a href="#" className="text-cyan-400 hover:text-cyan-300">
                            Forgot Password?
                        </a>
                    </div>
                    {/* Login Button */}
                    <button
                        disabled={isLoading}
                        className={`w-full h-14 rounded-2xl font-bold text-lg transition flex items-center justify-center gap-3
                         ${isLoading
                                ? "bg-cyan-400 cursor-not-allowed"
                                : "bg-cyan-500 hover:bg-cyan-400 shadow-xl shadow-cyan-500/30"
                            }`}
                    >
                        {isLoading ? (
                            <>
                                <FaSpinner className="animate-spin text-xl" />
                                Processing...
                            </>
                        ) : (
                            "Login"
                        )}
                    </button>
                </form>
                {/* Divider */}
                <div className="flex items-center gap-4 my-8">
                    <div className="flex-1 h-px bg-white/10" />
                    <span className="text-gray-500 text-sm">OR CONTINUE WITH</span>
                    <div className="flex-1 h-px bg-white/10" />
                </div>
                {/* Social Login */}
                <div className="grid grid-cols-2 gap-4">
                    <button className="glass h-14 rounded-2xl hover:border-cyan-400 transition flex items-center justify-center gap-3">
                        <FaGoogle className="text-red-400" />
                        Google
                    </button>
                    <button className="glass h-14 rounded-2xl hover:border-blue-400 transition flex items-center justify-center gap-3">
                        <FaFacebookF className="text-blue-400" />
                        Facebook
                    </button>
                </div>
            </div>
        </>
    )
}

function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoding] = useState(false);

    const { register, reset, formState: { errors }, handleSubmit } = useForm();

    const userRegister = useCallback(async (data) => {
        setIsLoding(true);
        try {
            let user = await addUser(data);
            if (user) {
                reset();
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoding(false);
        }

    }, [])


    return (
        <>
            <div className="max-w-md mx-auto">
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-black mb-3">Welcome Back 👋</h2>
                    <p className="text-gray-400">
                        Register to continue exploring amazing events.
                    </p>
                </div>
                {/* Form */}
                <form className="space-y-6" onSubmit={handleSubmit(userRegister)}>
                    {/* username */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            User Name
                        </label>

                        <div className="relative">
                            <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

                            <input
                                type="text"
                                placeholder="Enter full name"
                                className="w-full bg-slate-900 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:border-cyan-500 transition"
                                {...register("name", { required: true, minLength: 2, maxLength: 32 })}
                            />
                            {errors.name && <p className='text-red-500'>user name is required</p>}
                        </div>
                    </div>
                    {/* Email */}

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Email Address
                        </label>

                        <div className="relative">
                            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

                            <input
                                type="email"
                                placeholder="admin@example.com"
                                className="w-full bg-slate-900 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:border-cyan-500 transition"
                                {...register("email", { required: true })}
                            />
                            {errors.email && <p className='text-red-500'>user email is required</p>}
                        </div>
                    </div>

                    {/* Password */}

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Password
                        </label>

                        <div className="relative">
                            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="w-full bg-slate-900 border border-white/10 rounded-xl py-4 pl-12 pr-12 text-white outline-none focus:border-cyan-500 transition"
                                {...register("password", { required: true })}
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                            >
                                {showPassword ? (
                                    <FaEyeSlash />
                                ) : (
                                    <FaEye />
                                )}
                            </button>
                        </div>
                        {errors.password && <p className='text-red-500'>password is required</p>}
                    </div>
                    {/* register Button */}

                    <button
                        disabled={isLoading}
                        className={`w-full h-14 rounded-2xl font-bold text-lg transition flex items-center justify-center gap-3
                         ${isLoading
                                ? "bg-cyan-400 cursor-not-allowed"
                                : "bg-cyan-500 hover:bg-cyan-400 shadow-xl shadow-cyan-500/30"
                            }`}
                    >
                        {isLoading ? (
                            <>
                                <FaSpinner className="animate-spin text-xl" />
                                Processing...
                            </>
                        ) : (
                            "Register Here..."
                        )}
                    </button>
                </form>
                {/* Divider */}
                <div className="flex items-center gap-4 my-8">
                    <div className="flex-1 h-px bg-white/10" />
                    <span className="text-gray-500 text-sm">OR CONTINUE WITH</span>
                    <div className="flex-1 h-px bg-white/10" />
                </div>
                {/* Social Login */}
                <div className="grid grid-cols-2 gap-4">
                    <button className="glass h-14 rounded-2xl hover:border-cyan-400 transition flex items-center justify-center gap-3">
                        <FaGoogle className="text-red-400" />
                        Google
                    </button>
                    <button className="glass h-14 rounded-2xl hover:border-blue-400 transition flex items-center justify-center gap-3">
                        <FaFacebookF className="text-blue-400" />
                        Facebook
                    </button>
                </div>
            </div>
        </>
    )
}
