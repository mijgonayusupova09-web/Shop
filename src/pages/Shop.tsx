import { useEffect, useState } from "react";
import { Card, Row, Col, Badge, Radio, Checkbox, Spin, Button } from "antd";
import { HeartOutlined, HeartFilled, EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../store/api/productApi/product";
import { addToCart, toggleWishlist, getWishlist } from "../store/api/cardApi/cart";
import type { Product } from "../store/api/cardApi/types";

const { Meta } = Card;

interface ProductsResponse {
  data: {
    products: Product[];
  };
}

export const Shop = () => {
  const { data, isLoading } = useGetProductsQuery() as { data?: ProductsResponse; isLoading: boolean };
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [brandFilter, setBrandFilter] = useState<string[]>([]);

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

  const categories = ["All", "1", "2", "3"];



  return (
    <div className="max-w-7xl mx-auto mt-10 px-4 flex gap-8">
      <div className="w-[250px]">
        <h3 className="font-semibold mb-2">Categories</h3>
        <Radio.Group
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="flex flex-col gap-2"
        >
          {categories.map((cat) => (
            <Radio.Button key={cat} value={cat} className="mb-1">
              {cat === "All" ? "All" : `Category ${cat}`}
            </Radio.Button>
          ))}
        </Radio.Group>
      </div>

      <div className="flex-1">
        <Row gutter={[16, 16]}>
          {data.data?.products.map((item: Product) => {
            const isWishlisted = wishlist.some((p) => p.id === item.id);
            return (
              <Col xs={24} sm={12} md={8} lg={6} key={item.id}>
                <Badge.Ribbon
                  text={item.price}
                  color={item.discountPrice ? "red" : "green"}
                >
                  <Card
                    hoverable
                    className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden"
                    cover={
                      <div className="relative group">
                        <Link to={`/product/${item.id}`}>
                          <img
                            alt={item.productName}
                            src={`https://store-api.softclub.tj/images/${item.image}`}
                            className="h-56 w-full object-contain p-4 bg-gray-50 group-hover:scale-105 transition-transform duration-300"
                          />
                        </Link>

                        <Button
                          type="primary"
                          onClick={() => handleAddToCart(item)}
                          className="absolute inset-x-1/4 bottom-4 opacity-0 group-hover:opacity-100
                            transition-opacity duration-300 w-1/2 text-center"
                        >
                          Add To Cart
                        </Button>
                      </div>
                    }
                    actions={[
                      <Button
                        type="text"
                        icon={isWishlisted ? <HeartFilled className="text-red-500" /> : <HeartOutlined />}
                        onClick={() => handleWishlist(item)}
                      />,
                      <Link to={`/product/${item.id}`}>
                        <Button type="text" icon={<EyeOutlined />} />
                      </Link>,
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
      </div>
    </div>
  );
};
