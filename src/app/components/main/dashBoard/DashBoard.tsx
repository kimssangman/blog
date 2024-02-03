"use client";

import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import Loading from "../../util/Loading";
import Time from "../../util/Time";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function DashBoard() {
    const router = useRouter();

    /**---------------------------------
     * user token session 확인
     * 
     * onUnauthenticated() 함수가 session을 가지고 있는지 파악하여
     * 없으면 redirect 해줍니다.
     ---------------------------------*/
    const { status } = useSession({
        required: true,
        onUnauthenticated() {
            redirect("/signIn");
        },
    });

    /**---------------------------------
     * user session status 확인하여 로딩
     ---------------------------------*/
    if (status === "loading") {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loading />
            </div>
        );
    }

    /**---------------------------------
     * 라우팅
     ---------------------------------*/
    const handleRoute = (route: any) => {
        router.push(`/main/${route}`);
    };

    return (
        <section className="m-auto pt-12 sm:pt-40 lg:pt-24">
            <div className="w-[60%] h-[130px] bg-white m-auto rounded-[20px] drop-shadow-xl flex items-center justify-center sm:text-[2rem] lg:text-[2rem] hidden sm:flex lg:flex xl:flex 2xl:flex">
                <Time />
            </div>

            <div className="m-auto w-[60%] mt-[25px]">
                <div className="lg:flex sm:flex lg:justify-between text-center lg:flex-row sm:flex-col">
                    <div
                        className="lg:w-[23%] sm:w-[100%] h-[130px] bg-white rounded-[20px] drop-shadow-xl flex justify-center my-[15px] cursor-pointer"
                        onClick={() => handleRoute("board")}
                    >
                        <button className="flex justify-between items-center">
                            <Image
                                src="/images/code_write.png"
                                width={100}
                                height={100}
                                alt="logo"
                                className="m-auto w-full max-w-[80px] xl:w-1/3 2xl:w-1/2"
                            />
                            <span className="ml-[20px] sm:text-[1.5rem] lg:text-[1.5rem]">
                                코드
                            </span>
                        </button>
                    </div>
                    <div className="lg:w-[23%] sm:w-[100%] h-[130px] bg-white rounded-[20px] drop-shadow-xl flex justify-center my-[15px] cursor-pointer">
                        <button
                            className="flex justify-between items-center"
                            onClick={() => handleRoute("check")}
                        >
                            <Image
                                src="/images/check.png"
                                width={100}
                                height={100}
                                alt="logo"
                                className="m-auto w-full max-w-[80px] xl:w-1/3 2xl:w-1/2"
                            />
                            <span className="ml-[20px] sm:text-[1.5rem] lg:text-[1.5rem]">
                                운세
                            </span>
                        </button>
                    </div>
                    <div className="lg:w-[23%] sm:w-[100%] h-[130px] bg-white rounded-[20px] drop-shadow-xl flex justify-center my-[15px] cursor-pointer">
                        <button
                            className="flex justify-between items-center"
                            onClick={() => handleRoute("review")}
                        >
                            <Image
                                src="/images/review.png"
                                width={100}
                                height={100}
                                alt="logo"
                                className="m-auto w-full max-w-[80px] xl:w-1/3 2xl:w-1/2"
                            />
                            <span className="ml-[20px] sm:text-[1.5rem] lg:text-[1.5rem]">
                                맛집
                            </span>
                        </button>
                    </div>
                    <div className="lg:w-[23%] sm:w-[100%] h-[130px] bg-white rounded-[20px] drop-shadow-xl flex justify-center my-[15px] cursor-pointer">
                        <button
                            className="flex justify-between items-center"
                            onClick={() => handleRoute("voca")}
                        >
                            <Image
                                src="/images/english_book.png"
                                width={100}
                                height={100}
                                alt="logo"
                                className="m-auto w-full max-w-[80px] xl:w-1/3 2xl:w-1/2"
                            />
                            <span className="ml-[20px] sm:text-[1.5rem] lg:text-[1.5rem]">
                                단어
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
