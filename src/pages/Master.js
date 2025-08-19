// import { useState } from "react";
// import CreateCity from "../components/CreateCity";
// import CreateUnit from "../components/CreateUnit";  // Ensure this matches the new component name
// // import CreateWard from "../components/CreateWard";
// import CreateDepartment from "../components/CreateDepartment";
// import CreateDesignation from "../components/CreateDesignation";

// const tabs = [
//   { id: 1, label: "Cities", component: <CreateCity /> },
//   { id: 2, label: "Units", component: <CreateUnit /> },  // Corrected
//   // { id: 3, label: "Wards", component: <CreateWard /> },
//   { id: 4, label: "Departments", component: <CreateDepartment /> },
//   { id: 5, label: "Designations", component: <CreateDesignation /> },
// ];

// function Master() {
//   const [activeTab, setActiveTab] = useState(1);

//   return (
//     <div className="p-5">
//       <h1 className="text-3xl font-bold mb-4 text-center">
//         🏢 Master Management
//       </h1>

//       {/* Tabs */}
//       <div className="flex space-x-4 mb-5 border-b pb-2">
//         {tabs.map((tab) => (
//           <button
//             key={tab.id}
//             className={`px-4 py-2 rounded-t-lg ${
//               activeTab === tab.id ? "bg-blue-500 text-white" : "bg-gray-200"
//             }`}
//             onClick={() => setActiveTab(tab.id)}
//           >
//             {tab.label}
//           </button>
//         ))}
//       </div>

//       {/* Render Selected Tab Component */}
//       <div className="p-4 border rounded">
//         {tabs.find((tab) => tab.id === activeTab)?.component}
//       </div>
//     </div>
//   );
// }

// export default Master;




import { useState } from "react";
import CreateCity from "../components/CreateCity";
import CreateUnit from "../components/CreateUnit";  // Ensure this matches the new component name
// import CreateWard from "../components/CreateWard";
import CreateDepartment from "../components/CreateDepartment";
import CreateDesignation from "../components/CreateDesignation";

const tabs = [
  { id: 1, label: "Cities", component: CreateCity, icon: "🏙️", description: "Manage city locations" },
  { id: 2, label: "Units", component: CreateUnit, icon: "🏢", description: "Manage organizational units" },
  { id: 4, label: "Departments", component: CreateDepartment, icon: "🏛️", description: "Manage departments" },
  { id: 5, label: "Designations", component: CreateDesignation, icon: "👔", description: "Manage job roles" },
];

function Master() {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 p-6">
      {/* Enhanced Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-black mb-2">
              Master Management
            </h1>
            <p className="text-gray-600 text-lg">
              Centralized management for organizational structure and data
            </p>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="bg-white rounded-lg px-4 py-2 shadow-sm border border-purple-100">
              <span className="text-sm text-gray-500">Active Section:</span>
              <span className="ml-2 font-semibold text-purple-600">
                {tabs.find(tab => tab.id === activeTab)?.label}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Tabs Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`group relative p-6 rounded-xl font-medium transition-all duration-300 text-left ${
              activeTab === tab.id
                ? "bg-gradient-to-br from-purple-300 to-blue-300 text-white shadow-lg transform scale-105"
                : "bg-white text-gray-700 hover:bg-gradient-to-br hover:from-purple-50 hover:to-blue-50 hover:shadow-md hover:transform hover:scale-102 shadow-sm border border-gray-100"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            <div className="flex items-center space-x-3 mb-2">
              <span className="text-2xl">{tab.icon}</span>
              <span className="font-semibold text-lg">{tab.label}</span>
            </div>
            <p className={`text-sm ${
              activeTab === tab.id ? "text-white/90" : "text-gray-500"
            }`}>
              {tab.description}
            </p>
            {activeTab === tab.id && (
              <div className="absolute top-2 right-2">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Enhanced Content Area */}
      <div className="bg-white rounded-2xl shadow-lg border border-purple-100 overflow-hidden">
        {/* Section Header */}
        <div className="bg-gradient-to-r from-purple-300 to-blue-300 px-8 py-6">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">{tabs.find(tab => tab.id === activeTab)?.icon}</span>
            <div>
              <h2 className="text-2xl font-bold text-white">
                {tabs.find(tab => tab.id === activeTab)?.label} Management
              </h2>
              <p className="text-white/80">
                {tabs.find(tab => tab.id === activeTab)?.description}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Create/Add Section */}
          <div className="mb-8">
            {(() => {
              const activeTabData = tabs.find((tab) => tab.id === activeTab);
              const Component = activeTabData?.component;
              return Component ? <Component /> : null;
            })()}
          </div>
        </div>
      </div>

      {/* Floating Help Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300">
          <span className="text-xl">❓</span>
        </button>
      </div>
    </div>
  );
}

export default Master;
