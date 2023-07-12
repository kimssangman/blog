"use client";

import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import Loading from "../../util/Loading";
import Time from "../../util/Time";



export default function DashBoard() {

    /**---------------------------------
     * onUnauthenticated() 함수가 session을 가지고 있는지 파악하여
     * 없으면 redirect 해줍니다.
     ---------------------------------*/
    const { status } = useSession({
        required: true,
        onUnauthenticated() {
            redirect("/signIn");
        },
    });

    if (status === "loading") {
        return <div className="flex justify-center items-center h-screen">
            <Loading />
        </div>

    }


    return (
        <section className="m-auto pt-[25px]">
            <div className="w-[60%] h-60 bg-white m-auto rounded-[20px] drop-shadow-xl flex items-center justify-center sm:text-[2rem] lg:text-[2rem]">
                <Time />
            </div>

            <div>

            </div>
        </section>
    )
}
