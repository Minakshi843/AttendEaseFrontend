// import { createContext, useContext, useEffect, useState } from "react";
// // import axios from "axios";
// import API_BASE_URL from "./config";

// const apiUrl = `${API_BASE_URL}/api/auth`;

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   // ✅ Check if user is already logged in (e.g., from a token)
//   useEffect(() => {
//     const fetchUser = async () => {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         console.error("No token found!");
//         return;
//       }

//       try {
//         const res = await fetch(`${apiUrl}/me`, {
//           method: "GET",
//           credentials: "include",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (res.ok) {
//           const userData = await res.json();
//           setUser(userData); // Store user info
//         }
//       } catch (error) {
//         console.error("Error fetching user:", error);
//       }
//     };

//     fetchUser();
//   }, []);

//   // ✅ Login function
//   const login = async (email, password) => {
//     try {
//       const res = await fetch(`${apiUrl}/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//         credentials: "include",
//       });

//       if (!res.ok) {
//         const errorData = await res.json();
//         console.error("Login failed:", errorData.error);
//         return false;
//       }

//       const data = await res.json();
//       localStorage.setItem("token", data.token);
//       setUser(data.user);

//       return true;
//     } catch (error) {
//       console.error("Error in login function:", error);
//       return false;
//     }
//   };

//   // ✅ Logout function
//   const logout = async () => {
//     await fetch(`${apiUrl}/logout`, {
//       method: "POST",
//       credentials: "include",
//     });

//     localStorage.removeItem("token");
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ✅ Mocking the login function for testing
  const login = async (email, password) => {
    // You can mock successful login here
    if (email === "test@test.com" && password === "password") {
      // Mock user data
      const userData = { email: "test@test.com", name: "Test User" };
      setUser(userData);
      localStorage.setItem("token", "fake-jwt-token"); // Mock token storage
      return true; // Simulate successful login
    } else {
      return false; // Simulate login failure
    }
  };

  // Mock Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
