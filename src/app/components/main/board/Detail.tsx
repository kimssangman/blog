"use client";

import React, { useEffect, useState } from "react";
import { CodeBlock, dracula } from "react-code-blocks";

import { detailPost } from "@/services/board/detail";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

interface Post {
    title: string;
    idea: string;
    input: string;
    output: string;
    contents: string;
}

type Theme = {
    // Other properties...
    mode?: string;
    // Other properties...
};

export default function Detail(props: any) {
    const [post, setPost] = useState<Post | null>(null);
    const response = post;
    const router = useRouter(); // 뒤로가기

    const { status } = useSession({
        required: true,
        onUnauthenticated() {
            redirect("/signIn");
        },
    });

    useEffect(() => {
        getPostList();
    }, []);

    /**--------------------------------------------
     * 게시글 가져오기
    --------------------------------------------*/
    const getPostList = async () => {
        try {
            const response: any = await detailPost(props.pageId);
            setPost(response);

            console.log("[post]", response);
        } catch (error) {
            // 오류 처리
        }
    };

    /**--------------------------------------------
     * 뒤로가기
    --------------------------------------------*/
    const handleGoBack = () => {
        router.replace("/main/board");
    };

    /**--------------------------------------------
     * 편집
    --------------------------------------------*/
    const handleGoEdit = () => {
        router.replace("/main/board");
    };

    /**--------------------------------------------
     * Code Block 사용하기
     * 
     * npm i react-code-blocks
     * 
     * https://www.npmjs.com/package/react-code-blocks
     --------------------------------------------*/

    return (
        <section>
            {response && (
                <div className="lg:m-auto lg:w-[60%] lg:mt-[100px] mx-[20px] mt-[80px] mb-[20px]">
                    <div className="flex justify-between items-center">
                        <button
                            onClick={handleGoBack}
                            className="bg-gray-400 hover:bg-gray-700 text-white font-bold py-2 px-4 mb-[20px] rounded"
                        >
                            뒤로가기
                        </button>
                        <div className="edit-button">
                            <button className="bg-rose-400 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-[20px] rounded">
                                편집
                            </button>
                        </div>
                    </div>
                    <div className="card mb-4 p-4 shadow-md">
                        <h2 className="card-title border-b pb-2 mb-2 text-xl font-bold">
                            문제
                        </h2>
                        <div
                            className="card-content bg-white p-4 rounded-md"
                            dangerouslySetInnerHTML={{
                                __html: response?.title?.replace(/\n/g, "<br>"),
                            }}
                        >
                            {/* {response.title} */}
                        </div>
                    </div>

                    <div className="card mb-4 p-4 shadow-md">
                        <h2 className="card-title border-b pb-2 mb-2 text-xl font-bold">
                            아이디어
                        </h2>
                        <div
                            className="card-content bg-white p-4 rounded-md"
                            dangerouslySetInnerHTML={{
                                __html: response?.idea?.replace(/\n/g, "<br>"),
                            }}
                        >
                            {/* {response.idea} */}
                        </div>
                    </div>

                    <div className="card mb-4 p-4 shadow-md">
                        <h2 className="card-title border-b pb-2 mb-2 text-xl font-bold">
                            입력
                        </h2>
                        <div
                            className="card-content bg-white p-4 rounded-md"
                            dangerouslySetInnerHTML={{
                                __html: response?.input?.replace(/\n/g, "<br>"),
                            }}
                        >
                            {/* {response.input} */}
                        </div>
                    </div>

                    <div className="card mb-4 p-4 shadow-md">
                        <h2 className="card-title border-b pb-2 mb-2 text-xl font-bold">
                            출력
                        </h2>
                        <div
                            className="card-content bg-white p-4 rounded-md"
                            dangerouslySetInnerHTML={{
                                __html: response?.output?.replace(
                                    /\n/g,
                                    "<br>"
                                ),
                            }}
                        >
                            {/* {response.output} */}
                        </div>
                    </div>

                    <div className="mb-8">
                        <h2 className="mb-2 text-xl font-bold">코드</h2>
                        <CodeBlock
                            text={response.contents}
                            language="javascript"
                            showLineNumbers={true}
                            startingLineNumber={1}
                            wrapLongLines={false}
                            theme={{ ...dracula, mode: "dark" }}
                        />
                    </div>
                </div>
            )}
        </section>
    );
}
