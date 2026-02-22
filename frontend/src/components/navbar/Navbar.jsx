import "./Navbar.css";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <i className="fa-solid fa-circle-check"></i> DoneIt
        </a>
        <button className="logout-btn" onClick={() => handleLogout()}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
