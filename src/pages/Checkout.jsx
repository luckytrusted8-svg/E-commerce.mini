import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const total = cart.reduce(
    (acc, item) => acc + (item.price || 0) * (item.qty || 0),
    0
  );

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckout = () => {
  if (!form.name || !form.address || !form.phone) {
    alert("Isi semua data dulu!");
    return;
  }

  if (!cart || cart.length === 0) {
    alert("Keranjang kosong!");
    return;
  }

  try {
    clearCart();
    navigate("/success");
  } catch (err) {
    console.error(err);
    alert("Terjadi error saat checkout");
  }
};

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      
      {/* 🔙 BACK BUTTON (FIX RAPIH) */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-white border rounded-lg shadow-sm hover:bg-gray-100 transition"
      >
        ← Kembali
      </button>

      {/* GRID */}
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* FORM */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-bold mb-4">
            Alamat Pengiriman
          </h2>

          <input
            type="text"
            name="name"
            placeholder="Nama Lengkap"
            value={form.name}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
          />

          <input
            type="text"
            name="phone"
            placeholder="Nomor HP"
            value={form.phone}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
          />

          <textarea
            name="address"
            placeholder="Alamat Lengkap"
            value={form.address}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
          />
        </div>

        {/* RINGKASAN */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-bold mb-4">
            Ringkasan Pesanan
          </h2>

          {cart.length === 0 ? (
            <p className="text-gray-500">Keranjang kosong</p>
          ) : (
            <div className="space-y-3">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.name} x{item.qty}
                  </span>
                  <span>
                    Rp {((item.price || 0) * (item.qty || 0)).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          )}

          <hr className="my-4" />

          <h3 className="font-bold text-lg">
            Total: Rp {total.toLocaleString()}
          </h3>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={handleCheckout}
            className="mt-4 w-full bg-shopee text-white py-2 rounded-lg hover:bg-shopee-dark transition"
          >
            Bayar Sekarang
          </motion.button>
        </div>

      </div>
    </div>
  );
}