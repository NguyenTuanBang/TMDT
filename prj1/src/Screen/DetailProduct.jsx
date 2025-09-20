import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Carousel } from "antd";
import { StarFilled } from "@ant-design/icons";
import { Typography } from "antd";
const { Text } = Typography;

const ProductDetail = ({user}) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/products/${id}`);
        setProduct(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduct();
  }, [id]);
  const handleClick = () => {
    navigate(`/store/${product.store._id}`); // ✅ điều hướng
  };

  // Nếu không có ảnh thì dùng ảnh mặc định
  const images =
    product?.images?.length > 0
      ? product.images
      : ["https://picsum.photos/600/400?random=1"];

  if (!product) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="flex gap-6 p-6">
      <div className="flex-1">
        <Carousel autoplay dots>
          {images.map((src, index) => (
            <div key={index}>
              <img
                src={src}
                alt="slide"
                className="w-full object-cover rounded-xl h-[60vh]"
              />
            </div>
          ))}
        </Carousel>
      </div>

      <div className="flex-1 flex flex-col h-[60vh]">
        <h1 className="text-2xl font-bold mb-20">{product.productName}</h1>
        <label className="text-left font-semibold">Mô tả sản phẩm: </label>
        <p className="text-gray-700 mb-2 text-left" style={{
          fontStyle: "italic",
          color: "#666",
          marginBottom: "20px",
          height: "160px",
          overflowY: "auto",
          lineHeight: "1.6",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}>{product.description}</p>
        <div className="">
          <StarFilled style={{ color: "#faad14" }} />
          <Text strong>{product.curRating}</Text>
        </div>

        <p className="font-semibold text-left mb-20">Cửa hàng: <span onClick={handleClick} style={{ cursor: "pointer", textDecoration: "underline" }}>{product.store?.storeName}</span></p>
        <p className="text-lg font-semibold text-left mb-20">Giá: <span className="text-lg text-blue-500">{product.price}$</span></p>
        {/* <button>{user ? "Thêm vào giỏ hàng" : "Đăng nhập để mua hàng"}</button> */}
        {user ? (
          <button style={{ backgroundColor: "#4CAF50", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px", cursor: "pointer", bottom: "0" }}>Thêm vào giỏ hàng</button>
        ) : (
          <button onClick={() => navigate('/login')} style={{ backgroundColor: "#4CAF50", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px", cursor: "pointer", bottom: "0" }}>Đăng nhập để mua hàng</button>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
