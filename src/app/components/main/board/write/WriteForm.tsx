'use client'


import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useState } from 'react'
import Link from 'next/link';
import { writePost } from '@/services/board/writePost';
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from 'next/image';

type Form = {
    title: string,
    contents1: string,
    contents2: string,
}



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
        title: '',
        contents1: '',
        contents2: ''
    })


    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();

        // 게시글 작성
        writePost(form)
            .then((res: any) => {
                // 라우팅
                router.replace("/main/board");

            })
            .catch(() => {

            })
    }






    return <section className='flex justify-center items-center w-screen pt-[95px]'>
        <div>
            <form onSubmit={onSubmit} className='flex flex-col border p-[50px] bg-white rounded-[40px] drop-shadow-xl lg:w-[500px] lg:h-[600px]'>
                <Image src="/images/code_write.png" width={50} height={50} alt="logo" className='m-auto' />
                {/* <p className='text-center'>게시글</p> */}
                <span className='w-full border-2'></span>
                {/* title */}
                <label htmlFor="title" className='font-semibold'>제목</label>
                <input className='bg-gray-200 shadow-inner rounded-l p-2 flex-1' type="text" id='title' name="title" required autoFocus value={form.title} onChange={onChange} />
                {/* contents1 */}
                <label htmlFor="contents1" className='font-semibold'>항목</label>
                <input className='bg-gray-200 shadow-inner rounded-l p-2 flex-1' type="text" id='contents1' name="contents1" required autoFocus value={form.contents1} onChange={onChange} />
                {/* contents2 */}
                <label htmlFor="contents2" className='font-semibold'>내용</label>
                <textarea className='bg-gray-200 shadow-inner rounded-l p-2 flex-1' id='contents2' name='contents2' required autoFocus value={form.contents2} onChange={onChange} />
                <button className='bg-yellow-300 text-black font-bold mt-5 hover:bg-yellow-400'>작성</button>
                <Link href='/main/board' className='bg-green-300 text-black font-bold hover:bg-green-400 text-center'>돌아가기</Link>
            </form>
        </div>
    </section>
}
