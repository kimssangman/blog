"use client";

import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import Loading from "../../util/Loading";



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
        <main>
        </main>
    )
}
