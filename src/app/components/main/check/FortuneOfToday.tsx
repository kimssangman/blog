import React from "react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { fortuneOfToday } from "@/services/check/fortuneOfToday";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

export default function WriteButton() {
    const [fortuneOfTodayValue, setFortuneOfToday] = useState([]); // 운세
    const [value, setValue] = React.useState("1"); // Tab

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    useEffect(() => {
        getFortuneOfToday();
    }, []);

    const router = useRouter();

    /**----------------------------
     * 사용자 session 확인
     ----------------------------*/
    const session: any = useSession();

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
                    <div>
                        <Image
                            src="/images/rabbit.png"
                            width={70}
                            height={70}
                            alt="logo"
                            className="m-auto sm:w-[30px] lg:w-[100px] "
                        />
                    </div>
                    <div className="mt-[25px]">{fortuneOfTodayValue}</div>
                </TabPanel>
                <TabPanel value="2" className="bg-white shadow-lg p-4">
                    준비 중입니다.
                </TabPanel>
            </TabContext>
        </Box>
    );
}
