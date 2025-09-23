import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import CarouselCardAntd from "../Comp/ProductCard";
import { Pagination, Carousel } from "antd";
import axios from "axios";
import { useParams } from 'react-router-dom';

const ListProduct = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { type, name } = useParams();
    const pageSize = 10;
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const handlePageChange = (page) => setCurrentPage(page);
    useEffect(() => {
        const fetchData = async () => {
            let url = `http://localhost:8080/products?page=${currentPage}`;
            if (type) {
                url += `&type=${type}`;
            }
            if (name) {
                url += `&name=${name}`;
            }
            const response = await axios.get(url);
            setData(response.data.data);
            setTotal(response.data.numberOfPages);
        };
        fetchData();
    }, [currentPage, type]);
    return (
        <div>
            <h1>Danh sách sản phẩm</h1>
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
                <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={total}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                />
            </div>
        </div>
    )
}

export default ListProduct