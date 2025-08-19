import { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../config";
import Swal from "sweetalert2";
import NoDataFound from "./NoDataFound";

const apiUrl = `${API_BASE_URL}/api/departments`;

function CreateDepartment() {
  const [departments, setDepartments] = useState([]);
  const [departmentName, setDepartmentName] = useState("");
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get(apiUrl);
      setDepartments(response.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      if (editingDepartment) {
        await axios.put(`${apiUrl}/${editingDepartment.department_id}`, {
          department_name: departmentName,
        });

        setDepartments((prev) =>
          prev.map((dept) =>
            dept.department_id === editingDepartment.department_id
              ? { ...dept, department_name: departmentName }
              : dept
          )
        );
      } else {
        const response = await axios.post(apiUrl, {
          department_name: departmentName,
        });
        setDepartments([...departments, response.data]);
      }

      resetForm();
      fetchDepartments();
    } catch (error) {
      if (error.response) {
        const errCode = error.response.data.code;
        setErrorMessage(
          errCode === "23505"
            ? "⚠️ Department already exists."
            : "⚠️ Error saving department. Please try again."
        );
      } else {
        setErrorMessage("⚠️ Network error. Please check your connection.");
      }
      console.error("Error saving department:", error);
    }
  };

  const handleDelete = async (id) => {
    const deptToDelete = departments.find(dept => dept.department_id === id);
    const result = await Swal.fire({
      title: "Delete Confirmation",
      html: `
        <div class="text-left">
          <p class="mb-4">You are about to permanently delete the department: <strong>${deptToDelete?.department_name}</strong></p>
          <p class="mb-4 text-red-600">This action cannot be undone!</p>
          <div class="flex items-center">
            <input type="checkbox" id="deleteConfirm" class="mr-2">
            <label for="deleteConfirm" class="text-sm">I understand and want to delete this department</label>
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
      await axios.delete(`${apiUrl}/${id}`);
      setDepartments(departments.filter((dept) => dept.department_id !== id));
      Swal.fire("Deleted!", "The Department has been removed.", "success");
    } catch (error) {
      console.error("Error deleting department:", error);
      Swal.fire("Error!", "Something went wrong.", "error");
    }
  };

  const handleEdit = (dept) => {
    Swal.fire({
      title: "Edit Confirmation",
      html: `
        <div class="text-left">
          <p class="mb-4">You are about to edit the department: <strong>${dept.department_name}</strong></p>
          <div class="flex items-center">
            <input type="checkbox" id="editConfirm" class="mr-2">
            <label for="editConfirm" class="text-sm">I confirm that I want to edit this department</label>
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
        setEditingDepartment(dept);
        setDepartmentName(dept.department_name);
      }
    });
  };

  const resetForm = () => {
    setDepartmentName("");
    setEditingDepartment(null);
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Manage Departments</h2>
        <p className="text-gray-600">Create and organize departments within your organization</p>
      </div>

      {/* Error Alert */}
      {errorMessage && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-red-700">{errorMessage}</p>
            </div>
          </div>
        </div>
      )}

      {/* Form Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-purple-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {editingDepartment ? "Edit Department" : "Add New Department"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Department Name</label>
            <input
              type="text"
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
              placeholder="Enter Department Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:border-purple-300 outline-none transition-colors"
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                departmentName
                  ? "bg-purple-200 text-gray-900 hover:bg-purple-300 shadow-md"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
              disabled={!departmentName}
            >
              {editingDepartment ? "Update Department" : "Add Department"}
            </button>

            {editingDepartment && (
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

      {/* Departments Table */}
      <div className="bg-white rounded-xl shadow-sm border border-purple-100 overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-100">
          <h3 className="text-lg font-semibold text-gray-900">Departments List</h3>
          <p className="text-sm text-gray-600 mt-1">
            {departments.length} departments registered
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Department Name</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {departments.length > 0 ? (
                departments.map((dept) => (
                  <tr key={dept.department_id} className="hover:bg-purple-25 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{dept.department_name}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEdit(dept)}
                          className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-200 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(dept.department_id)}
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
                  <td colSpan={2} className="p-0">
                    <NoDataFound
                      type="task"
                      title="No departments to list here"
                      message="No departments have been added yet. Start by adding your first department using the form above."
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

export default CreateDepartment;
