/**
 * 아이콘 이미지 사이트
    https://www.flaticon.com/kr/search?word=%EB%A1%9C%EA%B7%B8%EC%9D%B8&type=animated-icon

    nextAuth
    https://cpro95.tistory.com/611
 */


'use client'

import { useRouter, useSearchParams } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import Banner, { BannerData } from '../util/Banner';
import Link from 'next/link';
// import { signIn } from '@/services/signIn';
import { signIn, useSession } from "next-auth/react";
import Loading from '../util/Loading';
import Image from 'next/image';



type Form = {
    id: string,
    pw: string
}


export default function SignInForm() {

    /**----------------------------
     * 사용자 session 확인
     ----------------------------*/
    const session: any = useSession();

    /**----------------------------
     * 라우팅
     ----------------------------*/
    const router = useRouter();

    /**----------------------------
     * loading
     ----------------------------*/
    const [loading, setLoading] = useState(true);

    /**----------------------------
     * 기본 form 세팅
     ----------------------------*/
    const [form, setForm] = useState<Form>({
        id: '',
        pw: '',
    })

    /**----------------------------
     * 배너
     ----------------------------*/
    const [banner, setBanner] = useState<BannerData | null>(null);


    const [error, setError] = useState("");

    /**----------------------------
     * callback route
     ----------------------------*/
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/main";



    useEffect(() => {
        console.log(session.status)
        /**------------------------------------------
         * 사용자 세션이 존재하는 경우에 실행되는 코드
         * 여기에서 원하는 작업을 수행할 수 있습니다.
         * 예를 들면 다른 페이지로 이동하거나 특정 동작을 수행할 수 있습니다.
         ------------------------------------------*/
        if (session.status === "authenticated") {
            router.push("/main");
        }
        setLoading(false); // 세션 정보 로딩이 완료됨을 표시
    }, [session]);


    /**----------------------------
     * React의 useState 훅은 이전 상태를 직접 참조하는 방법이 없기 때문에
     * 이전 상태 값을 참조하여 새로운 상태를 생성하면, 기존 상태를 직접 수정하지 않고 새로운 상태를 생성한다.
     * 이를 통해 React는 상태 변경을 감지하고 필요한 컴포넌트만 다시 렌더링하는 성능 최적화 효과
     ----------------------------*/
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            setForm({ id: "", pw: "" });

            /**-------------------------
             * 로그인
             * next-auth signIn 사용
             -------------------------*/
            const res: any = await signIn("credentials", {
                redirect: false,
                id: form.id,
                pw: form.pw,
                callbackUrl
            })

            setLoading(false);

            if (res?.error == null) {
                router.push(callbackUrl);
            } else {
                setBanner({ message: '아이디 또는 패스워드 오류', state: 'error' });
                setError("invalid email or password");
                setTimeout(() => {
                    setBanner(null);
                }, 1000)
            }
        } catch (error: any) {
            setLoading(false);
            setError(error);
        }
    }


    if (loading) {
        return <div className='flex justify-center items-center w-screen h-screen'>
            <Loading />
        </div>
    }


    return (
        <div className='flex justify-center items-center w-screen h-screen'>
            {banner && <Banner banner={banner} />}

            {session.status === "authenticated" ? (
                <div className='flex justify-center items-center w-screen h-screen'>
                    <Loading />
                </div>

            ) : (
                <section className='flex justify-center items-center w-screen h-screen'>
                    <div>
                        <form onSubmit={onSubmit} className='flex flex-col border p-[50px] bg-white rounded-[40px] drop-shadow-xl'>
                            <Image src="/images/login_ani.gif" width={200} height={200} alt="logo" className='m-auto' />
                            {/* id */}
                            <label htmlFor="id" className='font-semibold'>ID</label>
                            <input className='bg-gray-200 shadow-inner rounded-l p-2 flex-1' type="text" id='id' name="id" required autoFocus value={form.id} onChange={onChange} />
                            {/* pw */}
                            <label htmlFor="pw" className='font-semibold'>PW</label>
                            <input className='bg-gray-200 shadow-inner rounded-l p-2 flex-1' type="password" id='pw' name="pw" required value={form.pw} onChange={onChange} />
                            <button className='border hover:bg-yellow-400 rounded-xl py-1 px-4 mt-8 drop-shadow-xl border-yellow-300 bg-yellow-400'>로그인</button>
                            <Link href='/' className='border hover:bg-gray-200 rounded-xl py-1 px-4 mt-3 drop-shadow-xl text-center'>돌아가기</Link>
                        </form>
                    </div>
                </section>
            )}
        </div>

    )

}



