"use client";

import React, { useEffect, useState } from "react";
import WriteButton from "./WriteButton";
import ReviewFilter from "./ReviewFilter";
import ReviewList from "./ReviewList";

type Form = {
    region: string;
    type: string;
    rating: string;
};

export default function Board() {
    const [filter, setFilter] = useState<Form>({
        region: "전체",
        type: "전체",
        rating: "전체",
    });

    /*--------------------------------
    * 자식 -> 부모 
    * ReviewFilter에서 지역, 유형, 별점 데이터 받음
    --------------------------------*/
    const HandleDataFromChild = (childData: any) => {
        // console.log("자식에게 받은 props  >>> ", childData);
        setFilter(childData);
    };

    return (
        <section className="lg:m-auto lg:w-[60%] lg:mt-[120px] mx-[20px] mt-[100px] mb-[20px]">
            <div className="flex flex-col">
                <div>
                    <WriteButton />
                </div>
                <div className="flex flex-col">
                    <div>
                        <ReviewFilter onData={HandleDataFromChild} />
                    </div>
                    <div>
                        {/* /*-------------------------------- */}
                        {/* * 부모 -> 다른 자식 */}
                        {/* * 부모가 보관한 ReviewFilter에서 지역, 유형, 별점 데이터를 다른 자식에게 넘김 */}
                        {/* --------------------------------*/}
                        <ReviewList filter={filter} />
                    </div>
                </div>
            </div>
        </section>
    );
}
