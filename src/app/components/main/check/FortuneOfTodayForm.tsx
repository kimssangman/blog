import React from "react";
import { useEffect, useState } from "react";
import { fortuneOfToday } from "@/services/check/fortuneOfToday";

export default function WriteButton() {
    const [fortuneOfTodayValue, setFortuneOfToday] = useState([]); // 운세

    useEffect(() => {
        getFortuneOfToday();
    }, []);

    /**---------------------------
     * 오늘의 운세 가져오기
     ---------------------------*/
    const getFortuneOfToday = async () => {
        try {
            const response = await fortuneOfToday();
            setFortuneOfToday(response); // 데이터를 변수에 저장

            console.log(response);
        } catch (error) {
            // 오류 처리
        }
    };

    return <div className="mt-[25px]">{fortuneOfTodayValue}</div>;
}
