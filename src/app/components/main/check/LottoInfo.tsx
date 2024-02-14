import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { lotto } from "@/services/check/lotto";

interface LottoInfo {
    speetto_1000_1: {
        common: { round: string; date: string; inventoryRate: string };
        first: { remaining: string };
        second: { remaining: string };
        third: { remaining: string };
    };
    speetto_1000_2: {
        common: { round: string; date: string; inventoryRate: string };
        first: { remaining: string };
        second: { remaining: string };
        third: { remaining: string };
    };
}

export default function LotteryInfo() {
    const { status } = useSession({
        required: true,
        onUnauthenticated() {
            redirect("/");
        },
    });

    /**----------------------------
     * 로또 정보 가져오기
     ----------------------------*/
    const [lottoInfo, setLottoInfo] = useState<LottoInfo | null>(null);

    const getLottery = async () => {
        try {
            const response = await lotto();
            setLottoInfo(response);
        } catch (error) {
            // 오류 처리
        }
    };

    useEffect(() => {
        getLottery();
    }, []);

    /**----------------------------
     * slider
     ----------------------------*/
    const [currentSlide, setCurrentSlide] = useState(0);

    const prevSlide = () => {
        setCurrentSlide(
            currentSlide === 0 ? slides.length - 1 : currentSlide - 1
        );
    };

    const nextSlide = () => {
        setCurrentSlide(
            currentSlide === slides.length - 1 ? 0 : currentSlide + 1
        );
    };

    const slides = [
        {
            title: `스피또1000 ${lottoInfo?.speetto_1000_1?.common?.round}회`,
            remaining: [
                ["1등", "2등", "3등"],
                ["5억원", "2천만원", "1만원"],
                [
                    `${lottoInfo?.speetto_1000_1?.first?.remaining} 매`,
                    `${lottoInfo?.speetto_1000_1?.second?.remaining} 매`,
                    `${lottoInfo?.speetto_1000_1?.third?.remaining} 매`,
                ],
            ],
            inventoryRate: [
                `${lottoInfo?.speetto_1000_1?.common?.date}`,
                `${lottoInfo?.speetto_1000_1?.common?.inventoryRate} %`,
            ],
        },
        {
            title: `스피또1000 ${lottoInfo?.speetto_1000_2?.common?.round}회`,
            remaining: [
                ["1등", "2등", "3등"],
                ["5억원", "2천만원", "1만원"],
                [
                    `${lottoInfo?.speetto_1000_2?.first?.remaining} 매`,
                    `${lottoInfo?.speetto_1000_2?.second?.remaining} 매`,
                    `${lottoInfo?.speetto_1000_2?.third?.remaining} 매`,
                ],
            ],
            inventoryRate: [
                `${lottoInfo?.speetto_1000_2?.common?.date}`,
                `${lottoInfo?.speetto_1000_2?.common?.inventoryRate} %`,
            ],
        },
    ];

    return (
        <section className="flex justify-center items-center border-b border-gray-300 rounded-lg">
            <div className="text-center py-[20px]">
                <h2 className="text-3xl font-bold mb-4">
                    {slides[currentSlide].title}
                </h2>
                <div className="m-4">
                    <h3 className="font-semibold mb-2 text-left">
                        상위등위 잔여수량
                    </h3>
                    <table className="border-collapse border border-black mx-auto table-fixed">
                        <tbody>
                            {slides[currentSlide].remaining.map(
                                (row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {row.map((data, colIndex) => (
                                            <td
                                                key={colIndex}
                                                className="border border-black p-2 w-[100vw]"
                                            >
                                                {data}
                                            </td>
                                        ))}
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="m-4">
                    <h3 className="font-semibold mb-2 text-left">
                        판매점 입고율
                    </h3>
                    <table className="border-collapse border border-black mx-auto table-fixed">
                        <tbody>
                            <tr>
                                {slides[currentSlide].inventoryRate.map(
                                    (data, index) => (
                                        <td
                                            key={index}
                                            className="border border-black  p-2 w-[100vw]"
                                        >
                                            {data}
                                        </td>
                                    )
                                )}
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-center">
                    <button
                        className="mr-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={prevSlide}
                    >
                        이전
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={nextSlide}
                    >
                        다음
                    </button>
                </div>
            </div>
        </section>
    );
}
