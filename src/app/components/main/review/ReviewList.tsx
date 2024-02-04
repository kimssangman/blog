"use client";

import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
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
        // console.log("부모 -> 자식 / 업데이트된 filter:", filter);
    }, [filter]);

    useEffect(() => {
        // console.log("리뷰 데이터", post);
    }, [post]);

    /*----------------------------------------------------------------
    * 리뷰 리스트 불러오기
    *
    * 이미지 부분은 base64로 변환하여 저장된 image file 데이터를
    * 원래 이미지 상태로 변환하는 작업을 거쳐야한다.
    ----------------------------------------------------------------*/
    const reviewList = async () => {
        try {
            const response = await postList(props.filter);

            console.log(response);
            setPost(
                response.map((post: any) => ({
                    ...post,
                    images: post.images.map((image: any) => ({
                        src: `data:image/jpeg;base64,${image.base64Data}`, // assuming the image type is jpeg
                    })),
                }))
            );
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
     * user session status 확인하여 로딩
     ---------------------------------*/
    if (post.length === 0) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loading />
            </div>
        );
    }

    return (
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
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title={post.name}
                            subheader={new Date(
                                post.createdAt
                            ).toLocaleString()}
                        />
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
                                    {post.images && post.images.length > 0 ? (
                                        <Image
                                            src={post.images[0].src} // Display the first image
                                            width={250}
                                            height={30}
                                            alt={`image-0`}
                                            className="inline-block"
                                        />
                                    ) : (
                                        <Image
                                            src="/images/noImage.png"
                                            width={250}
                                            height={30}
                                            alt="image"
                                            className="inline-block"
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
                            <CardActions disableSpacing>
                                {post.rating}
                            </CardActions>
                        </div>
                    </Card>
                </div>
            ))}
        </div>
    );
}
