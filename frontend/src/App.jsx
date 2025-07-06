import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminSignup from './components/AdminSignup'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/AdminSignup" element={<AdminSignup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
