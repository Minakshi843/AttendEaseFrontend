// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import { useState } from "react";
// import Sidebar from "./components/Sidebar";
// import Master from "./pages/Master";
// import Dashboard from "./pages/Dashboard";
// import Employees from "./pages/Employees";
// import AttendanceReports from "./pages/AttendanceReports";
// import Supervisors from "./pages/Supervisors";
// import AssignSupervisorWard from "./pages/AssignSupervisorWard";
// import Settings from "./pages/Settings";
// import Navbar from "./components/Navbar";
// import Login from "./pages/Login";
// import ProtectedRoute from "./ProtectedRoute";
// import { useAuth } from "./AuthContext";
// import { AuthProvider } from "./AuthContext";
// import { Link } from 'react-router-dom';

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <MainContent />
//       </Router>
//     </AuthProvider>
//   );
// }

// function MainContent() {
//   const [isSidebarOpen, setSidebarOpen] = useState(true);
//   const { user } = useAuth();

//   return (
//     <div className="flex">
//       {user && <Sidebar isOpen={isSidebarOpen} />}
//       <div
//         className={`flex-1 ${
//           user && isSidebarOpen ? "ml-64" : "ml-0"
//         } transition-all duration-300`}
//       >
//         {user && (
//           <Navbar toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
//         )}
//         <div className="p-5">
//           <Routes>
//             <Route path="/login" element={<RedirectIfAuthenticated />} />

//             <Route
//               path="/"
//               element={<ProtectedRoute element={<Dashboard />} />}
//             />
//             <Route
//               path="/master"
//               element={<ProtectedRoute element={<Master />} />}
//             />
//             <Route
//               path="/employees"
//               element={<ProtectedRoute element={<Employees />} />}
//             />
//             <Route
//               path="/attendance"
//               element={<ProtectedRoute element={<AttendanceReports />} />}
//             />
//             <Route
//               path="/supervisors"
//               element={<ProtectedRoute element={<Supervisors />} />}
//             />
//             <Route
//               path="/assignSupervisorWard"
//               element={<ProtectedRoute element={<AssignSupervisorWard />} />}
//             />
//             <Route
//               path="/settings"
//               element={<ProtectedRoute element={<Settings />} />}
//             />
//           </Routes>
//         </div>
//       </div>
//     </div>
//   );
// }

// const RedirectIfAuthenticated = () => {
//   const { user } = useAuth();
//   return user ? <Navigate to="/" replace /> : <Login />;
// };

// export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Master from "./pages/Master";  // Import Master page
import Employees from "./pages/Employees";  // Import the Employees page
import AttendanceReports from "./pages/AttendanceReports";
import Supervisors from "./pages/Supervisors";
import AssignSupervisorWard from "./pages/AssignSupervisorWard";
import Settings from "./pages/Settings";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import { useAuth } from "./AuthContext";
import { AuthProvider } from "./AuthContext";
import GenerateReport from "./pages/GenerateReport";  // Import GenerateReport page
import ManageAttendance from "./pages/ManageAttendance";  // Import ManageAttendance page
import BackendTest from "./components/BackendTest";  // Import BackendTest component

function App() {
  return (
    <AuthProvider>
      <Router>
        <MainContent />
      </Router>
    </AuthProvider>
  );
}

function MainContent() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const { user } = useAuth();

  return (
    <div className="flex">
      {user && <Sidebar isOpen={isSidebarOpen} />}
      <div
        className={`flex-1 ${user && isSidebarOpen ? "ml-72" : user ? "ml-20" : "ml-0"} transition-all duration-500`}
      >
        {user && (
          <Navbar toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
        )}
        <div className="p-5">
          <Routes>
            <Route path="/login" element={<RedirectIfAuthenticated />} />
            <Route path="/" element={<ProtectedRoute element={<Dashboard />} />} />
            <Route path="/master" element={<ProtectedRoute element={<Master />} />} />  {/* Master route */}
            <Route path="/employees" element={<ProtectedRoute element={<Employees />} />} />  {/* Employees route */}
            <Route path="/generate-report" element={<ProtectedRoute element={<GenerateReport />} />} /> {/* GenerateReport route */}
            <Route path="/manage-attendance" element={<ProtectedRoute element={<ManageAttendance />} />} /> {/* ManageAttendance route */}
            <Route path="/attendance" element={<ProtectedRoute element={<AttendanceReports />} />} />
            <Route path="/supervisors" element={<ProtectedRoute element={<Supervisors />} />} />
            <Route path="/assignSupervisorWard" element={<ProtectedRoute element={<AssignSupervisorWard />} />} />
            <Route path="/settings" element={<ProtectedRoute element={<Settings />} />} />
            <Route path="/test-backend" element={<BackendTest />} />  {/* Backend test route - no auth required */}
            {/* Add other routes as needed */}
          </Routes>
        </div>
      </div>
    </div>
  );
}

const RedirectIfAuthenticated = () => {
  const { user } = useAuth();
  return user ? <Navigate to="/" replace /> : <Login />;
};

export default App;
