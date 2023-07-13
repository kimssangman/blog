
import { NextResponse } from 'next/server'


export async function POST(req: Request, res: Response) {
    const body = await req.json();

    console.log('서버입니다', body)

    try {

        return new NextResponse(JSON.stringify(body), {
            status: 200,
        });

    } catch (error) {
        return new NextResponse(JSON.stringify({ message: 'ip 가져오기 실패!', state: 'error' }), {
            status: 405,
        });
    }
}