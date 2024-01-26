"use client";

import React, { useState } from "react";
import WriteButton from "./WriteButton";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import QuizForm from "./QuizForm";

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

    return (
        <section>
            <div className="lg:m-auto lg:w-[60%] lg:mt-[120px] mx-[20px] mt-[100px] mb-[20px]">
                <div className="flex flex-col sm:flex-row-reverse items-end">
                    <WriteButton />
                </div>
            </div>
            <div>
                <QuizForm />
            </div>
        </section>
    );
}
