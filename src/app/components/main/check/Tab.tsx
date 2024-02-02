"use strict";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import FortuneOfTodayForm from "./FortuneOfTodayForm";
import LottoForm from "./LottoForm";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Image from "next/image";

export default function WriteButton() {
    const [value, setValue] = React.useState("1"); // Tab
    const [date, setDate] = useState<Date>(new Date());
    const [character, setCharacter] = useState("쥐");

    // 오늘 날짜
    const formatDateString = (date: Date) => {
        const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
        const formattedDate = `${date.getFullYear()}.${(
            "0" + String(date.getMonth() + 1)
        ).slice(-2)}.${("0" + String(date.getDate())).slice(-2)} (${
            daysOfWeek[date.getDay()]
        })`;

        return formattedDate;
    };

    // 탭 전환
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    // 캐릭터 누르면 운세 변경
    const handleFortuneOfTodayChange = (character: any) => {
        setCharacter(character);
    };

    return (
        <Box className="w-full" sx={{ typography: "body1" }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList
                        onChange={handleChange}
                        aria-label="lab API tabs example"
                        variant="fullWidth"
                    >
                        <Tab label="오늘의 금전운" value="1" />
                        <Tab label="로또" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1" className="bg-white shadow-lg p-4">
                    <div className="flex mb-[20px]">
                        <Image
                            src="/images/mouse.png"
                            width={70}
                            height={70}
                            alt="logo"
                            style={{
                                filter: "drop-shadow(6px 6px 1px #c3c3c3)",
                            }}
                            className="m-auto sm:w-[30px] lg:w-[100px] cursor-pointer transition duration-300 ease-in-out transform hover:scale-110"
                            onClick={() => handleFortuneOfTodayChange("쥐")}
                        />
                        <Image
                            src="/images/rabbit.png"
                            width={70}
                            height={70}
                            alt="logo"
                            style={{
                                filter: "drop-shadow(6px 6px 1px #c3c3c3)",
                            }}
                            className="m-auto sm:w-[30px] lg:w-[100px] cursor-pointer transition duration-300 ease-in-out transform hover:scale-110"
                            onClick={() => handleFortuneOfTodayChange("토끼")}
                        />
                    </div>
                    <div className="text-center">
                        <div>{formatDateString(date)}</div>
                        <strong>{character} 운세</strong>
                    </div>

                    {/* 운세 부분 */}
                    <div className="mt-[25px]">
                        <FortuneOfTodayForm character={character} />
                    </div>
                </TabPanel>
                <TabPanel value="2" className="bg-white shadow-lg p-4">
                    <LottoForm />
                </TabPanel>
            </TabContext>
        </Box>
    );
}
