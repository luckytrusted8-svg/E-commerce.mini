import { useParams, useNavigate } from "react-router-dom";
import { products } from "../data/Products";
import { useCart } from "../context/CartContext";
import { useState } from "react";

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = products.find(p => p.id === parseInt(id));
  const [qty, setQty] = useState(1);

  if (!product) {
    return <p className="p-6">Produk tidak ditemukan</p>;
  }

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addToCart(product);
    }
  };

  const handleBuyNow = () => {
    for (let i = 0; i < qty; i++) {
      addToCart(product);
    }
    navigate("/checkout");
  };

  return (

    <div className="bg-gray-100 min-h-screen p-6">
      
      {/* 🔙 BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 inline-flex items-center gap-2 px-4 py-2 bg-white border rounded-lg shadow-sm hover:bg-gray-100 transition"
      >
        ← Kembali
      </button>

      <div className="bg-white rounded-xl p-6 grid md:grid-cols-2 gap-8 shadow">

        {/* 🖼️ GAMBAR */}
        <div>
          <img
            src={product.image}
            className="w-full h-96 object-cover rounded-lg"
          />

          <div className="flex gap-2 mt-3">
            <img className="w-16 h-16 border rounded cursor-pointer" src={product.image} />
            <img className="w-16 h-16 border rounded cursor-pointer" src={product.image} />
            <img className="w-16 h-16 border rounded cursor-pointer" src={product.image} />
          </div>
        </div>

        {/* 🧾 INFO */}
        <div>
          <h1 className="text-2xl font-semibold leading-snug">
            {product.name}
          </h1>

          {/* ⭐ RATING */}
          <p className="text-yellow-500 mt-2 text-sm">
            ⭐⭐⭐⭐☆ (4.5) • 120 Terjual
          </p>

          {/* 💰 HARGA */}
          <p className="text-shopee text-3xl font-bold mt-3">
            Rp {(product.price || 0).toLocaleString()}
          </p>

          {/* 📦 INFO */}
          <div className="mt-4 text-sm text-gray-600 space-y-1">
            <p>Stok: 25</p>
            <p>Kategori: Fashion</p>
            <p>Pengiriman: 2-3 hari</p>
          </div>

          {/* 🔢 QUANTITY */}
          <div className="mt-6">
            <p className="mb-2 text-sm">Jumlah</p>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                -
              </button>

              <span>{qty}</span>

              <button
                onClick={() => setQty(qty + 1)}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                +
              </button>
            </div>
          </div>

          {/* 🛒 BUTTON */}
          <div className="mt-6 flex gap-3">
            <button
              onClick={handleAddToCart}
              className="bg-shopee text-white px-6 py-3 rounded-lg hover:bg-shopee-dark transition"
            >
              + Masukkan Keranjang
            </button>

            <button
            onClick={handleBuyNow}
            className="border border-shopee text-shopee px-6 py-3 rounded-lg hover:bg-orange-50 transition"
          >
            Beli Sekarang
          </button>
          </div>

          {/* 🧾 DESKRIPSI */}
          <div className="mt-8">
            <h2 className="font-semibold mb-2">Deskripsi Produk</h2>
            <p className="text-gray-600 text-sm">
              Produk ini dibuat dengan bahan berkualitas tinggi dan desain modern.
              Cocok untuk digunakan sehari-hari maupun acara spesial. 
              Nyaman, stylish, dan tahan lama 🔥
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}