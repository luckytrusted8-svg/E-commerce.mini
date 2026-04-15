import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Success() {
  const navigate = useNavigate();

  // ⏳ AUTO REDIRECT (3 detik)
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      
      <div className="bg-white p-8 rounded-xl shadow text-center max-w-md w-full">

        {/* 🎉 ICON */}
        <div className="text-5xl mb-4">
          🎉
        </div>

        {/* TITLE */}
        <h1 className="text-2xl font-bold text-green-600 mb-2">
          Pembayaran Berhasil!
        </h1>

        {/* DESC */}
        <p className="text-gray-600 mb-6">
          Terima kasih sudah berbelanja 🙌  
          Pesanan kamu sedang diproses.
        </p>

        {/* BUTTON */}
        <button
          onClick={() => navigate("/")}
          className="w-full bg-shopee text-white py-2 rounded-lg hover:bg-shopee-dark transition"
        >
          Kembali ke Home
        </button>

        {/* INFO */}
        <p className="text-xs text-gray-400 mt-4">
          Kamu akan diarahkan otomatis dalam 3 detik...
        </p>

      </div>

    </div>
  );
}