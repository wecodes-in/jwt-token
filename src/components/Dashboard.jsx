import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; 
import axios from "axios";

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();



  useEffect(() => {
    const token = Cookies.get("token");

    // ✅ Add Axios Interceptor to check for expired tokens
    const axiosInstance = axios.create();
    axiosInstance.interceptors.response.use(
      (response) => response, 
      (error) => {
        if (error.response?.status === 403) { // If Unauthorized (Token Expired)
          alert("Session 1Sexpired. Logging out...");
          handleLogout();
        }
        return Promise.reject(error);
      }
    );

    const fetchEmployees = async () => {
      try {
        const response = await axiosInstance.get("http://localhost:5000/employees", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmployees(response.data.employees);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    if (token) fetchEmployees();
    else navigate("/login");

  }, [navigate]);


  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/login");
  };

  return (
    <div>
      <h2>Employee Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
      <ul>
        {employees.map((emp) => (
          <li key={emp.id}>{emp.name} - {emp.role}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
