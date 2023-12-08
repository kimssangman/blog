import React from "react";
import { useEffect, useState } from "react";
import { fortuneOfToday } from "@/services/check/fortuneOfToday";

export default function FortuneOfTodayForm({ character }: any) {
    const [fortuneOfTodayValue, setFortuneOfToday] = useState([]); // 운세

    useEffect(() => {
        getFortuneOfToday(); // character가 변경될 때마다 호출됨
    }, [character]); // character 상태가 변경될 때 useEffect 호출

    /**---------------------------
     * 오늘의 운세 가져오기
     ---------------------------*/
    const getFortuneOfToday = async () => {
        try {
            const response = await fortuneOfToday(character);
            setFortuneOfToday(response); // 데이터를 변수에 저장

            console.log(response);
        } catch (error) {
            // 오류 처리
        }
    };

    return <div className="mt-[25px]">{fortuneOfTodayValue}</div>;
}
