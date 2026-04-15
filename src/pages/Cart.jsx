import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart = [], removeFromCart, increaseQty, decreaseQty } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce(
    (acc, item) => acc + (item.price || 0) * (item.qty || 0),
    0
  );

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      
      {/* 🔙 BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 inline-flex items-center gap-2 px-4 py-2 bg-white border rounded-lg shadow-sm hover:bg-gray-100 transition"
      >
        ← Kembali
      </button>

      <h1 className="text-xl font-bold mb-4">
        Keranjang Saya
      </h1>

      {/* LIST PRODUK */}
      <div className="space-y-3">
        {cart.length === 0 ? (
          <div className="bg-white p-6 rounded text-center text-gray-500">
            Keranjang kosong 🛒
          </div>
        ) : (
          cart.map(item => (
            <div
              key={item.id}
              className="bg-white p-4 rounded flex justify-between items-center shadow-sm hover:shadow transition"
            >
              {/* INFO */}
              <div>
                <h3 className="text-sm font-medium">{item.name}</h3>
                <p className="text-shopee font-bold">
                  Rp {(item.price || 0).toLocaleString()}
                </p>
              </div>

              {/* QTY */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => decreaseQty(item.id)}
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  -
                </button>

                <span>{item.qty || 0}</span>

                <button
                  onClick={() => increaseQty(item.id)}
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  +
                </button>
              </div>

              {/* HAPUS */}
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 text-sm hover:underline"
              >
                Hapus
              </button>
            </div>
          ))
        )}
      </div>

      {/* TOTAL */}
      {cart.length > 0 && (
        <div className="mt-6 bg-white p-4 rounded shadow">
          <h2 className="font-bold text-lg">
            Total: Rp {total.toLocaleString()}
          </h2>

          <Link to="/checkout">
            <button className="mt-3 w-full bg-shopee text-white py-2 rounded hover:bg-shopee-dark transition">
              Checkout
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}