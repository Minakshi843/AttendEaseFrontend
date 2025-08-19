// import { useState, useEffect } from "react";
// import axios from "axios";
// import API_BASE_URL from "../config";
// import Swal from "sweetalert2";

// // const apiUrl = `${API_BASE_URL}/api/zones`;
// const apiUrl = `${API_BASE_URL}/api/units`;  // Update /api/zones to /api/units


// function CreateZone() {
//   const [zones, setZones] = useState([]);
//   const [filteredZones, setFilteredZones] = useState([]); // For filtered zones
//   const [zoneName, setZoneName] = useState("");
//   const [selectedCity, setSelectedCity] = useState("");
//   const [cities, setCities] = useState([]);
//   const [editingZone, setEditingZone] = useState(null);
//   const [errorMessage, setErrorMessage] = useState("");

//   useEffect(() => {
//     fetchCities();
//     fetchZones();
//   }, []);

//   const fetchCities = async () => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/api/cities`);
//       if (response.data) {
//         setCities(response.data);
//       } else {
//         setErrorMessage("⚠️ No cities found. Please add a city first.");
//       }
//     } catch (error) {
//       console.error("Error fetching cities:", error);
//       setErrorMessage("⚠️ Failed to fetch cities. Please try again later.");
//     }
//   };

//   const fetchZones = async () => {
//     try {
//       const response = await axios.get(apiUrl);
//       if (response.data) {
//         setZones(response.data);
//         setFilteredZones(response.data); // Initialize filteredZones with all zones
//       } else {
//         setErrorMessage("⚠️ No zones found.");
//       }
//     } catch (error) {
//       console.error("Error fetching zones:", error);
//       setErrorMessage("⚠️ Failed to fetch zones. Please try again later.");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMessage(""); // Clear previous errors

//     if (!selectedCity || !zoneName) {
//       setErrorMessage("⚠️ Please select a city and enter a zone name.");
//       return;
//     }

//     try {
//       if (editingZone) {
//         // Update existing zone
//         const response = await axios.put(`${apiUrl}/${editingZone.zone_id}`, {
//           city_id: selectedCity,
//           zone_name: zoneName,
//         });
//         if (response.data) {
//           setZones((prevZones) =>
//             prevZones.map((zone) =>
//               zone.zone_id === editingZone.zone_id
//                 ? { ...zone, zone_name: zoneName, city_id: selectedCity }
//                 : zone
//             )
//           );
//           setErrorMessage(""); // Clear errors on success
//         } else {
//           setErrorMessage("⚠️ Failed to update zone. Please try again.");
//         }
//       } else {
//         // Add new zone
//         const response = await axios.post(apiUrl, {
//           city_id: selectedCity,
//           zone_name: zoneName,
//         });
//         if (response.data) {
//           setZones([...zones, response.data]);
//           setErrorMessage(""); // Clear errors on success
//         } else {
//           setErrorMessage("⚠️ Failed to add zone. Please try again.");
//         }
//       }

//       // Reset form
//       resetForm();
//       fetchZones(); // Refresh zone list
//     } catch (error) {
//       console.error("Error saving zone:", error);
//       if (error.response) {
//         const errCode = error.response.data.code;
//         if (errCode === "23505") {
//           setErrorMessage("⚠️ Zone already exists for this city.");
//         } else {
//           setErrorMessage("⚠️ Error saving zone. Please try again.");
//         }
//       } else {
//         setErrorMessage("⚠️ Network error. Please check your connection.");
//       }
//     }
//   };

//   const handleDelete = async (id) => {
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
//       const response = await axios.delete(`${apiUrl}/${id}`);
//       if (response.data) {
//         setZones(zones.filter((zone) => zone.zone_id !== id));
//         setFilteredZones(filteredZones.filter((zone) => zone.zone_id !== id));
//         setErrorMessage(""); // Clear errors on success
//         Swal.fire("Deleted!", "The Zone has been removed.", "success");
//       } else {
//         setErrorMessage("⚠️ Failed to delete zone. Please try again.");
//         Swal.fire("Error!", "Something went wrong.", "error");
//       }
//     } catch (error) {
//       console.error("Error deleting zone:", error);
//       setErrorMessage("⚠️ Failed to delete zone. Please try again.");
//       Swal.fire("Error!", "Something went wrong.", "error");
//     }
//   };

//   const handleEdit = (zone) => {
//     setEditingZone(zone);
//     setZoneName(zone.zone_name);
//     setSelectedCity(zone.city_id); // Ensure city selection updates correctly
//   };

//   const resetForm = () => {
//     setZoneName("");
//     setSelectedCity("");
//     setEditingZone(null);
//   };

//   // Filter zones based on selected city
//   useEffect(() => {
//     if (selectedCity) {
//       const filtered = zones.filter(
//         (zone) => zone.city_id === parseInt(selectedCity)
//       );
//       setFilteredZones(filtered);
//     } else {
//       setFilteredZones(zones); // Show all zones if no city is selected
//     }
//   }, [selectedCity, zones]);

//   // Reset filters and form
//   const handleResetAll = () => {
//     resetForm(); // Reset form data
//     setSelectedCity(""); // Reset city filter
//     setFilteredZones(zones); // Show all zones
//   };

//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-4">📍 Manage Zones</h2>

//       {/* Error Alert */}
//       {errorMessage && <div className="text-red-600 mb-3">{errorMessage}</div>}

//       <form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-3">
//         {/* City Selection Dropdown */}
//         <select
//           value={selectedCity}
//           onChange={(e) => setSelectedCity(e.target.value)}
//           className="p-2 border rounded w-full"
//           required
//         >
//           <option value="" disabled>
//             Select City
//           </option>
//           {cities.map((city) => (
//             <option key={city.city_id} value={city.city_id}>
//               {city.city_name}
//             </option>
//           ))}
//         </select>

//         {/* Zone Name Input */}
//         <input
//           type="text"
//           value={zoneName}
//           onChange={(e) => setZoneName(e.target.value)}
//           placeholder="Enter Zone Name"
//           className="p-2 border rounded w-full"
//           required
//         />

//         <div className="flex gap-2">
//           <button
//             type="submit"
//             className={`px-4 py-2 rounded ${
//               selectedCity && zoneName
//                 ? "bg-blue-500 text-white"
//                 : "bg-gray-400 text-gray-700 cursor-not-allowed"
//             }`}
//             disabled={!selectedCity || !zoneName} // Disable if any field is empty
//           >
//             {editingZone ? "Update Zone" : "Add Zone"}
//           </button>
//           {(editingZone || selectedCity) && (
//             <button
//               type="button"
//               onClick={handleResetAll}
//               className="bg-gray-500 text-white px-4 py-2 rounded"
//             >
//               Reset All
//             </button>
//           )}
//         </div>
//       </form>

//       {/* Zone Table */}
//       <table className="w-full bg-white shadow-md rounded-lg">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="p-3">City</th>
//             <th className="p-3">Zone</th>
//             <th className="p-3">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredZones.map((zone) => (
//             <tr key={zone.zone_id} className="border-b text-center">
//               <td className="p-3">{zone.city_name}</td>
//               <td className="p-3">{zone.zone_name}</td>
//               <td className="p-3">
//                 <button
//                   onClick={() => handleEdit(zone)}
//                   className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
//                 >
//                   ✏️ Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(zone.zone_id)}
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

// export default CreateZone;


import { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../config";
import Swal from "sweetalert2";
import NoDataFound from "./NoDataFound";

const apiUrl = `${API_BASE_URL}/api/units`;  // Changed from /api/zones to /api/units

function CreateUnit() {
  const [units, setUnits] = useState([]);  // Changed from zones to units
  const [filteredUnits, setFilteredUnits] = useState([]);  // Changed from filteredZones to filteredUnits
  const [unitName, setUnitName] = useState("");  // Changed from zoneName to unitName
  const [selectedCity, setSelectedCity] = useState("");
  const [cities, setCities] = useState([]);
  const [editingUnit, setEditingUnit] = useState(null);  // Changed from editingZone to editingUnit
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchCities();
    fetchUnits();
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

  const fetchUnits = async () => {
    try {
      const response = await axios.get(apiUrl);
      if (response.data) {
        setUnits(response.data);
        setFilteredUnits(response.data);  // Initialize filteredUnits with all units
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
    setErrorMessage("");  // Clear previous errors

    if (!selectedCity || !unitName) {
      setErrorMessage("⚠️ Please select a city and enter a unit name.");
      return;
    }

    try {
      if (editingUnit) {
        // Update existing unit
        const response = await axios.put(`${apiUrl}/${editingUnit.unit_id}`, {  // Changed from zone_id to unit_id
          city_id: selectedCity,
          unit_name: unitName,  // Changed from zone_name to unit_name
        });
        if (response.data) {
          setUnits((prevUnits) =>
            prevUnits.map((unit) =>
              unit.unit_id === editingUnit.unit_id  // Changed from zone_id to unit_id
                ? { ...unit, unit_name: unitName, city_id: selectedCity }  // Changed from zone_name to unit_name
                : unit
            )
          );
          setErrorMessage("");  // Clear errors on success
        } else {
          setErrorMessage("⚠️ Failed to update unit. Please try again.");
        }
      } else {
        // Add new unit
        const response = await axios.post(apiUrl, {
          city_id: selectedCity,
          unit_name: unitName,  // Changed from zone_name to unit_name
        });
        if (response.data) {
          setUnits([...units, response.data]);
          setErrorMessage("");  // Clear errors on success
        } else {
          setErrorMessage("⚠️ Failed to add unit. Please try again.");
        }
      }

      // Reset form
      resetForm();
      fetchUnits();  // Refresh unit list
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

  const handleDelete = async (id) => {
    const unitToDelete = units.find(unit => unit.unit_id === id);
    const result = await Swal.fire({
      title: "Delete Confirmation",
      html: `
        <div class="text-left">
          <p class="mb-4">You are about to permanently delete the unit: <strong>${unitToDelete?.unit_name}</strong></p>
          <p class="mb-4 text-red-600">This action cannot be undone!</p>
          <div class="flex items-center">
            <input type="checkbox" id="deleteConfirm" class="mr-2">
            <label for="deleteConfirm" class="text-sm">I understand and want to delete this unit</label>
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
      const response = await axios.delete(`${apiUrl}/${id}`);
      if (response.data) {
        setUnits(units.filter((unit) => unit.unit_id !== id));
        setFilteredUnits(filteredUnits.filter((unit) => unit.unit_id !== id));
        setErrorMessage("");
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

  const handleEdit = (unit) => {
    Swal.fire({
      title: "Edit Confirmation",
      html: `
        <div class="text-left">
          <p class="mb-4">You are about to edit the unit: <strong>${unit.unit_name}</strong></p>
          <div class="flex items-center">
            <input type="checkbox" id="editConfirm" class="mr-2">
            <label for="editConfirm" class="text-sm">I confirm that I want to edit this unit</label>
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
        setEditingUnit(unit);
        setUnitName(unit.unit_name);
        setSelectedCity(unit.city_id);
      }
    });
  };

  const resetForm = () => {
    setUnitName("");  // Changed from zoneName to unitName
    setSelectedCity("");
    setEditingUnit(null);  // Changed from editingZone to editingUnit
  };

  // Filter units based on selected city
  useEffect(() => {
    if (selectedCity) {
      const filtered = units.filter(
        (unit) => unit.city_id === parseInt(selectedCity)  // Changed from zone to unit
      );
      setFilteredUnits(filtered);
    } else {
      setFilteredUnits(units);  // Show all units if no city is selected
    }
  }, [selectedCity, units]);

  // Reset filters and form
  const handleResetAll = () => {
    resetForm();  // Reset form data
    setSelectedCity("");  // Reset city filter
    setFilteredUnits(units);  // Show all units
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Manage Units</h2>
        <p className="text-gray-600">Create and manage units within different cities</p>
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
          {editingUnit ? "Edit Unit" : "Add New Unit"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:border-purple-300 outline-none transition-colors"
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
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Unit Name</label>
              <input
                type="text"
                value={unitName}
                onChange={(e) => setUnitName(e.target.value)}
                placeholder="Enter Unit Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:border-purple-300 outline-none transition-colors"
                required
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                selectedCity && unitName
                  ? "bg-purple-200 text-gray-900 hover:bg-purple-300 shadow-md"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
              disabled={!selectedCity || !unitName}
            >
              {editingUnit ? "Update Unit" : "Add Unit"}
            </button>

            {(editingUnit || selectedCity) && (
              <button
                type="button"
                onClick={handleResetAll}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Reset All
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Units Table */}
      <div className="bg-white rounded-xl shadow-sm border border-purple-100 overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-100">
          <h3 className="text-lg font-semibold text-gray-900">Units List</h3>
          <p className="text-sm text-gray-600 mt-1">
            {filteredUnits.length} units registered
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">City</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Unit</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUnits.length > 0 ? (
                filteredUnits.map((unit) => (
                  <tr key={unit.unit_id} className="hover:bg-purple-25 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{unit.city_name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{unit.unit_name}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEdit(unit)}
                          className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-200 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(unit.unit_id)}
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
                      title="No units to list here"
                      message="No units have been added yet. Start by adding your first unit using the form above."
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

export default CreateUnit;  // Changed from CreateZone to CreateUnit
