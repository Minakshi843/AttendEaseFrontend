// import DashboardStats from "../components/DashboardStats";
// import AttendanceChart from "../components/AttendanceChart";
// import QuickActions from "../components/QuickActions";
// // import DynamicReportForm from "../components/DynamicReportForm";

// function Dashboard() {
//   return (
//     <div className="p-5">
//       {/* <DynamicReportForm /> */}
//       <h1 className="text-2xl font-bold mb-5">📊 Admin Dashboard</h1>
//       <DashboardStats />
//       <AttendanceChart />
//       <QuickActions />
//     </div>
//   );
// }

// export default Dashboard;



import { useState, useEffect } from "react";
import DashboardStats from "../components/DashboardStats";
import AttendanceChart from "../components/AttendanceChart";
import QuickActions from "../components/QuickActions";

function Dashboard() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Trigger animations on component mount
    setIsLoaded(true);

    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-GB', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.toLocaleDateString('en-US', { month: 'long' }).toLowerCase();
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100">

      {/* Main Content */}
      <div className="relative z-10 p-6 lg:p-8">
        {/* Header Section */}
        <div className={`transform transition-all duration-1000 ease-out ${
          isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
        }`}>
          <div className="flex items-center justify-between mb-8">
            {/* Title */}
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-800">
              AttendEase Admin Dashboard
            </h1>

            {/* Date and Time */}
            <div className="text-right">
              <div className="text-lg font-semibold text-gray-700">
                {formatTime(currentTime)}
              </div>
              <div className="text-sm text-gray-500">
                {formatDate(currentTime)}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className={`transform transition-all duration-1000 ease-out delay-200 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="mb-8">
            <DashboardStats />
          </div>
        </div>

        {/* Charts Section */}
        <div className={`transform transition-all duration-1000 ease-out delay-400 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="mb-8">
            <AttendanceChart />
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className={`transform transition-all duration-1000 ease-out delay-600 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="bg-gradient-to-r from-green-400 to-blue-500 w-2 h-8 rounded-full mr-4"></span>
              Quick Actions
            </h2>
            <QuickActions />
          </div>
        </div>


      </div>
    </div>
  );
}

export default Dashboard;
