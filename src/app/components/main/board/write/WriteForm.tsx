"use client";

import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";
import { writePost } from "@/services/board/writePost";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";

type Form = {
    title: string;
    idea: string;
    input: string;
    output: string;
    contents: string;
};

export default function WriteForm() {
    // 라우팅
    const router = useRouter();

    const { status } = useSession({
        required: true,
        onUnauthenticated() {
            redirect("/signIn");
        },
    });

    const [form, setForm] = useState<Form>({
        title: "",
        idea: "",
        input: "",
        output: "",
        contents: "",
    });

    const onChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();

        // 게시글 작성
        writePost(form)
            .then((res: any) => {
                // 라우팅
                router.replace("/main/board");
            })
            .catch(() => {});
    };

    return (
        /**------------------------------
         * 모바일 적용
         * sm, md, lg, xl, 2xl
         * 
         * 갈수록 화면 작아짐
         * 2xl:w-[30%] xl:w-[40%] lg:w-[40%] md:w-[80%]
         * 
         * 컴퓨터에서는 md:mt-[90px]
         * 모바일에서는 mt-[60px] 
         ------------------------------*/
        <section className="flex justify-center items-center w-full md:mt-[90px] mt-[60px] ">
            <div className="w-full 2xl:w-[30%] xl:w-[40%] lg:w-[40%] md:w-[80%] mx-auto ">
                <form
                    onSubmit={onSubmit}
                    className="flex flex-col border p-4 md:p-8 bg-white rounded-[20px] md:rounded-[40px] lg:rounded-[60px] drop-shadow-xl min-h-[400px]"
                >
                    <Image
                        src="/images/code_write.png"
                        width={50}
                        height={50}
                        alt="logo"
                        className="m-auto"
                    />
                    <span className="w-full border-2"></span>

                    {/* title */}
                    <label
                        htmlFor="title"
                        className="font-semibold mt-3 md:mt-4"
                    >
                        문제
                    </label>
                    <textarea
                        className="bg-gray-200 shadow-inner rounded-l p-2 min-w-full min-h-[70px]"
                        id="title"
                        name="title"
                        required
                        autoFocus
                        value={form.title}
                        onChange={onChange}
                    />

                    {/* 아이디어 */}
                    <label
                        htmlFor="idea"
                        className="font-semibold mt-3 md:mt-4"
                    >
                        아이디어
                    </label>
                    <textarea
                        className="bg-gray-200 shadow-inner rounded-l p-2 min-w-full min-h-[70px]"
                        id="idea"
                        name="idea"
                        value={form.idea}
                        onChange={onChange}
                    />

                    {/* 입력 */}
                    <label
                        htmlFor="input"
                        className="font-semibold mt-3 md:mt-4"
                    >
                        입력
                    </label>
                    <textarea
                        className="bg-gray-200 shadow-inner rounded-l p-2 min-w-full min-h-[70px]"
                        id="input"
                        name="input"
                        value={form.input}
                        onChange={onChange}
                    />

                    {/* 출력 */}
                    <label
                        htmlFor="output"
                        className="font-semibold mt-3 md:mt-4"
                    >
                        출력
                    </label>
                    <textarea
                        className="bg-gray-200 shadow-inner rounded-l p-2 min-w-full min-h-[70px]"
                        id="output"
                        name="output"
                        value={form.output}
                        onChange={onChange}
                    />

                    {/* 소스 코드 */}
                    <label
                        htmlFor="contents"
                        className="font-semibold mt-3 md:mt-4"
                    >
                        소스 코드
                    </label>
                    <textarea
                        className="bg-gray-200 shadow-inner rounded-l p-2 min-w-full min-h-[70px]"
                        id="contents"
                        name="contents"
                        required
                        value={form.contents}
                        onChange={onChange}
                    />

                    <button className="border hover:bg-yellow-400 rounded-xl py-1 px-4 mt-8 drop-shadow-xl border-yellow-300 bg-yellow-400">
                        작성
                    </button>
                    <Link
                        href="/main/board"
                        className="border hover:bg-gray-200 rounded-xl py-1 px-4 mt-3 drop-shadow-xl text-center"
                    >
                        돌아가기
                    </Link>
                </form>
            </div>
        </section>
    );
}
