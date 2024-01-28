import React from "react";
import { Snackbar, SnackbarOrigin } from "@mui/material";
import EditForm from "../voca/EditForm";

interface State extends SnackbarOrigin {
    open: boolean;
}

export default function EditButton() {
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
                className="bg-transparent hover:bg-rose-400 text-rose-400 font-semibold hover:text-white py-2 px-4 border border-rose-400 hover:border-transparent rounded float-right mb-2"
            >
                단어 편집
            </button>
            {modalOpen && <EditForm handleModalClose={handleModalClose} />}
        </>
    );
}
