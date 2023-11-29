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
        <section className="flex justify-center items-center w-screen pt-[95px]">
            <div>
                <form
                    onSubmit={onSubmit}
                    className="flex flex-col border p-[50px] bg-white rounded-[40px] drop-shadow-xl lg:w-[500px] lg:h-[600px]"
                >
                    <Image
                        src="/images/code_write.png"
                        width={50}
                        height={50}
                        alt="logo"
                        className="m-auto"
                    />
                    {/* <p className='text-center'>게시글</p> */}
                    <span className="w-full border-2"></span>

                    {/* title */}
                    <label htmlFor="title" className="font-semibold">
                        문제
                    </label>
                    <textarea
                        className="bg-gray-200 shadow-inner rounded-l p-2 flex-1"
                        id="title"
                        name="title"
                        required
                        autoFocus
                        value={form.title}
                        onChange={onChange}
                    />

                    {/* 아이디어 */}
                    <label htmlFor="idea" className="font-semibold">
                        아이디어
                    </label>
                    <input
                        className="bg-gray-200 shadow-inner rounded-l p-2 flex-1"
                        type="text"
                        id="idea"
                        name="idea"
                        value={form.idea}
                        onChange={onChange}
                    />

                    {/* 입력 */}
                    <label htmlFor="input" className="font-semibold">
                        입력
                    </label>
                    <textarea
                        className="bg-gray-200 shadow-inner rounded-l p-2 flex-1"
                        id="input"
                        name="input"
                        value={form.input}
                        onChange={onChange}
                    />

                    {/* 출력 */}
                    <label htmlFor="output" className="font-semibold">
                        출력
                    </label>
                    <textarea
                        className="bg-gray-200 shadow-inner rounded-l p-2 flex-1"
                        id="output"
                        name="output"
                        value={form.output}
                        onChange={onChange}
                    />

                    {/* 소스 코드 */}
                    <label htmlFor="contents" className="font-semibold">
                        소스 코드
                    </label>
                    <textarea
                        className="bg-gray-200 shadow-inner rounded-l p-2 flex-1"
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
