import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RegisterPage from "./pages/Register";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import ShopPage from "./pages/Product";
import ProductDetail from "./pages/ProductDetail";
function App() {
  return (
    <div className="min-h-screen px-4 md:px-16 flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Add more routes here as needed */}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
