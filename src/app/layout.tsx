import './globals.css'
import type { Metadata } from 'next'
import { NextAuthProvider } from './providers'
import { Inter, Roboto, Noto_Sans_KR } from "next/font/google"; // Roboto와 한글 NotoSans를 사용합니다.

const inter = Inter({ subsets: ['latin'] })

const notoSansKr = Noto_Sans_KR({
    // preload: true, 기본값
    subsets: ["latin"], // 또는 preload: false
    weight: ["100", "400", "700", "900"], // 가변 폰트가 아닌 경우, 사용할 fontWeight 배열
});

const roboto = Roboto({
    subsets: ["latin"], // preload에 사용할 subsets입니다.
    weight: ["100", "400", "700"],
    variable: "--roboto", // CSS 변수 방식으로 스타일을 지정할 경우에 사용합니다.
});

export const metadata: Metadata = {
    title: '반가워요!',
    description: '김상민 블로그',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <html lang="en" className={notoSansKr.className}>
            <body>
                {/* 만든 Provider로 자식 컴포넌트 감싸 모든 컴포넌트 guard를 담당합니다.*/}
                <NextAuthProvider>
                    {/* Recoil 상태관리 라이브러리 */}
                    {/* <RecoilRoot> */}
                    {children}
                    {/* </RecoilRoot> */}
                </NextAuthProvider>
            </body>
        </html>
    )
}