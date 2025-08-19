// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import API_BASE_URL from "../config";
// import Swal from "sweetalert2";

// const apiUrl = `${API_BASE_URL}/api/employees`;

// function Employees() {
//   const [employees, setEmployees] = useState([]);
//   const [wards, setWards] = useState([]);
//   const [departments, setDepartments] = useState([]);
//   const [designations, setDesignations] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [zones, setZones] = useState([]);
//   const [isEditing, setIsEditing] = useState(null);
//   const [newEmployee, setNewEmployee] = useState({
//     emp_id: "",
//     name: "",
//     emp_code: "",
//     phone: "",
//     ward_id: "",
//     designation_id: "",
//     city: "",
//     zone: "",
//     ward: "",
//     department: "",
//     designation: "",
//   });

//   useEffect(() => {
//     fetchEmployees();
//     fetchDropdownData();
//   }, []);

//   const fetchEmployees = async () => {
//     try {
//       const response = await axios.get(apiUrl);
//       setEmployees(response.data);
//     } catch (error) {
//       console.error("Error fetching employees:", error);
//     }
//   };

//   const fetchDropdownData = async () => {
//     try {
//       const [citiesRes, zonesRes, wardsRes, departmentsRes, designationsRes] =
//         await Promise.all([
//           axios.get(`${API_BASE_URL}/api/cities`),
//           axios.get(`${API_BASE_URL}/api/zones`),
//           axios.get(`${API_BASE_URL}/api/wards`),
//           axios.get(`${API_BASE_URL}/api/departments`),
//           axios.get(`${API_BASE_URL}/api/designations`),
//         ]);

//       setCities(citiesRes.data);
//       setZones(zonesRes.data);

//       // Format wards data to match the new nested structure
//       const formattedWards = wardsRes.data.flatMap((city) =>
//         city.zones.flatMap((zone) =>
//           zone.wards.map((ward) => ({
//             ward_id: ward.wardId,
//             ward_name: ward.wardName,
//             zone_id: zone.zoneId,
//             city_id: city.cityId,
//           }))
//         )
//       );
//       setWards(formattedWards);

//       setDepartments(departmentsRes.data);
//       setDesignations(designationsRes.data);
//     } catch (error) {
//       console.error("Error fetching dropdown data:", error);
//     }
//   };

//   const resetLabel = () => {
//     setNewEmployee({
//       emp_id: "",
//       name: "",
//       emp_code: "",
//       phone: "",
//       ward_id: "",
//       designation_id: "",
//       city: "",
//       zone: "",
//       ward: "",
//       department: "",
//       designation: "",
//     });
//     setIsEditing(null);
//   };

//   const addOrUpdateEmployee = async () => {
//     if (!newEmployee.name.trim() || !newEmployee.emp_code.trim()) return;

//     try {
//       if (isEditing) {
//         await axios.put(`${apiUrl}/${newEmployee.emp_id}`, newEmployee);
//       } else {
//         await axios.post(apiUrl, newEmployee);
//       }
//       fetchEmployees();
//       resetLabel();
//     } catch (error) {
//       console.error("Error saving employee:", error);
//     }
//   };

//   const deleteEmployee = async (emp_id) => {
//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to undo this action!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, delete it!",
//       cancelButtonText: "Cancel",
//     });

//     if (!result.isConfirmed) return;

//     try {
//       await axios.delete(`${apiUrl}/${emp_id}`);
//       fetchEmployees();
//       Swal.fire("Deleted!", "The Employee has been removed.", "success");
//     } catch (error) {
//       console.error("Error deleting employee:", error);
//       Swal.fire("Error!", "Something went wrong.", "error");
//     }
//   };

//   const editEmployee = (emp) => {
//     setNewEmployee({
//       ...emp,
//       city: cities.find((c) => c.city_name === emp.city)?.city_id || "",
//       zone: zones.find((z) => z.zone_name === emp.zone)?.zone_id || "",
//       ward_id: wards.find((w) => w.ward_name === emp.ward)?.ward_id || "",
//       department:
//         departments.find((de) => de.department_name === emp.department)
//           ?.department_id || "",
//       designation_id:
//         designations.find((d) => d.designation_name === emp.designation)
//           ?.designation_id || "",
//     });
//     setIsEditing(emp.emp_id);
//   };

//   return (
//     <div className="p-5">
//       <h1 className="text-2xl font-bold mb-4">👨‍💼 Employee Management</h1>

//       {/* Employee Form */}
//       <div className="border p-4 mb-4 bg-gray-100 shadow-md rounded">
//         {isEditing && (
//           <div>
//             <label className="block mb-2">Employee ID (Auto-generated)</label>
//             <input
//               type="text"
//               value={newEmployee.emp_id}
//               disabled
//               className="border p-2 w-full rounded bg-gray-200"
//             />
//           </div>
//         )}

//         {/* Two fields per row */}
//         <div className="grid grid-cols-2 gap-4 mt-2">
//           <div>
//             <label className="block">Name</label>
//             <input
//               type="text"
//               value={newEmployee.name}
//               onChange={(e) =>
//                 setNewEmployee({ ...newEmployee, name: e.target.value })
//               }
//               className="border p-2 w-full rounded"
//             />
//           </div>

//           <div>
//             <label className="block">Emp Code</label>
//             <input
//               type="text"
//               value={newEmployee.emp_code}
//               onChange={(e) =>
//                 setNewEmployee({ ...newEmployee, emp_code: e.target.value })
//               }
//               className="border p-2 w-full rounded"
//             />
//           </div>

//           <div>
//             <label className="block">Phone</label>
//             <input
//               type="text"
//               value={newEmployee.phone}
//               onChange={(e) =>
//                 setNewEmployee({ ...newEmployee, phone: e.target.value })
//               }
//               className="border p-2 w-full rounded"
//             />
//           </div>

//           <div>
//             <label className="block">City</label>
//             <select
//               value={newEmployee.city}
//               onChange={(e) =>
//                 setNewEmployee({
//                   ...newEmployee,
//                   city: e.target.value,
//                   zone: "",
//                   ward_id: "",
//                 })
//               }
//               className="p-2 border rounded w-full"
//             >
//               <option value="" disabled>
//                 Select City
//               </option>
//               {cities.map((city) => (
//                 <option key={city.city_id} value={city.city_id}>
//                   {city.city_name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block">Zone</label>
//             <select
//               value={newEmployee.zone}
//               onChange={(e) =>
//                 setNewEmployee({
//                   ...newEmployee,
//                   zone: e.target.value,
//                   ward_id: "",
//                 })
//               }
//               className="p-2 border rounded w-full"
//               disabled={!newEmployee.city}
//             >
//               <option value="" disabled>
//                 Select Zone
//               </option>
//               {zones
//                 .filter((zone) => zone.city_id === parseInt(newEmployee.city))
//                 .map((zone) => (
//                   <option key={zone.zone_id} value={zone.zone_id}>
//                     {zone.zone_name}
//                   </option>
//                 ))}
//             </select>
//           </div>

//           <div>
//             <label className="block">Ward</label>
//             <select
//               value={newEmployee.ward_id}
//               onChange={(e) =>
//                 setNewEmployee({
//                   ...newEmployee,
//                   ward_id: e.target.value,
//                 })
//               }
//               className="p-2 border rounded w-full"
//               disabled={!newEmployee.zone}
//             >
//               <option value="" disabled>
//                 Select Ward
//               </option>
//               {wards
//                 .filter((ward) => ward.zone_id === parseInt(newEmployee.zone))
//                 .map((ward) => (
//                   <option key={ward.ward_id} value={ward.ward_id}>
//                     {ward.ward_name}
//                   </option>
//                 ))}
//             </select>
//           </div>

//           <div>
//             <label className="block">Department</label>
//             <select
//               value={newEmployee.department}
//               onChange={(e) =>
//                 setNewEmployee({
//                   ...newEmployee,
//                   department: e.target.value,
//                   designation_id: "",
//                 })
//               }
//               className="p-2 border rounded w-full"
//             >
//               <option value="" disabled>
//                 Select Department
//               </option>
//               {departments.map((department) => (
//                 <option
//                   key={department.department_id}
//                   value={department.department_id}
//                 >
//                   {department.department_name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block">Designation</label>
//             <select
//               value={newEmployee.designation_id}
//               onChange={(e) =>
//                 setNewEmployee({
//                   ...newEmployee,
//                   designation_id: e.target.value,
//                 })
//               }
//               className="p-2 border rounded w-full"
//               disabled={!newEmployee.department}
//             >
//               <option value="" disabled>
//                 Select Designation
//               </option>
//               {designations
//                 .filter(
//                   (designation) =>
//                     designation.department_id ===
//                     parseInt(newEmployee.department)
//                 )
//                 .map((designation) => (
//                   <option
//                     key={designation.designation_id}
//                     value={designation.designation_id}
//                   >
//                     {designation.designation_name}
//                   </option>
//                 ))}
//             </select>
//           </div>
//         </div>

//         <button
//           onClick={addOrUpdateEmployee}
//           className="bg-blue-500 text-white px-4 py-2 rounded shadow-md mt-4 mr-4"
//         >
//           {isEditing ? "Update Employee" : "➕ Add Employee"}
//         </button>
//         {isEditing && (
//           <button
//             type="button"
//             onClick={resetLabel}
//             className="bg-gray-500 text-white px-4 py-2 rounded"
//           >
//             Reset
//           </button>
//         )}
//       </div>

//       {/* Employee Table */}
//       <table className="w-full bg-white shadow-md rounded-lg">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="p-3">Emp Code</th>
//             <th className="p-3">Name</th>
//             <th className="p-3">Phone</th>
//             <th className="p-3">City</th>
//             <th className="p-3">Zone</th>
//             <th className="p-3">Ward</th>
//             <th className="p-3">Department</th>
//             <th className="p-3">Designation</th>
//             <th className="p-3">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {employees.map((emp) => (
//             <tr key={emp.emp_id} className="border-b">
//               <td className="p-3">{emp.emp_code}</td>
//               <td className="p-3">{emp.name}</td>
//               <td className="p-3">{emp.phone}</td>
//               <td className="p-3">{emp.city || "Unknown"}</td>
//               <td className="p-3">{emp.zone || "Unknown"}</td>
//               <td className="p-3">{emp.ward || "Unknown"}</td>
//               <td className="p-3">{emp.department || "Unknown"}</td>
//               <td className="p-3">{emp.designation || "Unknown"}</td>
//               <td className="p-3">
//                 <button
//                   onClick={() => editEmployee(emp)}
//                   className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
//                 >
//                   ✏️ Edit
//                 </button>
//                 <button
//                   onClick={() => deleteEmployee(emp.emp_id)}
//                   className="bg-red-500 text-white px-2 py-1 rounded"
//                 >
//                   ❌ Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Employees;




import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../config";
import Swal from "sweetalert2";
import NoDataFound from "../components/NoDataFound";

const apiUrl = `${API_BASE_URL}/api/employees`;

function Employees() {
  // Function to get employee status badge styling
  const getEmployeeStatusBadge = (status) => {
    switch (status) {
      case 'Onboard':
        return 'bg-blue-100 text-blue-800 border border-blue-200';
      case 'Active':
        return 'bg-green-100 text-green-800 border border-green-200';
      case 'Left Organization':
        return 'bg-red-100 text-red-800 border border-red-200';
      case 'Extended Leave/Long Term Leave':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      case 'Suspended':
        return 'bg-orange-100 text-orange-800 border border-orange-200';
      default:
        return 'bg-blue-100 text-blue-800 border border-blue-200';
    }
  };

  const [employees, setEmployees] = useState([
    {
      emp_id: 1,
      emp_code: "MP05551",
      name: "Laxmi Bai",
      phone: "9510106407",
      city: "Indore",
      unit: "County Walk",
      department: "Housekeeping",
      designation: "HK",
      employeeStatus: "Active",
      isOfficialEmpCode: true,
      empCodeRemarks: ""
    },
    {
      emp_id: 2,
      emp_code: "TEMP19",
      name: "Rakha Mujalde",
      phone: "7000232575",
      city: "Indore",
      unit: "Crystal IT Park",
      department: "Housekeeping",
      designation: "HK",
      employeeStatus: "Active",
      isOfficialEmpCode: false,
      empCodeRemarks: "HR system pending - temporary code assigned"
    },
    {
      emp_id: 3,
      emp_code: "MP05137",
      name: "Papita Bai",
      phone: "8717933527",
      city: "Indore",
      unit: "County Walk",
      department: "Housekeeping",
      designation: "HK",
      employeeStatus: "Extended Leave/Long Term Leave",
      isOfficialEmpCode: true,
      empCodeRemarks: ""
    },
    {
      emp_id: 4,
      emp_code: "MP06056",
      name: "Kiran Nayak",
      phone: "9917440917",
      city: "Indore",
      unit: "Amalya IT Park",
      department: "Facility - Pantry",
      designation: "Pantry Boy/Girl",
      employeeStatus: "Active",
      isOfficialEmpCode: true,
      empCodeRemarks: ""
    },
    {
      emp_id: 5,
      emp_code: "CNT005",
      name: "Prem Bai",
      phone: "",
      city: "Gwalior",
      unit: "MPPDC Gwalior",
      department: "Housekeeping",
      designation: "HK",
      employeeStatus: "Suspended",
      isOfficialEmpCode: false,
      empCodeRemarks: "Contract employee - awaiting official code generation"
    }
  ]);
  const [wards, setWards] = useState([]);
  const [departments, setDepartments] = useState([
    { department_id: 1, department_name: "Housekeeping" },
    { department_id: 2, department_name: "Facility - Pantry" },
    { department_id: 3, department_name: "Security" },
    { department_id: 4, department_name: "Maintenance" }
  ]);
  const [designations, setDesignations] = useState([
    { designation_id: 1, designation_name: "HK", department_id: 1 },
    { designation_id: 2, designation_name: "Pantry Boy/Girl", department_id: 2 },
    { designation_id: 3, designation_name: "Security Guard", department_id: 3 },
    { designation_id: 4, designation_name: "Technician", department_id: 4 }
  ]);
  const [cities, setCities] = useState([]);
  const [units, setUnits] = useState([
    { unit_id: 1, unit_name: "County Walk", city_id: 1, city_name: "Indore" },
    { unit_id: 2, unit_name: "Crystal IT Park", city_id: 1, city_name: "Indore" },
    { unit_id: 3, unit_name: "Amalya IT Park", city_id: 1, city_name: "Indore" },
    { unit_id: 4, unit_name: "MPPDC Gwalior", city_id: 2, city_name: "Gwalior" },
    { unit_id: 5, unit_name: "MPPDC Bhopal", city_id: 3, city_name: "Bhopal" }
  ]);
  const [isEditing, setIsEditing] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    emp_id: "",
    name: "",
    emp_code: "",
    phone: "",
    unit_id: "",
    designation_id: "",
    city: "",
    unit: "",
    department: "",
    designation: "",
    employeeStatus: "Onboard", // New field for employee status
    isOfficialEmpCode: true, // Whether emp code is official or temporary
    empCodeRemarks: "", // Remarks for unofficial emp codes
  });

  useEffect(() => {
    fetchEmployees();
    fetchDropdownData();
  }, []);

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showNotifications && !event.target.closest('.msg-container')) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications]);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(apiUrl);
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const fetchDropdownData = async () => {
    try {
      const [citiesRes, unitsRes, departmentsRes, designationsRes] =
        await Promise.all([
          axios.get(`${API_BASE_URL}/api/cities`),
          axios.get(`${API_BASE_URL}/api/units`),
          axios.get(`${API_BASE_URL}/api/departments`),
          axios.get(`${API_BASE_URL}/api/designations`),
        ]);

      setCities(citiesRes.data);
      setUnits(unitsRes.data);
      setDepartments(departmentsRes.data);
      setDesignations(designationsRes.data);
    } catch (error) {
      console.error("Error fetching dropdown data:", error);
    }
  };

  // Employee status options for new employees (first time)
  const newEmployeeStatusOptions = [
    "Onboard"
  ];

  // Employee status options for existing employees
  const existingEmployeeStatusOptions = [
    "Active",
    "Left Organization",
    "Extended Leave/Long Term Leave",
    "Suspended"
  ];

  const resetLabel = () => {
    setNewEmployee({
      emp_id: "",
      name: "",
      emp_code: "",
      phone: "",
      unit_id: "",
      designation_id: "",
      city: "",
      unit: "",
      department: "",
      designation: "",
      employeeStatus: "Onboard",
      isOfficialEmpCode: true,
      empCodeRemarks: "",
    });
    setIsEditing(null);
  };

  const addOrUpdateEmployee = async () => {
    if (!newEmployee.name.trim() || !newEmployee.emp_code.trim()) return;

    try {
      if (isEditing) {
        await axios.put(`${apiUrl}/${newEmployee.emp_id}`, newEmployee);
      } else {
        await axios.post(apiUrl, newEmployee);
      }
      fetchEmployees();
      resetLabel();
    } catch (error) {
      console.error("Error saving employee:", error);
    }
  };

  const deleteEmployee = async (emp_id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to undo this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`${apiUrl}/${emp_id}`);
      fetchEmployees();
      Swal.fire("Deleted!", "The Employee has been removed.", "success");
    } catch (error) {
      console.error("Error deleting employee:", error);
      Swal.fire("Error!", "Something went wrong.", "error");
    }
  };

  const editEmployee = (emp) => {
    setNewEmployee({
      ...emp,
      city: cities.find((c) => c.city_name === emp.city)?.city_id || "",
      unit: units.find((u) => u.unit_name === emp.unit)?.unit_id || "",
      department:
        departments.find((de) => de.department_name === emp.department)
          ?.department_id || "",
      designation_id:
        designations.find((d) => d.designation_name === emp.designation)
          ?.designation_id || "",
      employeeStatus: emp.employeeStatus || "Onboard",
      isOfficialEmpCode: emp.isOfficialEmpCode !== undefined ? emp.isOfficialEmpCode : true,
      empCodeRemarks: emp.empCodeRemarks || "",
    });
    setIsEditing(emp.emp_id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 p-6">
      {/* Header Section */}
      <div className="mb-8 relative">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Employee Management</h1>
            <p className="text-gray-600">Manage employee information and assignments</p>
          </div>

          {/* Notification Icon */}
          {(() => {
            const unofficialEmployees = employees.filter(emp => emp.isOfficialEmpCode === false);
            if (unofficialEmployees.length > 0) {
              return (
                <div className="relative msg-container">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative px-4 py-2 bg-orange-100 hover:bg-orange-200 rounded-lg transition-colors shadow-lg border border-orange-200"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-orange-800 text-sm font-medium">Notifications</span>
                      <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                        {unofficialEmployees.length}
                      </span>
                    </div>
                  </button>

                  {/* Notification Dropdown */}
                  {showNotifications && (
                    <div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                      <div className="p-4 border-b border-gray-200">
                        <div className="flex items-center space-x-2">
                          <span className="text-orange-500 text-lg">⚠️</span>
                          <h3 className="text-sm font-semibold text-gray-900">
                            Employees with Temporary Codes ({unofficialEmployees.length})
                          </h3>
                        </div>
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        {unofficialEmployees.map((emp) => (
                          <div key={emp.emp_id} className="p-3 border-b border-gray-100 hover:bg-gray-50">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">{emp.name}</p>
                                <p className="text-xs text-gray-600">Code: {emp.emp_code}</p>
                                <p className="text-xs text-gray-600">{emp.city || 'Unknown City'}, {emp.unit || 'Unknown Unit'}</p>
                                {emp.empCodeRemarks && (
                                  <p className="text-xs text-orange-600 mt-1">{emp.empCodeRemarks}</p>
                                )}
                              </div>
                              <button
                                onClick={() => {
                                  editEmployee(emp);
                                  setShowNotifications(false);
                                }}
                                className="ml-2 text-xs bg-orange-100 hover:bg-orange-200 text-orange-800 px-2 py-1 rounded transition-colors"
                              >
                                Update
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="p-3 bg-gray-50 text-xs text-gray-600">
                        Please update these employees with HMS employee codes.
                      </div>
                    </div>
                  )}
                </div>
              );
            }
            return null;
          })()}
        </div>
      </div>

      {/* Employee Form */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-purple-100 mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">
          {isEditing ? "Edit Employee" : "Add New Employee"}
        </h3>
        {isEditing && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Employee ID (Auto-generated)</label>
            <input
              type="text"
              value={newEmployee.emp_id}
              disabled
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
            />
          </div>
        )}

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={newEmployee.name}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, name: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:border-purple-300 outline-none transition-colors"
              placeholder="Enter employee name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Emp Code</label>
            <input
              type="text"
              value={newEmployee.emp_code}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, emp_code: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:border-purple-300 outline-none transition-colors"
              placeholder="Enter employee code"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Emp Code Type</label>
            <select
              value={newEmployee.isOfficialEmpCode}
              onChange={(e) =>
                setNewEmployee({
                  ...newEmployee,
                  isOfficialEmpCode: e.target.value === 'true',
                  empCodeRemarks: e.target.value === 'true' ? '' : newEmployee.empCodeRemarks
                })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:border-purple-300 outline-none transition-colors"
            >
              <option value={true}>HMS Emp Code</option>
              <option value={false}>Temporary Emp Code</option>
            </select>
          </div>

          {!newEmployee.isOfficialEmpCode && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Code Remarks</label>
              <input
                type="text"
                value={newEmployee.empCodeRemarks}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, empCodeRemarks: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:border-purple-300 outline-none transition-colors"
                placeholder="Reason for temporary code (e.g., HR system pending)"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input
              type="text"
              value={newEmployee.phone}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, phone: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:border-purple-300 outline-none transition-colors"
              placeholder="Enter phone number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
            <select
              value={newEmployee.city}
              onChange={(e) =>
                setNewEmployee({
                  ...newEmployee,
                  city: e.target.value,
                  unit: "",
                })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:border-purple-300 outline-none transition-colors"
            >
              <option value="" disabled>
                Select City
              </option>
              {[...new Set(units.map(unit => unit.city_name))].map((cityName) => {
                const cityData = units.find(unit => unit.city_name === cityName);
                return (
                  <option key={cityData.city_id} value={cityData.city_id}>
                    {cityName}
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
            <select
              value={newEmployee.unit}
              onChange={(e) =>
                setNewEmployee({
                  ...newEmployee,
                  unit: e.target.value,
                })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:border-purple-300 outline-none transition-colors"
              disabled={!newEmployee.city}
            >
              <option value="" disabled>
                Select Unit
              </option>
              {units
                .filter(unit => unit.city_id === parseInt(newEmployee.city))
                .map((unit) => (
                  <option key={unit.unit_id} value={unit.unit_id}>
                    {unit.unit_name}
                  </option>
                ))}
            </select>
          </div>



          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
            <select
              value={newEmployee.department}
              onChange={(e) =>
                setNewEmployee({
                  ...newEmployee,
                  department: e.target.value,
                  designation_id: "",
                })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:border-purple-300 outline-none transition-colors"
            >
              <option value="" disabled>
                Select Department
              </option>
              {departments.map((department) => (
                <option
                  key={department.department_id}
                  value={department.department_id}
                >
                  {department.department_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Designation</label>
            <select
              value={newEmployee.designation_id}
              onChange={(e) =>
                setNewEmployee({
                  ...newEmployee,
                  designation_id: e.target.value,
                })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:border-purple-300 outline-none transition-colors"
              disabled={!newEmployee.department}
            >
              <option value="" disabled>
                Select Designation
              </option>
              {designations
                .filter(
                  (designation) =>
                    designation.department_id ===
                    parseInt(newEmployee.department)
                )
                .map((designation) => (
                  <option
                    key={designation.designation_id}
                    value={designation.designation_id}
                  >
                    {designation.designation_name}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Employee Status</label>
            <select
              value={newEmployee.employeeStatus}
              onChange={(e) =>
                setNewEmployee({
                  ...newEmployee,
                  employeeStatus: e.target.value,
                })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:border-purple-300 outline-none transition-colors"
            >
              {(isEditing ? existingEmployeeStatusOptions : newEmployeeStatusOptions).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-4 pt-6">
          <button
            onClick={addOrUpdateEmployee}
            className="px-8 py-3 bg-purple-200 text-gray-900 rounded-lg font-medium hover:bg-purple-300 shadow-md transition-all duration-200"
          >
            {isEditing ? "Update Employee" : "Add Employee"}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={resetLabel}
              className="px-8 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Employee Table */}
      <div className="bg-white rounded-xl shadow-sm border border-purple-100 overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-100">
          <h3 className="text-lg font-semibold text-gray-900">Employee List</h3>
          <p className="text-sm text-gray-600 mt-1">
            {employees.length} employees registered
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Emp Code</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Phone</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">City</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Unit</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Department</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Designation</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {employees.length > 0 ? (
                employees.map((emp) => (
                  <tr key={emp.emp_id} className="hover:bg-purple-25 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-900">{emp.emp_code}</span>
                        {emp.isOfficialEmpCode === false && (
                          <div className="flex items-center space-x-1">
                            <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-800 border border-orange-200">
                              Temp
                            </span>
                            {emp.empCodeRemarks && (
                              <span className="text-xs text-gray-500" title={emp.empCodeRemarks}>
                                ⚠️
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{emp.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{emp.phone}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{emp.city || "Unknown"}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{emp.unit || "Unknown"}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{emp.department || "Unknown"}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{emp.designation || "Unknown"}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getEmployeeStatusBadge(emp.employeeStatus || 'Onboard')}`}>
                        {emp.employeeStatus || 'Onboard'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => editEmployee(emp)}
                          className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-200 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteEmployee(emp.emp_id)}
                          className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="p-0">
                    <NoDataFound
                      type="employee"
                      title="No Employees Found"
                      message="No employees have been added yet. Start by adding your first employee using the form above."
                      showActions={false}
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Employees;
