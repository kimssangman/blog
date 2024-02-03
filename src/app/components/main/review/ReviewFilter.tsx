"use client";

import React, { useState, useEffect } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";

export default function ReviewFilter() {
    const [filterOptions, setFilterOptions] = useState({
        region: "전체",
        type: "전체",
        rating: "전체",
    });

    useEffect(() => {
        // 여기서 서버에 filterOptions를 보내는 로직을 추가할 수 있습니다.
        // 예: fetchData(filterOptions);
        console.log("Sending to server:", filterOptions);
    }, [filterOptions]);

    const handleCheckboxChange = (key: any, value: any) => {
        setFilterOptions((prevOptions) => ({ ...prevOptions, [key]: value }));
    };

    return (
        <section className="p-4 bg-white rounded-lg border border-blue-500">
            {/* 지역 */}
            <div className="filter-section border-b border-blue-500 pb-4 mb-4">
                <div className="filter-header">
                    <span className="text-lg font-bold">지역</span>
                </div>
                <div className="filter-options space-y-2">
                    {[
                        "전체",
                        "서울",
                        "경기",
                        "충청",
                        "강원",
                        "경상",
                        "전라",
                        "제주",
                    ].map((option) => (
                        <FormControlLabel
                            key={option}
                            control={
                                <Checkbox
                                    checked={filterOptions.region === option}
                                    onChange={() =>
                                        handleCheckboxChange("region", option)
                                    }
                                    color="primary"
                                />
                            }
                            label={option}
                            className="text-sm"
                        />
                    ))}
                </div>
            </div>

            {/* 유형 */}
            <div className="filter-section border-b border-blue-500 pb-4 mb-4">
                <div className="filter-header">
                    <span className="text-lg font-bold">유형</span>
                </div>
                <div className="filter-options space-y-2">
                    {[
                        "전체",
                        "한식",
                        "중식",
                        "일식",
                        "양식",
                        "분식",
                        "치킨",
                        "피자",
                        "고기",
                        "회",
                        "곱창/막창/대창",
                        "족발/보쌈",
                        "카페/디저트",
                        "술집/호프",
                    ].map((option) => (
                        <FormControlLabel
                            key={option}
                            control={
                                <Checkbox
                                    checked={filterOptions.type === option}
                                    onChange={() =>
                                        handleCheckboxChange("type", option)
                                    }
                                    color="primary"
                                />
                            }
                            label={option}
                            className="text-sm"
                        />
                    ))}
                </div>
            </div>

            {/* 별점 */}
            <div className="filter-section">
                <div className="filter-header">
                    <span className="text-lg font-bold">별점</span>
                </div>
                <div className="filter-options space-y-2">
                    {[
                        "전체",
                        "⭐",
                        "⭐⭐",
                        "⭐⭐⭐",
                        "⭐⭐⭐⭐",
                        "⭐⭐⭐⭐⭐",
                    ].map((option) => (
                        <FormControlLabel
                            key={option}
                            control={
                                <Checkbox
                                    checked={filterOptions.rating === option}
                                    onChange={() =>
                                        handleCheckboxChange("rating", option)
                                    }
                                    color="primary"
                                />
                            }
                            label={option}
                            className="text-sm"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
