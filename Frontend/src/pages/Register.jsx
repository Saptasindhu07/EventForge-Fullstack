// src/pages/RegisterPage.jsx
import React, { useState } from "react";
import styles from "../css modules/register.module.css";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
    role: "user", // default to 'user'
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:8000/addUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Registration successful!");
        setTimeout(()=>{
            navigate('/login')
        },1500)
      } else {
        setMessage(data.message || "Registration failed.");
      }
    } catch (err) {
        console.log(err)
      setMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <div className={styles.shape}></div>
        <div className={styles.shape}></div>
        <div className={styles.shape}></div>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Create Account</h2>

        {message && <p className={styles.message}>{message}</p>}

        <div className={styles.inputGroup}>
          <input
            type="text"
            name="name"
            placeholder=" "
            value={formData.name}
            onChange={handleChange}
            required
            className={styles.input}
          />
          <label className={styles.label}>Name</label>
        </div>

        <div className={styles.inputGroup}>
          <input
            type="email"
            name="email"
            placeholder=" "
            value={formData.email}
            onChange={handleChange}
            required
            className={styles.input}
          />
          <label className={styles.label}>Email</label>
        </div>

        <div className={styles.inputGroup}>
          <input
            type="password"
            name="password"
            placeholder=" "
            value={formData.password}
            onChange={handleChange}
            required
            className={styles.input}
          />
          <label className={styles.label}>Password</label>
        </div>

        <div className={styles.inputGroup}>
          <input
            type="text"
            name="avatar"
            placeholder=" "
            value={formData.avatar}
            onChange={handleChange}
            className={styles.input}
          />
          <label className={styles.label}>Avatar URL (optional)</label>
        </div>

        <div className={styles.inputGroup}>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="user">User</option>
            <option value="organizer">Organizer</option>
            <option value="admin">Admin</option>
          </select>
          <label className={styles.label}>Role</label>
          <span className={styles.selectArrow}>▼</span>
        </div>

        <button type="submit" disabled={loading} className={styles.button}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
