// function DashboardStats() {
//   const stats = [
//     { title: "Total Employees", value: 150, color: "bg-blue-500" },
//     { title: "Present Today", value: 120, color: "bg-green-500" },
//     { title: "Absent Today", value: 20, color: "bg-red-500" },
//     { title: "On Leave", value: 10, color: "bg-yellow-500" },
//   ];

//   return (
//     <div className="grid grid-cols-4 gap-4">
//       {stats.map((stat, index) => (
//         <div
//           key={index}
//           className={`p-5 text-white rounded-lg shadow-md ${stat.color}`}
//         >
//           <h3 className="text-lg font-bold">{stat.title}</h3>
//           <p className="text-2xl">{stat.value}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default DashboardStats;



////////////////////////////////

// import React, { useState } from "react";
// import { Bar, Pie } from "react-chartjs-2";
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement
// );

// function DashboardStats() {
//   // Stats for Total Employees, Present Today, Absent Today, and On Leave
//   const stats = [
//     { title: "Total Employees", value: 150, color: "bg-gradient-to-r from-blue-500 to-indigo-600" },
//     { title: "Present Today", value: 120, color: "bg-gradient-to-r from-green-400 to-teal-500" },
//     { title: "Absent Today", value: 20, color: "bg-gradient-to-r from-red-400 to-pink-500" },
//     { title: "On Leave", value: 10, color: "bg-gradient-to-r from-yellow-400 to-orange-500" },
//   ];

//   // On Leave distribution (informed vs uninformed)
//   const onLeaveDistribution = {
//     informed: {
//       sickLeave: 4,
//       otherLeaveTypes: 3,  // Updated to "Other Leave Types"
//       emergencyLeave: 2,
//       otherLeave: 1,
//     },
//     uninformed: 2,
//   };

//   // State to manage hover state for On Leave
//   const [isHovered, setIsHovered] = useState(false);

//   // Data for Daily Attendance (Bar Chart)
//   const dailyAttendanceData = {
//     labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
//     datasets: [
//       {
//         label: 'Total Attendance',
//         data: [150, 135, 145, 148, 150],
//         backgroundColor: 'rgba(75, 192, 192, 0.5)',
//         borderColor: 'rgba(75, 192, 192, 1)',
//         borderWidth: 1
//       },
//       {
//         label: 'Absent',
//         data: [20, 15, 10, 20, 18],
//         backgroundColor: 'rgba(255, 99, 132, 0.5)',
//         borderColor: 'rgba(255, 99, 132, 1)',
//         borderWidth: 1
//       }
//     ]
//   };

//   // Data for Leave Distribution (Pie Chart)
//   const leaveDistributionData = {
//     labels: ['Sick Leave', 'Other Leave Types', 'Emergency Leave', 'Other Leave'],
//     datasets: [
//       {
//         label: 'Leave Types',
//         data: [4, 3, 2, 1],
//         backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)'],
//         borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)'],
//         borderWidth: 1
//       }
//     ]
//   };

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//       {/* Stats Display */}
//       {stats.map((stat, index) => (
//         <div
//           key={index}
//           className={`p-6 text-white rounded-xl shadow-xl transform hover:scale-105 transition duration-300 ease-in-out ${stat.color}`}
//         >
//           <h3 className="text-xl font-semibold mb-2">{stat.title}</h3>
//           <p className="text-4xl font-bold">{stat.value}</p>
//         </div>
//       ))}

//       {/* On Leave Distribution Breakdown (Only show when hovered) */}
//       <div
//         className="col-span-1 md:col-span-2 lg:col-span-4 p-6 bg-white rounded-xl shadow-xl transform transition duration-500 ease-in-out"
//         onMouseEnter={() => setIsHovered(true)} // Set hover state to true when mouse enters
//         onMouseLeave={() => setIsHovered(false)} // Set hover state to false when mouse leaves
//       >
//         <h3 className="text-xl font-semibold mb-4">On Leave Distribution</h3>
//         {isHovered ? (
//           // Show detailed classification when hovered
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             {/* Informed Leave Card */}
//             <div className="p-5 bg-gradient-to-r from-green-200 to-green-400 rounded-xl shadow-md transition-all duration-500 ease-in-out opacity-100">
//               <h4 className="font-semibold text-lg mb-2">Informed Leave</h4>
//               <div className="space-y-3">
//                 <div className="flex justify-between text-lg">
//                   <span>Sick Leave</span>
//                   <span>{onLeaveDistribution.informed.sickLeave}</span>
//                 </div>
//                 <div className="flex justify-between text-lg">
//                   <span>Other Leave Types</span> {/* Updated */}
//                   <span>{onLeaveDistribution.informed.otherLeaveTypes}</span>
//                 </div>
//                 <div className="flex justify-between text-lg">
//                   <span>Emergency Leave</span>
//                   <span>{onLeaveDistribution.informed.emergencyLeave}</span>
//                 </div>
//                 <div className="flex justify-between text-lg">
//                   <span>Other Leave</span>
//                   <span>{onLeaveDistribution.informed.otherLeave}</span>
//                 </div>
//               </div>
//             </div>

//             {/* Uninformed Leave Card */}
//             <div className="p-5 bg-gradient-to-r from-red-200 to-red-400 rounded-xl shadow-md transition-all duration-500 ease-in-out opacity-100">
//               <h4 className="font-semibold text-lg mb-2">Uninformed Leave</h4>
//               <p className="text-2xl font-bold">{onLeaveDistribution.uninformed}</p>
//             </div>
//           </div>
//         ) : (
//           // Display only the number of "On Leave" when not hovered
//           <p className="text-4xl font-bold">{stats[3].value}</p>
//         )}
//       </div>

//       {/* New Graphs Section */}
//       {/* Bar Chart for Daily Attendance */}
//       <div className="p-5 bg-white rounded-lg shadow-lg">
//         <h2 className="font-semibold text-lg mb-4">Daily Attendance</h2>
//         <Bar data={dailyAttendanceData} options={{ responsive: true }} />
//       </div>

//       {/* Pie Chart for Leave Distribution */}
//       <div className="p-5 bg-white rounded-lg shadow-lg">
//         <h2 className="font-semibold text-lg mb-4">Leave Distribution</h2>
//         <Pie data={leaveDistributionData} options={{ responsive: true }} />
//       </div>
//     </div>
//   );
// }

// export default DashboardStats;


import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

function DashboardStats() {
  // State for date filtering
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [dateRange, setDateRange] = useState('today');
  const [showLeaveBreakdown, setShowLeaveBreakdown] = useState(false);
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');


  // Leave distribution data for pie chart
  const leaveData = [
    { name: "Sick Leave", value: 40, color: "#FF6B6B" },
    { name: "Annual Leave", value: 30, color: "#4ECDC4" },
    { name: "Emergency Leave", value: 20, color: "#45B7D1" },
    { name: "Other Leave", value: 10, color: "#FFA07A" },
  ];

  // Custom tooltip for pie chart
  const CustomPieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-800">{data.name}</p>
          <p className="text-sm text-gray-600">
            <span className="font-bold" style={{ color: data.payload.color }}>
              {data.value}%
            </span> of total leave
          </p>
        </div>
      );
    }
    return null;
  };

  // Mock data for different time periods (in real app, this would come from API)
  const mockDataByPeriod = {
    // Daily data
    daily: {
      '2025-06-25': {
        totalEmployees: 150,
        presentToday: 120,
        absentToday: 20,
        onLeave: 10,
        leaveDistribution: {
          informed: { privilegeLeave: 3, casualLeave: 2, sickLeave: 2, compensatoryLeave: 1, emergencyLeave: 1 },
          uninformed: 1
        }
      },
      '2025-06-24': {
        totalEmployees: 150,
        presentToday: 125,
        absentToday: 15,
        onLeave: 10,
        leaveDistribution: {
          informed: { privilegeLeave: 2, casualLeave: 3, sickLeave: 3, compensatoryLeave: 1, emergencyLeave: 1 },
          uninformed: 0
        }
      },
      '2025-06-23': {
        totalEmployees: 150,
        presentToday: 118,
        absentToday: 22,
        onLeave: 10,
        leaveDistribution: {
          informed: { privilegeLeave: 4, casualLeave: 1, sickLeave: 3, compensatoryLeave: 1, emergencyLeave: 1 },
          uninformed: 0
        }
      }
    },
    // Weekly aggregated data
    weekly: {
      totalEmployees: 150,
      avgPresent: 121, // Average daily attendance
      avgAbsent: 19,   // Average daily absences
      avgOnLeave: 10,  // Average daily on leave
      leaveDistribution: {
        informed: { privilegeLeave: 9, casualLeave: 6, sickLeave: 8, compensatoryLeave: 3, emergencyLeave: 3 },
        uninformed: 1
      },
      workingDays: 7,
      totalPresent: 847,  // Total attendance for the week
      totalAbsent: 133,   // Total absences for the week
    },
    // Monthly aggregated data
    monthly: {
      totalEmployees: 150,
      avgPresent: 119,  // Average daily attendance
      avgAbsent: 21,    // Average daily absences
      avgOnLeave: 10,   // Average daily on leave
      leaveDistribution: {
        informed: { privilegeLeave: 35, casualLeave: 28, sickLeave: 32, compensatoryLeave: 12, emergencyLeave: 15 },
        uninformed: 8
      },
      workingDays: 25,
      totalPresent: 2975,  // Total attendance for the month
      totalAbsent: 525,    // Total absences for the month
    }
  };

  // Get current data based on selected date range
  const getCurrentData = () => {
    switch (dateRange) {
      case 'today':
        return mockDataByPeriod.daily[selectedDate] || mockDataByPeriod.daily['2025-06-25'];
      case 'weekly':
        return {
          totalEmployees: mockDataByPeriod.weekly.totalEmployees,
          presentToday: mockDataByPeriod.weekly.avgPresent,
          absentToday: mockDataByPeriod.weekly.avgAbsent,
          onLeave: mockDataByPeriod.weekly.avgOnLeave,
          leaveDistribution: mockDataByPeriod.weekly.leaveDistribution,
          period: 'weekly'
        };
      case 'monthly':
        return {
          totalEmployees: mockDataByPeriod.monthly.totalEmployees,
          presentToday: mockDataByPeriod.monthly.avgPresent,
          absentToday: mockDataByPeriod.monthly.avgAbsent,
          onLeave: mockDataByPeriod.monthly.avgOnLeave,
          leaveDistribution: mockDataByPeriod.monthly.leaveDistribution,
          period: 'monthly'
        };
      default:
        return mockDataByPeriod.daily[selectedDate] || mockDataByPeriod.daily['2025-06-25'];
    }
  };

  const currentData = getCurrentData();

  // Get period-specific labels
  const getPeriodLabels = () => {
    switch (dateRange) {
      case 'weekly':
        return {
          present: "Avg Daily Present",
          absent: "Avg Daily Absent",
          onLeave: "Avg Daily On Leave"
        };
      case 'monthly':
        return {
          present: "Avg Daily Present",
          absent: "Avg Daily Absent",
          onLeave: "Avg Daily On Leave"
        };
      default:
        return {
          present: "Present Today",
          absent: "Absent Today",
          onLeave: "On Leave"
        };
    }
  };

  const labels = getPeriodLabels();

  // Stats with neutral, professional colors
  const stats = [
    {
      title: "Total Employees",
      value: currentData.totalEmployees,
      icon: "👥",
      bgColor: "bg-slate-50",
      borderColor: "border-slate-200",
      textColor: "text-slate-700",
      valueColor: "text-slate-800",
      iconBg: "bg-slate-100"
    },
    {
      title: labels.present,
      value: currentData.presentToday,
      icon: "✅",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-700",
      valueColor: "text-blue-800",
      iconBg: "bg-blue-100"
    },
    {
      title: labels.absent,
      value: currentData.absentToday,
      icon: "❌",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
      textColor: "text-gray-700",
      valueColor: "text-gray-800",
      iconBg: "bg-gray-100"
    },
    {
      title: labels.onLeave,
      value: currentData.onLeave,
      icon: "🏖️",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200",
      textColor: "text-indigo-700",
      valueColor: "text-indigo-800",
      iconBg: "bg-indigo-100"
    },
  ];

  // Use current data for leave distribution
  const onLeaveDistribution = currentData.leaveDistribution;



  // Handle date range changes
  const handleDateRangeChange = (range) => {
    setDateRange(range);
    if (range === 'today') {
      setSelectedDate(new Date().toISOString().split('T')[0]);
    } else if (range === 'weekly') {
      // Set to current week
      const today = new Date();
      const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
      const weekEnd = new Date(today.setDate(today.getDate() - today.getDay() + 6));
      setCustomStartDate(weekStart.toISOString().split('T')[0]);
      setCustomEndDate(weekEnd.toISOString().split('T')[0]);
    } else if (range === 'monthly') {
      // Set to current month
      const today = new Date();
      const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
      const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      setCustomStartDate(monthStart.toISOString().split('T')[0]);
      setCustomEndDate(monthEnd.toISOString().split('T')[0]);
    }
  };

  // Format date for display
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Organization overview data with magical design
  const organizationStats = [
    {
      title: "Total Registered",
      value: 150,
      icon: "👤",
      description: "All registered users",
      gradient: "from-slate-600 to-slate-800"
    },
    {
      title: "Total Supervisors",
      value: 12,
      icon: "👨‍💼",
      description: "Active supervisors",
      gradient: "from-slate-700 to-slate-900"
    },
    {
      title: "Total Employees",
      value: 138,
      icon: "👥",
      description: "Active employees",
      gradient: "from-gray-600 to-gray-800"
    },
    {
      title: "Total Cities",
      value: 8,
      icon: "🏙️",
      description: "Operating locations",
      gradient: "from-slate-600 to-slate-800"
    },
    {
      title: "Total Units",
      value: 25,
      icon: "🏢",
      description: "Business units",
      gradient: "from-gray-700 to-gray-900"
    },
    {
      title: "Top Performing Site",
      value: "Indore, Crystal IT Park",
      icon: "🏆",
      description: "98% attendance rate",
      gradient: "from-slate-700 to-slate-900"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Organization Overview Section - Clean & Elegant */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-purple-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-200 to-purple-300 px-8 py-6 border-b border-purple-400">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-white/70 rounded-xl flex items-center justify-center text-2xl">
              🏢
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-bold text-gray-900">Organization Overview</h3>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="p-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {organizationStats.map((stat, index) => (
              <div
                key={index}
                className="group text-center p-6 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                {/* Icon */}
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-50 rounded-full flex items-center justify-center text-2xl group-hover:bg-gray-100 transition-colors duration-300">
                  {stat.icon}
                </div>

                {/* Value */}
                <div className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-black transition-colors duration-300">
                  {stat.value}
                </div>

                {/* Title */}
                <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">
                  {stat.title}
                </div>

                {/* Description */}
                <div className="text-xs text-gray-500">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Date Filter Section */}
      <div className="bg-white/80 backdrop-blur-sm border-2 border-purple-200 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="bg-purple-100 w-10 h-10 rounded-lg flex items-center justify-center">
              📅
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Date Filter</h3>
              <p className="text-sm text-gray-500">View attendance data for specific dates</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* Quick Date Buttons */}
            <div className="flex gap-2">
              {['today', 'weekly', 'monthly'].map((range) => (
                <button
                  key={range}
                  onClick={() => handleDateRangeChange(range)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    dateRange === range
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {range.charAt(0).toUpperCase() + range.slice(1)}
                </button>
              ))}
            </div>

            {/* Custom Date Picker - Only show for daily view */}
            {dateRange === 'today' && (
              <div className="flex items-center gap-2">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => {
                    setSelectedDate(e.target.value);
                    setDateRange('today');
                  }}
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Stats Display */}
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white/80 backdrop-blur-sm border-purple-200 border-2 rounded-2xl p-6 shadow-sm hover:shadow-md transform hover:-translate-y-1 transition-all duration-300 ease-out group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`${stat.iconBg} w-12 h-12 rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300`}>
              {stat.icon}
            </div>
            <div className="text-right">
              <div className={`text-xs font-medium ${stat.textColor} uppercase tracking-wide opacity-70`}>
                {stat.title}
              </div>
            </div>
          </div>
          <div className="space-y-1">
            <div className={`text-3xl font-bold ${stat.valueColor} group-hover:scale-105 transition-transform duration-300`}>
              {stat.value}
            </div>
            <div className={`text-sm ${stat.textColor} opacity-60`}>
              {stat.title === "Present Today" && "Active employees"}
              {stat.title === "Total Employees" && "Registered users"}
              {stat.title === "Absent Today" && "Not checked in"}
              {stat.title === "On Leave" && "Approved absences"}
            </div>
          </div>
        </div>
      ))}
      </div>

      {/* On Leave Distribution Breakdown */}
      <div
        className="col-span-1 md:col-span-2 lg:col-span-4 bg-white/80 backdrop-blur-sm border-2 border-purple-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-500 ease-in-out cursor-pointer"
        onClick={() => setShowLeaveBreakdown(!showLeaveBreakdown)}
      >
        <div className="flex items-center mb-6">
          <div className="bg-blue-50 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
            📊
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Leave Details</h3>
          <div className="ml-auto text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            {showLeaveBreakdown ? 'Detailed View' : 'Click to expand'}
          </div>
        </div>

        <div className={`transition-all duration-500 ease-in-out ${showLeaveBreakdown ? 'opacity-100 max-h-96' : 'opacity-60 max-h-20'} overflow-hidden`}>
          {showLeaveBreakdown ? (
            // Show detailed classification when hovered
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Informed Leave Card */}
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 transition-all duration-300 hover:bg-blue-100">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 w-8 h-8 rounded-lg flex items-center justify-center mr-3 text-sm">
                    ✅
                  </div>
                  <h4 className="font-medium text-blue-800">Informed Leave</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-blue-700">Privilege/Annual Leave</span>
                    <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full font-medium">
                      {onLeaveDistribution.informed.privilegeLeave}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-blue-700">Casual Leave</span>
                    <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full font-medium">
                      {onLeaveDistribution.informed.casualLeave}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-blue-700">Sick Leave</span>
                    <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full font-medium">
                      {onLeaveDistribution.informed.sickLeave}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-blue-700">Compensatory Leave</span>
                    <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full font-medium">
                      {onLeaveDistribution.informed.compensatoryLeave}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-blue-700">Emergency Leave</span>
                    <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full font-medium">
                      {onLeaveDistribution.informed.emergencyLeave}
                    </span>
                  </div>
                </div>

                {/* Uninformed Leave Info - moved below informed leave */}
                <div className="mt-4 p-3 bg-slate-50 border border-slate-100 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-slate-100 w-6 h-6 rounded-lg flex items-center justify-center mr-2 text-xs">
                        ⚠️
                      </div>
                      <span className="text-sm font-medium text-slate-800">Uninformed Leave</span>
                    </div>
                    <span className="text-lg font-bold text-slate-800">{onLeaveDistribution.uninformed}</span>
                  </div>
                  <div className="text-xs text-slate-600 mt-1 ml-8">
                    Employees absent without notice
                  </div>
                </div>
              </div>

              {/* Leave Distribution Chart */}
              <div className="bg-white border border-gray-100 rounded-xl p-5 transition-all duration-300 hover:shadow-md">
                <div className="mb-4">
                  <h4 className="text-lg font-bold text-gray-800 mb-1">Leave Distribution</h4>
                  <p className="text-gray-600 text-sm">Breakdown of different leave types</p>
                </div>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <defs>
                      {leaveData.map((entry, index) => (
                        <linearGradient key={index} id={`gradient-${index}`} x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor={entry.color} stopOpacity={0.8}/>
                          <stop offset="100%" stopColor={entry.color} stopOpacity={0.6}/>
                        </linearGradient>
                      ))}
                    </defs>
                    <Pie
                      data={leaveData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      innerRadius={30}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {leaveData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={`url(#gradient-${index})`}
                          stroke="#fff"
                          strokeWidth={2}
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomPieTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          ) : (
            // Simplified view when not clicked
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-gray-700">
                  {stats[3].value} employees on leave
                </div>
              </div>
              <div className="text-sm text-gray-500 text-center">
                Click to view breakdown
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Additional Dashboard Components */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">

        {/* Employee Status Overview */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-purple-200 p-6">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-2xl">
              👥
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-bold text-gray-800">Employee Status</h3>
              <p className="text-gray-600 text-sm">Real-time workforce overview</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-black rounded-full mr-3"></div>
                <span className="text-gray-700 font-medium">Present Today</span>
              </div>
              <span className="text-gray-800 font-bold">120/150</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-black rounded-full mr-3"></div>
                <span className="text-gray-700 font-medium">On Leave</span>
              </div>
              <span className="text-gray-800 font-bold">15</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-black rounded-full mr-3"></div>
                <span className="text-gray-700 font-medium">Late Arrivals</span>
              </div>
              <span className="text-gray-800 font-bold">8</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-black rounded-full mr-3"></div>
                <span className="text-gray-700 font-medium">Work from Home</span>
              </div>
              <span className="text-gray-800 font-bold">12</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-black rounded-full mr-3"></div>
                <span className="text-gray-700 font-medium">Early Departures</span>
              </div>
              <span className="text-gray-800 font-bold">3</span>
            </div>
          </div>
        </div>



        {/* Performance Metrics */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-purple-200 p-6">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-2xl">
              📈
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-bold text-gray-800">Performance</h3>
              <p className="text-gray-600 text-sm">Key performance indicators</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700 font-medium">Attendance Rate</span>
              <div className="flex items-center">
                <div className="w-20 h-2 bg-gray-200 rounded-full mr-3">
                  <div className="w-4/5 h-2 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-green-600 font-bold">85%</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-700 font-medium">Punctuality Score</span>
              <div className="flex items-center">
                <div className="w-20 h-2 bg-gray-200 rounded-full mr-3">
                  <div className="w-3/4 h-2 bg-blue-500 rounded-full"></div>
                </div>
                <span className="text-blue-600 font-bold">78%</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-700 font-medium">Leave Utilization</span>
              <div className="flex items-center">
                <div className="w-20 h-2 bg-gray-200 rounded-full mr-3">
                  <div className="w-3/5 h-2 bg-orange-500 rounded-full"></div>
                </div>
                <span className="text-orange-600 font-bold">62%</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-700 font-medium">Overtime Hours</span>
              <span className="text-purple-600 font-bold">245h</span>
            </div>
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-purple-200 p-6">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
              📋
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-bold text-gray-800">Recent Activity</h3>
              <p className="text-gray-600 text-sm">Latest system activities</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-3 rounded-lg">
              <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-800 font-medium">John Doe checked in at 9:15 AM</p>
                <p className="text-xs text-gray-500">2 minutes ago</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 rounded-lg">
              <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-800 font-medium">Sarah's leave request approved</p>
                <p className="text-xs text-gray-500">15 minutes ago</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 rounded-lg">
              <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-800 font-medium">IT Department: 95% attendance today</p>
                <p className="text-xs text-gray-500">1 hour ago</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 rounded-lg">
              <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-800 font-medium">Monthly report generated</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 rounded-lg">
              <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-800 font-medium">5 employees marked late today</p>
                <p className="text-xs text-gray-500">3 hours ago</p>
              </div>
            </div>
          </div>

          <button className="w-full mt-4 py-2 text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors duration-200">
            View All Activities
          </button>
        </div>
      </div>




    </div>
  );
}

export default DashboardStats;
