import React, { useCallback, useEffect, useState } from 'react'
import { FaCalendarAlt, FaDownload, FaMapMarkerAlt } from 'react-icons/fa'
import { getMyBookings } from '../../services/bookingApis';

export default function MyTickets() {

  const [tickets, setTickets] = useState([])

  // const tickets = [
  //   {
  //     id: 1,
  //     title: "Summer Music Festival",
  //     date: "28 June 2026",
  //     location: "Goa Beach Arena",
  //     status: "Upcoming",
  //   },
  //   {
  //     id: 2,
  //     title: "AI Tech Conference",
  //     date: "10 July 2026",
  //     location: "Bangalore",
  //     status: "Confirmed",
  //   },
  // ];

  const fetchTickets = useCallback(async () => {
    try {
      let data = await getMyBookings()
      if (data.status) {
        setTickets(data.data)
      } else {
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchTickets()
  }, [fetchTickets]);

  return (
    <>
      {/* ================= MY TICKETS ================= */}

      <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-10">

        <div className="flex justify-between items-center mb-8">

          <h3 className="text-2xl font-bold">
            My Tickets
          </h3>

          <button className="text-cyan-400">
            View All
          </button>

        </div>

        <div className="space-y-5">

          {tickets.map((ticket) => (
            <div
              key={ticket._id}
              className="bg-slate-900 border border-white/10 rounded-2xl p-5 flex flex-col lg:flex-row justify-between gap-5"
            >

              <div>

                <h4 className="text-xl font-bold mb-3">
                  {ticket?.event?.title}
                </h4>

                <div className="flex flex-wrap gap-5 text-slate-400">

                  <span className="flex items-center gap-2">
                    <FaCalendarAlt />
                    {ticket.event?.date}
                  </span>

                  <span className="flex items-center gap-2">
                    <FaMapMarkerAlt />
                    {ticket.event?.venue}
                  </span>

                </div>

              </div>

              <div className="flex items-center gap-3">

                <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm">
                  {ticket.isBooked ? "Confirmed" : "pandding"}
                </span>

                <button className="bg-cyan-500 hover:bg-cyan-400 transition px-5 py-3 rounded-xl flex items-center gap-2">
                  <FaDownload />
                  Download
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>
    </>
  )
}
