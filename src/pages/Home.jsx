import { products } from "../data/Products";
import ProductCard from "../components/ProductCard";
import { motion } from "framer-motion";

export default function Home({ search }) {

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-gray-100 min-h-screen p-6"
    >
      
      {/* BANNER */}
      <div className="bg-shopee text-white p-6 rounded-lg mb-6">
        <h1 className="text-2xl font-bold">
          Diskon Besar Hari Ini!!
        </h1>
        <p>Belanja hemat seperti di Shopee!</p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))
        ) : (
          <p className="text-gray-500">Produk tidak ditemukan</p>
        )}
      </div>

    </motion.div>
  );
}