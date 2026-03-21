import { BrowserRouter, Route, Routes } from 'react-router'
import Index from './features/index.jsx'
import { useState } from 'react'
import 'react-router'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Index />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
