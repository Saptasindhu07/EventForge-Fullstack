import React from 'react'
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from 'react-router-dom'
import {Home} from './pages/Home'
import { HomeWrapper } from './pages/Home'
import RootLayout from './layouts/RootLayout'
import { HomeLoader } from './pages/Home'
import styles from "./index.module.css"
import RegisterPage from './pages/Register'
import LoginPage from './pages/Login'
function App() {
  const router= createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<RootLayout></RootLayout>}>
      <Route path="/" element={<HomeWrapper></HomeWrapper>} loader={HomeLoader}></Route>
      <Route path="/register" element={<RegisterPage></RegisterPage>}></Route>
      <Route path="/login" element={<LoginPage></LoginPage>}></Route>
    </Route>
  ))
  return (
      
    <div className={styles.container}>
        <RouterProvider router={router}></RouterProvider>   
    </div>
      
  )
}

export default App