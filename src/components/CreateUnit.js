import { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../config";
import Swal from "sweetalert2";

const apiUrl = `${API_BASE_URL}/api/units`; // Replace zones with units

function CreateUnit() {
  const [units, setUnits] = useState([]);
  const [filteredUnits, setFilteredUnits] = useState([]); // For filtered units
  const [unitName, setUnitName] = useState(""); // Changed to unitName
  const [selectedCity, setSelectedCity] = useState("");
  const [cities, setCities] = useState([]);
  const [editingUnit, setEditingUnit] = useState(null); // Changed to editingUnit
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchCities();
    fetchUnits(); // Changed to fetchUnits
  }, []);

  const fetchCities = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/cities`);
      if (response.data) {
        setCities(response.data);
      } else {
        setErrorMessage("⚠️ No cities found. Please add a city first.");
      }
    } catch (error) {
      console.error("Error fetching cities:", error);
      setErrorMessage("⚠️ Failed to fetch cities. Please try again later.");
    }
  };

  const fetchUnits = async () => { // Changed to fetchUnits
    try {
      const response = await axios.get(apiUrl);
      if (response.data) {
        setUnits(response.data);
        setFilteredUnits(response.data); // Initialize filteredUnits with all units
      } else {
        setErrorMessage("⚠️ No units found.");
      }
    } catch (error) {
      console.error("Error fetching units:", error);
      setErrorMessage("⚠️ Failed to fetch units. Please try again later.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous errors

    if (!selectedCity || !unitName) {
      setErrorMessage("⚠️ Please select a city and enter a unit name.");
      return;
    }

    try {
      if (editingUnit) { // Changed to editingUnit
        // Update existing unit
        const response = await axios.put(`${apiUrl}/${editingUnit.unit_id}`, {
          city_id: selectedCity,
          unit_name: unitName,
        });
        if (response.data) {
          setUnits((prevUnits) =>
            prevUnits.map((unit) =>
              unit.unit_id === editingUnit.unit_id // Changed to unit_id
                ? { ...unit, unit_name: unitName, city_id: selectedCity }
                : unit
            )
          );
          setErrorMessage(""); // Clear errors on success
        } else {
          setErrorMessage("⚠️ Failed to update unit. Please try again.");
        }
      } else {
        // Add new unit
        const response = await axios.post(apiUrl, {
          city_id: selectedCity,
          unit_name: unitName,
        });
        if (response.data) {
          setUnits([...units, response.data]);
          setErrorMessage(""); // Clear errors on success
        } else {
          setErrorMessage("⚠️ Failed to add unit. Please try again.");
        }
      }

      // Reset form
      resetForm();
      fetchUnits(); // Refresh unit list
    } catch (error) {
      console.error("Error saving unit:", error);
      if (error.response) {
        const errCode = error.response.data.code;
        if (errCode === "23505") {
          setErrorMessage("⚠️ Unit already exists for this city.");
        } else {
          setErrorMessage("⚠️ Error saving unit. Please try again.");
        }
      } else {
        setErrorMessage("⚠️ Network error. Please check your connection.");
      }
    }
  };

  const handleDeleteUnit = async (id) => { // Changed to handleDeleteUnit
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
      const response = await axios.delete(`${apiUrl}/${id}`);
      if (response.data) {
        setUnits(units.filter((unit) => unit.unit_id !== id)); // Changed to unit_id
        setFilteredUnits(filteredUnits.filter((unit) => unit.unit_id !== id)); // Changed to unit_id
        setErrorMessage(""); // Clear errors on success
        Swal.fire("Deleted!", "The Unit has been removed.", "success");
      } else {
        setErrorMessage("⚠️ Failed to delete unit. Please try again.");
        Swal.fire("Error!", "Something went wrong.", "error");
      }
    } catch (error) {
      console.error("Error deleting unit:", error);
      setErrorMessage("⚠️ Failed to delete unit. Please try again.");
      Swal.fire("Error!", "Something went wrong.", "error");
    }
  };

  const handleEditUnit = (unit) => { // Changed to handleEditUnit
    setEditingUnit(unit);
    setUnitName(unit.unit_name); // Changed to unit_name
    setSelectedCity(unit.city_id); // Ensure city selection updates correctly
  };

  const resetForm = () => {
    setUnitName(""); // Changed to unitName
    setSelectedCity("");
    setEditingUnit(null); // Changed to editingUnit
  };

  // Filter units based on selected city
  useEffect(() => {
    if (selectedCity) {
      const filtered = units.filter(
        (unit) => unit.city_id === parseInt(selectedCity) // Changed to unit_id
      );
      setFilteredUnits(filtered);
    } else {
      setFilteredUnits(units); // Show all units if no city is selected
    }
  }, [selectedCity, units]);

  // Reset filters and form
  const handleResetAll = () => {
    resetForm(); // Reset form data
    setSelectedCity(""); // Reset city filter
    setFilteredUnits(units); // Show all units
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">📍 Manage Units</h2> {/* Changed from Zones */}

      {/* Error Alert */}
      {errorMessage && <div className="text-red-600 mb-3">{errorMessage}</div>}

      <form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-3">
        {/* City Selection Dropdown */}
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="p-2 border rounded w-full"
          required
        >
          <option value="" disabled>
            Select City
          </option>
          {cities.map((city) => (
            <option key={city.city_id} value={city.city_id}>
              {city.city_name}
            </option>
          ))}
        </select>

        {/* Unit Name Input */}
        <input
          type="text"
          value={unitName} // Changed to unitName
          onChange={(e) => setUnitName(e.target.value)} // Changed to unitName
          placeholder="Enter Unit Name" // Changed from Zone Name
          className="p-2 border rounded w-full"
          required
        />

        <div className="flex gap-2">
          <button
            type="submit"
            className={`px-4 py-2 rounded ${
              selectedCity && unitName // Changed to unitName
                ? "bg-blue-500 text-white"
                : "bg-gray-400 text-gray-700 cursor-not-allowed"
            }`}
            disabled={!selectedCity || !unitName} // Disable if any field is empty
          >
            {editingUnit ? "Update Unit" : "Add Unit"} {/* Changed to Unit */}
          </button>
          {(editingUnit || selectedCity) && (
            <button
              type="button"
              onClick={handleResetAll}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Reset All
            </button>
          )}
        </div>
      </form>

      {/* Unit Table */}
      <table className="w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3">City</th>
            <th className="p-3">Unit</th> {/* Changed from Zone */}
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUnits.map((unit) => ( // Changed to unit
            <tr key={unit.unit_id} className="border-b text-center"> {/* Changed to unit_id */}
              <td className="p-3">{unit.city_name}</td>
              <td className="p-3">{unit.unit_name}</td> {/* Changed to unit_name */}
              <td className="p-3">
                <button
                  onClick={() => handleEditUnit(unit)} // Changed to handleEditUnit
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                >
                   Edit
                </button>
                <button
                  onClick={() => handleDeleteUnit(unit.unit_id)} // Changed to handleDeleteUnit
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                   Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CreateUnit;
