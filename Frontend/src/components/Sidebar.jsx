import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import styles from '../css modules/navbar.module.css'
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
import { useNav } from '../contexts/NavbarProvider'
import info from "../assets/info.png"
import info_white from "../assets/info_white.png"
import { useNavigate } from 'react-router-dom'
function Sidebar() {
    const {selected,dispatch}=useNav()
    const navigate= useNavigate()
    return (
    <aside className={styles.sidebar}>
        <div className={styles.sidebarTop}>
            <div className={selected=="home"?styles.sidebarImgContainer: styles.sidebarImgContainerWhite} onClick={()=>{
                dispatch({type:"home"})
                navigate('/')
            }}>
                <img className={styles.sidebarImg} src={selected=="home" ? home2 : home}></img>
            </div>
            <div className={selected=="calendar"?styles.sidebarImgContainer: styles.sidebarImgContainerWhite} onClick={()=>{dispatch({type:"calendar"})}}>
                <img className={styles.sidebarImg} src={selected=="calendar"?calendar_white:calendar}></img>
            </div>
            <div className={selected=="message"?styles.sidebarImgContainer: styles.sidebarImgContainerWhite} onClick={()=>{
                dispatch({type:"message"}) 
                navigate('/chat')
            }}>
                <img className={styles.sidebarImg} src={selected=="message"?message_white:message}></img>
            </div>
            <div className={selected=="attention"?styles.sidebarImgContainer: styles.sidebarImgContainerWhite} onClick={()=>{dispatch({type:"attention"})}}>
                <img className={styles.sidebarImg} src={selected=="attention"?attention_white:attention}></img>
            </div>
        </div>
        <div className={styles.sidebarTail}>
            <div className={selected=="info"?styles.sidebarImgContainer: styles.sidebarImgContainerWhite} onClick={()=>{dispatch({type:"info"})}}>
                <img className={styles.sidebarImg} src={selected=="info" ? info_white : info}></img>
            </div>
        </div>
    </aside>
    )
}

export default Sidebar