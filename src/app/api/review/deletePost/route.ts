import dbConnect from "@/lib/db/dbConnect";
import Review from "@/lib/db/review/Review.model";
import { NextResponse } from "next/server";
const ObjectId = require("mongodb").ObjectId;

export async function POST(req: Request, res: Response) {
    const body = await req.json();

    try {
        /**--------------------------------------
        * 리뷰 삭제 처리 로직
        --------------------------------------*/
        await dbConnect();
        const _id = body;

        console.log(body);

        /**--------------------------------------
        * 삭제
        --------------------------------------*/
        await Review.deleteOne({ _id: new ObjectId(_id) });

        return new NextResponse(
            JSON.stringify({ message: "게시글 작성 성공함!" }),
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error(error);
        return new NextResponse(
            JSON.stringify({ message: "게시글 작성 실패함!" }),
            {
                status: 500,
            }
        );
    }
}
