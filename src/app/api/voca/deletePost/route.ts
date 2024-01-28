import { getNextSequenceValue } from "@/lib/db/counter/counter.model";
import dbConnect from "@/lib/db/dbConnect";
import Voca from "@/lib/db/voca/Voca.model";
import * as yup from "yup";
import { NextResponse } from "next/server";
const ObjectId = require("mongodb").ObjectId;

export async function POST(req: Request, res: Response) {
    const body = await req.json();

    try {
        /**--------------------------------------
        * 단어 삭제 처리 로직
        --------------------------------------*/
        await dbConnect();
        const _id = body;

        const result = await Voca.deleteOne({ _id: new ObjectId(_id) });

        return new NextResponse(
            JSON.stringify({ message: "단어 편집 성공함!" }),
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error(error);
        return new NextResponse(
            JSON.stringify({ message: "단어 편집 실패함!" }),
            {
                status: 500,
            }
        );
    }
}
