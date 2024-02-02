import Link from "next/link";
import React from "react";
import { Snackbar, SnackbarOrigin } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import WriteForm from "./WriteForm";

interface State extends SnackbarOrigin {
    open: boolean;
}

export default function WriteButton() {
    const router = useRouter();

    /**----------------------------
     * 사용자 session 확인
     ----------------------------*/
    const session: any = useSession();

    // console.log("          ");
    // console.log("main/page.ts 유저 토큰 정보");
    // console.log(session);
    // console.log("------------------------------");

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
        <>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                onClose={handleClose}
                message="단어 추가 권한이 없습니다."
                key={vertical + horizontal}
                autoHideDuration={1000}
            />
            <button
                onClick={handleModalOpen}
                className="bg-transparent hover:bg-[#41a5ee] text-[#41a5ee] font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded float-right mb-2"
            >
                단어 추가
            </button>
            {modalOpen && <WriteForm handleModalClose={handleModalClose} />}
        </>
    );
}
