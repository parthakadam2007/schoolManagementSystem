import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from './components/loginForm/AdminLogin'
import StudentLogin from './components/loginForm/StudentLogin'
import TeacherLogin from './components/loginForm/TeacherLogin';
import Home from './components/home'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/" element={<Home />} />
                <Route path="/StudentLogin" element={<StudentLogin />} />
                <Route path="/TeacherLogin" element={<TeacherLogin />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
