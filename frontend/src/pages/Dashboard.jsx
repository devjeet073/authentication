import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useAuthStore } from "../store/authStore";

const Dashboard = () => {
  const { user, logout } = useAuthStore();

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();

    navigate("/login");
  };

  return (
    <div>
      <h1>Dashboard</h1>

      <Button
        text="Logout"
        type="button"
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={handleLogout}
      />
    </div>
  );
};

export default Dashboard;
