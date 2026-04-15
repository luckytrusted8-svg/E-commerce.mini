import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar({ search, setSearch }) {
  const { cart } = useCart();

  const totalQty = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <nav className="bg-shopee text-white px-6 py-3 shadow sticky top-0 z-50">
      <div className="flex items-center gap-4">

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
          className="flex-1 px-4 py-2 rounded text-black"
        />

        {/* CART */}
        <Link
          to="/cart"
          id="cart-icon" // 🔥 INI YANG PENTING
          className="relative text-xl"
        >
          🛒
          {totalQty > 0 && (
            <span className="absolute -top-2 -right-2 bg-white text-shopee text-xs px-2 rounded-full font-bold">
              {totalQty}
            </span>
          )}
        </Link>

      </div>
    </nav>
  );
}