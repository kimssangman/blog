import React from "react";
import { useSession } from "next-auth/react";
import FortuneOfTodayForm from "./FortuneOfTodayForm";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Image from "next/image";

export default function WriteButton() {
    const [value, setValue] = React.useState("1"); // Tab

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
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

                    {/* 운세 부분 */}
                    <div className="mt-[25px]">
                        <FortuneOfTodayForm />
                    </div>
                </TabPanel>
                <TabPanel value="2" className="bg-white shadow-lg p-4">
                    준비 중입니다.
                </TabPanel>
            </TabContext>
        </Box>
    );
}
