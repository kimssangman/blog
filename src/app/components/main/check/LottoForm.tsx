import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Snackbar, SnackbarOrigin } from "@mui/material";

interface State extends SnackbarOrigin {
    open: boolean;
}

export default function LottoForm() {
    const [lottoNumber, setLottoNumber] = useState([]) as any;
    const [itemArr, setItemArr] = useState([]) as any;
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => setIsOpen(!isOpen);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const [active, setActive] = useState(false);

    /**----------------------------
     * 로또 번호 생성
     ----------------------------*/
    const createLottoNumber = () => {
        setState({ ...state, open: true });

        const newNumbers = new Set();

        while (newNumbers.size < 6) {
            newNumbers.add(Math.floor(Math.random() * 45) + 1);
        }

        // new Set()으로 중복제거, 오름차순 정렬
        const uniqueNumbers = Array.from(newNumbers).sort(
            (a: any, b: any) => a - b
        );
        setLottoNumber(uniqueNumbers);

        // [[1,2,3,4,5,6], [2,3,4,5,6,7], [4,5,6,7,8,9]] 이렇게 넣어준다
        setItemArr((prevItemArr: any) => [...prevItemArr, uniqueNumbers]);
    };

    /**----------------------------
     * snack bar
     ----------------------------*/
    const [state, setState] = React.useState<State>({
        open: false,
        vertical: "top",
        horizontal: "center",
    });
    const { vertical, horizontal, open } = state;

    const handleClose = () => {
        setState({ ...state, open: false });
    };

    return (
        <section>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                onClose={handleClose}
                message="번호가 생성되었습니다."
                key={vertical + horizontal}
                autoHideDuration={1000}
            />
            <div className="flex justify-center items-center text-center">
                <span className="text-gray-800 font-semibold text-[0.9rem]">
                    아래 룰렛을 눌러서 로또 번호를 뽑아요~!
                </span>
            </div>

            <Image
                src="/images/slot.gif"
                width={100}
                height={100}
                alt="logo"
                className="m-auto sm:w-[30px] lg:w-[100px] mb-[30px] cursor-pointer transition duration-300 ease-in-out transform hover:scale-110"
                onClick={createLottoNumber}
            />
            <Stack direction="column" spacing={3}>
                {itemArr.map((numbers: number[], index: number) => (
                    <Box key={index} display="flex" justifyContent="center">
                        {numbers.map((num: number, innerIndex: number) => (
                            <div
                                key={innerIndex}
                                style={{
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "50%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                    background: "#f0f0f0",
                                    boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
                                    border: "2px solid #ccc",
                                    margin: "0 5px",
                                }}
                            >
                                {num}
                            </div>
                        ))}
                    </Box>
                ))}
            </Stack>
        </section>
    );
}
