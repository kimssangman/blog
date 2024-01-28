import React, { FormEvent, useEffect, useState } from "react";
import { Snackbar, SnackbarOrigin } from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { getQuiz } from "@/services/voca/allQuiz";
import { deletePost } from "@/services/voca/deletePost";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "white",
    boxShadow: 24,
    p: 5,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflowY: "auto", // 스크롤 추가
    maxHeight: "80vh", // 최대 높이 제한
};

const quizItemStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
    borderBottom: "1px solid #ccc",
    padding: "8px 0",
    width: "100%",
};

interface State extends SnackbarOrigin {
    open: boolean;
}

export default function EditForm(props: any) {
    const { handleModalClose } = props;
    const [quiz, setQuiz] = useState<any[]>([]);

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

    useEffect(() => {
        getQuizList();
    }, []);

    const getQuizList = async () => {
        try {
            const response: any = await getQuiz();
            setQuiz(response);
        } catch (error) {
            // 오류 처리
        }
    };

    const modalColse = (e: FormEvent) => {
        handleModalClose(); // 스낵바가 닫힐 때 모달도 닫기
    };

    const handleDeleteWord = (id: string) => {
        // 단어 편집
        deletePost(id)
            .then((res: any) => {
                setSnackbarMessage("✅ 삭제되었습니다.");
                setSnackbarState((prev) => ({ ...prev, open: true }));
                // 삭제 되면 다시 리스트 불러오기
                getQuizList();
            })
            .catch((err) => {});
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
                open={true}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="border rounded">
                    <Typography
                        variant="h6"
                        component="h2"
                        align="center"
                        mb={4}
                        sx={{
                            fontWeight: "bold",
                            fontSize: "1.5rem",
                            color: "#1a202c",
                            textShadow: "1px 1px 2px #d2d2d2",
                        }}
                    >
                        🗑 단어를 삭제해 보세요!
                    </Typography>
                    {quiz.map((item, index) => (
                        <div key={item._id} style={quizItemStyle}>
                            <Typography variant="body1" sx={{ flex: 1 }}>
                                {index + 1}. {item.word} - {item.meaning}
                            </Typography>
                            <IconButton
                                onClick={() => handleDeleteWord(item._id)}
                                color="primary"
                                aria-label="delete"
                            >
                                <DeleteIcon />
                            </IconButton>
                        </div>
                    ))}
                    <Button
                        style={{
                            backgroundColor: "#41a5ee",
                            color: "white",
                            fontWeight: "bold",
                            padding: "8px 10px",
                            marginTop: "15px",
                            border: "1px solid #41a5ee",
                            borderRadius: "4px",
                            cursor: "pointer",
                            display: "inline-block",
                            transition: "background-color 0.3s",
                        }}
                        onClick={modalColse}
                    >
                        완료
                    </Button>
                </Box>
            </Modal>
        </>
    );
}
