import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", form);
      setMessage(res.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (e) {
      setMessage("Registration failed");
    }
  };
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-4">
        <div className="card w-100 p-4 text-center reg-card">
          <h2 className="text-center mb-4 fs-2">Create Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                className="form-control"
                type="text"
                placeholder="Enter username"
                name="username"
                value={form.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                className="form-control"
                type="email"
                placeholder="Enter email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                className="form-control"
                type="password"
                placeholder="Enter password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
            <button className="w-100 btn btn-primary">SignIn</button>
          </form>
          <p className="mt-3">
            Already have an account?{" "}
            <span
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
