import React, { useState } from "react";
import NoDataFound from "../components/NoDataFound";

const ManageAttendance = () => {
  // Enhanced sample data with specific departments
  const [attendance, setAttendance] = useState([
    {
      id: 1,
      name: "John Doe",
      employeeId: "EMP001",
      department: "IT",
      designation: "System Administrator",
      status: "Present",
      checkIn: "09:15 AM",
      checkOut: null,
      location: "Crystal IT Park, Indore"
    },
    {
      id: 2,
      name: "Jane Smith",
      employeeId: "EMP002",
      department: "Housekeeping",
      designation: "Housekeeping Supervisor",
      status: "Absent",
      checkIn: null,
      checkOut: null,
      location: "Crystal IT Park, Indore"
    },
    {
      id: 3,
      name: "Michael Johnson",
      employeeId: "EMP003",
      department: "Security",
      designation: "Security Guard",
      status: "On Leave",
      checkIn: null,
      checkOut: null,
      location: "Crystal IT Park, Indore"
    },
    {
      id: 4,
      name: "Sarah Wilson",
      employeeId: "EMP004",
      department: "Facility - Gardening",
      designation: "Gardener",
      status: "Present",
      checkIn: "08:45 AM",
      checkOut: null,
      location: "Crystal IT Park, Indore"
    },
    {
      id: 5,
      name: "David Brown",
      employeeId: "EMP005",
      department: "Facility - Pantry",
      designation: "Pantry Assistant",
      status: "Late",
      checkIn: "10:30 AM",
      checkOut: null,
      location: "Crystal IT Park, Indore"
    },
    {
      id: 6,
      name: "Robert Wilson",
      employeeId: "EMP006",
      department: "Plumbing",
      designation: "Plumber",
      status: "Present",
      checkIn: "09:00 AM",
      checkOut: null,
      location: "Crystal IT Park, Indore"
    },
    {
      id: 7,
      name: "Lisa Anderson",
      employeeId: "EMP007",
      department: "Facility - Cooking",
      designation: "Chef",
      status: "Present",
      checkIn: "08:30 AM",
      checkOut: null,
      location: "Crystal IT Park, Indore"
    },
    {
      id: 8,
      name: "Mark Thompson",
      employeeId: "EMP008",
      department: "MRF",
      designation: "MRF Operator",
      status: "Present",
      checkIn: "09:10 AM",
      checkOut: null,
      location: "Crystal IT Park, Indore"
    }
  ]);

  // State for filters and search
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // State for notes functionality
  const [showNoteWindow, setShowNoteWindow] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [savedNotes, setSavedNotes] = useState([]);

  // State for leave type selection
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [selectedLeaveType, setSelectedLeaveType] = useState("");
  const [leaveRemarks, setLeaveRemarks] = useState("");

  // Predefined departments list
  const departments = [
    "MRF",
    "Housekeeping",
    "Security",
    "Facility - Gardening",
    "Facility - Pantry",
    "Plumbing",
    "Facility - Cooking",
    "IT"
  ];

  // Leave types
  const leaveTypes = [
    "Privilege Leave (PL)/Earned Leave (EL)/Annual Leave (AL)",
    "Casual Leave (CL)",
    "Sick Leave (SL)",
    "Compensatory Leave",
    "Emergency Leave",
    "Other"
  ];

  // Filter attendance based on search and filters
  const filteredAttendance = attendance.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || emp.status === statusFilter;
    const matchesDepartment = departmentFilter === "All" || emp.department === departmentFilter;

    return matchesSearch && matchesStatus && matchesDepartment;
  });

  // Function to update attendance status
  const updateStatus = (id, newStatus) => {
    if (newStatus === 'On Leave') {
      setSelectedEmployeeId(id);
      setShowLeaveModal(true);
    } else {
      setAttendance(prevAttendance =>
        prevAttendance.map(emp =>
          emp.id === id
            ? {
                ...emp,
                status: newStatus,
                statusLocked: true, // Lock the status after selection
                checkIn: newStatus === "Present" && !emp.checkIn ? new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : emp.checkIn,
                checkOut: newStatus === "Absent" ? null : emp.checkOut
              }
            : emp
        )
      );
    }
  };

  // Handle leave type submission
  const handleLeaveSubmit = () => {
    if (!selectedLeaveType) {
      alert('Please select a leave type');
      return;
    }

    setAttendance(prevAttendance =>
      prevAttendance.map(emp =>
        emp.id === selectedEmployeeId
          ? {
              ...emp,
              status: 'On Leave',
              statusLocked: true, // Lock the status after selection
              leaveType: selectedLeaveType,
              leaveRemarks: leaveRemarks,
              checkIn: null,
              checkOut: null
            }
          : emp
      )
    );

    // Reset modal state
    setShowLeaveModal(false);
    setSelectedEmployeeId(null);
    setSelectedLeaveType("");
    setLeaveRemarks("");
  };



  // Function to handle check-out
  const handleCheckOut = (id) => {
    setAttendance(prevAttendance =>
      prevAttendance.map(emp =>
        emp.id === id
          ? {
              ...emp,
              checkOut: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
            }
          : emp
      )
    );
  };



  
  // Get status badge styling
  const getStatusBadge = (status) => {
    const styles = {
      Present: "bg-green-100 text-green-800 border-green-200",
      Absent: "bg-red-100 text-red-800 border-red-200",
      "On Leave": "bg-blue-100 text-blue-800 border-blue-200",
      Late: "bg-yellow-100 text-yellow-800 border-yellow-200"
    };
    return styles[status] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  // Note functions
  const handleSaveNote = () => {
    if (noteText.trim()) {
      const newNote = {
        id: Date.now(),
        text: noteText.trim(),
        timestamp: new Date().toLocaleString(),
        date: selectedDate
      };
      setSavedNotes([newNote, ...savedNotes]);
      setNoteText("");
      setShowNoteWindow(false);
    }
  };

  const handleClearNote = () => {
    setNoteText("");
  };

  const handleDeleteNote = (noteId) => {
    setSavedNotes(savedNotes.filter(note => note.id !== noteId));
  };

  // Get attendance statistics
  const stats = {
    total: attendance.length,
    present: attendance.filter(emp => emp.status === "Present").length,
    absent: attendance.filter(emp => emp.status === "Absent").length,
    onLeave: attendance.filter(emp => emp.status === "On Leave").length,
    late: attendance.filter(emp => emp.status === "Late").length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 px-12 py-6">
      {/* Header Section */}
      <div className="bg-white shadow-lg border-b border-purple-100 rounded-t-xl">
        <div className="px-12 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-black mb-1">
                Manage Attendance
              </h1>
              <p className="text-gray-600 text-sm">Track and manage employee attendance records for {selectedDate}</p>
            </div>
            <div className="flex items-center space-x-4 mt-3 md:mt-0">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={() => setShowNoteWindow(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1"
              >
                <span>📝</span>
                <span>Add Note</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-lg mb-6">
        <div className="px-12 py-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Employees</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{stats.present}</div>
              <div className="text-sm text-gray-600">Present</div>
            </div>
            <div className="bg-red-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{stats.absent}</div>
              <div className="text-sm text-gray-600">Absent</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.onLeave}</div>
              <div className="text-sm text-gray-600">On Leave</div>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">{stats.late}</div>
              <div className="text-sm text-gray-600">Late</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-lg mb-6">
        <div className="px-12 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Employee</label>
              <input
                type="text"
                placeholder="Search by name or employee ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="All">All Status</option>
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
                <option value="On Leave">On Leave</option>
                <option value="Late">Late</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Department</label>
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="All">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-lg shadow-lg border border-gray-200">
        <div className="px-12 py-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Employee Attendance ({filteredAttendance.length} records)
            </h2>
          </div>

          {filteredAttendance.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Employee</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Department</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Check In</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Check Out</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAttendance.map((emp) => (
                    <tr key={emp.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div>
                          <div className="font-medium text-gray-900">{emp.name}</div>
                          <div className="text-sm text-gray-500">{emp.employeeId} • {emp.designation}</div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-gray-700">{emp.department}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusBadge(emp.status)}`}>
                          {emp.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-gray-700">
                          {emp.checkIn || '-'}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-gray-700">
                          {emp.checkOut || '-'}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex space-x-2">
                          <select
                            value={emp.status}
                            onChange={(e) => updateStatus(emp.id, e.target.value)}
                            disabled={emp.statusLocked}
                            className={`text-xs px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-purple-500 ${
                              emp.statusLocked ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''
                            }`}
                          >
                            <option value="Present">Present</option>
                            <option value="Absent">Absent</option>
                            <option value="On Leave">On Leave</option>
                            <option value="Late">Late</option>
                          </select>
                          {emp.status === "Present" && !emp.checkOut && (
                            <button
                              onClick={() => handleCheckOut(emp.id)}
                              className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded transition-colors"
                            >
                              Check Out
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <NoDataFound
              type="search"
              title="No Attendance Records Found"
              message="No attendance data matches your current filters. Try adjusting your search criteria."
              showActions={false}
            />
          )}
        </div>
      </div>



      {/* Note Window Modal */}
      {showNoteWindow && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full">
            <div className="bg-blue-600 text-white px-6 py-4 rounded-t-lg flex items-center justify-between">
              <h3 className="text-lg font-semibold flex items-center space-x-2">
                <span>📝</span>
                <span>Add Note</span>
              </h3>
              <button
                onClick={() => setShowNoteWindow(false)}
                className="text-white hover:text-gray-200 text-xl"
              >
                ×
              </button>
            </div>

            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Note for {selectedDate}
                </label>
                <textarea
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Write your note here..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows="4"
                />
              </div>

              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <button
                    onClick={handleClearNote}
                    className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors text-sm"
                  >
                    Clear
                  </button>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setShowNoteWindow(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveNote}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
                  >
                    Save Note
                  </button>
                </div>
              </div>

              {/* Display saved notes for current date */}
              {savedNotes.filter(note => note.date === selectedDate).length > 0 && (
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Previous Notes for {selectedDate}:</h4>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {savedNotes
                      .filter(note => note.date === selectedDate)
                      .map(note => (
                        <div key={note.id} className="bg-gray-50 rounded-lg p-3 text-sm">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <p className="text-gray-800">{note.text}</p>
                              <p className="text-xs text-gray-500 mt-1">{note.timestamp}</p>
                            </div>
                            <button
                              onClick={() => handleDeleteNote(note.id)}
                              className="text-red-500 hover:text-red-700 ml-2"
                            >
                              🗑️
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Leave Type Selection Modal */}
      {showLeaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Select Leave Type</h3>
              <button
                onClick={() => {
                  setShowLeaveModal(false);
                  setSelectedEmployeeId(null);
                  setSelectedLeaveType("");
                  setLeaveRemarks("");
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Leave Type *
                </label>
                <select
                  value={selectedLeaveType}
                  onChange={(e) => setSelectedLeaveType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select Leave Type</option>
                  {leaveTypes.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Remarks (Optional)
                </label>
                <textarea
                  value={leaveRemarks}
                  onChange={(e) => setLeaveRemarks(e.target.value)}
                  placeholder="Enter any additional details..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowLeaveModal(false);
                  setSelectedEmployeeId(null);
                  setSelectedLeaveType("");
                  setLeaveRemarks("");
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLeaveSubmit}
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageAttendance;
