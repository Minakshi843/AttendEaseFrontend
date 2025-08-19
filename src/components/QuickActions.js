// function QuickActions() {
//   return (
//     <div className="mt-5 flex gap-4">
//       <button className="bg-blue-500 text-white px-4 py-2 rounded shadow-md">
//         ➕ Add Employee
//       </button>
//       <button className="bg-green-500 text-white px-4 py-2 rounded shadow-md">
//         📄 Generate Report
//       </button>
//       <button className="bg-yellow-500 text-white px-4 py-2 rounded shadow-md">
//         🛠 Manage Attendance
//       </button>
//     </div>
//   );
// }

// export default QuickActions;



/////////////////////////



import { Link } from 'react-router-dom'; // Import Link for navigation

function QuickActions() {
  return (
    <div className="mt-5 flex gap-4 justify-center">
      <Link to="/employees">
        <button className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 transition duration-300 ease-in-out">
          ➕ Add Employee
        </button>
      </Link>

      <Link to="/generate-report">
        <button className="bg-green-500 text-white px-4 py-2 rounded shadow-md hover:bg-green-600 transition duration-300 ease-in-out">
          📄 Generate Report
        </button>
      </Link>

      <Link to="/manage-attendance">
        <button className="bg-yellow-500 text-white px-4 py-2 rounded shadow-md hover:bg-yellow-600 transition duration-300 ease-in-out">
          🛠 Manage Attendance
        </button>
      </Link>
    </div>
  );
}

export default QuickActions;
