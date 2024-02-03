import React, { ChangeEvent, FormEvent, useState } from "react";
import { Snackbar, SnackbarOrigin } from "@mui/material";
import Typography from "@mui/material/Typography";
import { writePost } from "@/services/voca/writePost";
import { Checkbox, FormControlLabel, Box, Modal } from "@mui/material";

interface State extends SnackbarOrigin {
    open: boolean;
}

type Form = {
    word: string;
    meaning: string;
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
        word: "",
        meaning: "",
    });

    /**----------------------------
    * addWord
    ----------------------------*/
    const [modalOpen, setModalOpen] = useState(true); // 모달의 열린 상태를 제어하는 state
    const handleAddWord = (e: FormEvent) => {
        e.preventDefault();

        // 폼 유효성 검사 - 단어와 뜻이 모두 입력되었는지 확인
        if (!form.word || !form.meaning) {
            setSnackbarMessage("단어와 뜻을 모두 입력하세요.");
            setSnackbarState((prev) => ({ ...prev, open: true }));
            return;
        }

        // 단어 추가
        writePost(form)
            .then((res: any) => {
                handleModalClose(); // 스낵바가 닫힐 때 모달도 닫기
            })
            .catch((err) => {
                setSnackbarMessage("이미 추가한 단어입니다.");
                setSnackbarState((prev) => ({ ...prev, open: true }));
            });

        setModalOpen(false); // 단어를 추가한 후 모달 닫기
    };

    const [filterOptions, setFilterOptions] = useState({
        region: "전체",
        type: "전체",
        rating: "전체",
    });

    const handleCheckboxChange = (key: any, value: any) => {
        setFilterOptions((prevOptions) => ({ ...prevOptions, [key]: value }));
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
                    }}
                    className="border rounded"
                >
                    <section className="p-4 bg-white rounded-lg border border-blue-500">
                        {/* 지역 */}
                        <div className="filter-section border-b border-blue-500 pb-4 mb-4">
                            <div className="filter-header">
                                <span className="text-lg font-bold">지역</span>
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
                            </div>
                            <div className="filter-options">
                                {[
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
                        {/* 사진 */}
                        <div className="filter-section border-b border-blue-500 pb-4 mb-4">
                            <div className="filter-header">
                                <span className="text-lg font-bold">사진</span>
                            </div>
                            <div className="filter-options">
                                <input type="file" className="p-2" />
                            </div>
                        </div>

                        {/* 코멘트 */}
                        <div className="filter-section">
                            <div className="filter-header">
                                <span className="text-lg font-bold">
                                    코멘트
                                </span>
                            </div>
                            <div className="filter-options">
                                <textarea
                                    name=""
                                    id=""
                                    className="border rounded p-2 w-full"
                                ></textarea>
                            </div>
                        </div>
                    </section>

                    <div className="flex mt-[10px]">
                        <button
                            className="bg-[#41a5ee] text-white font-semibold py-2 px-4 border border-blue-500 rounded mx-auto mb-2"
                            onClick={handleAddWord}
                        >
                            작성하기
                        </button>
                    </div>
                </Box>
            </Modal>
        </>
    );
}
