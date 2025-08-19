// import { useState, useEffect } from "react";
// import axios from "axios";
// import API_BASE_URL from "../config";
// import Swal from "sweetalert2";

// const apiUrl = `${API_BASE_URL}/api`;

// function Supervisors() {
//   const [supervisors, setSupervisors] = useState([]);
//   const [formData, setFormData] = useState({
//     user_id: "",
//     name: "",
//     emp_code: "",
//     email: "",
//     phone: "",
//     role: "supervisor",
//     password: "",
//     confirmPassword: "",
//   });
//   const [isEditing, setIsEditing] = useState(null);
//   const [changePassword, setChangePassword] = useState(null);

//   useEffect(() => {
//     fetchSupervisor();
//   }, []);

//   const fetchSupervisor = async () => {
//     try {
//       const response = await axios.get(`${apiUrl}/supervisor`);
//       setSupervisors(response.data);
//     } catch (error) {
//       console.error("Error fetching user's data", error);
//       alert("Failed to fetch supervisors. Please try again.");
//     }
//   };
//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.password !== formData.confirmPassword) {
//       alert("Passwords do not match!");
//       return;
//     }

//     try {
//       if (isEditing && !changePassword) {
//         // Update supervisor
//         await axios.put(
//           `${apiUrl}/auth/update`,
//           {
//             passChange: false,
//             user_id: formData.user_id,
//             name: formData.name,
//             emp_code: formData.emp_code,
//             email: formData.email,
//             phone: formData.phone,
//             role: formData.role,
//           },
//           { headers: { "Content-Type": "application/json" } }
//         );
//       } else if (isEditing && changePassword) {
//         // Update supervisor with password
//         await axios.put(`${apiUrl}/auth/update`, {
//           passChange: true,
//           user_id: formData.user_id,
//           name: formData.name,
//           emp_code: formData.emp_code,
//           email: formData.email,
//           phone: formData.phone,
//           role: formData.role,
//           password: formData.password,
//         });
//       } else {
//         // Add new supervisor (Only Admins should add)
//         await axios.post(
//           `${apiUrl}/auth/register`,
//           {
//             name: formData.name,
//             emp_code: formData.emp_code,
//             email: formData.email,
//             phone: formData.phone,
//             role: formData.role,
//             password: formData.password,
//           },
//           { headers: { "Content-Type": "application/json" } }
//         );
//       }
//       fetchSupervisor(); // Refresh list
//       resetLabel(); // Resets the labels
//     } catch (error) {
//       console.error("Error updating supervisor", error);
//     }
//   };

//   const handleEdit = (sup) => {
//     setFormData({
//       user_id: sup.user_id || "",
//       name: sup.name || "",
//       emp_code: sup.emp_code || "",
//       email: sup.email || "",
//       phone: sup.phone || "",
//       role: sup.role || "supervisor",
//       password: "",
//       confirmPassword: "",
//     });
//     setIsEditing(true);
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
//       await axios.delete(`${apiUrl}/supervisor/${id}`);
//       setSupervisors(supervisors.filter((sup) => sup.user_id !== id));
//       fetchSupervisor();
//       Swal.fire("Deleted!", "The Supervisor has been removed.", "success");
//     } catch (error) {
//       console.error("Error deleting supervisor", error);
//       Swal.fire("Error!", "Something went wrong.", "error");
//     }
//   };

//   const resetLabel = () => {
//     setFormData({
//       user_id: "",
//       name: "",
//       emp_code: "",
//       email: "",
//       phone: "",
//       role: "supervisor",
//       password: "",
//       confirmPassword: "",
//     });
//     setIsEditing(false);
//     setChangePassword(false);
//   };

//   return (
//     <div className="p-5">
//       <h1 className="text-2xl font-bold mb-4">🧑‍🏫 Supervisor Management</h1>
//       <form
//         onSubmit={handleSubmit}
//         className="border bg-gray-100 p-4 shadow-md rounded-lg mb-4"
//       >
//         {isEditing && (
//           <div className="mb-2">
//             <label className="block font-medium">User ID</label>
//             <input
//               type="text"
//               name="id"
//               value={formData.user_id}
//               disabled
//               className="w-full p-2 border rounded bg-gray-100"
//             />
//           </div>
//         )}

//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block font-medium">Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded"
//               required
//             />
//           </div>
//           <div>
//             <label className="block font-medium">EmpCode</label>
//             <input
//               type="text"
//               name="emp_code"
//               value={formData.emp_code}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded"
//               required
//             />
//           </div>
//           <div>
//             <label className="block font-medium">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded"
//               required
//             />
//           </div>
//           <div>
//             <label className="block font-medium">Phone</label>
//             <input
//               type="text"
//               name="phone"
//               value={formData.phone}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded"
//             />
//           </div>
//           <div>
//             <label className="block font-medium">Role</label>
//             <select
//               name="role"
//               value={formData.role}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded"
//             >
//               <option value="supervisor">Supervisor</option>
//               <option value="admin">Admin</option>
//             </select>
//           </div>
//           {(!isEditing || changePassword) && (
//             <div>
//               <label className="block font-medium">Create Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleInputChange}
//                 className="w-full p-2 border rounded"
//                 required
//               />
//             </div>
//           )}
//           {(!isEditing || changePassword) && (
//             <div className="w-full">
//               <label className="block font-medium">Re-enter Password</label>
//               <input
//                 type="password"
//                 name="confirmPassword"
//                 value={formData.confirmPassword}
//                 onChange={handleInputChange}
//                 className="w-full p-2 border rounded"
//                 required
//               />
//             </div>
//           )}
//           <div className="flex items-end justify-center ">
//             <div>
//               <button
//                 type="submit"
//                 className="bg-blue-500 text-white px-4 py-2 rounded shadow-md"
//               >
//                 {isEditing ? "Update Supervisor" : "➕ Add Supervisor"}
//               </button>
//               {isEditing && (
//                 <button
//                   type="button"
//                   onClick={resetLabel}
//                   className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
//                 >
//                   Reset
//                 </button>
//               )}
//               {/* {isEditing && (
//                 <button
//                   type="button"
//                   // onClick={resetLabel}
//                   className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
//                 >
//                   Change Password
//                 </button>
//               )} */}
//             </div>
//           </div>
//         </div>
//       </form>

//       <table className="w-full bg-white shadow-md rounded-lg">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="p-3">Name</th>
//             <th className="p-3">EmpCode</th>
//             <th className="p-3">Email</th>
//             <th className="p-3">Phone</th>
//             <th className="p-3">Role</th>
//             <th className="p-3">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {supervisors.map((sup) => (
//             <tr key={sup.user_id} className="border-b">
//               <td className="p-3">{sup.name}</td>
//               <td className="p-3">{sup.emp_code}</td>
//               <td className="p-3">{sup.email}</td>
//               <td className="p-3">{sup.phone}</td>
//               <td className="p-3">{sup.role}</td>
//               <td className="p-3">
//                 <button
//                   onClick={() => handleEdit(sup)}
//                   className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
//                 >
//                   ✏️ Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(sup.user_id)}
//                   className="bg-red-500 text-white px-2 py-1 rounded"
//                 >
//                   🗑️ Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Supervisors;




import { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../config";
import Swal from "sweetalert2";
import NoDataFound from "../components/NoDataFound";

const apiUrl = `${API_BASE_URL}/api`;

function Supervisors() {
  const [supervisors, setSupervisors] = useState([]);
  const [formData, setFormData] = useState({
    user_id: "",
    name: "",
    emp_code: "",
    email: "",
    phone: "",
    role: "supervisor",
    password: "",
    confirmPassword: "",
  });
  const [isEditing, setIsEditing] = useState(null);
  const [changePassword, setChangePassword] = useState(null);

  useEffect(() => {
    fetchSupervisor();
  }, []);

  const fetchSupervisor = async () => {
    try {
      const response = await axios.get(`${apiUrl}/supervisor`);
      setSupervisors(response.data);
    } catch (error) {
      console.error("Error fetching user's data", error);
      alert("Failed to fetch supervisors. Please try again.");
    }
  };
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      if (isEditing && !changePassword) {
        // Update supervisor
        await axios.put(
          `${apiUrl}/auth/update`,
          {
            passChange: false,
            user_id: formData.user_id,
            name: formData.name,
            emp_code: formData.emp_code,
            email: formData.email,
            phone: formData.phone,
            role: formData.role,
          },
          { headers: { "Content-Type": "application/json" } }
        );
      } else if (isEditing && changePassword) {
        // Update supervisor with password
        await axios.put(`${apiUrl}/auth/update`, {
          passChange: true,
          user_id: formData.user_id,
          name: formData.name,
          emp_code: formData.emp_code,
          email: formData.email,
          phone: formData.phone,
          role: formData.role,
          password: formData.password,
        });
      } else {
        // Add new supervisor (Only Admins should add)
        await axios.post(
          `${apiUrl}/auth/register`,
          {
            name: formData.name,
            emp_code: formData.emp_code,
            email: formData.email,
            phone: formData.phone,
            role: formData.role,
            password: formData.password,
          },
          { headers: { "Content-Type": "application/json" } }
        );
      }
      fetchSupervisor(); // Refresh list
      resetLabel(); // Resets the labels
    } catch (error) {
      console.error("Error updating supervisor", error);
    }
  };

  const handleEdit = (sup) => {
    Swal.fire({
      title: "Edit Confirmation",
      html: `
        <div class="text-left">
          <p class="mb-4">You are about to edit the supervisor: <strong>${sup.name}</strong></p>
          <div class="flex items-center">
            <input type="checkbox" id="editConfirm" class="mr-2">
            <label for="editConfirm" class="text-sm">I confirm that I want to edit this supervisor</label>
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
          user_id: sup.user_id || "",
          name: sup.name || "",
          emp_code: sup.emp_code || "",
          email: sup.email || "",
          phone: sup.phone || "",
          role: sup.role || "supervisor",
          password: "",
          confirmPassword: "",
        });
        setIsEditing(true);

        // Scroll to the top of the page after edit
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }
    });
  };

  const handleDelete = async (id) => {
    const supervisorToDelete = supervisors.find(sup => sup.user_id === id);
    const result = await Swal.fire({
      title: "Delete Confirmation",
      html: `
        <div class="text-left">
          <p class="mb-4">You are about to permanently delete the supervisor: <strong>${supervisorToDelete?.name}</strong></p>
          <p class="mb-4 text-red-600">This action cannot be undone!</p>
          <div class="flex items-center">
            <input type="checkbox" id="deleteConfirm" class="mr-2">
            <label for="deleteConfirm" class="text-sm">I understand and want to delete this supervisor</label>
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
      await axios.delete(`${apiUrl}/supervisor/${id}`);
      setSupervisors(supervisors.filter((sup) => sup.user_id !== id));
      fetchSupervisor();
      Swal.fire("Deleted!", "The Supervisor has been removed.", "success");
    } catch (error) {
      console.error("Error deleting supervisor", error);
      Swal.fire("Error!", "Something went wrong.", "error");
    }
  };

  const resetLabel = () => {
    setFormData({
      user_id: "",
      name: "",
      emp_code: "",
      email: "",
      phone: "",
      role: "supervisor",
      password: "",
      confirmPassword: "",
    });
    setIsEditing(false);
    setChangePassword(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 p-6">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Supervisor Management</h1>
        <p className="text-gray-600">Manage supervisors and administrators in your organization</p>
      </div>

      {/* Form Section */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-purple-100 mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">
          {isEditing ? "Edit Supervisor" : "Add New Supervisor"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          {isEditing && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">User ID</label>
              <input
                type="text"
                name="id"
                value={formData.user_id}
                disabled
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:border-purple-300 outline-none transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Employee Code</label>
              <input
                type="text"
                name="emp_code"
                value={formData.emp_code}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:border-purple-300 outline-none transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:border-purple-300 outline-none transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:border-purple-300 outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:border-purple-300 outline-none transition-colors"
              >
                <option value="supervisor">Supervisor</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {(!isEditing || changePassword) && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:border-purple-300 outline-none transition-colors"
                  required
                />
              </div>
            )}

            {(!isEditing || changePassword) && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:border-purple-300 outline-none transition-colors"
                  required
                />
              </div>
            )}
          </div>

          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              className="px-8 py-3 bg-purple-200 text-gray-900 rounded-lg font-medium hover:bg-purple-300 shadow-md transition-all duration-200"
            >
              {isEditing ? "Update Supervisor" : "Add Supervisor"}
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
        </form>
      </div>

      {/* Supervisors Table */}
      <div className="bg-white rounded-xl shadow-sm border border-purple-100 overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-100">
          <h3 className="text-lg font-semibold text-gray-900">Supervisors List</h3>
          <p className="text-sm text-gray-600 mt-1">
            {supervisors.length} supervisors registered
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Emp Code</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Phone</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Role</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {supervisors.length > 0 ? (
                supervisors.map((sup) => (
                  <tr key={sup.user_id} className="hover:bg-purple-25 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{sup.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{sup.emp_code}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{sup.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{sup.phone}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        sup.role === 'admin'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {sup.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEdit(sup)}
                          className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-200 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(sup.user_id)}
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
                  <td colSpan={6} className="p-0">
                    <NoDataFound
                      type="employee"
                      title="No Supervisors Found"
                      message="No supervisors have been added yet. Start by adding your first supervisor using the form above."
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

export default Supervisors;

