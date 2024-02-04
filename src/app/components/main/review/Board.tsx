"use client";

import React, { useEffect, useState } from "react";
import WriteButton from "./WriteButton";
import ReviewFilter from "./ReviewFilter";
import ReviewList from "./ReviewList";
import ReviewDetail from "./ReviewDetail";

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

    const [detail, setDetail] = useState();

    /*--------------------------------
    * 자식 -> 부모 
    * ReviewFilter에서 지역, 유형, 별점 데이터 받음
    --------------------------------*/
    const HandleDataFromChild = (childData: any) => {
        // console.log("자식에게 받은 props  >>> ", childData);
        setFilter(childData);
    };

    /*--------------------------------
    * 자식 -> 부모 
    * ReviewList 모든 값이 담긴 리뷰 데이터 받음
    --------------------------------*/
    const detailReview = (childData: any) => {
        console.log(childData);
        // console.log("자식에게 받은 props  >>> ", childData);
        setDetail(childData);
        handleModalOpen();
    };

    /*--------------------------------
    * 자식 -> 부모 
    * 
    * 리뷰 추가가 완료 됐을 때 업데이트
    * ReviewUpdate 하기 위함
    --------------------------------*/
    const [update, setUpdate] = useState();
    const updateReview = (childData: any) => {
        // console.log("자식에게 받은 props  >>> ", childData);
        setUpdate(childData);
    };

    /**----------------------------
    * Modal Open
    ----------------------------*/
    const [modalOpen, setModalOpen] = React.useState(false);

    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    return (
        <section className="lg:m-auto lg:w-[60%] lg:mt-[120px] mx-[20px] mt-[100px] mb-[20px]">
            <div className="flex flex-col">
                <div>
                    <WriteButton onData={updateReview} />
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
                        <ReviewList
                            filter={filter}
                            update={update}
                            onData={detailReview}
                        />
                    </div>
                </div>
            </div>
            {modalOpen && (
                <ReviewDetail
                    handleModalClose={handleModalClose}
                    detail={detail}
                />
            )}
        </section>
    );
}
