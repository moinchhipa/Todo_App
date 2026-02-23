import Navbar from "../navbar/Navbar";
import { useEffect, useState } from "react";
import "./Dashboard.css";
import API from "../../api/axios";

function Dashboard() {
  const [form, setForm] = useState({
    title: "",
  });

  const [todos, setTodos] = useState([]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const fetchTodos = async () => {
    try {
      const res = await API.get("/todos");
      console.log(res.data);
      setTodos(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title) return;
    try {
      await API.post("/todos", form);
      setForm({ title: "" });
      fetchTodos();
    } catch (e) {
      console.log(e);
    }
  };

  const handleDone = async (id) => {
    try {
      await API.put(`/todos/toggle/${id}`);
      fetchTodos();
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/todos/${id}`);
      fetchTodos();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="main">
        <div className="container d-flex flex-column vh-30 justify-content-center pt-5">
          <div className="form-section">
            <form onSubmit={handleSubmit}>
              <input
                className="form-control"
                type="text"
                placeholder="Add todo"
                name="title"
                value={form.title}
                onChange={handleChange}
              />
              <button className="btn btn-primary">Add</button>
            </form>
          </div>

          <div className="todo-section">
            {todos.length === 0 ? (
              <div className="empty-state">
                No todos yet. Add your first task
              </div>
            ) : (
              todos.map((todo) => (
                <div className="row mt-3 mb-3" key={todo._id}>
                  <div className="col-2">
                    <span onClick={() => handleDone(todo._id)}>
                      {todo.isDone ? (
                        <i className="fa-solid fa-square-check text-success fs-5"></i>
                      ) : (
                        <i className="fa-regular fa-square fs-5"></i>
                      )}
                    </span>
                  </div>
                  <div className="col-8">
                    <p
                      style={{
                        textDecoration: todo.isDone ? "line-through" : "none",
                        color: todo.isDone ? "grey" : "black",
                      }}
                    >
                      {todo.title}
                    </p>
                  </div>
                  <div className="col-2">
                    <button onClick={() => handleDelete(todo._id)}>
                      <i className="fa-regular fa-trash-can"></i>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
