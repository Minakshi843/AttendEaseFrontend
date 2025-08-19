import { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../config";
import Swal from "sweetalert2";
import NoDataFound from "../components/NoDataFound";

const apiUrl = `${API_BASE_URL}/api/wards`;

function AssignSupervisorWard() {
  const [assignments, setAssignments] = useState([]);
  const [supervisors, setSupervisors] = useState([]);
  const [cities, setCities] = useState([]);
  const [units, setUnits] = useState([]);
  const [formData, setFormData] = useState({
    assigned_id: "",
    user_id: "",
    cityId: "",
    unitId: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");

  // Mock data for frontend testing
  const mockAssignments = [
    {
      assigned_id: 1,
      supervisor_name: "Mriram Lodhi",
      city_name: "Indore",
      unit_name: "Crystal IT Park",
      user_id: 1,
      city_id: 1,
      unit_id: 1
    },
    {
      assigned_id: 2,
      supervisor_name: "Ayush Mishra",
      city_name: "Indore",
      unit_name: "Akulya IT Park",
      user_id: 2,
      city_id: 1,
      unit_id: 2
    },
    {
      assigned_id: 3,
      supervisor_name: "Sandeep Chanre",
      city_name: "Raipur",
      unit_name: "ISBT Raipur",
      user_id: 3,
      city_id: 2,
      unit_id: 3
    }
  ];

  const mockSupervisors = [
    { user_id: 1, name: "Mriram Lodhi" },
    { user_id: 2, name: "Ayush Mishra" },
    { user_id: 3, name: "Sandeep Chanre" },
    { user_id: 4, name: "Harikishan Ahirwar" },
    { user_id: 5, name: "Lokesh Bonal" }
  ];

  const mockCities = [
    { city_id: 1, city_name: "Indore" },
    { city_id: 2, city_name: "Raipur" }
  ];

  const mockUnits = [
    { unit_id: 1, unit_name: "Crystal IT Park", city_id: 1 },
    { unit_id: 2, unit_name: "Akulya IT Park", city_id: 1 },
    { unit_id: 3, unit_name: "ISBT Raipur", city_id: 2 }
  ];

  useEffect(() => {
    // Set mock data
    setAssignments(mockAssignments);
    setSupervisors(mockSupervisors);
    setCities(mockCities);
    setUnits(mockUnits);
  }, []);

  const handleCityChange = (e) => {
    const cityId = e.target.value;
    setFormData({
      ...formData,
      cityId,
      unitId: "",
    });
  };

  const handleUnitChange = (e) => {
    const unitId = e.target.value;

    // Find the selected unit and auto-select its associated city
    const selectedUnit = units.find(unit => unit.unit_id == unitId);

    if (selectedUnit) {
      setFormData({
        ...formData,
        cityId: selectedUnit.city_id.toString(), // Auto-select the associated city
        unitId: unitId,
      });
    } else {
      setFormData({
        ...formData,
        unitId: unitId,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Frontend Demo - Form submitted:", formData);
    
    if (isEditing) {
      Swal.fire("Updated!", "Assignment has been updated successfully.", "success");
    } else {
      Swal.fire("Added!", "New assignment has been created successfully.", "success");
    }
    
    resetForm();
  };

  const editAssignment = (assignment) => {
    Swal.fire({
      title: "Edit Confirmation",
      html: `
        <div class="text-left">
          <p class="mb-4">You are about to edit the assignment for: <strong>${assignment.supervisor_name}</strong></p>
          <p class="mb-4">Current assignment: <strong>${assignment.city_name} → ${assignment.unit_name}</strong></p>
          <div class="flex items-center">
            <input type="checkbox" id="editConfirm" class="mr-2">
            <label for="editConfirm" class="text-sm">I confirm that I want to edit this assignment</label>
          </div>
        </div>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Edit",
      cancelButtonText: "Cancel",
      backdrop: `rgba(0,0,0,0.4)`,
      preConfirm: () => {
        const checkbox = document.getElementById('editConfirm');
        if (!checkbox.checked) {
          Swal.showValidationMessage('Please confirm by checking the box');
          return false;
        }
        return true;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        setFormData({
          assigned_id: assignment.assigned_id,
          user_id: assignment.user_id,
          cityId: assignment.city_id,
          unitId: assignment.unit_id,
        });
        setIsEditing(true);
        
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }
    });
  };

  const deleteAssignment = async (assignment) => {
    const result = await Swal.fire({
      title: "Delete Confirmation",
      html: `
        <div class="text-left">
          <p class="mb-4">You are about to permanently delete the assignment for: <strong>${assignment.supervisor_name}</strong></p>
          <p class="mb-4">Assignment: <strong>${assignment.city_name} → ${assignment.unit_name}</strong></p>
          <p class="mb-4 text-red-600">This action cannot be undone!</p>
          <div class="flex items-center">
            <input type="checkbox" id="deleteConfirm" class="mr-2">
            <label for="deleteConfirm" class="text-sm">I understand and want to delete this assignment</label>
          </div>
        </div>
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
      backdrop: `rgba(0,0,0,0.4)`,
      preConfirm: () => {
        const checkbox = document.getElementById('deleteConfirm');
        if (!checkbox.checked) {
          Swal.showValidationMessage('Please confirm by checking the box');
          return false;
        }
        return true;
      }
    });

    if (!result.isConfirmed) return;

    try {
      console.log("Frontend Demo - Delete assignment:", assignment.assigned_id);
      Swal.fire("Deleted!", "The assignment has been removed.", "success");
    } catch (error) {
      console.error("Error deleting assignment:", error);
      Swal.fire("Error!", "Something went wrong.", "error");
    }
  };

  const resetForm = () => {
    setFormData({
      assigned_id: "",
      user_id: "",
      cityId: "",
      unitId: "",
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 p-6">
      {/* Simple Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AssignSupervisorWard</h1>
        <p className="text-gray-600">Manage supervisor assignments to different wards efficiently</p>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 text-red-700 px-6 py-4 rounded-lg mb-6 shadow-sm">
          <div className="flex items-center">
            <span className="text-red-500 mr-2">Warning:</span>
            {error}
          </div>
        </div>
      )}

      {/* Form Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-purple-100 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {isEditing ? "Edit Assignment" : "Add New Assignment"}
        </h3>



        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Select Supervisor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Supervisor</label>
              <select
                value={formData.user_id}
                onChange={(e) =>
                  setFormData({ ...formData, user_id: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:border-purple-300 outline-none transition-colors"
                required
              >
                <option value="" disabled>Choose Supervisor</option>
                {supervisors.map((supervisor) => (
                  <option key={supervisor.user_id} value={supervisor.user_id}>
                    {supervisor.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Select City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select City</label>
              <select
                value={formData.cityId}
                onChange={handleCityChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:border-purple-300 outline-none transition-colors"
                required
              >
                <option value="" disabled>Choose City</option>
                {cities.map((city) => (
                  <option key={city.city_id} value={city.city_id}>
                    {city.city_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Select Unit */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Unit</label>
              <select
                value={formData.unitId}
                onChange={handleUnitChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:border-purple-300 outline-none transition-colors"
                required
              >
                <option value="" disabled>Choose Unit</option>
                {units.map((unit) => (
                  <option key={unit.unit_id} value={unit.unit_id}>
                    {unit.unit_name} ({cities.find(city => city.city_id === unit.city_id)?.city_name})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                formData.user_id && formData.cityId && formData.unitId
                  ? "bg-purple-200 text-gray-900 hover:bg-purple-300 shadow-md"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
              disabled={!formData.user_id || !formData.cityId || !formData.unitId}
            >
              {isEditing ? "Update Assignment" : "Add Assignment"}
            </button>

            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Assignments Table */}
      <div className="bg-white rounded-xl shadow-sm border border-purple-100 overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-100">
          <h3 className="text-lg font-semibold text-gray-900">Assignments List</h3>
          <p className="text-sm text-gray-600 mt-1">
            {assignments.length} assignments registered
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Sr No.</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Supervisor Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">City</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Unit</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {assignments.length > 0 ? (
                assignments.map((assignment, index) => (
                  <tr key={assignment.assigned_id} className="hover:bg-purple-25 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{index + 1}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{assignment.supervisor_name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{assignment.city_name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{assignment.unit_name}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => editAssignment(assignment)}
                          className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-200 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteAssignment(assignment)}
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
                  <td colSpan={5} className="p-0">
                    <NoDataFound
                      type="search"
                      title="No Assignments Found"
                      message="No supervisor assignments have been created yet. Start by assigning supervisors to units using the form above."
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

export default AssignSupervisorWard;
