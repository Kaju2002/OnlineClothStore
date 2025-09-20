import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <main className="min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Add more routes here as needed */}
        {/* <Route path="/about" element={<About />} /> */}
        {/* <Route path="/shop" element={<Shop />} /> */}
        {/* <Route path="/blog" element={<Blog />} /> */}
        {/* <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </main>
  );
}

export default App;
