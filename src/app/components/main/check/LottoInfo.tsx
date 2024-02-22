import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { lotto } from "@/services/check/lotto";
import Loading from "../../util/Loading";

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
    speetto_2000_1: {
        common: { round: string; date: string; inventoryRate: string };
        first: { remaining: string };
        second: { remaining: string };
        third: { remaining: string };
    };
    speetto_2000_2: {
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
    const [loading, setLoading] = useState<boolean>(false); // 초기값을 false로 변경

    /**---------------------------------
     * 데이터 받아올 때까지 loading 표시
    ---------------------------------*/
    useEffect(() => {
        setLoading(false); // 데이터를 받아왔을 때 로딩 상태 해제
    }, [lottoInfo]);

    useEffect(() => {
        getLottery();
    }, []);

    const getLottery = async () => {
        try {
            setLoading(true); // 데이터를 요청할 때 로딩 상태 설정
            console.log(loading);

            const response = await lotto();
            setLottoInfo(response);

            setLoading(false); // 데이터를 받아왔을 때 로딩 상태 해제
        } catch (error) {
            // 오류 처리
        }
    };

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
        // 스피또 1000_1
        {
            title: `${lottoInfo?.speetto_1000_1?.common?.round}`,
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
        // 스피또 1000_2
        {
            title: `${lottoInfo?.speetto_1000_2?.common?.round}`,
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
        // 스피또 2000_1
        {
            title: `${lottoInfo?.speetto_2000_1?.common?.round}`,
            remaining: [
                ["1등", "2등", "3등"],
                ["5억원", "2천만원", "1천만원"],
                [
                    `${lottoInfo?.speetto_2000_1?.first?.remaining} 매`,
                    `${lottoInfo?.speetto_2000_1?.second?.remaining} 매`,
                    `${lottoInfo?.speetto_2000_1?.third?.remaining} 매`,
                ],
            ],
            inventoryRate: [
                `${lottoInfo?.speetto_2000_1?.common?.date}`,
                `${lottoInfo?.speetto_2000_1?.common?.inventoryRate} %`,
            ],
        },
        // 스피또 2000_2
        {
            title: `${lottoInfo?.speetto_2000_2?.common?.round}`,
            remaining: [
                ["1등", "2등", "3등"],
                ["5억원", "2천만원", "1천만원"],
                [
                    `${lottoInfo?.speetto_2000_2?.first?.remaining} 매`,
                    `${lottoInfo?.speetto_2000_2?.second?.remaining} 매`,
                    `${lottoInfo?.speetto_2000_2?.third?.remaining} 매`,
                ],
            ],
            inventoryRate: [
                `${lottoInfo?.speetto_2000_2?.common?.date}`,
                `${lottoInfo?.speetto_2000_2?.common?.inventoryRate} %`,
            ],
        },
    ];

    /**---------------------------------
     * 데이터 받아올 때까지 loading 표시
     ---------------------------------*/
    if (loading) {
        return (
            <div className="flex justify-center items-center mt-[20px]">
                <Loading />
            </div>
        );
    }

    return (
        <section className="flex justify-center items-center border-b border-gray-300">
            <div className="text-center py-[20px]">
                <h2 className="text-3xl font-bold mb-4 text-[#007bc3]">
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
