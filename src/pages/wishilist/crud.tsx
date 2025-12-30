import { Link } from "react-router-dom";
import { Card, Button, Row, Col } from "antd";
import { EyeOutlined, HeartFilled, HeartOutlined } from "@ant-design/icons";
import { addToCart, getWishlist, toggleWishlist } from "../../store/api/cardApi/cart";
import type { Product } from "../../store/api/cardApi/types";

const { Meta } = Card;

interface Props {
  products: Product[];
}

export const ProductGrid: React.FC<Props> = ({ products }) => {
  const wishlist = getWishlist();

  return (
    <Row gutter={[16, 16]}>
      {products.map((item) => {
        const isWishlisted = wishlist.some(p => p.id === item.id);

        return (
          <Col xs={24} sm={12} md={8} lg={6} key={item.id}>
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
                  onClick={() => toggleWishlist(item)}
                />,
                <Link to={`/product/${item.id}`}>
                  <Button type="text" icon={<EyeOutlined />} />
                </Link>,
                <Button type="primary" onClick={() => addToCart(item)}>
                  Add to Cart
                </Button>,
              ]}
            >
              <Meta
                title={item.productName}
                description={<span className="text-red-500 font-bold">${item.discountPrice ?? item.price}</span>}
              />
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};
