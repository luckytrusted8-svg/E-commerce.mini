import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Detail from "./pages/Detail"; // ✅ TAMBAHAN
import Navbar from "./components/Navbar";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";

import { CartProvider } from "./context/CartContext";

function App() {
  const [search, setSearch] = useState("");

  return (
    <CartProvider>
      <BrowserRouter>
        
        <Navbar search={search} setSearch={setSearch} />

        <Routes>
          <Route path="/" element={<Home search={search} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<Detail />} /> {/* ✅ TAMBAHAN */}
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<Success />} />
        </Routes>

      </BrowserRouter>
    </CartProvider>
  );
}

export default App;