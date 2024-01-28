import dbConnect from "@/lib/db/dbConnect";
import Voca from "@/lib/db/voca/Voca.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        /**--------------------------------------
        * 게시글 목록 가져오기
        --------------------------------------*/
        await dbConnect();

        // $sample을 이용해 서 랜덤하게 추출 후 size 제한
        const voca = await Voca.aggregate([
            {
                $project: {
                    _id: 1,
                    word: 1,
                    meaning: 1,
                },
            },
        ]);

        if (voca) {
            return new NextResponse(JSON.stringify(voca), {
                status: 200,
            });
        }
    } catch (error) {
        return new NextResponse(
            JSON.stringify({
                message: "단어 가져오기 실패!",
                state: "error",
            }),
            {
                status: 405,
            }
        );
    }
}

/**------------------------------------------
 * GET 경로 처리기는 객체 와 함께 메서드를 사용할 때 기본적으로 정적으로 만들어지기 때문에
 * 
 * 동적으로 데이터를 받을 때 눈속임으로 POST로 만들어준다..
 * 그럴거면 POST 쓰지 왜....
 ------------------------------------------*/
export async function POST() {}
