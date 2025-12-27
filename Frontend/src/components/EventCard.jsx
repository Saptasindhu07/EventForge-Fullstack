import React, { useState } from "react";
import styles from "../css modules/EventCard.module.css";

const EventCard = ({
  _id,
  title,
  subtitle = "",
  date,
  location,
  venue,
  img,
  description,
  price = 0,
  capacity,
  category,
  organizer,
  isPublic = true,
}) => {
  const [isDeciding, setIsDeciding] = useState(false);
  function onClick(){
    setIsDeciding(true)
  }
  async function onJoin(){
    const res= await fetch('http://localhost:8000/addAttendee',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          _id: _id,
          userId: JSON.parse(localStorage.getItem('user'))._id
        }
      )
    })
    const res2= await fetch('http://localhost:8000/eventJoined',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          eventId:_id,
          userId: JSON.parse(localStorage.getItem('user'))._id
        }
      )
    })

    if(!res.ok || !res2.ok){
      alert("Connection error. Event not joined")
    }
    else{
      alert("Event Joined successfully!")
    }
  }
  function onClose(){
    setIsDeciding(false)
  }
  function Output() {
    if (isDeciding) {
      return (
        <div className={styles.overlayContainer}>
          <div className={styles.dialog}>
            <h2 className={styles.title}>Join Event?</h2>
            <p className={styles.message}>
              Are you ready to dive into this exclusive experience?
            </p>
            <div className={styles.buttons}>
              <button
                className={`${styles.btn} ${styles.btnJoin}`}
                onClick={() => {
                  onJoin();
                  onClose();
                }}
              >
                Join Event
              </button>
              <button
                className={`${styles.btn} ${styles.btnCancel}`}
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
  return (
    <div>
      <Output></Output>
      <div className={styles.card} onClick={onClick}>
        <div className={styles.header}>
          <div className={styles.titleSection}>
            <h2 className={styles.title}>{title}</h2>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}

            <div className={styles.infoRow}>
              <div className={styles.infoItem}>
                <span className={styles.icon}>📅</span>
                <span>{date}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.icon}>📍</span>
                <span>{location}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.icon}>🏛️</span>
                <span>{venue}</span>
              </div>
            </div>
          </div>

          <div className={styles.imageContainer}>
            <img src={img} alt="Event" className={styles.eventImage} />
          </div>
        </div>

        <div className={styles.body}>
          <p className={styles.description}>{description}</p>

          <div className={styles.footer}>
            <div className={styles.footerItem}>
              <span className={styles.label}>Price</span>
              <span>{price === 0 ? "Free" : `$${price}`}</span>
            </div>

            <div className={styles.footerItem}>
              <span className={styles.label}>Capacity</span>
              <span>{capacity}</span>
            </div>

            <div className={styles.footerItem}>
              <span className={styles.badge}>{category}</span>
            </div>

            <div className={styles.footerItem}>
              <span className={styles.label}>Organizer</span>
              <span>{organizer}</span>
            </div>

            {!isPublic && (
              <div className={styles.footerItem}>
                <span className={styles.badgePrivate}>Private</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
