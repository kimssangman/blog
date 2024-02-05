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

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function ReviewList(props: any) {
    const [filter, setFilter] = useState<Form>({
        region: "전체",
        type: "전체",
        rating: "전체",
    });

    const [post, setPost] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(false); // 초기값을 false로 변경

    /*--------------------------------
    * 부모 -> 다른 자식
    * 자식이 보낸 데이터를 부모가 받은 뒤 
    * 부모가 다른 자식에게 보낸 데이터를 다른 자식이 받았음
    * 
    *  ReviewFilter에서 지역, 유형, 별점 데이터 받음
    --------------------------------*/
    // 리뷰 추가가 완료 됐을 때 업데이트
    useEffect(() => {
        setFilter(props);

        // 리스트 업데이트
        reviewList();
    }, [props]);

    useEffect(() => {
        // console.log("부모 -> 자식 / 업데이트된 filter:", filter);
    }, [filter]);

    useEffect(() => {
        // console.log("리뷰 데이터", post);
        setLoading(false); // 데이터를 받아왔을 때 로딩 상태 해제
    }, [post]);

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

            console.log(response);
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
    const detailReview = (post: any) => {
        props.onData(post);
    };

    /**---------------------------------
     * 메뉴 버튼을 눌리면 상세 기능
     ---------------------------------*/
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
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
                {post.map((post) => (
                    <div
                        key={post._id}
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                        }}
                    >
                        <Card sx={{ maxWidth: 300, margin: "10px" }}>
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
                                    <IconButton
                                        aria-label="settings"
                                        id="basic-button"
                                        aria-controls={
                                            open ? "basic-menu" : undefined
                                        }
                                        aria-haspopup="true"
                                        aria-expanded={
                                            open ? "true" : undefined
                                        }
                                        onClick={handleClick}
                                    >
                                        <MoreVertIcon />
                                    </IconButton>
                                }
                                title={
                                    <Typography
                                        style={{
                                            fontSize: "17px",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {post.name} {/* 이름 정보 */}
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
                                            {post.rating} {/* 별점 정보 */}
                                        </Typography>
                                        {/* 별점과 날짜 사이의 간격 조절 */}
                                        {new Date(
                                            post.createdAt
                                        ).toLocaleString()}{" "}
                                        {/* 날짜 정보 */}
                                    </div>
                                }
                            />
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    "aria-labelledby": "basic-button",
                                }}
                                PaperProps={{
                                    style: {
                                        boxShadow:
                                            "0px 4px 8px rgba(0, 0, 0, 0.1)",
                                    },
                                }}
                            >
                                <MenuItem
                                    onClick={handleClose}
                                    style={{
                                        borderBottom: "1px solid #CCCCCC",
                                        paddingLeft: "8px", // 조절 가능한 값
                                    }}
                                >
                                    수정하기
                                </MenuItem>
                                <MenuItem
                                    onClick={handleClose}
                                    style={{
                                        paddingLeft: "8px", // 조절 가능한 값
                                    }}
                                >
                                    삭제하기
                                </MenuItem>
                            </Menu>
                            <div
                                className="cursor-pointer"
                                onClick={() => detailReview(post)}
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
                                        {post.images &&
                                        post.images.length > 0 ? (
                                            <Image
                                                loading="lazy"
                                                src={post.images[0].src} // Display the first image
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
                                    >
                                        {post.comment}
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
