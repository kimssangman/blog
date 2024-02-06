import dbConnect from "@/lib/db/dbConnect";
import Review from "@/lib/db/review/Review.model";
import { NextResponse } from "next/server";
const ObjectId = require("mongodb").ObjectId;

export async function POST(req: Request, res: Response) {
    const body = await req.json();

    try {
        /**--------------------------------------
        * 리뷰 가져오기 처리 로직
        --------------------------------------*/
        await dbConnect();
        const _id = body;

        /**--------------------------------------
        * 가져오기
        --------------------------------------*/
        const review = await Review.findOne({ _id: new ObjectId(_id) });

        return new NextResponse(
            JSON.stringify({
                message: "게시글 가져오기 성공함!",
                data: review,
            }),
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error(error);
        return new NextResponse(
            JSON.stringify({ message: "게시글 가져오기 실패함!" }),
            {
                status: 500,
            }
        );
    }
}
