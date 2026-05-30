import {
  FaHome,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaCar,
  FaMoneyBill,
  FaChartBar,
  FaCog,
} from "react-icons/fa";

export default function Sidebar() {
  const menu = [
    { icon: <FaHome />, title: "Dashboard" },
    { icon: <FaUserGraduate />, title: "Students" },
    { icon: <FaChalkboardTeacher />, title: "Instructors" },
    { icon: <FaCar />, title: "Vehicles" },
    { icon: <FaMoneyBill />, title: "Payments" },
    { icon: <FaChartBar />, title: "Reports" },
    { icon: <FaCog />, title: "Settings" },
  ];

  return (
    <aside className="w-[270px] bg-[#03111f] border-r border-white/5 flex flex-col">

      <div className="p-8 text-center border-b border-white/5">
        <img
          src="/logo.png"
          alt="DriveEase"
          className="w-36 mx-auto"
        />

        <h2 className="text-4xl font-bold mt-2">
          <span className="text-white">Drive</span>
          <span className="text-blue-500">Ease</span>
        </h2>

        <p className="text-xs text-slate-400 mt-2">
          SMART DRIVING INSTITUTE
        </p>
      </div>

      <nav className="flex-1 p-4">
        {menu.map((item) => (
          <button
            key={item.title}
            className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl mb-2 transition
            ${
              item.title === "Dashboard"
                ? "bg-blue-600 text-white"
                : "hover:bg-white/5 text-slate-300"
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.title}</span>
          </button>
        ))}
      </nav>

      <div className="m-4 bg-white/5 rounded-2xl p-4 flex items-center gap-3">
        <img
          src="https://i.pravatar.cc/100"
          alt=""
          className="w-12 h-12 rounded-full"
        />

        <div>
          <h4 className="font-semibold">Admin User</h4>
          <p className="text-sm text-slate-400">
            Administrator
          </p>
        </div>
      </div>
    </aside>
  );
}