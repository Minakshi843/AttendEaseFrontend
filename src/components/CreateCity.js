import { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../config";
import Swal from "sweetalert2";
import NoDataFound from "./NoDataFound";

const apiUrl = `${API_BASE_URL}/api/cities`;

const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

function CreateCity() {
  const [cities, setCities] = useState([]);
  const [state, setState] = useState("");
  const [cityName, setCityName] = useState("");
  const [editingCity, setEditingCity] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const response = await axios.get(apiUrl);
      setCities(response.data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous errors
    try {
      if (editingCity) {
        // Update existing city
        await axios.put(`${apiUrl}/${editingCity.city_id}`, {
          city_name: cityName,
          state,
        });
      } else {
        // Add new city
        await axios.post(apiUrl, {
          city_name: cityName,
          state,
        });
      }
      resetForm();
      fetchCities(); // Refresh city list
    } catch (error) {
      if (error.response) {
        const errCode = error.response.data.code;
        if (errCode === "23505") {
          setErrorMessage("⚠️ This city already exists in the database.");
        } else {
          setErrorMessage("⚠️ Error saving city. Please try again.");
        }
      } else {
        setErrorMessage("⚠️ Network error. Please check your connection.");
      }
      console.error("Error saving city:", error);
    }
  };

  // const editCity = (city) => {
  //   setEditingCity(city);
  //   setCityName(city.city_name);
  //   setState(city.state);
  // };
  
  // Modify editCity to include confirmation before editing
  const editCity = (city) => {
    // Show confirmation dialog before allowing edit
    Swal.fire({
      title: "Edit Confirmation",
      html: `
        <div class="text-left">
          <p class="mb-4">You are about to edit the city: <strong>${city.city_name}</strong></p>
          <div class="flex items-center">
            <input type="checkbox" id="editConfirm" class="mr-2">
            <label for="editConfirm" class="text-sm">I confirm that I want to edit this city</label>
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
        // Proceed with the edit if confirmed
        setEditingCity(city);
        setCityName(city.city_name);
        setState(city.state);

        // Scroll to the top of the page after edit
        window.scrollTo({
          top: 0,
          behavior: 'smooth', // Smooth scrolling
        });
      }
    });
  };

  const deleteCity = async (id) => {
    const cityToDelete = cities.find(city => city.city_id === id);
    const result = await Swal.fire({
      title: "Delete Confirmation",
      html: `
        <div class="text-left">
          <p class="mb-4">You are about to permanently delete the city: <strong>${cityToDelete?.city_name}</strong></p>
          <p class="mb-4 text-red-600">This action cannot be undone!</p>
          <div class="flex items-center">
            <input type="checkbox" id="deleteConfirm" class="mr-2">
            <label for="deleteConfirm" class="text-sm">I understand and want to delete this city</label>
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
      fetchCities();
      Swal.fire("Deleted!", "The city has been removed.", "success");
    } catch (error) {
      console.error("Error deleting city:", error);
      Swal.fire("Error!", "Something went wrong.", "error");
    }
  };

  const resetForm = () => {
    setCityName("");
    setState("");
    setEditingCity(null);
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Manage Cities</h2>
        <p className="text-gray-600">Add and manage cities across different states</p>
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
          {editingCity ? "Edit City" : "Add New City"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:border-purple-300 outline-none transition-colors"
                required
              >
                <option value="" disabled>
                  Select State
                </option>
                {indianStates.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">City Name</label>
              <input
                type="text"
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
                placeholder="Enter City Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:border-purple-300 outline-none transition-colors"
                required
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                state && cityName
                  ? "bg-purple-200 text-gray-900 hover:bg-purple-300 shadow-md"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
              disabled={!state || !cityName}
            >
              {editingCity ? "Update City" : "Add City"}
            </button>

            {editingCity && (
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

      {/* Cities Table */}
      <div className="bg-white rounded-xl shadow-sm border border-purple-100 overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-100">
          <h3 className="text-lg font-semibold text-gray-900">Cities List</h3>
          <p className="text-sm text-gray-600 mt-1">
            {Array.isArray(cities) ? cities.length : 0} cities registered
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">City</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">State</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {Array.isArray(cities) && cities.length > 0 ? (
                cities.map((city) => (
                  <tr key={city.city_id} className="hover:bg-purple-25 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{city.city_name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{city.state}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => editCity(city)}
                          className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-200 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteCity(city.city_id)}
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
                  <td colSpan={3} className="p-0">
                    <NoDataFound
                      type="task"
                      title="No cities to list here"
                      message="No cities have been added yet. Start by adding your first city using the form above."
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

export default CreateCity;
