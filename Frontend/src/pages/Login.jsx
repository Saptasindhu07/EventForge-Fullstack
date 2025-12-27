// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../css modules/login.module.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Login successful! Redirecting...');
        console.log(data)
        // Optional: Save token if returned
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user))

        setTimeout(() => {
          navigate('/', { replace: true }); // Change to your desired route
        }, 1500);
      } else {
        setMessage(data.message || 'Invalid email or password.');
      }
    } catch (err) {
      console.log(err)
      setMessage('Network error. Please try again later.');
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
        <h2 className={styles.title}>Welcome Back</h2>
        <p className={styles.subtitle}>Log in to continue your journey</p>

        {/* Fixed: No more 'response' reference error */}
        {message && (
          <p className={`${styles.message} ${
            message.includes('successful') || message.includes('Redirecting')
              ? styles.success
              : styles.error
          }`}>
            {message}
          </p>
        )}

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

        <div className={styles.options}>
          <label className={styles.remember}>
            <input type="checkbox" />
            <span className={styles.checkmark}></span>
            Remember me
          </label>
          <a href="/forgot-password" className={styles.forgot}>Forgot password?</a>
        </div>

        <button type="submit" disabled={loading} className={styles.button}>
          {loading ? 'Logging in...' : 'Log In'}
        </button>

        <p className={styles.signup}>
          Don't have an account?{' '}
          <span onClick={() => navigate('/register')} className={styles.signupLink}>
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;