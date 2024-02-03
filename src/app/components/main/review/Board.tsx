"use client";

import React from "react";
import WriteButton from "./WriteButton";
import ReviewFilter from "./ReviewFilter";
import ReviewList from "./ReviewList";

export default function Board() {
    return (
        <section className="lg:m-auto lg:w-[60%] lg:mt-[120px] mx-[20px] mt-[100px] mb-[20px]">
            <div className="flex flex-col">
                <div>
                    <button className="bg-transparent hover:bg-[#41a5ee] text-[#41a5ee] font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded float-right mb-2">
                        리뷰 작성
                    </button>
                </div>
                <div className="flex flex-col">
                    <div>
                        <ReviewFilter />
                    </div>
                    <div>
                        <ReviewList />
                    </div>
                </div>
            </div>
        </section>
    );
}
