import React from 'react'
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from 'react-router-dom'
import Home from './pages/Home'
import RootLayout from './layouts/RootLayout'
import { HomeLoader } from './pages/Home'
import styles from "./index.module.css"
function App() {
  const router= createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<RootLayout></RootLayout>}>
      <Route path="/" element={<Home></Home>} loader={HomeLoader}></Route>
    </Route>
  ))
  return (
      
    <div className={styles.container}>
        <RouterProvider router={router}></RouterProvider>   
    </div>
      
  )
}

export default App