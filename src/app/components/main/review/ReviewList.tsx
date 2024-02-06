"use client";

import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Image from "next/image";
import { postList } from "@/services/review/postList";
import Loading from "../../util/Loading";
import { Snackbar, SnackbarOrigin } from "@mui/material";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { deletePost } from "@/services/review/deletePost";

interface State extends SnackbarOrigin {
    open: boolean;
}
interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

type Form = {
    region: string;
    type: string;
    rating: string;
};

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

const CardContainer = styled("div")({
    display: "flex",
    flexDirection: "column",
    maxWidth: 300,
    margin: "10px",
});

const ImageContainer = styled("div")({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 250, // 이미지 크기
    overflow: "hidden",
});

export default function ReviewList(props: any) {
    /**----------------------------
     * 사용자 session 확인
     ----------------------------*/
    const session: any = useSession();

    const [filter, setFilter] = useState<Form>({
        region: "전체",
        type: "전체",
        rating: "전체",
    });

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

    const [post, setPost] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(false); // 초기값을 false로 변경

    /*--------------------------------
    * 부모 -> 다른 자식
    * 자식이 보낸 데이터를 부모가 받은 뒤 
    * 부모가 다른 자식에게 보낸 데이터를 다른 자식이 받았음
    * 
    *  ReviewFilter에서 지역, 유형, 별점 데이터 받음
    --------------------------------*/
    useEffect(() => {
        setFilter(props);

        // 리스트 업데이트
        reviewList();
    }, [props.filter]);

    useEffect(() => {
        // console.log("리뷰 데이터", post);
        setLoading(false); // 데이터를 받아왔을 때 로딩 상태 해제
    }, [post]);

    /*--------------------------------
    * 부모 -> 다른 자식
    * 자식이 보낸 데이터를 부모가 받은 뒤 
    * 부모가 다른 자식에게 보낸 데이터를 다른 자식이 받았음
    * 
    * 리뷰 추가가 완료 됐을 때 업데이트
    * 
    * 굳이 따로 둔 이유가, modal을 닫으면 다시 새로고침 돼 스크롤이 맨 위로 올라감
    --------------------------------*/
    useEffect(() => {
        setFilter(props);

        // 리스트 업데이트
        reviewList();
    }, [props.update]);

    /*----------------------------------------------------------------
    * 리뷰 리스트 불러오기
    *
    * 이미지 부분은 base64로 변환하여 저장된 image file 데이터를
    * 원래 이미지 상태로 변환하는 작업을 거쳐야한다.
    ----------------------------------------------------------------*/
    const reviewList = async () => {
        try {
            setLoading(true); // 데이터를 요청할 때 로딩 상태 설정
            const response = await postList(props.filter);

            const transformedData = response.map((post: any) => ({
                ...post,
                images: post.images.map((image: any) => ({
                    src: `data:image/jpeg;base64,${image.base64Data}`, // assuming the image type is jpeg
                })),
            }));

            setPost(transformedData);
            setLoading(false); // 데이터를 받아왔을 때 로딩 상태 해제
        } catch (error) {
            // 오류 처리
        }
    };

    /*----------------------------------------------------------------
    * 리뷰 상세보기
    *
    * 해당 리뷰의 데이터를 modal로 넘겨준다.
    ----------------------------------------------------------------*/
    const detailReview_onData = (post: any) => {
        props.onData(post, "detail"); // 'detail'를 추가하여 상세보기로 전달
    };

    /*----------------------------------------------------------------
    * 리뷰 편집하기
    *
    * 해당 리뷰의 데이터를 modal로 넘겨준다.
    ----------------------------------------------------------------*/
    const editReview_onData = (post: any) => {
        props.onData(post, "edit"); // 'edit'을 추가하여 편집하기로 전달
    };

    /**---------------------------------
     * 메뉴 버튼을 눌리면 상세 기능
     ---------------------------------*/
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [selectedPost, setSelectedPost] = useState<any>(null);

    const handleMenuClick = (
        event: React.MouseEvent<HTMLButtonElement>,
        post: any
    ) => {
        setAnchorEl(event.currentTarget);
        setSelectedPost(post);
        setMenuOpen(true);
    };

    const handleMenuItemClick = (action: string) => {
        setMenuOpen(false);
        if (action === "delete" && selectedPost) {
            deleteReview(selectedPost);
        } else if (action == "edit" && selectedPost) {
            editReview(selectedPost);
        }
    };

    const closeMenu = () => {
        setAnchorEl(null);
        setMenuOpen(false);
    };

    /**---------------------------------
     * 메뉴 버튼 중 편집 기능 -> 구현 안 됐음
     ---------------------------------*/
    const editReview = (post: any) => {
        if (session?.data?.user?.admin) {
            // 편집 모달 띄우기
            editReview_onData(post);
        }

        if (session.data == null || !session.data.user.admin) {
            setSnackbarMessage("❌ 권한이 없습니다.");
            setSnackbarState((prev) => ({ ...prev, open: true }));
            return;
        }
        return;
    };

    /**---------------------------------
     * 메뉴 버튼 중 삭제 기능
     ---------------------------------*/
    const deleteReview = (post: any) => {
        // 어드민일 경우에만 삭제 가능
        if (session?.data?.user?.admin) {
            deletePost(post._id)
                .then((res: any) => {
                    setSnackbarMessage("✅ 삭제되었습니다.");
                    setSnackbarState((prev) => ({ ...prev, open: true }));
                    reviewList();
                })
                .catch((err) => {
                    // 리뷰 추가 실패 시에도 버튼 기능 다시 활성화
                    setSnackbarMessage("😣 삭제 오류.");
                    setSnackbarState((prev) => ({ ...prev, open: true }));
                });
        }

        if (session.data == null || !session.data.user.admin) {
            setSnackbarMessage("❌ 권한이 없습니다.");
            setSnackbarState((prev) => ({ ...prev, open: true }));
            return;
        }
    };

    /**---------------------------------
     * 데이터 받아올 때까지 loading 표시
     ---------------------------------*/
    if (loading) {
        return (
            <div className="flex justify-center items-center mt-[20px]">
                <Loading />
            </div>
        );
    }

    if (post.length === 0) {
        return (
            <div className="mt-[20px] mb-[10px] text-center">
                <h2 className="text-l text-gray-500">검색 결과가 없습니다.</h2>
            </div>
        );
    }

    return (
        <div>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={snackbarOpen}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
                key={vertical + horizontal}
                autoHideDuration={1000}
            />
            <div className="mt-[20px] mb-[10px] text-center">
                <h2 className="text-l text-gray-500">
                    {post.length}개의 검색 결과가 있습니다.
                </h2>
            </div>
            <div
                className="flex"
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    alignItems: "flex-start",
                }}
            >
                {post.map((postItem) => (
                    <div key={postItem._id}>
                        <Card
                            sx={{
                                maxWidth: 300,
                                margin: "10px",
                                minWidth: 300,
                            }}
                        >
                            <CardHeader
                                avatar={
                                    <Image
                                        src={"/images/profile.png"}
                                        width={30}
                                        height={30}
                                        alt="user"
                                        className="inline-block"
                                    />
                                }
                                action={
                                    <button
                                        onClick={(e) =>
                                            handleMenuClick(e, postItem)
                                        }
                                        style={{
                                            background: "none",
                                            border: "none",
                                            cursor: "pointer",
                                        }}
                                    >
                                        <MoreVertIcon />
                                    </button>
                                }
                                title={
                                    <Typography
                                        style={{
                                            fontSize: "17px",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {postItem.name} {/* 이름 정보 */}
                                    </Typography>
                                }
                                subheader={
                                    <div
                                        style={{
                                            fontSize: "small",
                                        }}
                                    >
                                        <Typography
                                            variant="body2"
                                            color="text.primary"
                                            style={{
                                                fontWeight: "bold",
                                                marginBottom: "5px",
                                            }}
                                        >
                                            {postItem.rating} {/* 별점 정보 */}
                                        </Typography>
                                        {/* 별점과 날짜 사이의 간격 조절 */}
                                        {new Date(
                                            postItem.createdAt
                                        ).toLocaleString()}{" "}
                                        {/* 날짜 정보 */}
                                    </div>
                                }
                            />
                            {menuOpen && selectedPost && anchorEl && (
                                <Menu
                                    anchorEl={anchorEl}
                                    open={menuOpen}
                                    onClose={closeMenu}
                                    PaperProps={{
                                        style: {
                                            position: "absolute",
                                            top: anchorEl.offsetTop + 40,
                                            left: anchorEl.offsetLeft,
                                            background: "#fff",
                                            padding: "10px",
                                            borderRadius: "5px",
                                            boxShadow:
                                                "0px 4px 8px rgba(0, 0, 0, 0.1)",
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                        },
                                    }}
                                >
                                    <MenuItem
                                        onClick={() =>
                                            handleMenuItemClick("edit")
                                        }
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "5px",
                                            padding: "8px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        <Typography>수정하기</Typography>
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() =>
                                            handleMenuItemClick("delete")
                                        }
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "5px",
                                            padding: "8px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        <Typography>삭제하기</Typography>
                                    </MenuItem>
                                </Menu>
                            )}
                            <div
                                className="cursor-pointer"
                                onClick={() => detailReview_onData(postItem)}
                            >
                                <CardMedia
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <div className="p-2 border">
                                        {/* 첫 번째 이미지만 보여주기 */}
                                        {/* 이미지가 있는 경우에만 보여주기 */}
                                        {postItem.images &&
                                        postItem.images.length > 0 ? (
                                            <Image
                                                loading="lazy"
                                                src={postItem.images[0].src} // Display the first image
                                                width={250}
                                                height={30}
                                                alt={`image-0`}
                                                className="inline-block"
                                                sizes="250px"
                                            />
                                        ) : (
                                            <Image
                                                src="/images/noImage.png"
                                                width={250}
                                                height={30}
                                                alt="image"
                                                className="inline-block"
                                                sizes="250px"
                                            />
                                        )}
                                        {/* 이미지 여러개 보여주기*/}
                                        {/* {post.images.map((image, index) => (
                                <Image
                                    key={`${post._id}-${index}`}
                                    src={image.src} // replace with actual image source
                                    width={250}
                                    height={30}
                                    alt={`image-${index}`}
                                    className="inline-block"
                                />
                            ))} */}
                                    </div>
                                </CardMedia>
                                <CardContent>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        noWrap
                                    >
                                        {postItem.comment}
                                    </Typography>
                                </CardContent>
                                {/* <CardActions disableSpacing>
                                    {post.rating}
                                </CardActions> */}
                            </div>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
}
