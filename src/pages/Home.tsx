import { useEffect, useState } from "react";
import { Card, Button, Row, Col, Spin, Badge } from "antd";
import { HeartOutlined, HeartFilled, EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../store/api/productApi/product";
import { addToCart, toggleWishlist, getWishlist } from "../store/api/cardApi/cart";
import type { Product } from "../store/api/cardApi/types";

const { Meta } = Card;

export const Home: React.FC = () => {
  const { data, isLoading } = useGetProductsQuery();
  const [wishlist, setWishlist] = useState<Product[]>([]);

  useEffect(() => {
    setWishlist(getWishlist());
  }, []);

  const handleWishlist = (product: Product) => {
    const updated = toggleWishlist(product);
    setWishlist(updated);
  };

  const handleAddToCart = (product: Product) => {
    if (!localStorage.getItem("token")) {
      alert("Login required! Please login to add to cart.");
      return;
    }
    addToCart(product);
    alert(`${product.productName} added to cart`);
  };

  if (isLoading) return <Spin size="large" className="flex justify-center mt-20" />;

  return (
    <div className="max-w-7xl mx-auto px-4 mt-10">
      <Row gutter={[16, 16]}>
        {data?.data?.products?.map((item: Product) => {
          const isWishlisted = wishlist.some(p => p.id === item.id);
          return (
            <Col xs={24} sm={12} md={8} lg={6} key={item.id}>
              <Badge.Ribbon
                text="NEW"
                color="green"
                style={{ display: item.discountPrice ? "block" : "none" }}
              >
                <Card
                  hoverable
                  cover={
                    <Link to={`/product/${item.id}`}>
                      <img
                        alt={item.productName}
                        src={`https://store-api.softclub.tj/images/${item.image}`}
                        style={{ height: 220, objectFit: "contain", padding: 16 }}
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
                    description={
                      <span className="text-red-500 font-bold">
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

      <div className="flex justify-center mt-10">
        <Link to="/shop">
          <Button type="default" size="large">
            All Products
          </Button>
        </Link>
      </div>
    </div>
  );
};
