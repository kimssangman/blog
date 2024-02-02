"use client";

import React, { useState } from "react";
import TableForm from "./TableForm";
import WriteButton from "./WriteButton";
import Search from "./../../util/Search";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Board() {
    /**---------------------------------
     * user token session 확인
     * 
     * onUnauthenticated() 함수가 session을 가지고 있는지 파악하여
     * 없으면 redirect 해줍니다.
     ---------------------------------*/
    const { status } = useSession({
        required: true,
        onUnauthenticated() {
            redirect("/");
        },
    });

    const [searchValue, setSearchValue] = useState("");

    const handleSearch = (value: any) => {
        setSearchValue(value);
    };

    return (
        <section>
            <div className="lg:m-auto lg:w-[60%] lg:mt-[100px] mx-[20px] mt-[70px] mb-[20px]">
                <div className="lg:flex sm:flex justify-between sm:flex-row-reverse flex-col">
                    <WriteButton />
                    <Search onSearch={handleSearch} />
                </div>
                <TableForm searchValue={searchValue} />
            </div>
        </section>
    );
}
