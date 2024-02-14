import React from "react";
import { useEffect, useState } from "react";
import { fortuneOfToday } from "@/services/check/fortuneOfToday";

interface FortuneData {
    luck: {
        total_luck_summary: string;
        total_luck: string;
        money_luck: string;
    };
}

interface ToggleData {
    totalLuck: boolean;
    moneyLuck: boolean;
}

export default function FortuneOfTodayForm({ character }: any) {
    // 운세
    const [fortuneOfTodayValue, setFortuneOfToday] =
        useState<FortuneData | null>();

    /**---------------------------
     * 토글 버튼
     ---------------------------*/
    const [showDetails, setShowDetails] = useState<ToggleData>({
        totalLuck: true,
        moneyLuck: true,
    });

    const toggleDetails = (type: keyof ToggleData) => {
        setShowDetails({
            ...showDetails,
            [type]: !showDetails[type],
        });
    };

    /**---------------------------
     * 오늘의 운세 가져오기
     ---------------------------*/
    const getFortuneOfToday = async () => {
        try {
            const response = await fortuneOfToday(character);
            setFortuneOfToday(response); // 데이터를 변수에 저장
        } catch (error) {
            // 오류 처리
        }
    };

    useEffect(() => {
        getFortuneOfToday(); // character가 변경될 때마다 호출됨
    }, [character]); // character 상태가 변경될 때 useEffect 호출

    return (
        <section>
            <div>
                <div className="border-b border-gray-300">
                    <div
                        onClick={() => toggleDetails("totalLuck")}
                        className="p-[13px] cursor-pointer flex justify-between items-center"
                    >
                        <strong className="text-[20px]">🍀 총운</strong>
                        <span>{showDetails.totalLuck ? "▲" : "▼"}</span>
                    </div>
                    {showDetails.totalLuck && (
                        <div className="p-[13px]">
                            <div>
                                <span className="text-[18px]">
                                    운세의 총운은 &nbsp;
                                    <strong>
                                        {
                                            fortuneOfTodayValue?.luck
                                                .total_luck_summary
                                        }
                                    </strong>
                                    &nbsp; 입니다.
                                </span>
                            </div>
                            <div className="mt-[10px]">
                                <span className="text-[15px]">
                                    {fortuneOfTodayValue?.luck.total_luck}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
                <div className="mt-[20px] border-b border-gray-300">
                    <div
                        onClick={() => toggleDetails("moneyLuck")}
                        className="p-[13px] cursor-pointer flex justify-between items-center"
                    >
                        <strong className="text-[20px]">💰 금전운</strong>
                        <span>{showDetails.moneyLuck ? "▲" : "▼"}</span>
                    </div>
                    {showDetails.moneyLuck && (
                        <div className="p-[13px]">
                            <div className="mt-[10px]">
                                <span className="text-[15px]">
                                    {fortuneOfTodayValue?.luck.money_luck}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
