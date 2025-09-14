import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Carousel } from "antd";

const ProductDetail = () => {
  const { id } = useParams(); // ✅ lấy id từ URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/products/${id}`);
        setProduct(response.data.data); // backend đang trả { message, data }
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduct();
  }, [id]);
  const images = product?.images || [];
  if (!product) return <p>Loading...</p>;

  return (
    <>
      <div>
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
      </div>
      <div style={{ padding: 20 }}>
        <h2>{product.productName}</h2>
        <p>{product.description}</p>
        <p>Giá: {product.price}$</p>
        <p>Cửa hàng: {product.store?.storeName}</p>
      </div>
    </>



  );
};

export default ProductDetail;
