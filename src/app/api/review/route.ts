import dbConnect from "@/lib/db/dbConnect";
import Review from "@/lib/db/review/Review.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
    const body = await req.json();

    console.log("reveiw_route", body);
    try {
        /**--------------------------------------
        * 리뷰 목록 가져오기
        --------------------------------------*/
        await dbConnect();

        const review = await Review.aggregate([
            {
                $match: {
                    region:
                        body.region === "전체"
                            ? { $exists: true }
                            : body.region,
                    type: body.type === "전체" ? { $exists: true } : body.type,
                    rating:
                        body.rating === "전체"
                            ? { $exists: true }
                            : body.rating,
                },
            },
            {
                $sort: {
                    _id: -1,
                },
            },
        ]);

        // console.log(review);

        if (review) {
            return new NextResponse(JSON.stringify(review), {
                status: 200,
            });
        }
    } catch (error) {
        return new NextResponse(
            JSON.stringify({
                message: "게시글 가져오기 실패!",
                state: "error",
            }),
            {
                status: 405,
            }
        );
    }
}
