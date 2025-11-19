import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import styles from '../css modules/navbar.module.css'
import content_styles from "../css modules/content_pane.module.css"
import chat from '../assets/chat.jpg'
import notification from '../assets/notification.png'
import setting from "../assets/setting.png"
import user from "../assets/user.png"
import home from "../assets/home.png"
import chat2 from "../assets/chat2.jpg"
import home2 from "../assets/home2.png"
import face from "../assets/face.png"
import face_white from "../assets/face_white.png"
import calendar from "../assets/calendar.png"
import calendar_white from "../assets/calendar_white.png"
import message from "../assets/message.png"
import message_white from "../assets/message_white.png"
import attention from "../assets/attention.png"
import attention_white from "../assets/attention_white.png"
import Sidebar from '../components/Sidebar'
import NavProvider from '../contexts/NavbarProvider'
import style_index from "../index.module.css"
function RootLayout() {
  return (
    <div className={style_index.container_x}>
        <nav className={styles.navbar}>
          <div className={styles.logo}> 
            <img src={chat} className={styles.icon}></img>
            <div className={styles.logoTitle}>EventForge</div>
          </div>
          <div className={styles.search}>
            <input type='text' placeholder='Search' className={styles.searchInput}></input>
          </div>
          <div className={styles.rightNav}>
            <img className={styles.rightNavImages} src={notification}></img>
            <img className={styles.rightNavImages} src={setting}></img>
            <img className={styles.rightNavImages} src={user}></img>
          </div>
        </nav>
        <main className={content_styles.content_pane}>
          <NavProvider><Sidebar></Sidebar></NavProvider>
          <Outlet></Outlet>
        </main>
        
    </div>
    
  )
}

export default RootLayout