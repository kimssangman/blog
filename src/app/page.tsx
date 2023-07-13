'use client'

import Link from 'next/link'
import Image from 'next/image';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';


export default function Home() {

    /**----------------------------
     * 라우팅
     ----------------------------*/
    const router = useRouter();

    /**----------------------------
     * callback route
     ----------------------------*/
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/main";

    const onHandlerGuest = async () => {
        /**-------------------------
             * 로그인
             * next-auth signIn 사용
             -------------------------*/
        const res: any = await signIn("credentials", {
            redirect: false,
            id: '1',
            pw: '1',
            callbackUrl
        })


        if (res?.error == null) {
            router.push(callbackUrl);
        }
    }


    return (
        <section className='flex justify-center items-center w-screen h-screen'>
            <div className='flex flex-col text-center border p-[50px] bg-white rounded-[40px] drop-shadow-xl'>
                <Image src="/images/login.png" width={200} height={200} alt="logo" className='m-auto drop-shadow-xl' />
                <Link href='/signIn' className='border hover:bg-yellow-400 rounded-xl py-1 px-4 mt-8 drop-shadow-xl border-yellow-300 bg-yellow-400'>로그인</Link>
                <button onClick={onHandlerGuest} className='border hover:bg-gray-200 rounded-xl py-1 px-4 mt-3 drop-shadow-xl'>비회원 로그인</button>
            </div>

        </section>
    )
}
