import React from 'react'
import { FaCalendarAlt, FaChartLine, FaHeart, FaTicketAlt } from 'react-icons/fa'

export default function DashStarics() {
    return (
        <>
            {/* ================= STATS ================= */}

            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

                <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                    <FaTicketAlt className="text-cyan-400 text-3xl mb-5" />
                    <h3 className="text-4xl font-black mb-2">12</h3>
                    <p className="text-slate-400">Booked Tickets</p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                    <FaCalendarAlt className="text-purple-400 text-3xl mb-5" />
                    <h3 className="text-4xl font-black mb-2">5</h3>
                    <p className="text-slate-400">Upcoming Events</p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                    <FaHeart className="text-pink-400 text-3xl mb-5" />
                    <h3 className="text-4xl font-black mb-2">18</h3>
                    <p className="text-slate-400">Saved Events</p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                    <FaChartLine className="text-green-400 text-3xl mb-5" />
                    <h3 className="text-4xl font-black mb-2">₹14,500</h3>
                    <p className="text-slate-400">Total Spending</p>
                </div>

            </div>

            {/* ================= BOOKING HISTORY ================= */}

            <div className="mt-10 bg-white/5 border border-white/10 rounded-3xl p-8">

                <h3 className="text-2xl font-bold mb-8">
                    Booking History
                </h3>

                <div className="space-y-4">

                    {[1, 2, 3].map((item) => (
                        <div
                            key={item}
                            className="flex justify-between items-center bg-slate-900 rounded-2xl p-5 border border-white/10"
                        >

                            <div>

                                <h4 className="font-semibold">
                                    Startup Growth Summit
                                </h4>

                                <p className="text-slate-400 text-sm mt-1">
                                    Purchased on 10 Jan 2026
                                </p>

                            </div>

                            <div className="text-right">

                                <p className="font-bold text-cyan-400">
                                    ₹1,999
                                </p>

                                <p className="text-green-400 text-sm">
                                    Completed
                                </p>

                            </div>

                        </div>
                    ))}

                </div>

            </div>
        </>
    )
}
