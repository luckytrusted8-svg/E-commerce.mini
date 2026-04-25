import { useCart } from "../context/CartContext"; 
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useRef } from "react";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  // 🔥 REF UNTUK GAMBAR
  const imgRef = useRef();

  // 🔥 ANIMASI TERBANG
  const handleAddToCart = (e) => {
    e.preventDefault();

    const img = imgRef.current;
    const cart = document.getElementById("cart-icon");

    if (!img || !cart) {
      addToCart(product); // fallback
      // 🔥 TRIGGER SHAKE CART
      window.dispatchEvent(new Event("cart:add"));
      return;
    }

    const imgRect = img.getBoundingClientRect();
    const cartRect = cart.getBoundingClientRect();

    const flyingImg = img.cloneNode(true);

    flyingImg.style.position = "fixed";
    flyingImg.style.left = imgRect.left + "px";
    flyingImg.style.top = imgRect.top + "px";
    flyingImg.style.width = imgRect.width + "px";
    flyingImg.style.height = imgRect.height + "px";
    flyingImg.style.zIndex = 9999;
    flyingImg.style.transition = "all 0.7s ease-in-out";
    flyingImg.style.borderRadius = "10px";

    document.body.appendChild(flyingImg);

    setTimeout(() => {
      flyingImg.style.left = cartRect.left + "px";
      flyingImg.style.top = cartRect.top + "px";
      flyingImg.style.width = "40px";
      flyingImg.style.height = "40px";
      flyingImg.style.opacity = "0.5";
      flyingImg.style.transform = "scale(0.5)";
    }, 10);

    setTimeout(() => {
      document.body.removeChild(flyingImg);
      addToCart(product);
    }, 700);
  };

  return (
    <Link to={`/product/${product.id}`} className="block">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        className="bg-white rounded-lg border p-3 cursor-pointer hover:shadow-xl transition"
      >
        {/* 🔥 REF DI SINI */}
        <img
          src={product.image}
          className="w-full h-32 sm:h-40 object-cover"
        />

        <h3 className="mt-2 text-xs sm:text-sm line-clamp-2">
          {product.name}
        </h3>

        <p className="text-shopee font-bold text-sm sm:text-base">
          Rp {product.price.toLocaleString()}
        </p>

        <button
          onClick={handleAddToCart}
          className="mt-2 w-full bg-shopee text-white py-1 rounded hover:bg-shopee-dark text-sm"
        >
          + Keranjang
        </button>
      </motion.div>
    </Link>
  );
}