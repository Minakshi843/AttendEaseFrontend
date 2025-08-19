import React, { useState } from "react";

const GenerateReport = () => {
  // States for the form inputs
  const [reportType, setReportType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    city: "",
    unit: "",
    department: "",
    employee: ""
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [showRecentReports, setShowRecentReports] = useState(false);
  const [showQuickReports, setShowQuickReports] = useState(false);
  const [showAnalyticsDashboard, setShowAnalyticsDashboard] = useState(false);

  // Sample recent reports data
  const recentReports = [
    {
      id: 1,
      name: "Employee Attendance Report",
      type: "Attendance",
      dateGenerated: "25 June 2025, 14:30",
      dateRange: "01 June 2025 - 25 June 2025",
      fileSize: "2.4 MB",
      status: "Downloaded"
    },
    {
      id: 2,
      name: "Department Summary Report",
      type: "Department",
      dateGenerated: "24 June 2025, 16:45",
      dateRange: "01 May 2025 - 31 May 2025",
      fileSize: "1.8 MB",
      status: "Downloaded"
    },
    {
      id: 3,
      name: "Monthly Analytics Report",
      type: "Analytics",
      dateGenerated: "23 June 2025, 10:15",
      dateRange: "01 May 2025 - 31 May 2025",
      fileSize: "3.2 MB",
      status: "Downloaded"
    },
    {
      id: 4,
      name: "Leave Management Report",
      type: "Leave",
      dateGenerated: "22 June 2025, 09:20",
      dateRange: "01 April 2025 - 30 April 2025",
      fileSize: "1.5 MB",
      status: "Downloaded"
    },
    {
      id: 5,
      name: "Supervisor Performance Report",
      type: "Performance",
      dateGenerated: "21 June 2025, 15:10",
      dateRange: "01 March 2025 - 31 March 2025",
      fileSize: "2.1 MB",
      status: "Downloaded"
    }
  ];

  // Quick Reports data
  const quickReports = [
    {
      id: 1,
      name: "Today's Attendance",
      description: "Current day attendance summary",
      icon: "●",
      color: "from-green-400 to-blue-400",
      estimatedTime: "< 1 min"
    },
    {
      id: 2,
      name: "Weekly Summary",
      description: "Last 7 days attendance overview",
      icon: "■",
      color: "from-blue-400 to-purple-400",
      estimatedTime: "< 2 min"
    },
    {
      id: 3,
      name: "Monthly Overview",
      description: "Current month performance metrics",
      icon: "▲",
      color: "from-purple-400 to-pink-400",
      estimatedTime: "< 3 min"
    },
    {
      id: 4,
      name: "Leave Balance Report",
      description: "All employees leave balance status",
      icon: "◆",
      color: "from-orange-400 to-red-400",
      estimatedTime: "< 2 min"
    }
  ];

  // Analytics Dashboard data
  const analyticsData = [
    {
      id: 1,
      title: "Attendance Rate",
      value: "94.2%",
      change: "+2.1%",
      trend: "up",
      description: "Overall attendance rate this month"
    },
    {
      id: 2,
      title: "Active Employees",
      value: "1,247",
      change: "+15",
      trend: "up",
      description: "Currently active employees"
    },
    {
      id: 3,
      title: "Late Arrivals",
      value: "23",
      change: "-8",
      trend: "down",
      description: "Late arrivals today"
    },
    {
      id: 4,
      title: "Leave Requests",
      value: "12",
      change: "+3",
      trend: "up",
      description: "Pending leave requests"
    },
    {
      id: 5,
      title: "Overtime Hours",
      value: "156",
      change: "-12",
      trend: "down",
      description: "Total overtime hours this week"
    },
    {
      id: 6,
      title: "Department Performance",
      value: "87.5%",
      change: "+1.8%",
      trend: "up",
      description: "Average department performance"
    }
  ];

  // Report types with enhanced options
  const reportTypes = [
    {
      id: "attendance",
      name: "Employee Attendance Report",
      icon: "📊",
      description: "Detailed attendance records with check-in/out times",
      color: "from-blue-500 to-purple-500"
    },
    {
      id: "supervisor",
      name: "Supervisor Performance Report",
      icon: "👥",
      description: "Supervisor efficiency and team management metrics",
      color: "from-green-500 to-blue-500"
    },
    {
      id: "department",
      name: "Department Summary Report",
      icon: "🏢",
      description: "Department-wise attendance and productivity analysis",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: "monthly",
      name: "Monthly Analytics Report",
      icon: "📈",
      description: "Comprehensive monthly performance insights",
      color: "from-orange-500 to-red-500"
    },
    {
      id: "leave",
      name: "Leave Management Report",
      icon: "🏖️",
      description: "Leave applications, approvals, and balance tracking",
      color: "from-teal-500 to-cyan-500"
    },
    {
      id: "overtime",
      name: "Overtime Analysis Report",
      icon: "⏰",
      description: "Overtime hours, costs, and productivity metrics",
      color: "from-indigo-500 to-purple-500"
    }
  ];

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reportType || !startDate || !endDate) {
      alert("Please fill in all required fields");
      return;
    }

    setIsGenerating(true);

    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      alert(`Report generated successfully!\nType: ${reportTypes.find(r => r.id === reportType)?.name}\nPeriod: ${startDate} to ${endDate}`);
    }, 2000);
  };

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 px-12 py-6">
      {/* Header Section */}
      <div className="bg-white shadow-lg border-b border-purple-100 rounded-t-xl">
        <div className="px-12 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-black mb-1">
                Generate Reports
              </h1>
              <p className="text-gray-600 text-sm">Create comprehensive reports and analytics for your organization</p>
            </div>

          </div>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-lg mb-6">
        <div className="px-12 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Recent Reports Button */}
            <div
              onClick={() => setShowRecentReports(true)}
              className="cursor-pointer bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg p-4 transition-all duration-200 hover:shadow-md"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-purple-600 text-lg">📊</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">Recent Reports</h3>
                  <p className="text-xs text-gray-500">View and download recently generated reports</p>
                </div>
              </div>
              <div className="mt-3">
                <span className="text-purple-600 text-xs font-medium hover:underline">View Recent →</span>
              </div>
            </div>

            {/* Quick Reports Button */}
            <div
              onClick={() => setShowQuickReports(true)}
              className="cursor-pointer bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg p-4 transition-all duration-200 hover:shadow-md"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 text-lg">⚡</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">Quick Reports</h3>
                  <p className="text-xs text-gray-500">Generate common reports with pre-configured settings</p>
                </div>
              </div>
              <div className="mt-3">
                <span className="text-blue-600 text-xs font-medium hover:underline">Quick Generate →</span>
              </div>
            </div>

            {/* Analytics Dashboard Button */}
            <div
              onClick={() => {/* Add analytics dashboard functionality */}}
              className="cursor-pointer bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg p-4 transition-all duration-200 hover:shadow-md"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 text-lg">📈</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">Analytics Dashboard</h3>
                  <p className="text-xs text-gray-500">View real-time analytics and insights</p>
                </div>
              </div>
              <div className="mt-3">
                <span className="text-green-600 text-xs font-medium hover:underline">View Dashboard →</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="bg-white rounded-b-xl shadow-lg">
        <div className="px-12 py-8">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Select Report Type</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reportTypes.map((report) => (
                <div
                  key={report.id}
                  onClick={() => setReportType(report.id)}
                  className={`relative cursor-pointer rounded-lg p-4 transition-all duration-300 transform hover:scale-102 hover:shadow-lg ${
                    reportType === report.id
                      ? `bg-gradient-to-r ${report.color} text-white shadow-md scale-102`
                      : 'bg-gray-50 hover:bg-gray-100 shadow-sm border border-gray-200'
                  }`}
                >
                  {reportType === report.id && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                  )}
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">{report.icon}</span>
                    <div className="flex-1">
                      <h3 className={`font-semibold text-sm mb-1 ${
                        reportType === report.id ? 'text-white' : 'text-gray-900'
                      }`}>
                        {report.name}
                      </h3>
                      <p className={`text-xs ${
                        reportType === report.id ? 'text-white/90' : 'text-gray-600'
                      }`}>
                        {report.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Configuration Form */}
          {reportType && (
            <div className="bg-gray-50 rounded-lg border border-gray-200 p-5">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Report Configuration</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Date Range Section */}
                <div className="flex flex-col md:flex-row gap-4 max-w-2xl">
                  <div className="flex-1">
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                      End Date *
                    </label>
                    <input
                      type="date"
                      id="endDate"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>
                </div>

                {/* Advanced Filters */}
                <div className="border-t border-gray-300 pt-4">
                  <h3 className="text-base font-semibold text-gray-900 mb-3">Advanced Filters (Optional)</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">City</label>
                      <select
                        value={selectedFilters.city}
                        onChange={(e) => handleFilterChange('city', e.target.value)}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="">All Cities</option>
                        <option value="indore">Indore</option>
                        <option value="mumbai">Mumbai</option>
                        <option value="delhi">Delhi</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Unit</label>
                      <select
                        value={selectedFilters.unit}
                        onChange={(e) => handleFilterChange('unit', e.target.value)}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="">All Units</option>
                        <option value="crystal-it">Crystal IT Park</option>
                        <option value="main-office">Main Office</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Department</label>
                      <select
                        value={selectedFilters.department}
                        onChange={(e) => handleFilterChange('department', e.target.value)}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="">All Departments</option>
                        <option value="hr">Human Resources</option>
                        <option value="it">Information Technology</option>
                        <option value="sales">Sales</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Employee</label>
                      <select
                        value={selectedFilters.employee}
                        onChange={(e) => handleFilterChange('employee', e.target.value)}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="">All Employees</option>
                        <option value="specific">Select Specific Employee</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-300">
                  <button
                    type="submit"
                    disabled={isGenerating}
                    className={`flex-1 sm:flex-none px-6 py-2.5 rounded-md font-medium text-white transition-all duration-200 ${
                      isGenerating
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-md hover:shadow-lg'
                    }`}
                  >
                    {isGenerating ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generating...
                      </span>
                    ) : (
                      'Generate Report'
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setReportType("");
                      setStartDate("");
                      setEndDate("");
                      setSelectedFilters({ city: "", unit: "", department: "", employee: "" });
                    }}
                    className="flex-1 sm:flex-none px-6 py-2.5 rounded-md font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 transition-all duration-200"
                  >
                    Reset Form
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Quick Actions */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-lg text-purple-600 font-bold">■</span>
                <h3 className="font-medium text-gray-900 text-sm">Recent Reports</h3>
              </div>
              <p className="text-xs text-gray-600 mb-3">View and download your recently generated reports</p>
              <button
                onClick={() => setShowRecentReports(true)}
                className="text-purple-600 hover:text-purple-700 font-medium text-xs"
              >
                View Recent →
              </button>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-lg text-purple-600 font-bold">▲</span>
                <h3 className="font-medium text-gray-900 text-sm">Quick Reports</h3>
              </div>
              <p className="text-xs text-gray-600 mb-3">Generate common reports with pre-configured settings</p>
              <button
                onClick={() => setShowQuickReports(true)}
                className="text-purple-600 hover:text-purple-700 font-medium text-xs"
              >
                Quick Generate →
              </button>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-lg text-purple-600 font-bold">◆</span>
                <h3 className="font-medium text-gray-900 text-sm">Analytics Dashboard</h3>
              </div>
              <p className="text-xs text-gray-600 mb-3">View real-time analytics and insights</p>
              <button
                onClick={() => setShowAnalyticsDashboard(true)}
                className="text-purple-600 hover:text-purple-700 font-medium text-xs"
              >
                View Dashboard →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Reports Modal */}
      {showRecentReports && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-6xl w-full max-h-[85vh] overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-purple-400 to-blue-400 text-white px-8 py-5 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Recent Reports</h2>
                <p className="text-purple-50 text-sm">View and download your recently generated reports</p>
              </div>
              <button
                onClick={() => setShowRecentReports(false)}
                className="text-white hover:text-gray-200 text-3xl font-bold"
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8 overflow-y-auto max-h-[65vh]">
              <div className="space-y-4">
                {recentReports.map((report) => (
                  <div key={report.id} className="bg-gray-50 rounded-md p-5 border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="text-lg text-purple-600">●</span>
                          <h3 className="font-semibold text-gray-900">{report.name}</h3>
                          <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                            {report.type}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Generated:</span>
                            <br />
                            <span>{report.dateGenerated}</span>
                          </div>
                          <div>
                            <span className="font-medium">Date Range:</span>
                            <br />
                            <span>{report.dateRange}</span>
                          </div>
                          <div>
                            <span className="font-medium">File Size:</span>
                            <br />
                            <span>{report.fileSize}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          {report.status}
                        </span>
                        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors">
                          Download
                        </button>
                        <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded text-sm font-medium transition-colors">
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-200">
              <div className="text-sm text-gray-600">
                Showing {recentReports.length} recent reports
              </div>
              <div>
                <button
                  onClick={() => setShowRecentReports(false)}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md text-sm font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Reports Modal */}
      {showQuickReports && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-6xl w-full max-h-[85vh] overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-purple-400 to-blue-400 text-white px-8 py-5 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Quick Reports</h2>
                <p className="text-purple-50 text-sm">Generate common reports with pre-configured settings</p>
              </div>
              <button
                onClick={() => setShowQuickReports(false)}
                className="text-white hover:text-gray-200 text-3xl font-bold"
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8 overflow-y-auto max-h-[65vh]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {quickReports.map((report) => (
                  <div
                    key={report.id}
                    className="relative cursor-pointer rounded-md p-6 transition-all duration-300 transform hover:scale-102 hover:shadow-lg bg-gray-50 border border-gray-200 shadow-sm"
                  >
                    <div className="flex items-start space-x-4">
                      <span className="text-3xl text-purple-600">{report.icon}</span>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-2 text-gray-900">
                          {report.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          {report.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            Est. time: {report.estimatedTime}
                          </span>
                          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors">
                            Generate Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-8 py-4 flex items-center justify-between border-t border-gray-200">
              <div className="text-sm text-gray-600">
                {quickReports.length} quick report templates available
              </div>
              <div>
                <button
                  onClick={() => setShowQuickReports(false)}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md text-sm font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Dashboard Modal */}
      {showAnalyticsDashboard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-6xl w-full max-h-[85vh] overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-purple-400 to-blue-400 text-white px-8 py-5 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
                <p className="text-purple-50 text-sm">Real-time analytics and insights for your organization</p>
              </div>
              <button
                onClick={() => setShowAnalyticsDashboard(false)}
                className="text-white hover:text-gray-200 text-3xl font-bold"
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8 overflow-y-auto max-h-[65vh]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {analyticsData.map((metric) => (
                  <div key={metric.id} className="bg-gray-50 rounded-md p-6 border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900">{metric.title}</h3>
                      <span className={`text-sm font-medium ${
                        metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {metric.change}
                      </span>
                    </div>
                    <div className="mb-2">
                      <span className="text-3xl font-bold text-gray-900">{metric.value}</span>
                    </div>
                    <p className="text-sm text-gray-600">{metric.description}</p>
                    <div className="mt-4">
                      <div className={`w-full h-2 rounded-full ${
                        metric.trend === 'up' ? 'bg-green-200' : 'bg-red-200'
                      }`}>
                        <div className={`h-2 rounded-full ${
                          metric.trend === 'up' ? 'bg-green-500' : 'bg-red-500'
                        }`} style={{width: '75%'}}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Additional Analytics Section */}
              <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-md p-6 border border-gray-200 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-purple-600 font-bold">●</span>
                      <span className="text-sm text-gray-600">25 employees checked in today</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-purple-600 font-bold">●</span>
                      <span className="text-sm text-gray-600">3 leave requests approved</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-purple-600 font-bold">●</span>
                      <span className="text-sm text-gray-600">2 new reports generated</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-md p-6 border border-gray-200 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="space-y-2">
                    <button className="w-full text-left px-3 py-2 text-sm text-purple-600 hover:bg-purple-50 rounded transition-colors">
                      Export Today's Data
                    </button>
                    <button className="w-full text-left px-3 py-2 text-sm text-purple-600 hover:bg-purple-50 rounded transition-colors">
                      View Detailed Reports
                    </button>
                    <button className="w-full text-left px-3 py-2 text-sm text-purple-600 hover:bg-purple-50 rounded transition-colors">
                      Manage Notifications
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-8 py-4 flex items-center justify-between border-t border-gray-200">
              <div className="text-sm text-gray-600">
                Last updated: 25 June 2025, 15:30
              </div>
              <div className="flex space-x-3">
                <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md text-sm font-medium transition-colors">
                  Refresh Data
                </button>
                <button
                  onClick={() => setShowAnalyticsDashboard(false)}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md text-sm font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Help Button */}
      <div className="fixed bottom-4 right-4 z-40">
        <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300">
          <span className="text-lg font-bold">?</span>
        </button>
      </div>
    </div>
  );
};

export default GenerateReport;
