import { BrowserRouter, Route, Routes } from 'react-router'
import About from './features/about/pages/homepage'
import { useState } from 'react'
import 'react-router'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<About />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
