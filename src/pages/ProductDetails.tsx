import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShoppingCartOutlined, ZoomInOutlined, HeartOutlined, HeartFilled } from "@ant-design/icons";
import { Button, message, Select } from "antd";
import imgl from "../assets/Cart1.png";
import { addToCart, toggleWishlist, getWishlist } from "../store/api/cardApi/cart";
import type { Product as ProductType } from "../store/api/cardApi/types";

interface Image {
  id: number;
  images: string;
}

interface Product {
  id: number;
  productName: string;
  description?: string;
  price: number;
  discountPrice?: number;
  image: string;
  images: Image[];
  category?: string;
}

const { Option } = Select;
const fallbackImages = [imgl, imgl];

const colorSwatches = [
  { name: "Black Titanium", hex: "#1c1c1e" },
  { name: "White Titanium", hex: "#f5f5f7" },
  { name: "Blue Titanium", hex: "#3b4252" },
  { name: "Natural Titanium", hex: "#8e8e93" },
];

const ProductDetails = () => {
  const { id } = useParams<{ id?: string }>();
  if (!id) return <p className="text-center mt-20">Product ID is missing</p>;
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [wishlistIds, setWishlistIds] = useState<number[]>([]);
  const [search, setSearch] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");

  async function fetchProduct() {
    try {
      const { data } = await axios.get(
        `https://store-api.softclub.tj/Product/get-product-by-id?id=${id}`
      );
      setProduct(data.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  }

  useEffect(() => {
    fetchProduct();
    setWishlistIds(getWishlist().map(p => p.id));
  }, [id]);

  if (!product) return <p className="text-center mt-20">Loading...</p>;

  const images =
    product.images?.length
      ? product.images.map((img) => `https://store-api.softclub.tj/images/${img.images}`)
      : fallbackImages;

  const filteredImages = images.filter((img) => {
    const matchesSearch = product.productName.toLowerCase().includes(search.toLowerCase());
    const price = product.discountPrice ?? product.price;
    let matchesPrice = true;
    if (priceFilter === "low") matchesPrice = price < 50;
    if (priceFilter === "medium") matchesPrice = price >= 50 && price <= 200;
    if (priceFilter === "high") matchesPrice = price > 200;
    return matchesSearch && matchesPrice;
  });

  const currentImage = filteredImages[selectedImageIndex] || filteredImages[0];

  const handleAddToCart = () => {
    if (!localStorage.getItem("token")) {
      message.warning("Login required to add to cart!");
      return;
    }
    if (product) {
      addToCart(product as ProductType);
      message.success(`${product.productName} added to cart`);
      window.dispatchEvent(new Event("storage"));
    }
  };

  const handleWishlist = () => {
    if (product) {
      toggleWishlist(product as ProductType);
      setWishlistIds(getWishlist().map(p => p.id));
      window.dispatchEvent(new Event("storage"));
    }
  };

  const isWishlisted = product ? wishlistIds.includes(product.id) : false;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 lg:px-20">
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
        <Select
          value={priceFilter}
          onChange={(value) => setPriceFilter(value)}
          className="w-full md:w-1/4"
        >
          <Option value="all">All Prices</Option>
          <Option value="low">Under $50</Option>
          <Option value="medium">$50 - $200</Option>
          <Option value="high">Above $200</Option>
        </Select>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg">
            <img
              src={currentImage}
              alt={product.productName}
              className="w-full h-auto object-contain"
            />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4">
              <span className="bg-gray-700/50 text-white px-3 py-1 rounded-full text-sm">
                {selectedImageIndex + 1} / {filteredImages.length}
              </span>
              <Button
                type="default"
                shape="circle"
                icon={<ZoomInOutlined />}
                className="bg-gray-700/50 border-none hover:bg-gray-600/60"
              />
            </div>
          </div>
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            {filteredImages.map((img, idx) => (
              <div
                key={idx}
                className={`w-16 h-16 rounded-lg border cursor-pointer transition-all ${
                  idx === selectedImageIndex ? "border-purple-500 scale-105" : "border-gray-300"
                }`}
                onClick={() => setSelectedImageIndex(idx)}
              >
                <img src={img} alt="" className="w-full h-full object-cover rounded-lg" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.productName}</h1>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <p className="text-red-500 text-2xl font-semibold mb-6">
              ${product.discountPrice ?? product.price}
            </p>

            <div className="mb-8">
              <p className="text-lg text-gray-700 mb-3">Color</p>
              <div className="flex gap-4">
                {colorSwatches.map((color, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedColor(idx)}
                    className={`w-12 h-12 rounded-full border-4 cursor-pointer transition-all ${
                      idx === selectedColor ? "border-purple-500 scale-110" : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>
              <p className="mt-2 text-gray-600">{colorSwatches[selectedColor].name}</p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Button
              size="large"
              icon={<ShoppingCartOutlined />}
              className="w-full bg-purple-600 text-white hover:bg-purple-500 rounded-full py-4 text-xl font-semibold shadow-lg"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>

            <Button
              size="large"
              icon={isWishlisted ? <HeartFilled style={{ color: "red" }} /> : <HeartOutlined />}
              className="w-full border-purple-600 text-purple-600 hover:bg-purple-50 rounded-full py-4 text-xl font-semibold"
              onClick={handleWishlist}
            >
              {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
