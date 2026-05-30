// src/pages/dashboard/DashboardHome.jsx

import { useEffect, useState } from "react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
} from "recharts";

import {
  FaUsers,
  FaChalkboardTeacher,
  FaCar,
  FaCalendarCheck,
} from "react-icons/fa";

export default function DashboardHome() {
  const [dashboardData, setDashboardData] = useState({
    totalStudents: 0,
    instructors: 0,
    activeVehicles: 0,
    todaysClasses: 0,
    chartData: [],
    schedules: [],
  });

  const [loading, setLoading] = useState(true);

  // ============================================
  // FETCH DASHBOARD DATA
  // ============================================

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/dashboard/overview",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log(data);

      setDashboardData(data);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // ============================================
  // DYNAMIC CARDS
  // ============================================
  // console.log("dashboardData:", dashboardData);
  const cards = [
    {
      title: "Total Students",
      value: dashboardData.counts.totalStudents,
      icon: <FaUsers />,
      color: "bg-blue-600",
    },
    {
      title: "Drivers",
      value: dashboardData.counts.totalDrivers,
      icon: <FaChalkboardTeacher />,
      color: "bg-purple-600",
    },
    {
      title: "Active Vehicles",
      value: dashboardData.active.activeVehicles,
      icon: <FaCar />,
      color: "bg-green-600",
    },
    {
      title: "Today's Classes",
      value: dashboardData.todaySchedules,
      icon: <FaCalendarCheck />,
      color: "bg-orange-600",
    },
  ];

  // ============================================
  // LOADING
  // ============================================

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>

      {/* PAGE HEADER */}

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">
          Dashboard Overview
        </h1>

        <p className="text-slate-400 mt-2">
          Welcome back to DriveEase Management System
        </p>
      </div>

      {/* STATS */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {cards.map((card) => (
          <div
            key={card.title}
            className="
              bg-[#071426]
              rounded-3xl
              p-6
              border
              border-white/5
              hover:border-blue-500/30
              transition-all
              duration-300
            "
          >
            <div className="flex justify-between">
              <div>

                <p className="text-slate-400">
                  {card.title}
                </p>

                <h3 className="text-5xl font-bold mt-2 text-white">
                  {card.value}
                </h3>

              </div>

              <div
                className={`
                  w-14
                  h-14
                  rounded-2xl
                  flex
                  items-center
                  justify-center
                  text-xl
                  ${card.color}
                `}
              >
                {card.icon}
              </div>
            </div>

            <p className="text-green-400 mt-4">
              ↑ Updated Live
            </p>

          </div>
        ))}
      </div>

      {/* payments */}
      <div className="grid grid-cols-3 gap-6 mt-6">

        <div className="bg-[#071426] p-6 rounded-3xl border border-white/5">
          <p className="text-slate-400">Total Revenue</p>

          <h2 className="text-4xl font-bold text-green-400 mt-3">
            ₹ {dashboardData.payments.totalRevenue}
          </h2>
        </div>

        <div className="bg-[#071426] p-6 rounded-3xl border border-white/5">
          <p className="text-slate-400">Collected Amount</p>

          <h2 className="text-4xl font-bold text-blue-400 mt-3">
            ₹ {dashboardData.payments.totalCollected}
          </h2>
        </div>

        <div className="bg-[#071426] p-6 rounded-3xl border border-white/5">
          <p className="text-slate-400">Pending Payments</p>

          <h2 className="text-4xl font-bold text-orange-400 mt-3">
            ₹ {dashboardData.payments.totalPending}
          </h2>
        </div>

      </div>

      {/* attendance */}

      <div className="grid grid-cols-2 gap-6 mt-6">

        <div className="bg-[#071426] p-6 rounded-3xl border border-white/5">

          <p className="text-slate-400">
            Present Attendance
          </p>

          <h2 className="text-5xl font-bold text-green-400 mt-3">
            {dashboardData.attendance.presentCount}
          </h2>

        </div>

        <div className="bg-[#071426] p-6 rounded-3xl border border-white/5">

          <p className="text-slate-400">
            Absent Attendance
          </p>

          <h2 className="text-5xl font-bold text-red-400 mt-3">
            {dashboardData.attendance.absentCount}
          </h2>

        </div>

      </div>

      {/* CHARTS */}

      <div className="grid grid-cols-12 gap-6 mt-6">

        {/* ENROLLMENT CHART */}

        <div className="col-span-12 xl:col-span-7 bg-[#071426] rounded-3xl p-6 border border-white/5">

          <div className="flex justify-between items-center mb-6">

            <div>
              <h2 className="text-2xl font-semibold text-white">
                Student Enrollment Overview
              </h2>

              <p className="text-slate-400 mt-1">
                Monthly enrollment statistics
              </p>
            </div>

          </div>

          <div className="h-[400px]">

            <ResponsiveContainer width="100%" height="100%">

              <AreaChart data={dashboardData.chartData}>

                <defs>
                  <linearGradient id="colorData" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <XAxis
                  dataKey="month"
                  stroke="#94A3B8"
                />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#2563EB"
                  fillOpacity={1}
                  fill="url(#colorData)"
                  strokeWidth={3}
                />

              </AreaChart>

            </ResponsiveContainer>

          </div>
        </div>

        {/* SCHEDULES */}

        <div className="col-span-12 xl:col-span-5 bg-[#071426] rounded-3xl p-6 border border-white/5">

          <div className="mb-6">

            <h2 className="text-2xl font-semibold text-white">
              Today's Schedule
            </h2>

            <p className="text-slate-400 mt-1">
              Upcoming driving classes
            </p>

          </div>

          <div className="space-y-4">

            {dashboardData.schedules.map((schedule, index) => (

              <div
                key={index}
                className="
                  flex
                  justify-between
                  items-center
                  bg-[#0B1C31]
                  rounded-2xl
                  p-4
                  border
                  border-white/5
                "
              >
                <div>

                  <h4 className="text-blue-400 font-semibold">
                    {schedule.time}
                  </h4>

                  <p className="text-white mt-1">
                    {schedule.title}
                  </p>

                  <p className="text-slate-400 text-sm mt-1">
                    Instructor: {schedule.instructor}
                  </p>

                </div>

                <span className="bg-blue-600 px-3 py-2 rounded-xl text-sm">
                  {schedule.students} Students
                </span>

              </div>
            ))}

          </div>
        </div>

      </div>
    </div>
  );
}