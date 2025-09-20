import React from "react";
import CarouselCardAntd from "../Comp/ProductCard";
import { Pagination } from "antd";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const HomePage = ({ user }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const handlePageChange = (page) => setCurrentPage(page);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`http://localhost:8080/products?page=${currentPage}`);
            setData(response.data.data);
            setTotal(response.data.numberOfPages);
        };
        fetchData();
    }, [currentPage]);

    return (
        <>
            <div className="container1 w-full" style={{ margin: "0 auto", padding: 20, background: '#f0f2f5' }}>
                <div className="banner">
                    {/* <Carousel autoplay></Carousel> */}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 20, background: '#f0f2f5', padding: 20, width: '100%' }}>
                    {data.map((item, i) => (
                        <CarouselCardAntd key={i} data={item}/>
                    ))}

                </div>
                <div style={{ display: "flex", justifyContent: "center", marginTop: 32 }}>
                    <Pagination
                        current={currentPage}
                        pageSize={pageSize}
                        total={total}
                        onChange={handlePageChange}
                        showSizeChanger={false}
                    />
                </div>
            </div>

        </>

    );
};

export default HomePage;
