import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function Navbar({ search, setSearch }) {
  const { cart = [] } = useCart();

  const [shake, setShake] = useState(false);

  const totalQty = cart.reduce(
    (acc, item) => acc + (item.qty || 0),
    0
  );

  useEffect(() => {
    const handleShake = () => {
      setShake(true);
      setTimeout(() => setShake(false), 400);
    };

    window.addEventListener("cart:add", handleShake);
    return () => window.removeEventListener("cart:add", handleShake);
  }, []);

  return (
    <nav className="bg-shopee text-white px-4 md:px-6 py-3 shadow sticky top-0 z-50">
      
      <div className="flex flex-wrap items-center gap-3">

        {/* LOGO */}
        <Link to="/" className="font-bold text-lg">
          LuckyStore
        </Link>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Cari produk..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[150px] px-3 py-2 rounded text-black text-sm md:text-base"
        />

        {/* CART */}
        <Link to="/cart" className="relative text-xl">
          
          <motion.div
            animate={shake ? { rotate: [0, -10, 10, -10, 0] } : {}}
            transition={{ duration: 0.4 }}
          >
            🛒
          </motion.div>

          <AnimatePresence>
            {totalQty > 0 && (
              <motion.span
                key={totalQty}
                initial={{ scale: 0 }}
                animate={{ scale: 1.2 }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="absolute -top-2 -right-2 bg-white text-shopee text-xs px-2 rounded-full font-bold"
              >
                {totalQty}
              </motion.span>
            )}
          </AnimatePresence>

        </Link>

      </div>
    </nav>
  );
}