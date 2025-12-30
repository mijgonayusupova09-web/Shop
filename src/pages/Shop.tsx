import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../store/api/productApi/product";
import { addToCart, toggleWishlist, getWishlist } from "../store/api/cardApi/cart";
import { Loader } from "../components/layout/ui/Loader";
import type { Product } from "../store/api/cardApi/types";
import imgHeart from "../assets/heart small.png";
import { Eye } from "lucide-react";

export const Shop: React.FC = () => {
  const { data, isLoading } = useGetProductsQuery();
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [brandFilter, setBrandFilter] = useState<string[]>([]);

  // Initial load of wishlist from localStorage
  useEffect(() => {
    setWishlist(getWishlist());
  }, []);

  const handleWishlist = (product: Product) => {
    const updated = toggleWishlist(product);
    setWishlist(updated);
    window.dispatchEvent(new Event("storage"));
  };

  const handleAddToCart = (product: Product) => {
    if (!localStorage.getItem("token")) {
      alert("Login required! Please login to add to cart.");
      return;
    }
    addToCart(product);
    alert(`${product.productName} added to cart`);
  };

  if (isLoading) return <Loader />;

  const filteredProducts = data?.data?.products.filter((p: Product) => {
    const categoryMatch = categoryFilter === "All" || p.categoryId?.toString() === categoryFilter;
    const brandMatch = brandFilter.length === 0 || (p.brand && brandFilter.includes(p.brand));
    return categoryMatch && brandMatch;
  });

  const categories = ["All", "1", "2", "3"]; 
  const brands = ["Apple", "Samsung", "Canon"]; 

  return (
    <div className="w-[95%] mx-auto mt-10 flex gap-8">
      <div className="w-[250px] text-sm">
        <h3 className="font-semibold mb-3">Category</h3>
        <div className="flex flex-col space-y-2">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center gap-2">
              <input
                type="radio"
                name="category"
                value={cat}
                checked={categoryFilter === cat}
                onChange={(e) => setCategoryFilter(e.target.value)}
              />
              {cat === "All" ? "All" : `Category ${cat}`}
            </label>
          ))}
        </div>

        <hr className="my-5" />
        <h3 className="font-semibold mb-3">Brands</h3>
        <div className="flex flex-col space-y-1">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={brandFilter.includes(brand)}
                onChange={(e) => {
                  if (e.target.checked) setBrandFilter([...brandFilter, brand]);
                  else setBrandFilter(brandFilter.filter((b) => b !== brand));
                }}
              />
              {brand}
            </label>
          ))}
        </div>
      </div>

      <div className="flex-1">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredProducts?.map((item: Product) => {
            const isWishlisted = wishlist.some((p) => p.id === item.id);
            return (
              <motion.div
                key={item.id}
                whileHover={{ y: -5 }}
                className="group relative border p-4 rounded"
              >
                <div className="relative">
                
                  <button
                    onClick={() => handleWishlist(item)}
                    className={`absolute top-2 right-2 transition-colors duration-200 ${
                      isWishlisted ? "text-red-500" : "text-white"
                    }`}
                  >
                    <img src={imgHeart} alt="wishlist" />
                  </button>

                  {/* Product Image */}
                  <Link to={`/product/${item.id}`}>
                    <img
                      src={`https://store-api.softclub.tj/images/${item.image}`}
                      className="h-36 mx-auto group-hover:scale-110 transition-transform duration-200"
                    />
                  </Link>

                  {/* Eye icon */}
                  <Link to={`/product/${item.id}`} className="absolute top-2 left-2 text-black">
                    <Eye />
                  </Link>

                  {/* Add to Cart */}
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="absolute inset-0 opacity-0 group-hover:opacity-100
                      bg-black text-white rounded px-4 py-2 m-auto h-fit transition-opacity duration-200"
                  >
                    Add To Cart
                  </button>
                </div>

                <p className="mt-2 font-medium">{item.productName}</p>
                <span className="text-red-500 font-bold">
                  ${item.discountPrice ?? item.price}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
