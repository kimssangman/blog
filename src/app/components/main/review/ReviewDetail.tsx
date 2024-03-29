import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Snackbar, SnackbarOrigin } from "@mui/material";
import { writePost } from "@/services/review/writePost";
import { Checkbox, FormControlLabel, Box, Modal, Button } from "@mui/material";
import Image from "next/image";

interface State extends SnackbarOrigin {
    open: boolean;
}

type Post = {
    region: string;
    type: string;
    rating: string;
    name: string;
    location: string;
    images: { src: string }[];
    comment: string;
    createdAt: string;
    _id: string;
};

export default function ReviewDetail(props: any) {
    const { handleModalClose } = props;
    const [detail, setDetail] = useState<Post>();
    /*--------------------------------
    * 부모 -> 다른 자식
    * 자식이 보낸 데이터를 부모가 받은 뒤 
    * 부모가 다른 자식에게 보낸 데이터를 다른 자식이 받았음
    * 
    *  Board.tsx에서 리뷰 데이터 받음
    --------------------------------*/
    useEffect(() => {
        setDetail(props.detail);

        console.log(props.detail);
    }, [props.detail]);

    return (
        <>
            <Modal
                open={true} // Assuming you want the modal to be open when WriteButton is clicked
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "95%", // 조절 가능한 값
                        maxWidth: "600px", // 조절 가능한 값
                        height: "80vh",
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 2,
                        overflowY: "auto",
                        overflowX: "hidden",
                        maxHeight: "90%", // Maximum height
                    }}
                    className="border rounded"
                >
                    <div className="flex justify-end mb-[10px]">
                        <button
                            style={{
                                backgroundColor: "#41a5ee",
                                color: "white",
                                fontWeight: "bold",
                                padding: "0.5rem 1rem",
                                border: "1px solid #41a5ee",
                                borderRadius: "0.25rem",
                                cursor: "pointer",
                            }}
                            onClick={handleModalClose}
                        >
                            X
                        </button>
                    </div>
                    <section className="p-4 bg-white rounded-lg border border-blue-500">
                        {/* 지역 */}
                        <div className="filter-section border-b border-blue-500 pb-4 mb-4">
                            <div className="filter-header">
                                <span className="text-lg font-bold">지역</span>
                            </div>
                            <span>{detail?.region}</span>
                        </div>
                        {/* 지역 */}
                        <div className="filter-section border-b border-blue-500 pb-4 mb-4">
                            <div className="filter-header">
                                <span className="text-lg font-bold">유형</span>
                            </div>
                            <span>{detail?.type}</span>
                        </div>
                        {/* 가게명 */}
                        <div className="filter-section border-b border-blue-500 pb-4 mb-4">
                            <div className="filter-header">
                                <span className="text-lg font-bold">
                                    가게명
                                </span>
                            </div>
                            <span>{detail?.name}</span>
                        </div>
                        {/* 위치 */}
                        <div className="filter-section border-b border-blue-500 pb-4 mb-4">
                            <div className="filter-header">
                                <span className="text-lg font-bold">위치</span>
                            </div>
                            <textarea
                                value={detail?.location}
                                className="w-full h-24 px-3 py-2 text-base placeholder-gray-500 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>
                        {/* 별점 */}
                        <div className="filter-section border-b border-blue-500 pb-4 mb-4">
                            <div className="filter-header">
                                <span className="text-lg font-bold">별점</span>
                            </div>
                            <span>{detail?.rating}</span>
                        </div>

                        {/* 사진 */}
                        <div className="filter-section border-b border-blue-500 pb-4 mb-4">
                            <div className="filter-header">
                                <span className="text-lg font-bold">사진</span>
                            </div>
                            <div className="flex flex-col items-center">
                                {/* 이미지 여러개 보여주기*/}
                                {detail?.images.map((image, index) => (
                                    <Image
                                        key={`${detail._id}-${index}`}
                                        src={image.src} // replace with actual image source
                                        width={0} // 이미지의 너비를 100%로 설정
                                        height={0}
                                        sizes="100vw"
                                        alt={`image-${index}`}
                                        className="inline-block p-3"
                                        style={{
                                            width: "100%",
                                            height: "auto",
                                            border: "0.5px solid #ddd",
                                        }} // 변경된 부분
                                    />
                                ))}
                            </div>
                        </div>

                        {/* 코멘트 */}
                        {/* 코멘트 */}
                        <div className="filter-section">
                            <div className="filter-header">
                                <span className="text-lg font-bold">
                                    코멘트
                                </span>
                            </div>
                            <textarea
                                value={detail?.comment}
                                className="w-full h-24 px-3 py-2 text-base placeholder-gray-500 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>
                    </section>

                    <div className="flex mt-[10px]">
                        <button
                            className="bg-[#41a5ee] text-white font-semibold py-2 px-4 border border-blue-500 rounded mx-auto mb-2"
                            onClick={handleModalClose}
                        >
                            완료
                        </button>
                    </div>
                </Box>
            </Modal>
        </>
    );
}
