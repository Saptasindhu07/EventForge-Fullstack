import React, { Suspense } from "react";
import contentStyles from "../css modules/content_pane.module.css";
import styles from "../css modules/home.module.css";
import { Await, useLoaderData } from "react-router-dom";
import EventCard from "../components/EventCard";
import axios from 'axios'
import RightContent from "../components/RightContent";
import RefreshProvider from "../contexts/EventRefreshProvider";
import EventList from "../components/EventList";

export function HomeWrapper() {
  return(<Home></Home>)
}

export async function HomeLoader() {
  
}

export function Home() {
  const name = JSON.parse(localStorage.getItem("user")).name ;
  return (
    <div className={contentStyles.contentContainer}>
      <main className={styles.homeContainer}>
        <div className={styles.welcome}>
          <div className={styles.welcomeContent}>
            <h1>
              Welcome Back, <span>{name}!</span>
            </h1>
            <p>Stay updated with your events and connect with the community.</p>
          </div>
        </div>
        
          
        <div className={styles.mainContent}>
          <EventList></EventList>
          <RightContent></RightContent>
        </div>
        
      </main>
    </div>
  );
}
