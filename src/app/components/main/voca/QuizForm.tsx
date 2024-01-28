"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Snackbar, SnackbarOrigin } from "@mui/material";
import { getQuiz } from "@/services/voca/quiz";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

interface State extends SnackbarOrigin {
    open: boolean;
}

export default function QuizForm() {
    const [quiz, setQuiz] = useState<{ word: string; meaning: string } | null>(
        null
    );

    const [options, setOptions] = useState<
        Array<{ word: string; meaning: string }>
    >([]);
    const [score, setScore] = useState<number>(0);
    const [totalScore, settoTalScore] = useState<number>(0);
    const [vocaLength, setVocaLength] = useState<number>(0);

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

    /**--------------------------------------------
     * 퀴즈 목록 랜덤으로 가져오기
    --------------------------------------------*/
    const getQuizList = async () => {
        try {
            const response: any = await getQuiz();
            if (response.voca.length > 0) {
                // 정답 보기를 설정
                setQuiz(response.voca[0]);

                // 보기를 랜덤하게 선택
                const shuffledQuiz = [...response.voca];
                shuffleArray(shuffledQuiz);
                setOptions(shuffledQuiz);

                // 단어집의 단어의 갯수
                setVocaLength(response.vocaLength);
            } else {
                // 데이터가 없을 경우 기본값 설정
                setQuiz(null);
                setOptions([]);
                setVocaLength(0);
            }
        } catch (error) {
            // 오류 처리
        }
    };

    /**--------------------------------------------
     * 가져온 퀴즈 목록 다시 섞기
    --------------------------------------------*/
    const shuffleArray = (array: any) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };

    /**--------------------------------------------
     * 정답 여부 확인 및 새로운 퀴즈 가져오기
    --------------------------------------------*/
    const handleItemClick = (word: any, meaning: any) => {
        if (meaning === quiz?.meaning) {
            // 정답일 경우
            setScore(score + 1);
            setSnackbarMessage("✅ 정답입니다.");
            setSnackbarState((prev) => ({ ...prev, open: true }));
        } else {
            setSnackbarMessage(`❌ ${quiz?.word} : ${quiz?.meaning} `);
            setSnackbarState((prev) => ({ ...prev, open: true }));
        }

        settoTalScore(totalScore + 1);
        // 새로운 퀴즈 가져오기
        getQuizList();
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
            <section
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    display: "flex",
                }}
            >
                <Card className="" style={{ width: "100%", maxWidth: "400px" }}>
                    <Box className="max-w-md" sx={{ p: 2 }}>
                        {
                            // !quiz ? (
                            //     // 데이터가 없을 경우 메시지 표시
                            //     <Typography
                            //         style={{
                            //             backgroundColor: "white",
                            //             fontSize: "1rem",
                            //             textAlign: "center",
                            //             flexGrow: 1,
                            //         }}
                            //     >
                            //         단어를 최소 4개 이상 추가하세요.
                            //     </Typography>
                            // ) : (
                            // 데이터가 있을 경우 퀴즈 표시
                            <>
                                {/* <section className="flex justify-between items-center">
            <Typography
                variant="h6"
                className="bg-white text-sm text-right flex-grow"
            >
                저장된 단어 : {vocaLength}
            </Typography>
        </section> */}
                                <section
                                    style={{
                                        backgroundColor: "white",
                                        padding: "1rem",
                                        textAlign: "center",
                                        flexGrow: 1,
                                    }}
                                >
                                    아래 단어의 뜻은?
                                </section>
                                <section
                                    style={{
                                        backgroundColor: "white",
                                        padding: "0.5rem",
                                        textAlign: "center",
                                        flexGrow: 1,
                                    }}
                                >
                                    {quiz?.word}
                                </section>
                                <Typography
                                    style={{
                                        backgroundColor: "white",
                                        padding: "1rem",
                                        textAlign: "right",
                                        fontSize: "0.875rem", // 예시에 따라 조절 가능
                                    }}
                                >
                                    점수: {score} / 푼 문제: {totalScore}
                                </Typography>

                                <section>
                                    <Box
                                        sx={{
                                            width: "100%",
                                            marginTop: "30px",
                                        }}
                                    >
                                        <Stack spacing={2}>
                                            {options.map((option, index) => (
                                                <Item
                                                    style={{
                                                        backgroundColor:
                                                            "#41a5ee",
                                                        color: "white",
                                                        padding: "8px",
                                                        borderRadius: "4px",
                                                        cursor: "pointer",
                                                    }}
                                                    key={index}
                                                    onClick={() =>
                                                        handleItemClick(
                                                            option.word,
                                                            option.meaning
                                                        )
                                                    }
                                                >
                                                    {option.meaning}
                                                </Item>
                                            ))}
                                        </Stack>
                                    </Box>
                                </section>
                            </>
                            // )
                        }
                    </Box>
                </Card>
            </section>
        </>
    );
}
