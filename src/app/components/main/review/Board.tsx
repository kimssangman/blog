"use client";

import React, { useEffect, useState } from "react";
import WriteButton from "./WriteButton";
import ReviewFilter from "./ReviewFilter";
import ReviewList from "./ReviewList";
import ReviewDetail from "./ReviewDetail";
import EditForm from "../review/EditForm";

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
    const [edit, setEdit] = useState();

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
    * 해당 게시글 상세보기를 위해
    * ReviewList 해당 리뷰의 모든 값이 담긴 데이터 받음
    --------------------------------*/
    const detailReview = (childData: any) => {
        // console.log("자식에게 받은 props  >>> ", childData);
        setDetail(childData);
        handleDetailModalOpen();
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

    /*--------------------------------
    * 자식 -> 부모 
    *
    * 해당 게시글 편집을 위해
    * ReviewList 해당 리뷰의 모든 값이 담긴 데이터 받음
    --------------------------------*/
    const editReview = (childData: any) => {
        // console.log("자식에게 받은 props  >>> ", childData);
        setEdit(childData);
        handleEditlModalOpen();
    };

    /**----------------------------
    * Detail Modal Open
    ----------------------------*/
    const [detailModalOpen, setDetailModalOpen] = React.useState(false);

    const handleDetailModalOpen = () => {
        setDetailModalOpen(true);
    };

    const handleDetailModalClose = () => {
        setDetailModalOpen(false);
    };

    /**----------------------------
    * Edit Modal Open
    ----------------------------*/
    const [editModalOpen, setEditModalOpen] = React.useState(false);

    const handleEditlModalOpen = () => {
        setEditModalOpen(true);
    };

    const handleEditlModalClose = () => {
        setEditModalOpen(false);
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
                            onData={(post: any, type: any) => {
                                if (type === "detail") {
                                    detailReview(post);
                                } else if (type === "edit") {
                                    editReview(post);
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
            {detailModalOpen && (
                <ReviewDetail
                    handleModalClose={handleDetailModalClose}
                    detail={detail}
                />
            )}

            {editModalOpen && (
                <EditForm
                    handleModalClose={handleEditlModalClose}
                    edit={edit} // Pass the edit state to EditForm
                    onData={updateReview}
                />
            )}
        </section>
    );
}
