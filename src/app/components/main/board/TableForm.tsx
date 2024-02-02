"use client";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useRouter } from "next/navigation";
import { postList } from "@/services/board/postList";
import { useEffect, useState } from "react";
import moment from "moment";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function TableForm({ searchValue }: any) {
    const router = useRouter();
    const [post, setPost] = useState([]);
    const [filteredPost, setFilteredPost] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    useEffect(() => {
        getPostList();
    }, []);

    const { status } = useSession({
        required: true,
        onUnauthenticated() {
            redirect("/signIn");
        },
    });

    useEffect(() => {
        // 검색값이 변경될 때마다 데이터 필터링
        const filteredPost = post.filter(
            (row: any) =>
                row.title.includes(searchValue) ||
                row.idea.includes(searchValue) ||
                row.input.includes(searchValue) ||
                row.contents.includes(searchValue)
        );
        // 필터링된 데이터 설정
        setFilteredPost(filteredPost);
        setCurrentPage(1); // 검색값 변경 시 현재 페이지를 1로 초기화
    }, [searchValue, post]);

    const getPostList = async () => {
        try {
            // api를 다이나믹으로 쓰려면 cache 옵션을 쓰라는데.....
            // const response = await (await fetch('/api/board', { cache: 'no-store' })).json();

            const response = await postList();
            setPost(response); // 데이터를 변수에 저장
        } catch (error) {
            // 오류 처리
        }
    };

    // 게시글 상세보기
    const goPage = (item: any) => {
        router.push(`/main/board/${item._id}`);
    };

    // 페이지 변경 시 실행되는 함수
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    // 필터링된 게시물 목록에서 현재 페이지에 해당하는 항목들을 반환하는 함수
    const getCurrentPageItems = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredPost.slice(startIndex, endIndex);
    };

    // 페이지 번호 목록을 반환하는 함수
    const getPageNumbers = () => {
        const totalPages = Math.ceil(filteredPost.length / itemsPerPage);
        return Array.from({ length: totalPages }, (_, index) => index + 1);
    };

    const getPageNumbersWithNavigation = () => {
        const totalPages = Math.ceil((filteredPost.length || 1) / itemsPerPage);
        const maxVisiblePages = 5; // 현재 페이지 주변에 보여줄 페이지 수 (현재 페이지 포함)

        // 현재 페이지 양 옆에 보여질 페이지 수
        // 처음 2 3 (4) 5 6 끝
        let startPage = Math.max(
            1,
            currentPage - Math.floor(maxVisiblePages / 2)
        );
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        /**-----------------------------
         * 전체 페이지가 5보다 작을경우
         * 시작과 끝 페이지 설정
         -----------------------------*/
        if (totalPages <= maxVisiblePages) {
            startPage = 1;
            endPage = totalPages;
        } else if (currentPage - startPage < Math.floor(maxVisiblePages / 2)) {
            /**-----------------------------
         * 시작 페이지와 현재 페이지 사이의 거리가 주변에 보여줄 페이지보다 작을경우
         * 처음 1 (2) 3 4 5 끝
         * 보여지는 맨 끝 값은 1(시작 페이지) + 5(현재 페이지 주변에 보여줄 페이지 수) - 1 = 5
         -----------------------------*/
            endPage = startPage + maxVisiblePages - 1;
        } else if (endPage - currentPage < Math.ceil(maxVisiblePages / 2) - 1) {
            /**-----------------------------
         * 끝 페이지와 현재 페이지 사이의 거리가 주변에 보여줄 페이지보다 작을경우
         * 처음 4 5 6 (7) 8 끝
         * 보여지는 맨 처음 값은 8(끝 페이지) - 5(현재 페이지 주변에 보여줄 페이지 수) + 1 = 4
         -----------------------------*/
            startPage = endPage - maxVisiblePages + 1;
        }

        return Array.from(
            { length: endPage - startPage + 1 },
            (_, index) => startPage + index
        );
    };

    return (
        <section>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell
                                align="center"
                                style={{
                                    width: "5%",
                                    borderRight: "1px solid rgb(224, 224, 224)",
                                    whiteSpace: "nowrap",
                                }}
                                sx={{
                                    "@media (max-width: 768px)": {
                                        fontSize: "0.7rem", // 모바일에서 글자 크기를 줄임
                                        width: "15%",
                                        whiteSpace: "nowrap",
                                    },
                                }}
                            >
                                번호
                            </TableCell>
                            <TableCell
                                align="center"
                                style={{
                                    width: "65%",
                                    borderRight: "1px solid rgb(224, 224, 224)",
                                }}
                                sx={{
                                    "@media (max-width: 768px)": {
                                        fontSize: "0.7rem", // 모바일에서 글자 크기를 줄임
                                        width: "70%",
                                    },
                                }}
                            >
                                문제
                            </TableCell>
                            <TableCell
                                align="center"
                                style={{
                                    width: "7%",
                                    whiteSpace: "nowrap",
                                }}
                                sx={{
                                    "@media (max-width: 768px)": {
                                        fontSize: "0.7rem", // 모바일에서 글자 크기를 줄임
                                        width: "15%",
                                        whiteSpace: "nowrap",
                                    },
                                }}
                            >
                                등록일
                            </TableCell>
                            {/* <TableCell align="center">조회수</TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {getCurrentPageItems().map((row: any, index) => (
                            <TableRow
                                onClick={() => goPage(row)}
                                key={index}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                    "&:hover": {
                                        backgroundColor: "lightgray",
                                        cursor: "pointer",
                                    },
                                }}
                            >
                                <TableCell
                                    component="th"
                                    scope="row"
                                    align="center"
                                    style={{
                                        padding: "10px",
                                        cursor: "pointer",
                                    }}
                                >
                                    {row.index}
                                </TableCell>
                                <TableCell
                                    align="left"
                                    style={{
                                        padding: "5px",
                                        paddingLeft: "30px",
                                        maxWidth: 0,
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {row.title}
                                </TableCell>

                                <TableCell
                                    align="center"
                                    style={{
                                        padding: "10px",
                                        maxWidth: "150px",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                    }}
                                    sx={{
                                        "@media (max-width: 768px)": {
                                            maxWidth: "100px",
                                            fontSize: "0.8rem", // 모바일에서 글자 크기를 줄임
                                        },
                                    }}
                                >
                                    {moment(row.createdAt).format("YYYY-MM-DD")}
                                </TableCell>
                                {/* <TableCell align="center">{row.title}</TableCell> */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* 처음 끝 없는 버전*/}
            {/* <div className="flex justify-center mt-4">
                {getPageNumbers().map((pageNumber) => (
                    <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        disabled={pageNumber === currentPage}
                        className={`mr-2 px-4 py-2 rounded ${
                            pageNumber === currentPage
                                ? "bg-[#41a5ee] text-white"
                                : "bg-gray-300 text-gray-700"
                        }`}
                    >
                        {pageNumber}
                    </button>
                ))}
            </div> */}

            {/* 처음 끝 있는 버전 */}
            <div className="flex justify-center mt-4">
                {[
                    currentPage === 1 ? null : (
                        <button
                            key="first"
                            onClick={() => handlePageChange(1)}
                            style={{
                                marginRight: "2px",
                                padding: "3px 2px",
                                borderRadius: "4px",
                                background: "#ccc",
                                color: "#707070",
                            }}
                        >
                            처음
                        </button>
                    ),
                    // currentPage === 1 ? null : (
                    //     <button
                    //         key="prev"
                    //         onClick={() => handlePageChange(currentPage - 1)}
                    //         className="mr-2 px-4 py-2 rounded bg-gray-300 text-gray-700"
                    //     >
                    //         이전
                    //     </button>
                    // ),
                    getPageNumbersWithNavigation().map((pageNumber, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(pageNumber)}
                            disabled={pageNumber === currentPage}
                            className={`mr-2 px-3 py-2 rounded ${
                                pageNumber === currentPage
                                    ? "bg-[#41a5ee] text-white"
                                    : "bg-gray-300 text-gray-700"
                            }`}
                        >
                            {pageNumber}
                        </button>
                    )),
                    // currentPage ===
                    // Math.ceil(
                    //     (filteredPost.length || 1) / itemsPerPage
                    // ) ? null : (
                    //     <button
                    //         key="next"
                    //         onClick={() => handlePageChange(currentPage + 1)}
                    //         className="mr-2 px-4 py-2 rounded bg-gray-300 text-gray-700"
                    //     >
                    //     다음
                    //     </button>
                    // ),
                    currentPage ===
                    Math.ceil(
                        (filteredPost.length || 1) / itemsPerPage
                    ) ? null : (
                        <button
                            key="last"
                            onClick={() =>
                                handlePageChange(
                                    Math.ceil(
                                        (filteredPost.length || 1) /
                                            itemsPerPage
                                    )
                                )
                            }
                            className="mr-2 px-3 py-2 rounded bg-gray-300 text-gray-700"
                        >
                            끝
                        </button>
                    ),
                ]}
            </div>
        </section>
    );
}
