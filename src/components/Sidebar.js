// import { Link } from "react-router-dom";
// import logo from "../assets/logo.png";

// function Sidebar({ isOpen }) {
//   return (
//     <div
//       className={`w-64 h-screen bg-gray-800 text-white p-5 fixed top-0 transition-transform duration-300 ${
//         isOpen ? "left-0" : "-left-64"
//       }`}
//     >
//       <div className="flex justify-center mb-4">
//         <img src={logo} alt="Company Logo" className="w-32 h-auto" />
//       </div>
//       <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
//       <ul>
//         <li className="mb-3">
//           <Link to="/" className="hover:text-gray-300">
//             📊 Dashboard
//           </Link>
//         </li>
//         <li className="mb-3">
//           <Link to="/master" className="hover:text-gray-300">
//             📊 Master
//           </Link>
//         </li>
//         <li className="mb-3">
//           <Link to="/supervisors" className="hover:text-gray-300">
//             🧑‍🏫 Supervisors
//           </Link>
//         </li>
//         <li className="mb-3">
//           <Link to="/assignSupervisorWard" className="hover:text-gray-300">
//             🧑‍🏫 Assign Supervisor Ward
//           </Link>
//         </li>
//         <li className="mb-3">
//           <Link to="/employees" className="hover:text-gray-300">
//             👨‍💼 Employees
//           </Link>
//         </li>
//         <li className="mb-3">
//           <Link to="/attendance" className="hover:text-gray-300">
//             📅 Attendance Reports
//           </Link>
//         </li>
//         <li className="mb-3">
//           <Link to="/settings" className="hover:text-gray-300">
//             ⚙️ Settings
//           </Link>
//         </li>
//       </ul>
//     </div>
//   );
// }

// export default Sidebar;





import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  FaChartBar,
  FaDatabase,
  FaUserTie,
  FaBuilding,
  FaUsers,
  FaCalendarAlt,
  FaCog,
  FaFileAlt,
  FaClipboardList
} from "react-icons/fa";
import logo from "../assets/logo.png";

function Sidebar({ isOpen }) {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState(null);

  const menuItems = [
    {
      path: "/",
      label: "Dashboard",
      icon: FaChartBar,
      description: "Overview & Analytics"
    },
    {
      path: "/master",
      label: "Master",
      icon: FaDatabase,
      description: "Master Data Management"
    },
    {
      path: "/supervisors",
      label: "Supervisors",
      icon: FaUserTie,
      description: "Supervisor Management"
    },
    {
      path: "/assignSupervisorWard",
      label: "AssignSupervisorWard",
      icon: FaBuilding,
      description: "Ward Assignments"
    },
    {
      path: "/employees",
      label: "Employees",
      icon: FaUsers,
      description: "Employee Management"
    },
    {
      path: "/attendance",
      label: "AttendanceReports",
      icon: FaCalendarAlt,
      description: "Reports & Analytics"
    },
    {
      path: "/generate-report",
      label: "Generate Reports",
      icon: FaFileAlt,
      description: "Create & Download Reports"
    },
    {
      path: "/manage-attendance",
      label: "Manage Attendance",
      icon: FaClipboardList,
      description: "Attendance Management"
    },
    {
      path: "/settings",
      label: "Settings",
      icon: FaCog,
      description: "System Configuration"
    }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div
      className={`${isOpen ? "w-72" : "w-20"} h-screen bg-gradient-to-b from-purple-200 to-purple-300 border-r border-purple-300 fixed top-0 left-0 transition-all duration-500 ease-out shadow-xl`}
    >
      {/* Header Section */}
      <div className={`${isOpen ? "p-6" : "p-4"} border-b border-slate-700 transition-all duration-500`}>
        <div className={`flex items-center justify-center ${isOpen ? "mb-4" : "mb-0"} transition-all duration-500`}>
          <div className="relative group">
            <div className="absolute inset-0 bg-white rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative bg-white rounded-xl p-2 shadow-lg group-hover:scale-105 transition-all duration-500">
              <img
                src={logo}
                alt="Apricity Digital Lab Logo"
                className={`${isOpen ? "w-16 h-16" : "w-8 h-8"} transition-all duration-500`}
              />
            </div>
          </div>
        </div>
        {isOpen && (
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-1">AttendEase</h2>
            <p className="text-sm text-gray-700 font-medium">Admin Panel</p>
          </div>
        )}
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 overflow-y-auto py-6">
        <nav className={`${isOpen ? "px-4" : "px-2"} space-y-2 transition-all duration-500`}>
          {menuItems.map((item, index) => (
            <Link
              key={item.path}
              to={item.path}
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
              className={`group relative flex items-center ${isOpen ? "px-4 py-3" : "px-2 py-3 justify-center"} rounded-2xl transition-all duration-300 ease-out ${
                isActive(item.path)
                  ? "bg-purple-200 text-gray-900 shadow-sm"
                  : "text-gray-700 hover:bg-purple-100 hover:text-gray-900"
              }`}
              title={!isOpen ? item.label : ""}
            >
              {/* Active Indicator */}
              {isActive(item.path) && isOpen && (
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-400 to-blue-600 rounded-r-full"></div>
              )}

              {/* Icon */}
              <div className={`flex items-center justify-center ${isOpen ? "w-10 h-10 mr-4" : "w-8 h-8"} rounded-xl transition-all duration-300 ${
                isActive(item.path)
                  ? "bg-purple-300 shadow-sm"
                  : "bg-purple-200 group-hover:bg-purple-300 group-hover:shadow-sm"
              }`}>
                <item.icon className={`${isOpen ? "text-lg" : "text-sm"} ${
                  isActive(item.path) ? "text-gray-900" : "text-gray-700"
                }`} />
              </div>

              {/* Text Content - Only show when sidebar is open */}
              {isOpen && (
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className={`font-medium transition-colors duration-300 ${
                      isActive(item.path) ? "text-gray-900" : "text-gray-700"
                    }`}>
                      {item.label}
                    </span>

                    {/* Hover Arrow */}
                    <div className={`transform transition-all duration-300 ${
                      hoveredItem === index ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0"
                    }`}>
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>

                  {/* Description */}
                  <p className={`text-xs mt-1 transition-all duration-300 ${
                    isActive(item.path)
                      ? "text-gray-600 opacity-100"
                      : hoveredItem === index
                        ? "text-gray-600 opacity-100"
                        : "text-gray-500 opacity-0"
                  }`}>
                    {item.description}
                  </p>
                </div>
              )}

              {/* Magical Hover Effect */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-slate-800/50 to-slate-700/50 opacity-0 transition-opacity duration-300 ${
                hoveredItem === index && !isActive(item.path) ? "opacity-100" : ""
              }`}></div>
            </Link>
          ))}
        </nav>
      </div>

      {/* Footer */}
      <div className={`${isOpen ? "p-4" : "p-2"} border-t border-purple-300 transition-all duration-500`}>
        <div className="bg-purple-200 rounded-2xl p-4 text-center">
          <div className={`${isOpen ? "w-8 h-8" : "w-6 h-6"} bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mx-auto ${isOpen ? "mb-2" : ""} flex items-center justify-center transition-all duration-500`}>
            <span className={`text-white ${isOpen ? "text-sm" : "text-xs"} font-bold`}>A</span>
          </div>
          {isOpen && (
            <>
              <p className="text-xs text-gray-800 font-medium">AttendEase v2.0</p>
              <p className="text-xs text-gray-600">Admin Dashboard</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
