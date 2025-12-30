import { useEffect, useState } from "react";
import { HeartOutlined, HeartFilled, EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Card, Button, Row, Col, Spin } from "antd";
import { Link } from "react-router-dom";
import { getWishlist, toggleWishlist, addToCart } from "../store/api/cardApi/cart";
import { useGetProductsQuery } from "../store/api/productApi/product";

const { Meta } = Card;

export const Wishlist = () => {
  const [wishlist, setWishlist] = useState<any[]>([]);
  const { data, isLoading } = useGetProductsQuery();

  const updateWishlist = () => setWishlist(getWishlist());

  useEffect(() => {
    updateWishlist();
    window.addEventListener("storage", updateWishlist);
    return () => window.removeEventListener("storage", updateWishlist);
  }, []);

  const handleRemove = (product: any) => {
    toggleWishlist(product);
    updateWishlist();
  };

  const handleAddToCart = (product: any) => {
    if (!localStorage.getItem("token")) {
      alert("Login required! Please login to add to cart.");
      return;
    }
    addToCart(product);
    alert(`${product.productName} added to cart`);
  };

  if (isLoading) return <Spin size="large" className="flex justify-center mt-20" />;

  const wishlistProducts = data?.data?.products?.filter(p => wishlist.some(w => w.id === p.id));

  if (!wishlistProducts || wishlistProducts.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
        <HeartOutlined style={{ fontSize: 60, color: "#ccc" }} />
        <h2 className="text-2xl font-semibold mt-4">Your Wishlist is empty</h2>
        <p className="text-gray-500 mt-2 mb-4">Add products you like ❤️</p>
        <Link to="/shop">
          <Button type="primary">Go to Shop</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 mt-10">
      <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>
      <Row gutter={[16, 16]}>
        {wishlistProducts.map(product => (
          <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
            <Card
              hoverable
              cover={
                <Link to={`/product/${product.id}`}>
                  <img
                    alt={product.productName}
                    src={`https://store-api.softclub.tj/images/${product.image}`}
                    className="h-56 object-contain p-4"
                  />
                </Link>
              }
              actions={[
                <Button
                  type="text"
                  icon={wishlist.some(w => w.id === product.id) ? <HeartFilled style={{ color: "red" }} /> : <HeartOutlined />}
                  onClick={() => handleRemove(product)}
                />,
                <Link to={`/product/${product.id}`}>
                  <Button type="text" icon={<EyeOutlined />} />
                </Link>,
                <Button type="primary" icon={<ShoppingCartOutlined />} onClick={() => handleAddToCart(product)}>
                  Add to Cart
                </Button>,
              ]}
            >
              <Meta
                title={product.productName}
                description={<span className="text-red-500 font-bold">${product.discountPrice ?? product.price}</span>}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};
