// import { FaBars, FaSearch, FaBell, FaExpand } from "react-icons/fa";
// import { useAuth } from "../AuthContext"; // Import useAuth hook

// function Navbar({ toggleSidebar }) {
//   const { user, logout } = useAuth();
//   return (
//     <nav className="bg-white shadow-md p-4 flex justify-between items-center">
//       {/* Left Section: Sidebar Toggle & Search */}
//       <div className="flex items-center space-x-4">
//         <button onClick={toggleSidebar} className="text-gray-700 text-xl">
//           <FaBars />
//         </button>
//         <div className="flex border border-gray-300 rounded-lg overflow-hidden">
//           <input
//             type="text"
//             placeholder="Search for anything..."
//             className="p-2 text-gray-600 outline-none w-60"
//           />
//           <button className="bg-purple-500 text-white p-2">
//             <FaSearch />
//           </button>
//         </div>
//       </div>

//       {/* Right Section: Fullscreen, Notifications, User Avatar, Logout */}
//       <div className="flex items-center space-x-4">
//         <h1>Welcome back {user?.name},</h1>
//         <h1>Role: {user?.role}</h1>
//         <button className="text-gray-700 text-xl">
//           <FaExpand />
//         </button>
//         <div className="relative">
//           <FaBell className="text-gray-700 text-xl" />
//           <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
//             4
//           </span>
//         </div>
//         <button
//           onClick={logout} // Call logout function
//           className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
//         >
//           Logout
//         </button>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;




import { FaBars, FaSearch, FaBell, FaExpand, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../AuthContext"; // Import useAuth hook

function Navbar({ toggleSidebar }) {
  const { user, logout } = useAuth();
  return (
    <nav className="bg-white border-b border-slate-200 px-6 py-4 shadow-sm">
      <div className="flex justify-between items-center">
        {/* Left Section: Sidebar Toggle & Search */}
        <div className="flex items-center space-x-6">
          {/* Sidebar Toggle */}
          <button
            onClick={toggleSidebar}
            className="p-3 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-all duration-300 ease-out group"
          >
            <FaBars className="text-lg group-hover:scale-110 transition-transform duration-300" />
          </button>

          {/* Modern Search Bar */}
          <div className="relative">
            <div className="flex items-center bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
              <div className="pl-4 pr-2">
                <FaSearch className="text-slate-400 text-sm" />
              </div>
              <input
                type="text"
                placeholder="Search anything..."
                className="py-3 pr-4 bg-transparent text-slate-700 placeholder-slate-400 outline-none w-80 font-medium"
              />
            </div>
          </div>
        </div>

        {/* Right Section: User Info & Actions */}
        <div className="flex items-center space-x-6">
          {/* User Welcome Section */}
          <div className="hidden lg:flex items-center space-x-4 bg-slate-50 rounded-2xl px-4 py-2 border border-slate-200">
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-800 tracking-wide">
                Welcome, {user?.name}
              </p>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">
                {user?.role}
              </p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
              <FaUserCircle className="text-white text-lg" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            {/* Fullscreen Button */}
            <button className="p-3 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-all duration-300 ease-out group">
              <FaExpand className="text-lg group-hover:scale-110 transition-transform duration-300" />
            </button>

            {/* Notifications */}
            <div className="relative group">
              <button className="p-3 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-all duration-300 ease-out">
                <FaBell className="text-lg group-hover:scale-110 transition-transform duration-300" />
              </button>
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-400 to-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold shadow-lg animate-pulse">
                4
              </span>
            </div>

            {/* Logout Button */}
            <button
              onClick={logout}
              className="ml-4 px-6 py-3 bg-gradient-to-r from-red-400 to-red-500 text-white rounded-2xl hover:from-red-500 hover:to-red-600 transition-all duration-300 ease-out font-semibold text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
