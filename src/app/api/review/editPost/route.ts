import { getNextSequenceValue } from "@/lib/db/counter/counter.model";
import dbConnect from "@/lib/db/dbConnect";
import Review from "@/lib/db/review/Review.model";
import * as yup from "yup";
import { NextResponse } from "next/server";
import sharp from "sharp";
const ObjectId = require("mongodb").ObjectId;

/**-------------------------------------------
 * 이미지 업로드 시 base64로 변환
 * 
 * 이미지 파일 데이터 자체를 저장하는 것이 아니라
 * 다시 이미지 변환을 위하여 base64로 데이터베이스에 저장 후
 * base64 -> 이미지 형태로 변환하여 이미지를 출력한다.
 * 
 * multer를 사용하여 서버에 저장 후 불러오는 방식을 택하려 했으나
 * 서버 용량 문제 및 과부하 문제, 이미지 용량이 큰 경우 최적화 문제가
 * 고민되어 이미지 -> base64 변환하는 방법을 택했다. 
 * 
 * 
 * (추가)
 * base64로 인코딩 시 용량이 늘어나서 이미지 로드 시 너무 느림
 * sharp 사용
 -------------------------------------------*/
// 이미지 파일을 base64로 변환하는 함수
async function resizeAndConvertImage(fileBuffer: ArrayBuffer): Promise<string> {
    // sharp를 사용하여 이미지 크기 조정
    const resizedBuffer = await sharp(fileBuffer)
        .rotate() // 회전 보정
        .resize({ width: 300, height: 300 }) // 필요에 따라 크기 조정
        .toBuffer();

    // 크기 조정된 이미지 버퍼를 base64로 변환
    return Buffer.from(resizedBuffer).toString("base64");
}

export async function POST(req: Request, res: Response) {
    const body = await req.formData();

    const criteria = {
        _id: body.get("_id"),
        region: body.get("region"),
        type: body.get("type"),
        rating: body.get("rating"),
        name: body.get("name"),
        images: await Promise.all(
            body.getAll("images").map(async (file: any) => ({
                name: file.name,
                size: file.size,
                type: file.type,
                lastModified: file.lastModified,
                base64Data: await resizeAndConvertImage(
                    await file.arrayBuffer()
                ),
            }))
        ),
        comment: body.get("comment"),
        location: body.get("location"),
    };

    try {
        await dbConnect(); // 데이터베이스 연결

        console.log(criteria);

        // 리뷰 수정
        const review = await Review.findByIdAndUpdate(
            criteria._id, // 수정할 리뷰의 ID
            criteria, // 변경할 내용
            { new: true } // 수정 후에 업데이트된 문서를 반환하도록 설정
        );

        console.log(review);

        return new NextResponse(
            JSON.stringify({ message: "리뷰 추가 성공함!" }),
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error(error);
        return new NextResponse(
            JSON.stringify({ message: "리뷰 추가 실패함!" }),
            {
                status: 500,
            }
        );
    }
}
