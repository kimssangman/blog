import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Snackbar, SnackbarOrigin } from "@mui/material";
import { writePost } from "@/services/review/writePost";
import { Checkbox, FormControlLabel, Box, Modal, Button } from "@mui/material";
import Image from "next/image";

interface State extends SnackbarOrigin {
    open: boolean;
}

type Form = {
    region: string;
    type: string;
    rating: string;
    name: string;
    location: string;
    images: FileList | null; // 여러 파일을 선택하므로 FileList 또는 null로 타입을 지정합니다.
    comment: string;
};

/**----------------------------
 사진 추가 input 스타일링을 위한 CSS
 ----------------------------*/
const inputStyle = {
    display: "none", // 기존 input 숨김
};

const imageUploadStyle = {
    backgroundColor: "#41a5ee",
    color: "white",
    padding: "0.5rem 1rem",
    border: "1px solid #41a5ee",
    borderRadius: "0.25rem",
    cursor: "pointer",
};

export default function WriteForm(props: any) {
    const { handleModalClose } = props;

    /**----------------------------
    * 스낵바
    ----------------------------*/
    const [snackbarState, setSnackbarState] = React.useState<State>({
        open: false,
        vertical: "top",
        horizontal: "center",
    });
    const { vertical, horizontal, open: snackbarOpen } = snackbarState;

    const [snackbarMessage, setSnackbarMessage] = useState<string>("");

    const handleSnackbarClose = () => {
        setSnackbarState({ ...snackbarState, open: false });
    };

    /**----------------------------
    * form
    ----------------------------*/
    const [form, setForm] = useState<Form>({
        region: "전체",
        type: "전체",
        rating: "전체",
        name: "",
        location: "",
        images: null,
        comment: "",
    });

    /**---------------------------------------
     * 필수 입력 값이 유효한지 체크하는 함수
     ---------------------------------------*/
    const validateForm = () => {
        if (
            form.region === "" ||
            form.type === "" ||
            form.rating === "" ||
            form.name === "" ||
            form.location === ""
        ) {
            // 필수 입력 값 중 하나라도 빈 문자열이라면 유효하지 않음
            return false;
        }
        return true; // 모든 필수 입력 값이 유효함
    };

    /**---------------------------------------
     * 리뷰 추가되는 동안 추가 버튼 기능 막기
     ---------------------------------------*/
    const [isAddingReview, setIsAddingReview] = useState(false);

    /**----------------------------
    * addPost
    ----------------------------*/
    const [modalOpen, setModalOpen] = useState(true); // 모달의 열린 상태를 제어하는 state
    const handleAddPost = (e: FormEvent) => {
        e.preventDefault();

        // 필수 입력 값이 유효한지 체크
        if (!validateForm()) {
            // 필수 입력 값이 유효하지 않으면 스낵바를 열어 사용자에게 알림
            setSnackbarMessage("모든 필수 항목을 입력하세요.");
            setSnackbarState((prev) => ({ ...prev, open: true }));
            return; // 리뷰 추가를 중단
        }

        // 리뷰 추가 시작 시 버튼 비활성화
        setIsAddingReview(true);

        // 리뷰 추가
        writePost(form)
            .then((res: any) => {
                // 리뷰 추가가 완료되면 리뷰 추가 버튼 기능 다시 활성화
                setIsAddingReview(false);
                handleModalClose(); // 스낵바가 닫힐 때 모달도 닫기

                // 콜백 함수를 호출하여 데이터를 전달
                props.onData({ update: "update" });
            })
            .catch((err) => {
                // 리뷰 추가 실패 시에도 버튼 기능 다시 활성화
                setIsAddingReview(false);
                setSnackbarState((prev) => ({ ...prev, open: true }));
            });

        setModalOpen(false); // 리뷰를 추가한 후 모달 닫기
    };

    /**----------------------------
    * checkbox가 선택되거나사진 업로드, 텍스트 추가가 됐을 때 set
    ----------------------------*/
    const handleCheckboxChange = (key: string, value: any) => {
        if (key === "images") {
            const files = (value as HTMLInputElement).files;
            setForm((prevOptions) => ({ ...prevOptions, [key]: files }));
        } else {
            setForm((prevOptions) => ({ ...prevOptions, [key]: value }));
        }
    };

    /**---------------------------------------
     * 사진 미리보기
     ---------------------------------------*/
    const [previews, setPreviews] = useState<string[]>([]);
    const [images, setImages] = useState<File[]>([]); // Change FileList | null to File[]

    const handleImageChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newImages = [...images];
        const newPreviews = [...previews];

        const loadImage = async (file: File) => {
            return new Promise<string>((resolve) => {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target!.result as string);
                reader.readAsDataURL(file);
            });
        };

        for (let i = 0; i < e.target.files!.length; i++) {
            const file = e.target.files![i];

            // 이미지 파일 5개로 제한
            if (newImages.length < 5) {
                // 파일을 미리보기로 변환
                const preview = await loadImage(file);

                // 이벤트 객체의 파일을 newImages에 담기
                newImages.push(file);
                newPreviews.push(preview);
            }
        }

        setImages(newImages);
        setPreviews(newPreviews);

        // 이미지 데이터를 form에 추가
        await setForm((prevOptions: any) => ({
            ...prevOptions,
            images: newImages,
        }));
    };

    /**---------------------------------------
     * 사진 삭제하기
     ---------------------------------------*/
    const handleDeletePreview = async (index: number) => {
        const newImages = [...images];
        const newPreviews = [...previews];

        newImages.splice(index, 1);
        newPreviews.splice(index, 1);

        await setImages(newImages);
        await setPreviews(newPreviews);

        // 이미지 데이터를 form에 추가 (순서 기준으로 업데이트)
        await setForm((prevOptions: any) => ({
            ...prevOptions,
            images: newImages,
        }));
    };

    return (
        <>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={snackbarOpen}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
                key={vertical + horizontal}
                autoHideDuration={1000}
            />
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
                        width: 400,
                        height: "80vh",
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                        overflowY: "auto", // Add this line to make the content scrollable
                        overflowX: "hidden", // Add this line to hide horizontal scroll
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
                                <span className="text-[#ff0000] text-lg">
                                    *
                                </span>
                            </div>
                            <div className="filter-options">
                                {[
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
                                        checked={form.region === option}
                                        control={
                                            <Checkbox
                                                onChange={() =>
                                                    handleCheckboxChange(
                                                        "region",
                                                        option
                                                    )
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
                                <span className="text-[#ff0000] text-lg">
                                    *
                                </span>
                            </div>
                            <div className="filter-options">
                                {[
                                    "한식",
                                    "중식",
                                    "일식",
                                    "양식",
                                    "치킨",
                                    "피자",
                                    "고기",
                                    "회",
                                    "곱창/막창/대창",
                                    "족발/보쌈",
                                    "분식",
                                    "카페/디저트",
                                    "술집/호프",
                                ].map((option) => (
                                    <FormControlLabel
                                        key={option}
                                        checked={form.type === option}
                                        control={
                                            <Checkbox
                                                onChange={() =>
                                                    handleCheckboxChange(
                                                        "type",
                                                        option
                                                    )
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
                        <div className="filter-section border-b border-blue-500 pb-4 mb-4">
                            <div className="filter-header">
                                <span className="text-lg font-bold">별점</span>
                                <span className="text-[#ff0000] text-lg">
                                    *
                                </span>
                            </div>
                            <div className="filter-options">
                                {[
                                    "⭐",
                                    "⭐⭐",
                                    "⭐⭐⭐",
                                    "⭐⭐⭐⭐",
                                    "⭐⭐⭐⭐⭐",
                                ].map((option) => (
                                    <FormControlLabel
                                        key={option}
                                        checked={form.rating === option}
                                        control={
                                            <Checkbox
                                                onChange={() =>
                                                    handleCheckboxChange(
                                                        "rating",
                                                        option
                                                    )
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
                        {/* 가게명 */}
                        <div className="filter-section">
                            <div className="filter-header">
                                <span className="text-lg font-bold">
                                    가게명
                                </span>
                                <span className="text-[#ff0000] text-lg">
                                    *
                                </span>
                            </div>
                            <div className="filter-options">
                                <textarea
                                    name=""
                                    id=""
                                    className="border rounded p-2 w-full"
                                    onChange={(e) =>
                                        handleCheckboxChange(
                                            "name",
                                            e.target.value
                                        )
                                    }
                                ></textarea>
                            </div>
                        </div>
                        {/* 위치 */}
                        <div className="filter-section">
                            <div className="filter-header">
                                <span className="text-lg font-bold">위치</span>
                                <span className="text-[#ff0000] text-lg">
                                    *
                                </span>
                            </div>

                            <div className="filter-options">
                                <textarea
                                    name=""
                                    id=""
                                    className="border rounded p-2 w-full"
                                    onChange={(e) =>
                                        handleCheckboxChange(
                                            "location",
                                            e.target.value
                                        )
                                    }
                                ></textarea>
                            </div>
                        </div>
                        {/* 사진 추가 */}
                        <div className="filter-section border-b border-blue-500 pb-4 mb-4">
                            <div className="filter-header">
                                <span className="text-lg font-bold">
                                    사진 추가
                                </span>
                                <span className="text-sm">(선택)</span>
                            </div>
                            <div>
                                {previews.length === 0 ? (
                                    <span className="text-[12px] text-gray-500">
                                        * 사진은 최대 5장까지 첨부할 수
                                        있습니다.
                                    </span>
                                ) : (
                                    <span className="text-[12px] text-gray-500">
                                        * 현재 첨부된 이미지: {previews.length}
                                        장
                                    </span>
                                )}
                            </div>
                            <div className="filter-options flex items-center space-x-2 mt-2">
                                {/* 이미지 업로드 버튼 스타일링 */}
                                <label
                                    htmlFor="inputFile"
                                    className="bg-blue-500 text-white px-3 py-1 rounded-md cursor-pointer hover:bg-blue-600 transition duration-300"
                                >
                                    사진 선택
                                </label>
                                <input
                                    type="file"
                                    id="inputFile"
                                    accept="image/*"
                                    multiple
                                    style={inputStyle}
                                    onChange={handleImageChange}
                                />
                            </div>
                            {/* 사진 미리보기 */}
                            <div className="mt-3 grid gap-3 grid-cols-3">
                                {previews?.map((preview, index) => (
                                    <div
                                        key={index}
                                        className="relative w-full h-20"
                                    >
                                        <Image
                                            src={preview}
                                            layout="fill"
                                            objectFit="cover"
                                            alt={`${preview}-${index}`}
                                        />

                                        <button
                                            onClick={() =>
                                                handleDeletePreview(index)
                                            }
                                            className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                                        >
                                            X
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 코멘트 */}
                        <div className="filter-section">
                            <div className="filter-header">
                                <span className="text-lg font-bold">
                                    코멘트
                                </span>
                                <span className="text-sm">(선택)</span>
                            </div>
                            <div className="filter-options">
                                <textarea
                                    name=""
                                    id=""
                                    className="border rounded p-2 w-full"
                                    onChange={(e) =>
                                        handleCheckboxChange(
                                            "comment",
                                            e.target.value
                                        )
                                    }
                                ></textarea>
                            </div>
                        </div>
                    </section>

                    <div className="flex mt-[10px]">
                        {/* 버튼 활성화/비활성화 여부를 isAddingReview 상태를 기준으로 결정 */}
                        <button
                            className={`bg-${
                                isAddingReview
                                    ? "gray-400 border border-gray-500"
                                    : "[#41a5ee]"
                            } text-white font-semibold py-2 px-4 border border-blue-500 rounded mx-auto mb-2`}
                            onClick={isAddingReview ? undefined : handleAddPost}
                            disabled={isAddingReview}
                        >
                            {isAddingReview ? "리뷰 추가 중..." : "작성하기"}
                        </button>
                    </div>
                </Box>
            </Modal>
        </>
    );
}
