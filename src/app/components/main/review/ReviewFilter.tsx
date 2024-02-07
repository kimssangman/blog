"use client";

import React, { useState, useEffect } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";

export default function ReviewFilter(props: any) {
    const [filterOptions, setFilterOptions] = useState({
        region: "전체",
        type: "전체",
        rating: "전체",
    });

    /*--------------------------------
    * 자식 -> 부모 데이터 전달
    --------------------------------*/
    useEffect(() => {
        // 콜백 함수를 호출하여 데이터를 전달
        props.onData(filterOptions);
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
                <div className="filter-options">
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
                <div className="filter-options">
                    {[
                        "전체",
                        "한식",
                        "중식",
                        "일식",
                        "양식",
                        "치킨",
                        "피자",
                        "고기/구이",
                        "회",
                        "곱창/막창/대창",
                        "족발/보쌈",
                        "육회",
                        "돈까스",
                        "면",
                        "국밥",
                        "패스트푸드",
                        "찜/탕/찌개",
                        "도시락",
                        "분식",
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
                <div className="filter-options">
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
