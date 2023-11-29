import { getNextSequenceValue } from "@/lib/db/counter/counter.model";
import dbConnect from "@/lib/db/dbConnect";
import Board from "@/lib/db/board/Board.model";
import * as yup from "yup";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
    const body = await req.json();

    try {
        /**--------------------------------------
        * 게시글 저장 처리 로직
        --------------------------------------*/
        await dbConnect();
        const { title, idea, input, output, contents } = body;
        const index = await getNextSequenceValue("index");

        /**--------------------------------------
        * 저장
        --------------------------------------*/
        const savePost = new Board({
            index,
            title,
            idea,
            input,
            output,
            contents,
        });
        await savePost.save();

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
