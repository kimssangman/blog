import React, { ChangeEvent, FormEvent, useState } from "react";
import { Snackbar, SnackbarOrigin } from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { writePost } from "@/services/voca/writePost";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "white",
    boxShadow: 24,
    p: 5,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
};

const inputStyle = {
    width: "100%",
    padding: "10px",
    margin: "5px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
};

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

    const onChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

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
                <Box sx={style} className=" border rounded">
                    <Typography
                        variant="h6"
                        component="h2"
                        align="center"
                        mb={4}
                        sx={{
                            fontWeight: "bold",
                            fontSize: "1.03rem",
                            color: "#1a202c",
                            textShadow: "1px 1px 2px #d2d2d2",
                        }}
                    >
                        📚 단어를 추가해 보세요! 🖊️
                    </Typography>

                    <div style={{ marginBottom: "10px" }}>
                        <label
                            htmlFor="word"
                            style={{
                                fontSize: "1.2rem",
                                fontWeight: "bold",
                                color: "#333",
                            }}
                        >
                            단어
                        </label>
                        <input
                            style={{ ...inputStyle, fontSize: "1rem" }}
                            id="word"
                            name="word"
                            required
                            value={form.word}
                            onChange={onChange}
                        />
                    </div>

                    <div style={{ marginBottom: "20px" }}>
                        <label
                            htmlFor="meaning"
                            style={{
                                fontSize: "1.2rem",
                                fontWeight: "bold",
                                color: "#333",
                            }}
                        >
                            뜻
                        </label>
                        <input
                            style={{ ...inputStyle, fontSize: "1rem" }}
                            id="meaning"
                            name="meaning"
                            required
                            value={form.meaning}
                            onChange={onChange}
                        />
                    </div>

                    <button
                        className="bg-[#41a5ee] text-white font-semibold py-2 px-4 border border-blue-500 rounded mx-auto mb-2"
                        onClick={handleAddWord}
                    >
                        완료
                    </button>
                </Box>
            </Modal>
        </>
    );
}
