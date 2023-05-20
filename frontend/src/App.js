import React from "react"
import { Route, Routes, Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

import About from "./components/About"
import Map from "./components/Map"
import NotFound from "./components/NotFound"

function App() {
  return (
    <>
      <nav>
        <ul>
          <li><Link to={"/map"}>Map</Link></li>
          <li><Link to={"/about"}>About</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Map />} />
        <Route path="/map" element={<Map />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;