import { useEffect, useState } from "react";
import { Card, Button, Row, Col, Spin, Badge, Modal } from "antd";
import { HeartOutlined, HeartFilled, EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
    else setIsModalVisible(true);
  }, [navigate]);

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
      Modal.warning({
        title: "Login required",
        content: "Please login to add products to cart",
        okText: "Go to Login",
        onOk: () => navigate("/login"),
      });
      return;
    }
    addToCart(product);
  };

  if (isLoading)
    return <Spin size="large" className="flex justify-center mt-20" />;

  return (
    <div className="max-w-7xl mx-auto px-4 mt-10">
      {/* ===== Banner ===== */}
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        loop
        className="mb-12 rounded-2xl overflow-hidden shadow-lg"
      >
        {[1, 2, 3].map(i => (
          <SwiperSlide key={i}>
            <div className="relative h-64 md:h-96">
              <img src={bannerImage} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30 flex items-end p-6">
                <h2 className="text-white text-xl md:text-3xl font-bold">
                  {i === 1 && "The future of mobile"}
                  {i === 2 && "Discover new arrivals"}
                  {i === 3 && "Hot deals this season"}
                </h2>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ===== Products ===== */}
      <Row gutter={[24, 24]}>
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
                  className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                  cover={
                    <Link to={`/product/${item.id}`}>
                      <div className="relative group bg-gray-50">
                        <img
                          src={`https://store-api.softclub.tj/images/${item.image}`}
                          className="h-56 w-full object-contain p-6 transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                    </Link>
                  }
                  actions={[
                    <Button
                      type="text"
                      icon={
                        isWishlisted ? (
                          <HeartFilled style={{ color: "red" }} />
                        ) : (
                          <HeartOutlined />
                        )
                      }
                      onClick={() => handleWishlist(item)}
                    />,
                    <Link to={`/product/${item.id}`}>
                      <Button type="text" icon={<EyeOutlined />} />
                    </Link>,
                    <Button
                      type="primary"
                      icon={<ShoppingCartOutlined />}
                      className="bg-red-500 hover:bg-red-600"
                      onClick={() => handleAddToCart(item)}
                    >
                      Add
                    </Button>,
                  ]}
                >
                  <Meta
                    title={
                      <span className="font-semibold">
                        {item.productName}
                      </span>
                    }
                    description={
                      <span className="text-red-500 font-bold text-lg">
                        ${item.discountPrice ?? item.price}
                      </span>
                    }
                  />
                </Card>
              </Badge.Ribbon>
            </Col>
          );
        })}
      </Row>

      <div className="flex justify-center mt-12">
        <Link to="/shop">
          <Button size="large" className="px-10 rounded-full">
            All Products
          </Button>
        </Link>
      </div>

      <Loader />

      <Modal
        title="Welcome 🎉"
        open={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
      >
        <p>You have successfully logged in!</p>
      </Modal>
    </div>
  );
};
