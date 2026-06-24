import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router'
import { FaCalendarDays, FaChevronDown, FaGaugeHigh, FaRightFromBracket, FaUser } from 'react-icons/fa6'
import { useAuthContext } from '../context/authContext'

export default function Header() {
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

    return (
        <>
            {/* Navbar */}
            <header className="fixed top-0 left-0 w-full z-50 glass border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                    <div className="flex items-center gap-3">
                        <div
                            className="w-11 h-11 rounded-2xl bg-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                            <FaCalendarDays className="text-white" />
                        </div>

                        <h1 className="text-2xl font-bold tracking-wide text-white">
                            Event<span className="text-cyan-400">Hub</span>
                        </h1>
                    </div>

                    <nav className="hidden md:flex items-center gap-8 text-gray-300">
                        <NavLink to="/" className={({ isActive }) => isActive ? "text-cyan-400" : "hover:text-cyan-400 transition"}>Home</NavLink>
                        <NavLink to="/events" className={({ isActive }) => isActive ? "text-cyan-400" : "hover:text-cyan-400 transition"} end>Events</NavLink>
                        <NavLink to="/photo-gallery" className={({ isActive }) => isActive ? "text-cyan-400" : "hover:text-cyan-400 transition"}>Photo Gallery</NavLink>
                        <NavLink to="/contact" className={({ isActive }) => isActive ? "text-cyan-400" : "hover:text-cyan-400 transition"}>Contact</NavLink>
                    </nav>

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
            </header>
        </>
    )
}
