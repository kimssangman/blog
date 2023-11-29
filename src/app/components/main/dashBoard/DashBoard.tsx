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
     * code 게시판으로 라우팅
     ---------------------------------*/
    const handleRoute = () => {
        router.push("/main/board");
    };

    return (
        <section className="m-auto pt-20 sm:pt-40 lg:pt-24">
            <div className="w-[60%] h-[130px] bg-white m-auto rounded-[20px] drop-shadow-xl flex items-center justify-center sm:text-[2rem] lg:text-[2rem]">
                <Time />
            </div>

            <div className="m-auto w-[60%] mt-[25px]">
                <div className="lg:flex sm:flex lg:justify-between text-center lg:flex-row sm:flex-col">
                    <div
                        className="lg:w-[23%] sm:w-[100%] h-[130px] bg-white rounded-[20px] drop-shadow-xl flex justify-center my-[15px] hover:bg-yellow-400 cursor-pointer"
                        onClick={handleRoute}
                    >
                        <button className="flex justify-between items-center">
                            <Image
                                src="/images/code_write.png"
                                width={100}
                                height={100}
                                alt="logo"
                                className="m-auto sm:w-[30px] lg:w-[100px] "
                            />
                            <span className="mx-[20px] sm:text-[1.5rem] lg:text-[1.5rem]">
                                코드
                            </span>
                        </button>
                    </div>
                    <div className="lg:w-[23%] sm:w-[100%] h-[130px] bg-white rounded-[20px] drop-shadow-xl flex justify-center my-[15px] hover:bg-yellow-400 cursor-pointer">
                        <button className="flex justify-between items-center">
                            <Image
                                src="/images/notice.png"
                                width={100}
                                height={100}
                                alt="logo"
                                className="m-auto sm:w-[30px] lg:w-[100px] "
                            />
                            <span className="mx-[20px] sm:text-[1.5rem] lg:text-[1.5rem]">
                                알림
                            </span>
                        </button>
                    </div>
                    <div className="lg:w-[23%] sm:w-[100%] h-[130px] bg-white rounded-[20px] drop-shadow-xl flex justify-center my-[15px] hover:bg-yellow-400 cursor-pointer">
                        <button className="flex justify-between items-center">
                            <Image
                                src="/images/code.png"
                                width={100}
                                height={100}
                                alt="logo"
                                className="m-auto sm:w-[30px] lg:w-[100px] "
                            />
                            <span className="mx-[20px] sm:text-[1.5rem] lg:text-[1.5rem]">
                                비고
                            </span>
                        </button>
                    </div>
                    <div className="lg:w-[23%] sm:w-[100%] h-[130px] bg-white rounded-[20px] drop-shadow-xl flex justify-center my-[15px] hover:bg-yellow-400 cursor-pointer">
                        <button className="flex justify-between items-center">
                            <Image
                                src="/images/code.png"
                                width={100}
                                height={100}
                                alt="logo"
                                className="m-auto sm:w-[30px] lg:w-[100px] "
                            />
                            <span className="mx-[20px] sm:text-[1.5rem] lg:text-[1.5rem]">
                                비고
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
