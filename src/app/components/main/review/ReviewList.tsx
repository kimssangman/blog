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

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

type Form = {
    region: string;
    type: string;
    rating: string;
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
        region: "",
        type: "",
        rating: "",
    });

    /*--------------------------------
    * 부모 -> 다른 자식
    * 자식이 보낸 데이터를 부모가 받은 뒤 
    * 부모가 다른 자식에게 보낸 데이터를 다른 자식이 받았음
    * 
    *  ReviewFilter에서 지역, 유형, 별점 데이터 받음
    --------------------------------*/
    useEffect(() => {
        setFilter(props);
    }, [props.filter]);

    useEffect(() => {
        console.log("부모 -> 자식 / 업데이트된 filter:", filter);
    }, [filter]);

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
            <div
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
                        title="Shrimp and Chorizo Paella"
                        subheader="September 14, 2016"
                    />
                    <CardMedia
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Image
                            src={"/images/noImage.png"}
                            width={250}
                            height={30}
                            alt="user"
                            className="inline-block"
                        />
                    </CardMedia>
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            This impressive paella is a perfect party dish and a
                            fun meal to cook together with your guests. Add 1
                            cup of frozen peas along with the mussels, if you
                            like.
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>⭐⭐⭐⭐⭐</CardActions>
                </Card>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
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
                        title="Shrimp and Chorizo Paella"
                        subheader="September 14, 2016"
                    />
                    <CardMedia
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Image
                            src={"/images/noImage.png"}
                            width={250}
                            height={30}
                            alt="user"
                            className="inline-block"
                        />
                    </CardMedia>
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            This impressive paella is a perfect party dish and a
                            fun meal to cook together with your guests. Add 1
                            cup of frozen peas along with the mussels, if you
                            like.
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>⭐⭐⭐⭐⭐</CardActions>
                </Card>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
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
                        title="Shrimp and Chorizo Paella"
                        subheader="September 14, 2016"
                    />
                    <CardMedia
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Image
                            src={"/images/noImage.png"}
                            width={250}
                            height={30}
                            alt="user"
                            className="inline-block"
                        />
                    </CardMedia>
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            This impressive paella is a perfect party dish and a
                            fun meal to cook together with your guests. Add 1
                            cup of frozen peas along with the mussels, if you
                            like.
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>⭐⭐⭐⭐⭐</CardActions>
                </Card>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
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
                        title="Shrimp and Chorizo Paella"
                        subheader="September 14, 2016"
                    />
                    <CardMedia
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Image
                            src={"/images/noImage.png"}
                            width={250}
                            height={30}
                            alt="user"
                            className="inline-block"
                        />
                    </CardMedia>
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            This impressive paella is a perfect party dish and a
                            fun meal to cook together with your guests. Add 1
                            cup of frozen peas along with the mussels, if you
                            like.
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>⭐⭐⭐⭐⭐</CardActions>
                </Card>
            </div>
            <div>
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
                        title="Shrimp and Chorizo Paella"
                        subheader="September 14, 2016"
                    />
                    <CardMedia
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Image
                            src={"/images/noImage.png"}
                            width={250}
                            height={30}
                            alt="user"
                            className="inline-block"
                        />
                    </CardMedia>
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            This impressive paella is a perfect party dish and a
                            fun meal to cook together with your guests. Add 1
                            cup of frozen peas along with the mussels, if you
                            like.
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>⭐⭐⭐⭐⭐</CardActions>
                </Card>
            </div>
            <div>
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
                        title="Shrimp and Chorizo Paella"
                        subheader="September 14, 2016"
                    />
                    <CardMedia
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Image
                            src={"/images/noImage.png"}
                            width={250}
                            height={30}
                            alt="user"
                            className="inline-block"
                        />
                    </CardMedia>
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            This impressive paella is a perfect party dish and a
                            fun meal to cook together with your guests. Add 1
                            cup of frozen peas along with the mussels, if you
                            like.
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>⭐⭐⭐⭐⭐</CardActions>
                </Card>
            </div>
            <div>
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
                        title="Shrimp and Chorizo Paella"
                        subheader="September 14, 2016"
                    />
                    <CardMedia
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Image
                            src={"/images/noImage.png"}
                            width={250}
                            height={30}
                            alt="user"
                            className="inline-block"
                        />
                    </CardMedia>
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            This impressive paella is a perfect party dish and a
                            fun meal to cook together with your guests. Add 1
                            cup of frozen peas along with the mussels, if you
                            like.
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>⭐⭐⭐⭐⭐</CardActions>
                </Card>
            </div>
            <div>
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
                        title="Shrimp and Chorizo Paella"
                        subheader="September 14, 2016"
                    />
                    <CardMedia
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Image
                            src={"/images/noImage.png"}
                            width={250}
                            height={30}
                            alt="user"
                            className="inline-block"
                        />
                    </CardMedia>
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            This impressive paella is a perfect party dish and a
                            fun meal to cook together with your guests. Add 1
                            cup of frozen peas along with the mussels, if you
                            like.
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>⭐⭐⭐⭐⭐</CardActions>
                </Card>
            </div>
        </div>
    );
}
