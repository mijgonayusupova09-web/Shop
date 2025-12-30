import { useEffect, useState } from "react";
import { Card, Button, Row, Col, Spin, Badge } from "antd";
import { HeartOutlined, HeartFilled, EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../store/api/productApi/product";
import { addToCart, toggleWishlist, getWishlist } from "../store/api/cardApi/cart";
import type { Product } from "../store/api/cardApi/types";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import bannerImage from "../assets/swaiper.jpg";
import { Loader } from "../components/layout/ui/Loader";

const { Meta } = Card;

export const Home = () => {
  const { data, isLoading } = useGetProductsQuery();
  const [wishlistIds, setWishlistIds] = useState<number[]>([]);

  useEffect(() => {
    setWishlistIds(getWishlist().map(p => p.id));
  }, []);

  const handleWishlist = (product: Product) => {
    toggleWishlist(product);
    setWishlistIds(getWishlist().map(p => p.id));
    window.dispatchEvent(new Event("storage")); 
  };

  const handleAddToCart = (product: Product) => {
    if (!localStorage.getItem("token")) {
      alert("Login required! Please login to add to cart.");
      return;
    }
    addToCart(product);
    alert(`${product.productName} added to cart`);
    window.dispatchEvent(new Event("storage"));
  };

  if (isLoading) return <Spin size="large" className="flex justify-center mt-20" />;

  return (
    <div className="max-w-7xl mx-auto px-4 mt-10">

      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        className="mb-10 rounded-lg overflow-hidden"
      >
        {[1, 2, 3].map((i) => (
          <SwiperSlide key={i}>
            <div className="relative w-full h-64 md:h-96">
              <img
                src={bannerImage}
                alt={`Banner ${i}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-5 left-5 bg-blue-700 bg-opacity-80 text-white p-4 rounded">
                <h2 className="text-lg md:text-2xl font-bold">
                  {i === 1 && "The future of mobile is the future of everything"}
                  {i === 2 && "Discover our latest products"}
                  {i === 3 && "Exclusive deals this season"}
                </h2>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Row gutter={[16, 16]}>
        {data?.data?.products?.map((item: Product) => {
          const isWishlisted = wishlistIds.includes(item.id);

          return (
            <Col xs={24} sm={12} md={8} lg={6} key={item.id}>
              <Badge.Ribbon
                text={item.discountPrice ? "SALE" : "NEW"}
                color={item.discountPrice ? "red" : "green"}
              >
                <Card
                  hoverable
                  cover={
                    <Link to={`/product/${item.id}`}>
                      <img
                        alt={item.productName}
                        src={`https://store-api.softclub.tj/images/${item.image}`}
                        className="h-56 object-contain p-4"
                      />
                    </Link>
                  }
                  actions={[
                    <Button
                      type="text"
                      icon={isWishlisted ? <HeartFilled style={{ color: "red" }} /> : <HeartOutlined />}
                      onClick={() => handleWishlist(item)}
                    />,
                    <Link to={`/product/${item.id}`}>
                      <Button type="text" icon={<EyeOutlined />} />
                    </Link>,
                    <Button type="primary" onClick={() => handleAddToCart(item)}>
                      Add to Cart
                    </Button>,
                  ]}
                >
                  <Meta
                    title={item.productName}
                    description={<span className="text-red-500 font-bold">${item.discountPrice ?? item.price}</span>}
                  />
                </Card>
              </Badge.Ribbon>
            </Col>
          );
        })}
      </Row>

      <div className="flex justify-center mt-10">
        <Link to="/shop">
          <Button type="default" size="large">
            All Products
          </Button>
        </Link>
      </div>

      <Loader />
    </div>
  );
};
