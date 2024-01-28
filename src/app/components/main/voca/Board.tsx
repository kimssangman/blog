"use client";

import React, { useState } from "react";
import WriteButton from "./WriteButton";
import QuizForm from "./QuizForm";
import EditButton from "./EditButton";

export default function Board() {
    return (
        <section className="lg:m-auto lg:w-[60%] lg:mt-[120px] mx-[20px] mt-[100px] mb-[20px]">
            <div className="flex justify-between items-end">
                {/* 왼쪽 끝 버튼 */}
                <EditButton />
                {/* 오른쪽 끝 버튼 */}
                <WriteButton />
            </div>
            <div>
                <QuizForm />
            </div>
        </section>
    );
}
