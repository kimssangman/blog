import { getNextSequenceValue } from "@/lib/db/counter/counter.model";
import dbConnect from "@/lib/db/dbConnect";
import Voca from "@/lib/db/voca/Voca.model";
import * as yup from "yup";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
    const body = await req.json();

    try {
        /**--------------------------------------
        * 단어 저장 처리 로직
        --------------------------------------*/
        await dbConnect();
        const { word, meaning } = body;

        /**--------------------------------------
        * 단어 중복체크
        --------------------------------------*/
        const findWord = await Voca.findOne({ word: word });

        if (findWord) {
            return new NextResponse(
                JSON.stringify({ message: "이미 추가한 단어입니다." }),
                {
                    status: 500,
                }
            );
        }

        /**--------------------------------------
        * 저장
        --------------------------------------*/
        const savePost = new Voca({
            word,
            meaning,
        });
        await savePost.save();

        return new NextResponse(
            JSON.stringify({ message: "단어 추가 성공함!" }),
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error(error);
        return new NextResponse(
            JSON.stringify({ message: "단어 추가 실패함!" }),
            {
                status: 500,
            }
        );
    }
}
