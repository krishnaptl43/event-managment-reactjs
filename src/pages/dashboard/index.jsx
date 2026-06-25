import React, { useState, useRef, useEffect } from "react";
import {
    FaTicketAlt,
    FaHeart,
    FaBell,
    FaUser,
    FaLock,
    FaCog,
    FaChartLine,
    FaSignOutAlt,
    FaTimes,
    FaBars,
    FaHome
} from "react-icons/fa";
import { FaChevronDown, FaGaugeHigh, FaRightFromBracket } from 'react-icons/fa6'
import { Link, NavLink, useNavigate } from "react-router";
import { useAuthContext } from "../../context/authContext";

const Dashboard = ({ children }) => {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const { data, setData } = useAuthContext();
    const navigate = useNavigate();
    const dropdownRef = useRef(null);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handlePointerDown = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                setMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handlePointerDown);
        document.addEventListener('touchstart', handlePointerDown);
        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('mousedown', handlePointerDown);
            document.removeEventListener('touchstart', handlePointerDown);
            document.removeEventListener('keydown', handleEscape);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setData({ auth: false, user: {} });
        setMenuOpen(false);
        navigate('/auth');
    };

    const menuItems = [
        { name: "Home", icon: <FaHome />, link: "/" },
        { name: "Dashboard", icon: <FaChartLine />, link: "/user/dashboard" },
        { name: "My Tickets", icon: <FaTicketAlt />, link: "/user/my-tickets" },
        { name: "Events", icon: <FaHeart />, link: "/events" },
        { name: "Notifications", icon: <FaBell />, link: "/user/notifications" },
        { name: "Profile", icon: <FaUser />, link: "/user/profile" },
        { name: "Change Password", icon: <FaLock />, link: "/user/change-password" },
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-white flex">

            {/* ================= SIDEBAR ================= */}

            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                />
            )}

            <aside className={`fixed lg:static min-h-screen top-0 left-0 overflow-hidden  w-72 bg-slate-900 border-r border-white/10 z-50 transform transition-all duration-300 ease-in-out
                              ${sidebarOpen
                    ? "translate-x-0"
                    : "-translate-x-full lg:translate-x-0"}`}
            >

                {/* Logo */}

                <div className="p-6 border-b border-white/10 flex items-center justify-between">

                    <h1 className="text-3xl font-black py-1">
                        Event<span className="text-cyan-400">Hub</span>
                    </h1>

                    {/* Close Button Mobile */}

                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center"
                    >
                        <FaTimes />
                    </button>

                </div>

                <nav className="flex-1 p-5 space-y-2">

                    {menuItems.map(({ name, icon, link }, index) => (
                        <NavLink
                            to={link}
                            key={index}
                            className={({ isActive }) => `w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition ${isActive
                                ? "bg-cyan-500 text-white"
                                : "hover:bg-white/5 text-slate-300 hover:shadow-lg hover:shadow-cyan-500/20"
                                }`}
                        >
                            {icon}
                            {name}
                        </NavLink>
                    ))}

                </nav>

                <div className="px-5">

                    <button className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl hover:shadow-lg hover:shadow-red-500/20 hover:bg-red-500/10 text-red-400 transition">
                        <FaSignOutAlt />
                        Logout
                    </button>

                </div>

            </aside>

            {/* ================= MAIN ================= */}

            <main className="flex-1 lg:ml-0 overflow-auto">

                {/* Header */}

                <header className="border-b border-white/10 backdrop-blur-xl bg-slate-950/80 sticky top-0 z-20">

                    <div className="px-8 py-3.5 flex justify-between items-center">

                        <div className="flex items-center gap-4">

                            {/* Mobile Menu */}

                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="lg:hidden w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center"
                            >
                                <FaBars />
                            </button>

                            <div>

                                <h2 className="text-3xl font-black">
                                    Welcome Back 👋
                                </h2>

                                <p className="text-slate-400 mt-1">
                                    Manage your events and tickets
                                </p>

                            </div>
                        </div>

                        <div className="flex items-center gap-4">

                            <Link to="/user/notifications" className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                                <FaBell />
                            </Link>

                            <div className="flex items-center gap-3" ref={dropdownRef}>
                                {data?.auth ?
                                    <div className="relative">
                                        <button
                                            type="button"
                                            onClick={() => setMenuOpen((open) => !open)}
                                            className="flex items-center gap-2 rounded-full pl-1 pr-2 py-1 bg-white/5 border border-white/10 hover:border-cyan-400/50 transition"
                                            aria-haspopup="menu"
                                            aria-expanded={menuOpen}
                                        >
                                            <img
                                                src={data?.user?.image ?? "https://i.pravatar.cc/150?img=32"}
                                                alt="User avatar"
                                                className="w-10 h-10 rounded-full object-cover"
                                            />
                                            <FaChevronDown className={`text-gray-300 text-sm transition-transform ${menuOpen ? 'rotate-180' : ''}`} />
                                        </button>

                                        {menuOpen && (
                                            <div className="absolute right-0 mt-3 w-60 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/95 shadow-2xl shadow-black/30 backdrop-blur-xl">
                                                <div className="border-b border-white/10 px-4 py-3">
                                                    <p className="truncate text-sm font-semibold text-white">
                                                        {data?.user?.name ?? 'My Account'}
                                                    </p>
                                                    <p className="truncate text-xs text-gray-400">
                                                        {data?.user?.email ?? 'Account menu'}
                                                    </p>
                                                </div>

                                                <div className="p-2">
                                                    <Link
                                                        to="/user/dashboard"
                                                        onClick={() => setMenuOpen(false)}
                                                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-300 transition hover:bg-white/5 hover:text-white"
                                                    >
                                                        <FaGaugeHigh className="text-cyan-400" />
                                                        Dashboard
                                                    </Link>

                                                    <Link
                                                        to="/user/profile"
                                                        onClick={() => setMenuOpen(false)}
                                                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-300 transition hover:bg-white/5 hover:text-white"
                                                    >
                                                        <FaUser className="text-purple-400" />
                                                        Profile
                                                    </Link>

                                                    <button
                                                        type="button"
                                                        onClick={handleLogout}
                                                        className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-red-300 transition hover:bg-red-500/10 hover:text-red-200"
                                                    >
                                                        <FaRightFromBracket className="text-red-400" />
                                                        Logout
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div> :
                                    <Link to="/auth"
                                        className="bg-cyan-500 hover:bg-cyan-400 transition px-7 py-1 rounded-xl font-semibold shadow-lg shadow-cyan-500/30">
                                        Login
                                    </Link>}
                            </div>

                        </div>

                    </div>

                </header>
                <div className="p-8 overflow-auto">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;