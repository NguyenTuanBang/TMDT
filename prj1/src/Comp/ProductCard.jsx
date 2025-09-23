import React from "react";
import { Card, Carousel, Button, Typography, Row } from "antd";
import { StarFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";  // ✅ đúng hook
import formatCurrency from "../hooks/useCurrency";

const { Title, Text, Paragraph } = Typography;



const CarouselCardAntd = ({data}) => {
  const navigate = useNavigate(); // ✅ tạo instance
  const images = data.images || ["https://picsum.photos/600/400?random=1"]; // giả sử data có trường images là mảng URL ảnh
  const handleClick = () => {
    navigate(`/product/${data._id}`); // ✅ điều hướng
  };

  return (
    <Card
      hoverable
      style={{ borderRadius: 12, overflow: "hidden" }}
      bodyStyle={{ padding: 20 }}
      onClick={handleClick} // ví dụ click card để điều hướng
    >
      {/* Carousel Section */}
      <Carousel autoplay dots>
        {images.map((src) => (
          <div key={src}>
            <img
              src={src}
              alt="slide"
              style={{
                width: "100%",
                height: 220,
                objectFit: "cover",
                borderRadius: 8,
              }}
            />
          </div>
        ))}
      </Carousel>


      <Row justify="space-between" align="middle" style={{ marginTop: 20 }}>
        <Title level={5} style={{ margin: 0, fontSize: "x-large" }}>
          {data.productName}
        </Title>

        <Row align="middle" gutter={4}>
          <StarFilled style={{ color: "#faad14" }} />
          <Text strong>{data.curRating}</Text>
        </Row>
      </Row>


      <Paragraph type="first" style={{ marginTop: 10 }}>
        {data.description}
      </Paragraph>
      <Paragraph type="first" style={{ marginTop: 10 }} className="font-semibold">
        {data.store.storeName}
      </Paragraph>

      {/* Price + Button */}
      <Row justify="space-between" align="middle" style={{ marginTop: 16 }}>
        <div>
          <Title
            level={4}
            style={{
              margin: 0,
              display: "inline",
              color: "#1677ff",
            }}
          >
            {formatCurrency(data.price)} VNĐ
          </Title>
        </div>
        <div>
          <Title
            level={4}
            style={{
              margin: 0,
              display: "inline",
              color: "#1677ff",
              fontSize: "medium"
            }}
          >
            {data.store.area.name}
          </Title>
        </div>
        
      </Row>
        <Button type="primary" shape="round" onClick={handleClick} style={{ marginTop: 10, width: '100%' }}>
          Mua ngay
        </Button>
    </Card>
  );
};

export default CarouselCardAntd;
