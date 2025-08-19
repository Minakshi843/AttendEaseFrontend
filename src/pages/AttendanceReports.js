import { useState, useEffect, useRef } from "react";
import NoDataFound from "../components/NoDataFound";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function AttendanceReports() {
  // Date filter states
  const [filterType, setFilterType] = useState('daily'); // 'daily', 'weekly', 'monthly', 'custom'
  const [selectedDate, setSelectedDate] = useState(getTodayInIST());
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());
  const [selectedWeek, setSelectedWeek] = useState(getCurrentWeek());
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');

  // Other states
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isExportDropdownOpen, setIsExportDropdownOpen] = useState(false);
  const [showNoData, setShowNoData] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('');
  const [attendanceData, setAttendanceData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const recordsPerPage = 15;
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsExportDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Static mock data for UI display
  const mockRecords = [
    {
      sr_no: 1,
      name: "Mriram Lodhi",
      emp_code: "CG 01",
      contact_no: "9876543210",
      punch_in: "09:00 AM",
      punch_out: "06:00 PM",
      punched_in_by: "Self",
      punched_out_by: "Self",
      in_address: "Crystal IT Park, Indore",
      out_address: "Crystal IT Park, Indore",
      duration: "9h 0m",
      ward: "Crystal IT Park",
      zone: "Crystal IT Park",
      city: "Indore",
      punch_in_image: true,
      punch_out_image: true,
      attendance_id: 1
    },
    {
      sr_no: 2,
      name: "Ayush Mishra",
      emp_code: "EMP001",
      contact_no: "9876543211",
      punch_in: "09:15 AM",
      punch_out: "06:15 PM",
      punched_in_by: "Self",
      punched_out_by: "Self",
      in_address: "Akulya IT Park, Indore",
      out_address: "Akulya IT Park, Indore",
      duration: "9h 0m",
      ward: "Akulya IT Park",
      zone: "Akulya IT Park",
      city: "Indore",
      punch_in_image: true,
      punch_out_image: true,
      attendance_id: 2
    },
    {
      sr_no: 3,
      name: "Sandeep Chanre",
      emp_code: "EMP004",
      contact_no: "9876543212",
      punch_in: "08:45 AM",
      punch_out: "05:45 PM",
      punched_in_by: "Self",
      punched_out_by: "Self",
      in_address: "Akulya IT Park, Indore",
      out_address: "Akulya IT Park, Indore",
      duration: "9h 0m",
      ward: "Akulya IT Park",
      zone: "Akulya IT Park",
      city: "Indore",
      punch_in_image: true,
      punch_out_image: false,
      attendance_id: 3
    },
    {
      sr_no: 4,
      name: "Harikishan Ahirwar",
      emp_code: "EMP005",
      contact_no: "9876543213",
      punch_in: "09:30 AM",
      punch_out: "-",
      punched_in_by: "Self",
      punched_out_by: "-",
      in_address: "Akulya IT Park, Indore",
      out_address: "-",
      duration: "-",
      ward: "Akulya IT Park",
      zone: "Akulya IT Park",
      city: "Indore",
      punch_in_image: true,
      punch_out_image: false,
      attendance_id: 4
    },
    {
      sr_no: 5,
      name: "Lokesh Bonal",
      emp_code: "EMP006",
      contact_no: "9876543214",
      punch_in: "09:10 AM",
      punch_out: "06:10 PM",
      punched_in_by: "Self",
      punched_out_by: "Self",
      in_address: "Crystal IT Park, Indore",
      out_address: "Crystal IT Park, Indore",
      duration: "9h 0m",
      ward: "Crystal IT Park",
      zone: "Crystal IT Park",
      city: "Indore",
      punch_in_image: true,
      punch_out_image: true,
      attendance_id: 5
    }
  ];

  // Generate additional mock data for pagination demo
  const additionalRecords = Array.from({ length: 42 }, (_, index) => ({
    sr_no: index + 6,
    name: [
      "Priya Sharma", "Rahul Kumar", "Anita Singh", "Vikash Patel",
      "Neha Gupta", "Amit Verma", "Sunita Yadav", "Rajesh Tiwari",
      "Kavita Jain", "Suresh Agarwal", "Pooja Dubey", "Manoj Soni",
      "Ravi Chouhan", "Deepika Malviya", "Sanjay Joshi", "Rekha Pandey"
    ][index % 16],
    emp_code: `EMP${String(index + 6).padStart(3, '0')}`,
    contact_no: `987654${String(index + 3215).slice(-4)}`,
    punch_in: ["09:00 AM", "09:15 AM", "08:45 AM", "09:20 AM", "08:30 AM"][index % 5],
    punch_out: ["06:00 PM", "06:15 PM", "05:45 PM", "06:20 PM", "05:30 PM"][index % 5],
    punched_in_by: ["Self", "Supervisor", "Admin"][index % 3],
    punched_out_by: ["Self", "Supervisor", "Admin"][index % 3],
    in_address: ["Crystal IT Park, Indore", "Akulya IT Park, Indore", "ISBT Raipur"][index % 3],
    out_address: ["Crystal IT Park, Indore", "Akulya IT Park, Indore", "ISBT Raipur"][index % 3],
    duration: ["9h 0m", "9h 0m", "9h 0m", "9h 0m", "9h 0m"][index % 5],
    ward: ["Crystal IT Park", "Akulya IT Park", "ISBT Raipur"][index % 3],
    zone: ["Crystal IT Park", "Akulya IT Park", "ISBT Raipur"][index % 3],
    city: ["Indore", "Indore", "Raipur"][index % 3],
    punch_in_image: index % 3 !== 2,
    punch_out_image: index % 4 !== 3,
    attendance_id: index + 6
  }));

  // Combine original and additional records
  const allMockRecords = showNoData ? [] : [...mockRecords, ...additionalRecords];

  // Get filtered data
  const filteredRecords = getFilteredData();

  // Pagination logic
  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentRecords = filteredRecords.slice(startIndex, endIndex);

  // Function to handle image click
  const handleImageClick = (attendanceId, punchType) => {
    console.log("Frontend Demo - Image clicked:", attendanceId, punchType);
    setSelectedImage("https://via.placeholder.com/300x300/4F46E5/FFFFFF?text=Demo+Image");
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  // Generate monthly attendance summary
  const generateMonthlySummary = () => {
    if (filterType !== 'monthly') return null;

    const summary = {
      totalEmployees: new Set(filteredRecords.map(r => r.emp_code)).size,
      totalWorkingDays: 30, // This would be calculated based on actual month
      averageAttendance: filteredRecords.length / 30,
      presentDays: filteredRecords.filter(r => r.punch_in !== '-').length,
      absentDays: filteredRecords.filter(r => r.punch_in === '-').length,
    };

    return summary;
  };

  // Export to Excel function
  const exportToExcel = () => {
    try {
      console.log('Starting Excel export...');
      console.log('Records to export:', filteredRecords.length);

      // Add summary data for monthly reports
      let exportData = [];

      if (filterType === 'monthly') {
        const summary = generateMonthlySummary();
        exportData.push({
          'Type': 'MONTHLY SUMMARY',
          'Month': getMonthOptions().find(m => m.value === selectedMonth)?.label || selectedMonth,
          'Total Employees': summary.totalEmployees,
          'Total Working Days': summary.totalWorkingDays,
          'Present Days': summary.presentDays,
          'Absent Days': summary.absentDays,
          'Attendance Rate': `${((summary.presentDays / (summary.totalWorkingDays * summary.totalEmployees)) * 100).toFixed(1)}%`
        });
        exportData.push({}); // Empty row
      }

      const recordsData = filteredRecords.map((record) => ({
        'Sr No.': record.sr_no,
        'Name': record.name,
        'Employee Code': record.emp_code,
        'Contact No.': record.contact_no,
        'Punch In Time': record.punch_in,
        'Punched In By': record.punched_in_by,
        'Punch Out Time': record.punch_out,
        'Punched Out By': record.punched_out_by,
        'Duration': record.duration,
        'Unit': record.zone,
        'City': record.city,
        'In Address': record.in_address,
        'Out Address': record.out_address
      }));

      // Combine summary and records data
      exportData = [...exportData, ...recordsData];

      console.log('Export data prepared:', exportData.length, 'rows');

      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();

      // Set sheet name based on filter type
      let sheetName = "Attendance Records";
      if (filterType === 'monthly') {
        sheetName = `Monthly Report`;
      } else if (filterType === 'weekly') {
        sheetName = `Weekly Report`;
      } else if (filterType === 'custom') {
        sheetName = `Custom Report`;
      }

      XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

      // Generate filename with filter info
      let filename = `attendance_${filterType}`;
      if (filterType === 'monthly') {
        filename += `_${selectedMonth}`;
      } else if (filterType === 'weekly') {
        filename += `_week_${selectedWeek}`;
      } else if (filterType === 'custom') {
        filename += `_${customStartDate}_to_${customEndDate}`;
      } else {
        filename += `_${selectedDate}`;
      }
      filename += '.xlsx';

      console.log('Attempting to save file:', filename);
      XLSX.writeFile(workbook, filename);
      console.log('Excel export completed successfully');

      setIsExportDropdownOpen(false);
    } catch (error) {
      console.error('Excel export failed:', error);
      alert('Failed to export Excel file. Please check the console for details.');
    }
  };

  // Export to PDF function
  const exportToPDF = () => {
    try {
      console.log('Starting PDF export...');
      console.log('Records to export:', allMockRecords.length);

      const doc = new jsPDF('l', 'mm', 'a4'); // landscape orientation

      // Add title
      doc.setFontSize(16);
      doc.text('Attendance Records Report', 14, 15);

      // Add date
      doc.setFontSize(10);
      const todayPDF = new Date().toLocaleDateString();
      doc.text(`Generated on: ${todayPDF}`, 14, 25);

      // Prepare table data
      const tableData = allMockRecords.map(record => [
        record.sr_no,
        record.name,
        record.emp_code,
        record.contact_no,
        record.punch_in,
        record.punched_in_by,
        record.punch_out,
        record.punched_out_by,
        record.duration,
        record.zone,
        record.city
      ]);

      console.log('Table data prepared:', tableData.length, 'rows');

      // Check if autoTable is available and try to use it
      if (typeof doc.autoTable === 'function') {
        console.log('Using autoTable for PDF generation');
        doc.autoTable({
          head: [['Sr No.', 'Name', 'Emp Code', 'Contact', 'In Time', 'In By', 'Out Time', 'Out By', 'Duration', 'Unit', 'City']],
          body: tableData,
          startY: 35,
          styles: { fontSize: 8 },
          headStyles: { fillColor: [147, 197, 253] }, // Light blue header
          margin: { top: 35 }
        });
      } else {
        console.log('autoTable not available, creating simple text PDF');

        // Fallback: Create simple text-based PDF
        doc.setFontSize(12);
        doc.text('Attendance Records Summary:', 14, 40);

        let yPosition = 55;
        const recordsToShow = allMockRecords.slice(0, 15); // Show first 15 records

        recordsToShow.forEach((record, index) => {
          if (yPosition > 180) { // Add new page if needed
            doc.addPage();
            yPosition = 20;
          }

          doc.setFontSize(9);
          const line = `${record.sr_no}. ${record.name} (${record.emp_code}) - ${record.punch_in} to ${record.punch_out} - ${record.duration}`;
          doc.text(line, 14, yPosition);
          yPosition += 8;
        });

        if (allMockRecords.length > 15) {
          doc.text(`... and ${allMockRecords.length - 15} more records`, 14, yPosition + 10);
        }
      }

      // Generate filename with current date
      const todayPDFFile = new Date().toISOString().split('T')[0];
      const filename = `attendance_records_${todayPDFFile}.pdf`;

      console.log('Attempting to save PDF file:', filename);
      doc.save(filename);
      console.log('PDF export completed successfully');

      setIsExportDropdownOpen(false);
    } catch (error) {
      console.error('PDF export failed:', error);
      console.error('Error details:', error.stack);

      // Try a simple PDF as last resort
      try {
        console.log('Attempting simple PDF creation...');
        const simpleDoc = new jsPDF();
        simpleDoc.setFontSize(16);
        simpleDoc.text('Attendance Records Report', 20, 20);
        simpleDoc.setFontSize(12);
        simpleDoc.text('Export failed with table format. This is a simplified version.', 20, 40);
        simpleDoc.text(`Total Records: ${allMockRecords.length}`, 20, 60);
        simpleDoc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 80);

        const filename = `attendance_simple_${new Date().toISOString().split('T')[0]}.pdf`;
        simpleDoc.save(filename);
        console.log('Simple PDF created successfully');
      } catch (simpleError) {
        console.error('Even simple PDF failed:', simpleError);
        alert('PDF export completely failed. Error: ' + error.message);
      }
    }
  };

  // Export Images function (for selected records with images)
  const exportImages = () => {
    // This would typically download a ZIP file with all images
    // For now, we'll show an alert since we're using placeholder images
    alert('Image export functionality would download all attendance images in a ZIP file. This requires backend integration for actual image files.');
    setIsExportDropdownOpen(false);
  };



  // Helper functions for date handling
  function getTodayInIST() {
    return new Date().toLocaleDateString("en-CA", {
      timeZone: "Asia/Kolkata",
    });
  }

  function getCurrentMonth() {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  }

  function getCurrentWeek() {
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    return startOfWeek.toLocaleDateString("en-CA");
  }

  function getMonthDateRange(monthStr) {
    const [year, month] = monthStr.split('-');
    const startDate = `${year}-${month}-01`;
    const endDate = new Date(year, month, 0).toLocaleDateString("en-CA");
    return { startDate, endDate };
  }

  function getWeekDateRange(weekStartStr) {
    const startDate = new Date(weekStartStr);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    return {
      startDate: startDate.toLocaleDateString("en-CA"),
      endDate: endDate.toLocaleDateString("en-CA")
    };
  }

  // Generate month options for the last 12 months
  function getMonthOptions() {
    const options = [];
    const now = new Date();
    for (let i = 0; i < 12; i++) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const value = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const label = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      options.push({ value, label });
    }
    return options;
  }

  // Filter data based on selected criteria
  function getFilteredData() {
    let filteredData = [...allMockRecords];

    // Apply date filter
    if (filterType === 'monthly') {
      const { startDate, endDate } = getMonthDateRange(selectedMonth);
      // In real app, you'd filter by actual dates
      // For demo, we'll show all data
    } else if (filterType === 'weekly') {
      const { startDate, endDate } = getWeekDateRange(selectedWeek);
      // In real app, you'd filter by actual dates
    } else if (filterType === 'custom') {
      // Filter by custom date range
      if (customStartDate && customEndDate) {
        // In real app, you'd filter by actual dates
      }
    }

    // Apply city filter
    if (selectedCity) {
      filteredData = filteredData.filter(record =>
        record.city.toLowerCase().includes(selectedCity.toLowerCase())
      );
    }

    // Apply unit filter
    if (selectedUnit) {
      filteredData = filteredData.filter(record =>
        record.zone.toLowerCase().includes(selectedUnit.toLowerCase())
      );
    }

    return filteredData;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 p-6">
      {/* Simple Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AttendanceReports</h1>
        <p className="text-gray-600">View and manage employee attendance records</p>
      </div>
      {/* Enhanced Date Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-purple-100 p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">📅 Date Filters & Search</h3>

        {/* Filter Type Selection */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
          <button
            onClick={() => setFilterType('daily')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterType === 'daily'
                ? 'bg-purple-200 text-purple-800'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            📅 Daily
          </button>
          <button
            onClick={() => setFilterType('weekly')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterType === 'weekly'
                ? 'bg-purple-200 text-purple-800'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            📊 Weekly
          </button>
          <button
            onClick={() => setFilterType('monthly')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterType === 'monthly'
                ? 'bg-purple-200 text-purple-800'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            📈 Monthly
          </button>
          <button
            onClick={() => setFilterType('custom')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterType === 'custom'
                ? 'bg-purple-200 text-purple-800'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            🗓️ Custom Range
          </button>
        </div>

        {/* Date Input Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Daily Filter */}
          {filterType === 'daily' && (
            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
              <input
                type="date"
                value={selectedDate}
                max={getTodayInIST()}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-3 bg-white rounded-lg shadow-sm border border-gray-200 focus:ring-2 focus:ring-purple-200 outline-none"
              />
            </div>
          )}

          {/* Weekly Filter */}
          {filterType === 'weekly' && (
            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Week Starting</label>
              <input
                type="date"
                value={selectedWeek}
                max={getTodayInIST()}
                onChange={(e) => setSelectedWeek(e.target.value)}
                className="w-full px-4 py-3 bg-white rounded-lg shadow-sm border border-gray-200 focus:ring-2 focus:ring-purple-200 outline-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                Week: {selectedWeek} to {getWeekDateRange(selectedWeek).endDate}
              </p>
            </div>
          )}

          {/* Monthly Filter */}
          {filterType === 'monthly' && (
            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Month</label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full px-4 py-3 bg-white rounded-lg shadow-sm border border-gray-200 focus:ring-2 focus:ring-purple-200 outline-none"
              >
                {getMonthOptions().map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Range: {getMonthDateRange(selectedMonth).startDate} to {getMonthDateRange(selectedMonth).endDate}
              </p>
            </div>
          )}

          {/* Custom Range Filter */}
          {filterType === 'custom' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                <input
                  type="date"
                  value={customStartDate}
                  max={getTodayInIST()}
                  onChange={(e) => setCustomStartDate(e.target.value)}
                  className="w-full px-4 py-3 bg-white rounded-lg shadow-sm border border-gray-200 focus:ring-2 focus:ring-purple-200 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                <input
                  type="date"
                  value={customEndDate}
                  max={getTodayInIST()}
                  min={customStartDate}
                  onChange={(e) => setCustomEndDate(e.target.value)}
                  className="w-full px-4 py-3 bg-white rounded-lg shadow-sm border border-gray-200 focus:ring-2 focus:ring-purple-200 outline-none"
                />
              </div>
            </>
          )}

          {/* City Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-4 py-3 bg-white rounded-lg shadow-sm border border-gray-200 focus:ring-2 focus:ring-purple-200 outline-none"
            >
              <option value="">All Cities</option>
              <option value="indore">Indore</option>
              <option value="raipur">Raipur</option>
              <option value="mumbai">Mumbai</option>
              <option value="delhi">Delhi</option>
              <option value="bangalore">Bangalore</option>
            </select>
          </div>

          {/* Unit Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
            <select
              value={selectedUnit}
              onChange={(e) => setSelectedUnit(e.target.value)}
              className="w-full px-4 py-3 bg-white rounded-lg shadow-sm border border-gray-200 focus:ring-2 focus:ring-purple-200 outline-none"
            >
              <option value="">All Units</option>
              <option value="crystal">Crystal IT Park</option>
              <option value="akulya">Akulya IT Park</option>
              <option value="isbt">ISBT Raipur</option>
              <option value="vijay">Vijay Nagar</option>
              <option value="palasia">Palasia</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setCurrentPage(1)}
            className="px-6 py-3 bg-purple-200 text-purple-800 rounded-lg font-medium hover:bg-purple-300 transition-colors shadow-md"
          >
            🔍 Apply Filters
          </button>
          <button
            onClick={() => {
              setFilterType('daily');
              setSelectedDate(getTodayInIST());
              setSelectedMonth(getCurrentMonth());
              setSelectedWeek(getCurrentWeek());
              setCustomStartDate('');
              setCustomEndDate('');
              setSelectedCity('');
              setSelectedUnit('');
              setCurrentPage(1);
            }}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            🔄 Reset All
          </button>
          <div className="flex-1"></div>
          <div className="text-sm text-gray-600 flex items-center">
            📊 Showing {filteredRecords.length} records
          </div>
        </div>
      </div>

      {/* Export Button and Test Toggle */}
      <div className="flex justify-between items-center mb-4">
        {/* Test Button for No Data State */}
        <button
          onClick={() => setShowNoData(!showNoData)}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
        >
          {showNoData ? 'Show Data' : 'Test No Data'}
        </button>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsExportDropdownOpen(!isExportDropdownOpen)}
            className="px-6 py-3 bg-purple-200 text-gray-900 rounded-lg font-medium hover:bg-purple-300 transition-colors shadow-md flex items-center gap-2"
          >
            Export Data
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isExportDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
              <div className="py-2">
                <button
                  onClick={exportToExcel}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Export to Excel
                </button>
                <button
                  onClick={exportToPDF}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Export to PDF
                </button>
                <button
                  onClick={exportImages}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Export Images (Selected)
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-xl shadow-sm border border-purple-100 overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-100">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Attendance Records</h3>
              <p className="text-sm text-gray-600 mt-1">
                {filteredRecords.length} records found
                {filteredRecords.length !== allMockRecords.length && (
                  <span className="text-purple-600"> (filtered from {allMockRecords.length} total)</span>
                )}
              </p>
            </div>

            {/* Monthly Summary Display */}
            {filterType === 'monthly' && generateMonthlySummary() && (
              <div className="text-right">
                <div className="text-sm text-gray-600">
                  <div>📊 Month: {getMonthOptions().find(m => m.value === selectedMonth)?.label}</div>
                  <div>👥 {generateMonthlySummary().totalEmployees} employees</div>
                  <div>📈 {((generateMonthlySummary().presentDays / (generateMonthlySummary().totalWorkingDays * generateMonthlySummary().totalEmployees)) * 100).toFixed(1)}% attendance rate</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {currentRecords.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Sr No.</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">EmpCode</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Contact</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">In Time</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">In Image</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Punched In By</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Out Time</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Out Image</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Punched Out By</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Duration</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Unit</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">City</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentRecords.map((record) => (
                  <tr key={record.sr_no} className="hover:bg-purple-25 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{record.sr_no}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{record.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{record.emp_code}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{record.contact_no}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{record.punch_in}</td>
                    <td className="px-6 py-4 text-center">
                      {record.punch_in_image ? (
                        <button
                          className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
                          onClick={() => handleImageClick(record.attendance_id, "IN")}
                        >
                          View
                        </button>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{record.punched_in_by}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{record.punch_out}</td>
                    <td className="px-6 py-4 text-center">
                      {record.punch_out_image ? (
                        <button
                          className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors"
                          onClick={() => handleImageClick(record.attendance_id, "OUT")}
                        >
                          View
                        </button>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{record.punched_out_by}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{record.duration}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{record.zone}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{record.city}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <NoDataFound
            type="filter"
            title="No Attendance Records Found"
            message="No attendance data matches your current search criteria. Try adjusting your filters or check back later for new records."
            onClearFilters={() => {
              // Reset filters logic here
              console.log("Clear filters clicked");
            }}
            onRefresh={() => {
              // Refresh data logic here
              console.log("Refresh data clicked");
            }}
          />
        )}

        {/* Pagination Controls - Only show if there are records */}
        {currentRecords.length > 0 && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {startIndex + 1} to {Math.min(endIndex, allMockRecords.length)} of {allMockRecords.length} records
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              {/* Page Numbers */}
              <div className="flex gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-3 py-2 text-sm rounded-lg ${
                        currentPage === pageNum
                          ? 'bg-purple-200 text-gray-900 font-medium'
                          : 'bg-white border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal for Image Display */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Image Preview</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            <div className="flex justify-center">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt="Attendance Preview"
                  className="max-w-full max-h-96 rounded-lg border border-gray-200"
                />
              ) : (
                <p className="text-gray-500">No image available.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AttendanceReports;
