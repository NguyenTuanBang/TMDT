import React, { useEffect, useState } from "react";
import CarouselCardAntd from "../Comp/ProductCard";
import { Pagination, Carousel } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HomePage = ({ user, tagFilter }) => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);

    const [mostFavourite, setMostFavourite] = useState([]);
    const [topRating, setTopRating] = useState([]);

    const handlePageChange = (page) => setCurrentPage(page);

    useEffect(() => {
        const fetchMostFavourite = async () => {
            const response = await axios.get(
                "http://localhost:8080/products/most-favourite"
            );
            setMostFavourite(response.data.data);
        };
    
        const fetchTopRating = async () => {
            const response = await axios.get(
                "http://localhost:8080/products/top-rating"
            );
            setTopRating(response.data.data);
        };
        const fetchData = async () => {
            const response = await axios.get(
                `http://localhost:8080/products?page=${currentPage}`
            );
            setData(response.data.data);
            setTotal(response.data.numberOfPages);
        };


        fetchData();
        fetchMostFavourite();
        fetchTopRating();
    }, [currentPage]);

    const handleOnclick = () => {
        navigate('/listProduct');
    };
    return (
        <>
            <div
                className="container1 w-full"
                style={{ margin: "0 auto", padding: 20, background: "#f0f2f5" }}
            >
                <div className="banner">{/* <Carousel autoplay></Carousel> */}</div>

                <h1 className="text-4xl font-bold text-center mb-5 mt-10">
                    Sản phẩm được mua nhiều nhất
                </h1>
                <Carousel dots={true} slidesToShow={5} slidesToScroll={1}>
                    {mostFavourite.map((item, i) => (
                        <div key={i} style={{ padding: "0 10px" }}>
                            <CarouselCardAntd data={item} />
                        </div>
                    ))}
                </Carousel>

                {/* Sản phẩm được yêu thích nhất */}
                <h1 className="text-4xl font-bold text-center mb-5 mt-10">
                    Sản phẩm được yêu thích nhất
                </h1>
                <Carousel dots={true} slidesToShow={5} slidesToScroll={1}>
                    {topRating.map((item, i) => (
                        <div key={i} style={{ padding: "0 10px" }}>
                            <CarouselCardAntd data={item} />
                        </div>
                    ))}
                </Carousel>
                {/* Sản phẩm nổi bật */}
                <h1 className="text-6xl font-bold text-center mb-5 mt-5">
                    Sản phẩm nổi bật
                </h1>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(6, 1fr)",
                        gap: 20,
                        background: "#f0f2f5",
                        padding: 20,
                        width: "100%",
                    }}
                >
                    {data.map((item, i) => (
                        <CarouselCardAntd key={i} data={item} />
                    ))}
                </div>
                <div
                    style={{ display: "flex", justifyContent: "center", marginTop: 32 }}
                >
                    {/* <Pagination
                        current={currentPage}
                        pageSize={pageSize}
                        total={total}
                        onChange={handlePageChange}
                        showSizeChanger={false}
                    /> */}
                    <button className="text-red-500" onClick={handleOnclick}>Xem thêm</button>
                </div>

                {/* Sản phẩm được mua nhiều nhất */}
            </div>
        </>
    );
};

export default HomePage;
