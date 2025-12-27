import React, { useState } from 'react';
import axios from 'axios';
import styles from '../css modules/CreateEventForm.module.css'; // We'll provide CSS below
import { useRefresh } from '../contexts/EventRefreshProvider';
const categories = [
  { _id: "692d71e2e134657e44745f29", name: "Music Festival", icon: "🎵", gradient: "linear-gradient(135deg, #FDBA74 0%, #FD9248 40%, #F9A8D4 100%)" },
  { _id: "692d71e2e134657e44745f2a", name: "Art Workshop", icon: "🎨", gradient: "linear-gradient(180deg, #6EE7B7 0%, #34D399 50%, #A7F3D0 100%)" },
  { _id: "692d71e2e134657e44745f2b", name: "Party", icon: "🎉", gradient: "linear-gradient(135deg, #EC4899 0%, #F43F5E 50%, #FB923C 100%)" }
];

export default function CreateEventForm({ organizerId }) {  // Pass current user _id
  const {state,dispatch} = useRefresh()
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    date: '',
    time: '',
    location: '',
    venue: '',
    img: '',
    description: '',
    price: 0,
    capacity: '',
    gradient: '',
    icon: '',
    category: '',
    isPublic: true
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Cloudinary Upload Widget
  const openCloudinaryWidget = () => {
    if (!window.cloudinary) {
      alert("Cloudinary script not loaded!");
      return;
    }

    window.cloudinary.openUploadWidget(
      {
        cloudName: 'dbpklont6',               // ← Your actual cloud name
        uploadPreset: 'eventforge_unsigned',    // ← Your unsigned preset name
        folder: 'eventforge',
        cropping: true,
        multiple: false,
        sources: ['local', 'url', 'camera'],
        styles: {
          palette: {
            window: "#1E293B",
            sourceBg: "#0F172A",
            windowBorder: "#60A5FA",
            tabIcon: "#60A5FA",
            inactiveTabIcon: "#CBD5E1",
            textDark: "#000000",
            link: "#60A5FA"
          },
          fonts: { default: null, "'Poppins', sans-serif": "https://fonts.googleapis.com/css?family=Poppins" }
        }
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          setFormData(prev => ({ ...prev, img: result.info.secure_url }));
          setMessage("Image uploaded successfully!");
        }
      }
    );
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCategoryChange = (e) => {
    const selectedCat = categories.find(cat => cat._id === e.target.value);
    setFormData(prev => ({
      ...prev,
      category: selectedCat._id,
      gradient: selectedCat.gradient,
      icon: selectedCat.icon
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    try {
      const res =await axios.post('http://localhost:8000/addEvent', {
        ...formData,
        organizer: organizerId  // ← Current logged-in user ID
      });

      if (res.data.success) {
        
        // Reset form or redirect
        setTimeout(()=>{
          dispatch({type:"refresh"})
          setMessage("Event created successfully! 🎉");
        },1000)
        
      }
    } catch (err) {
      setMessage("Error creating event: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Create New Event</h2>

        <div className={styles.grid}>
          <input type="text" name="title" placeholder="Event Title *" value={formData.title} onChange={handleChange} required className={styles.input} />
          <input type="text" name="subtitle" placeholder="Subtitle" value={formData.subtitle} onChange={handleChange} className={styles.input} />
          
          <select name="category" onChange={handleCategoryChange} value={formData.category} required className={styles.select}>
            <option value="">Select Category *</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat._id}>
                {cat.icon} {cat.name}
              </option>
            ))}
          </select>

          <input type="date" name="date" value={formData.date} onChange={handleChange} required className={styles.input} />
          <input type="time" name="time" value={formData.time} onChange={handleChange} className={styles.input} />
          
          <input type="text" name="location" placeholder="Location *" value={formData.location} onChange={handleChange} required className={styles.input} />
          <input type="text" name="venue" placeholder="Venue (Optional)" value={formData.venue} onChange={handleChange} className={styles.input} />

          <div className={styles.fullWidth}>
            <textarea name="description" placeholder="Description" rows="4" value={formData.description} onChange={handleChange} className={styles.textarea} />
          </div>

          <input type="number" name="price" placeholder="Price (0 = Free)" min="0" value={formData.price} onChange={handleChange} className={styles.input} />
          <input type="number" name="capacity" placeholder="Capacity (Optional)" min="1" value={formData.capacity} onChange={handleChange} className={styles.input} />

          <div className={styles.fullWidth}>
            <button type="button" onClick={openCloudinaryWidget} className={styles.uploadBtn}>
              {formData.img ? "Change Event Image" : "Upload Event Image"}
            </button>
            {formData.img && (
              <div className={styles.preview}>
                <img src={formData.img} alt="Preview" />
                <p>Image ready!</p>
              </div>
            )}
          </div>

          <label className={styles.checkbox}>
            <input type="checkbox" name="isPublic" checked={formData.isPublic} onChange={handleChange} />
            <span>Public Event (Visible to everyone)</span>
          </label>
        </div>

        <button type="submit" disabled={loading} className={styles.submitBtn}>
          {loading ? "Creating Event..." : "Create Event"}
        </button>

        {message && <p className={message.includes("success") ? styles.success : styles.error}>{message}</p>}
      </form>
    </div>
  );
}