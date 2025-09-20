import axios from "axios";
import React, { useEffect, useState } from "react";

const SubNavbar = ({ tagFilter, setTagFilter }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [tags, setTags] = useState([]);
    const [displayDropdown, setDisplayDropdown] = useState(false);
    const [allTags, setAllTags] = useState([]);
    const [loadedAll, setLoadedAll] = useState(false);

    const handleTagClick = (tag) => {
        setTagFilter(tag._id);
    };

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await axios.get("http://localhost:8080/fivetags");
                const data = response.data;
                if (data) {
                    setTags(data.data);
                    setDisplayDropdown(data.open); // chỉ hiển thị nút "..." nếu open = true
                }
            } catch (error) {
                console.error("Error fetching tags:", error);
            }
        };

        fetchTags();
    }, []);

    const handleToggleDropdown = async () => {
        if (!loadedAll) {
            try {
                const response = await axios.get("http://localhost:8080/tags");
                const data = response.data;
                if (data) {
                    setAllTags(data.data);
                    setLoadedAll(true); // chỉ load 1 lần
                }
            } catch (error) {
                console.error("Error fetching all tags:", error);
            }
        }
        setShowDropdown((prev) => !prev);
    };

    return (
        <div className="bg-blue-100 shadow-sm">
            <div className="flex items-center px-6 py-2 gap-3 ">
                {/* Hiển thị 5 tag đầu */}
                {tags.map((tag, idx) => (
                    <span
                        key={idx}
                        onClick={() => handleTagClick(tag)}
                        className="px-1 py-2 bg-blue-100 rounded-full text-base text-gray-800 cursor-pointer hover:bg-blue-200 transition"
                    >
                        {tag.nameTag}
                    </span>
                ))}


                {/* Nút more */}
                {displayDropdown && (
                    <div className="relative">
                        <button
                            onClick={handleToggleDropdown}
                            className="px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded-full text-sm font-medium"
                        >
                            ...
                        </button>

                        {/* Dropdown cuộn */}
                        {showDropdown && (
                            <div
                                className="absolute left-0 mt-2 w-56 max-h-60 overflow-y-auto 
                              bg-white shadow-lg rounded-lg p-3 z-50"
                            >
                                <div className="flex flex-col gap-2">
                                    {allTags.map((tag, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1 bg-blue-100 rounded-full text-sm text-gray-700 cursor-pointer hover:bg-blue-200 transition"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SubNavbar;
