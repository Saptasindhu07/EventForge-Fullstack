import React, { useState } from 'react'
import styles from '../css modules/home.module.css'
import CreateEventForm from './CreateEventForm'
function RightContent() {
    const [state, setState]= useState('My Events')
    return (
    <div className={styles.rightContent}>
        <div className={styles.rightContentNav}>
            <div className={`${styles.rightContentNavElement} ${state=='My Events' ? styles.rightContentNavSelected : ""}`} onClick={()=>{setState('My Events')}}>My Events</div>
            <div className={`${styles.rightContentNavElement} ${state=='Create Event' ? styles.rightContentNavSelected : ""}`} onClick={()=>{setState('Create Event')}}>Create Event</div>
            <div className={`${styles.rightContentNavElement} ${state=='Forum' ? styles.rightContentNavSelected : ""}`} onClick={()=>{setState('Forum')}}>Forum</div>
            <div className={`${styles.rightContentNavElement} ${state=='For You' ? styles.rightContentNavSelected : ""}`} onClick={()=>{setState('For You')}}>For You</div>
        </div>
        <div className={styles.rightMainContent}>
            {`${state=='My Events'? "My Events":""}`}
            {state=='Create Event' && <CreateEventForm organizerId={JSON.parse(localStorage.getItem('user'))._id}></CreateEventForm>}
            {`${state=='Forum'? "Forum":""}`}
            {`${state=='For You'? "For You":""}`}
        </div>
    </div>
    )
}

export default RightContent