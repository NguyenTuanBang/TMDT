import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import formatCurrency from "../hooks/useCurrency";

const Navbar = ({ user, setUser, }) => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => setUser(null);

  // Fetch search results

  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    if (!keyword.trim()) {
      setResults([]);
      setTotalCount(0);
      setShowDropdown(false);
      return;
    }
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/products/search?keyword=${keyword}`
        );
        setResults(res.data.data);          // lấy 5 sản phẩm
        setTotalCount(res.data.totalResults); // tổng số sản phẩm
        setShowDropdown(true);
      } catch (error) {
        console.error(error);
      }
    };
    const timeout = setTimeout(fetchData, 400); // debounce
    return () => clearTimeout(timeout);
  }, [keyword]);


  return (
    <nav className="flex justify-between items-center px-6 py-3 shadow-md bg-gradient-to-r from-blue-500 to-indigo-500 text-white relative">
      {/* Logo */}
      <div
        className="text-lg font-bold tracking-wide cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      >
        MyWebsite
      </div>

      {/* Search bar */}
      <div className="flex-1 px-6 relative">
        <div className="relative max-w-md mx-auto">
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 pointer-events-none">
            🔍
          </span>
          <input
            type="text"
            placeholder="Tìm kiếm..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-white text-gray-800 placeholder-gray-400 
                       focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-md"
          />

          {/* Dropdown */}
          {showDropdown && (
            <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-lg mt-2 z-50 max-h-60 overflow-y-auto">
              {results.length === 0 ? (
                <div className="p-3 text-gray-500">❌ Not Found</div>
              ) : (
                <>
                  {results.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        navigate(`/product/${item._id}`)
                        setShowDropdown(false);
                        setKeyword("");
                      }}
                    >
                      <img
                        src={item.img?.[0] || "./default.jpg"}
                        alt={item.productName}
                        className="w-10 h-10 object-cover rounded"
                      />
                      <span className="text-gray-800">{item.productName}</span>
                    </div>
                  ))}

                  {/* Nút xem thêm */}
                  {totalCount > 5 && (
                    <div
                      className="p-3 text-blue-600 font-medium text-center border-t cursor-pointer hover:bg-blue-50"
                      onClick={() => navigate(`/listProduct/name?keyword=${keyword}`)}
                    >
                      Xem thêm {totalCount - 5} sản phẩm...
                    </div>
                  )}
                </>
              )}
            </div>
          )}

        </div>
      </div>

      {/* Right side (user login / logout) */}
      <div className="flex items-center gap-4">
        {/* ... phần user giữ nguyên như bạn viết */}
      </div>
    </nav>
  );
};

export default Navbar;
