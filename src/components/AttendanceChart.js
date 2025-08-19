// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// const data = [
//   { date: "Mon", present: 100 },
//   { date: "Tue", present: 120 },
//   { date: "Wed", present: 130 },
//   { date: "Thu", present: 110 },
//   { date: "Fri", present: 140 },
// ];

// function AttendanceChart() {
//   return (
//     <div className="p-5 bg-white shadow-md rounded-lg mt-5">
//       <h3 className="text-lg font-bold mb-4">Attendance Overview</h3>
//       <ResponsiveContainer width="100%" height={300}>
//         <LineChart data={data}>
//           <XAxis dataKey="date" />
//           <YAxis />
//           <Tooltip />
//           <Line
//             type="monotone"
//             dataKey="present"
//             stroke="#8884d8"
//             strokeWidth={2}
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }

// export default AttendanceChart;




//////////




import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";

// Enhanced dummy data for the charts
const attendanceData = [
  { date: "Mon", present: 100, absent: 20, total: 120, percentage: 83.3 },
  { date: "Tue", present: 120, absent: 15, total: 135, percentage: 88.9 },
  { date: "Wed", present: 130, absent: 10, total: 140, percentage: 92.9 },
  { date: "Thu", present: 110, absent: 25, total: 135, percentage: 81.5 },
  { date: "Fri", present: 140, absent: 15, total: 155, percentage: 90.3 },
  { date: "Sat", present: 85, absent: 8, total: 93, percentage: 91.4 },
  { date: "Sun", present: 75, absent: 5, total: 80, percentage: 93.8 },
];

const leaveData = [
  { name: "Sick Leave", value: 4, color: "#FF6B6B" },
  { name: "Annual Leave", value: 3, color: "#4ECDC4" },
  { name: "Emergency Leave", value: 2, color: "#45B7D1" },
  { name: "Other Leave", value: 1, color: "#FFA07A" },
];

// Modern color palette
const colors = {
  primary: "#667eea",
  secondary: "#764ba2",
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
  info: "#3B82F6",
  gradient: {
    blue: ["#667eea", "#764ba2"],
    green: ["#11998e", "#38ef7d"],
    orange: ["#fc4a1a", "#f7b733"],
    purple: ["#667eea", "#764ba2"],
  }
};

// Custom Tooltip Components
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-semibold text-gray-800">{`Day: ${label}`}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {`${entry.dataKey}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const CustomPieTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-semibold text-gray-800">{payload[0].name}</p>
        <p className="text-sm text-gray-600">{`Count: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

function AttendanceChart() {
  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Attendance Analytics</h2>
        <p className="text-gray-600">Comprehensive overview of attendance patterns and trends</p>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Modern Bar Chart */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800">Daily Attendance</h3>
            <div className="flex space-x-4 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full mr-2"></div>
                <span className="text-gray-600">Present</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gradient-to-r from-red-400 to-red-600 rounded-full mr-2"></div>
                <span className="text-gray-600">Absent</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={attendanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <defs>
                <linearGradient id="presentGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.9}/>
                  <stop offset="95%" stopColor="#059669" stopOpacity={0.7}/>
                </linearGradient>
                <linearGradient id="absentGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.9}/>
                  <stop offset="95%" stopColor="#DC2626" stopOpacity={0.7}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6B7280', fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6B7280', fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="present"
                fill="url(#presentGradient)"
                radius={[4, 4, 0, 0]}
                name="Present"
              />
              <Bar
                dataKey="absent"
                fill="url(#absentGradient)"
                radius={[4, 4, 0, 0]}
                name="Absent"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Modern Pie Chart */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Leave Distribution</h3>
            <p className="text-gray-600 text-sm">Breakdown of different leave types</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
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
                outerRadius={100}
                innerRadius={40}
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

      {/* Full Width Area Chart */}
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2">Attendance Trend</h3>
          <p className="text-gray-600 text-sm">Weekly attendance percentage overview</p>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={attendanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#667eea" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#667eea" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
              domain={[0, 100]}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
                      <p className="font-semibold text-gray-800">{`Day: ${label}`}</p>
                      <p className="text-sm text-blue-600">
                        {`Attendance: ${payload[0].value}%`}
                      </p>
                      <p className="text-xs text-gray-500">
                        {`${payload[0].payload.present}/${payload[0].payload.total} employees`}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="percentage"
              stroke="#667eea"
              strokeWidth={3}
              fill="url(#areaGradient)"
              dot={{ r: 5, fill: "#667eea", strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 7, stroke: "#667eea", strokeWidth: 3, fill: "#fff" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>


    </div>
  );
}

export default AttendanceChart;
