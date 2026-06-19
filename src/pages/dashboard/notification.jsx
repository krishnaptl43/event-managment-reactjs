import React from "react";
import {
    FaBell,
    FaTicketAlt,
    FaCalendarAlt,
    FaCheckCircle,
    FaExclamationCircle,
    FaGift,
    FaTrash,
    FaCheck,
    FaFilter,
} from "react-icons/fa";

export default function NotificationsPage() {
    const notifications = [
        {
            id: 1,
            title: "Ticket Confirmed",
            message:
                "Your ticket for Summer Music Festival 2026 has been successfully booked.",
            time: "5 min ago",
            type: "success",
            unread: true,
            icon: <FaTicketAlt />,
        },
        {
            id: 2,
            title: "Event Reminder",
            message:
                "AI Tech Conference starts tomorrow at 10:00 AM. Don't forget to attend.",
            time: "1 hour ago",
            type: "reminder",
            unread: true,
            icon: <FaCalendarAlt />,
        },
        {
            id: 3,
            title: "Special Offer",
            message:
                "Get 20% discount on VIP tickets for selected events this week.",
            time: "3 hours ago",
            type: "offer",
            unread: false,
            icon: <FaGift />,
        },
        {
            id: 4,
            title: "Payment Successful",
            message:
                "Your payment of ₹1,999 has been successfully processed.",
            time: "Yesterday",
            type: "success",
            unread: false,
            icon: <FaCheckCircle />,
        },
        {
            id: 5,
            title: "Event Cancelled",
            message:
                "The Startup Meetup scheduled for next week has been cancelled.",
            time: "2 days ago",
            type: "warning",
            unread: false,
            icon: <FaExclamationCircle />,
        },
    ];

    const getBadgeColor = (type) => {
        switch (type) {
            case "success":
                return "bg-green-500/20 text-green-400";
            case "offer":
                return "bg-purple-500/20 text-purple-400";
            case "warning":
                return "bg-red-500/20 text-red-400";
            default:
                return "bg-cyan-500/20 text-cyan-400";
        }
    };

    const getIconColor = (type) => {
        switch (type) {
            case "success":
                return "bg-green-500/20 text-green-400";
            case "offer":
                return "bg-purple-500/20 text-purple-400";
            case "warning":
                return "bg-red-500/20 text-red-400";
            default:
                return "bg-cyan-500/20 text-cyan-400";
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            {/* Page Header */}

            <div className="border-b border-white/10 bg-slate-900/50 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 py-8">

                    <div className="flex flex-col lg:flex-row justify-between gap-5">

                        <div>

                            <div className="flex items-center gap-3 mb-3">
                                <FaBell className="text-cyan-400 text-2xl" />

                                <h1 className="text-4xl font-black">
                                    Notifications
                                </h1>
                            </div>

                            <p className="text-slate-400">
                                Stay updated with your bookings, events and offers.
                            </p>

                        </div>

                        {/* Actions */}

                        <div className="flex flex-wrap items-center gap-3 ">

                            <button className="bg-white/5 border border-white/10 hover:border-cyan-400 transition px-5 py-2 rounded-xl flex items-center gap-2">
                                <FaFilter />
                                Filter
                            </button>

                            <button className="bg-cyan-500 hover:bg-cyan-400 transition px-5 py-2 rounded-xl flex items-center gap-2">
                                <FaCheck />
                                Mark All Read
                            </button>

                        </div>

                    </div>

                </div>
            </div>

            {/* Stats */}

            <div className="max-w-7xl mx-auto px-6 py-8">

                <div className="grid md:grid-cols-3 gap-6 mb-10">

                    <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                        <h3 className="text-4xl font-black text-cyan-400 mb-2">
                            12
                        </h3>

                        <p className="text-slate-400">
                            Total Notifications
                        </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                        <h3 className="text-4xl font-black text-yellow-400 mb-2">
                            3
                        </h3>

                        <p className="text-slate-400">
                            Unread Notifications
                        </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                        <h3 className="text-4xl font-black text-green-400 mb-2">
                            9
                        </h3>

                        <p className="text-slate-400">
                            Read Notifications
                        </p>
                    </div>

                </div>

                {/* Notification List */}

                <div className="space-y-5">

                    {notifications.map((notification) => (
                        <div
                            key={notification.id}
                            className={`bg-white/5 border rounded-3xl p-6 transition hover:border-cyan-400
                ${notification.unread
                                    ? "border-cyan-500/40"
                                    : "border-white/10"
                                }
              `}
                        >
                            <div className="flex flex-col lg:flex-row justify-between gap-6">

                                {/* Left */}

                                <div className="flex gap-5">

                                    <div
                                        className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl ${getIconColor(
                                            notification.type
                                        )}`}
                                    >
                                        {notification.icon}
                                    </div>

                                    <div>

                                        <div className="flex items-center gap-3 flex-wrap mb-2">

                                            <h3 className="text-xl font-bold">
                                                {notification.title}
                                            </h3>

                                            {notification.unread && (
                                                <span className="bg-cyan-500 text-xs px-3 py-1 rounded-full font-semibold">
                                                    NEW
                                                </span>
                                            )}

                                        </div>

                                        <p className="text-slate-400 leading-relaxed">
                                            {notification.message}
                                        </p>

                                        <div className="flex items-center gap-4 mt-4">

                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${getBadgeColor(
                                                    notification.type
                                                )}`}
                                            >
                                                {notification.type}
                                            </span>

                                            <span className="text-slate-500 text-sm">
                                                {notification.time}
                                            </span>

                                        </div>

                                    </div>

                                </div>

                                {/* Right */}

                                <div className="flex items-center gap-3">

                                    <button className="bg-green-500/10 text-green-400 hover:bg-green-500/20 transition px-4 py-3 rounded-xl">
                                        Mark Read
                                    </button>

                                    <button className="bg-red-500/10 text-red-400 hover:bg-red-500/20 transition px-4 py-3 rounded-xl">
                                        <FaTrash />
                                    </button>

                                </div>

                            </div>
                        </div>
                    ))}

                </div>

                {/* Empty State Example */}

                <div className="hidden mt-12 text-center bg-white/5 border border-white/10 rounded-3xl p-16">

                    <div className="w-24 h-24 rounded-full bg-cyan-500/10 flex items-center justify-center mx-auto mb-6">

                        <FaBell className="text-cyan-400 text-4xl" />

                    </div>

                    <h3 className="text-3xl font-bold mb-4">
                        No Notifications Yet
                    </h3>

                    <p className="text-slate-400 max-w-md mx-auto">
                        When you book tickets, receive reminders, or get event updates,
                        they will appear here.
                    </p>

                </div>

            </div>
        </div>
    );
};

