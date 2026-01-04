import React from "react";
import styles from "../css modules/chat.module.css"

function ChatGroup({ groupName, img, onClick, isActive = false }) {
  return (
    <div
      onClick={onClick}
      className={`${styles.chatGroup} ${isActive ? styles.active : ''}`}
    >
      <div className={styles.avatarContainer}>
        {img ? (
          <img src={img} alt={groupName} className={styles.avatar} />
        ) : (
          <div className={styles.avatarFallback}>
            {groupName.charAt(0).toUpperCase()}
          </div>
        )}
        <span className={styles.onlineDot}></span>
      </div>

      <div>
        <div className={styles.groupName}>{groupName}</div>
        <div className={styles.subtitle}>Chat Group</div>
      </div>
    </div>
  );
}

export default ChatGroup