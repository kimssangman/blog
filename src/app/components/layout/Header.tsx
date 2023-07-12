'use client'

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import Time from '../util/Time';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useRecoilState } from 'recoil';
import { textState } from '@/recoil/atoms/states';

export default function Header(props: any) {

    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => setIsOpen(!isOpen);
    const dropdownRef = useRef<HTMLDivElement | null>(null);


    const [active, setActive] = useState(false);

    const handleClick = () => {
        setActive(!active);
    };

    /**----------------------------
     * 사용자 session 확인
     ----------------------------*/
    const session: any = useSession();

    console.log('          ')
    console.log('main/page.ts 유저 토큰 정보');
    console.log(session);
    console.log('------------------------------')


    useEffect(() => {
        setIsOpen(false);
    }, []);


    /**--------------------------------------------------------------------
     * 상민
     * useRef를 사용하여 dropdown의 DOM 요소에 대한 참조를 생성하고 
     * useEffect에서 mousedown 이벤트를 등록, mousedown 이벤트가 발생하면
     * dropdown을 클릭한 경우에는 isOpen 값을 변경하지 않고, 
     * dropdown 외부를 클릭한 경우에는 isOpen 값을 false로 변경
     * 이후 useEffect의 clean-up 함수에서 이벤트 리스너를 제거
    --------------------------------------------------------------------*/
    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);



    const handleSignOut = () => {
        signOut();
        router.push("/signIn");
    };

    return (
        <nav className='flex items-center flex-wrap bg-white sm:p-3 lg:px-[20%] drop-shadow-sm'>
            <Link href='/main' className='inline-flex items-center p-2 mr-4 '>
                <Image src="/images/home.png" width={50} height={50} alt="logo" className="pr-[10px]" />
                <span className='text-xl font-bold uppercase tracking-wide '>
                    BLOG
                </span>
            </Link>
            <button
                className=' inline-flex p-3 hover:bg-yellow-400 rounded lg:hidden ml-auto hover:text-white outline-none'
                onClick={handleClick}
            >
                <svg
                    className='w-6 h-6'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M4 6h16M4 12h16M4 18h16'
                    />
                </svg>
            </button>
            {/*Note that in this div we will use a ternary operator to decide whether or not to display the content of the div  */}
            <div
                className={`${active ? '' : 'hidden'
                    }   w-full lg:inline-flex lg:flex-grow lg:w-auto`}
            >
                <div className='lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto'>

                    <Link href='/' className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded font-bold items-center justify-center text-white bg-yellow-400 hover:bg-yellow-400 hover:text-white mr-10'>
                        CODE
                    </Link>
                    {/* <Link href='/' className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded font-bold items-center justify-center hover:bg-yellow-400 hover:text-white mr-20'>
                        Contact us
                    </Link> */}


                    <span className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded font-bold items-center justify-center hover:bg-yellow-400 hover:text-white'>
                        <div ref={dropdownRef} className="relative inline-block text-left">
                            {session?.data?.user.name && (
                                <div onClick={toggleDropdown} className="cursor-pointer">
                                    <Image src="/images/profile.png" width={30} height={30} alt="user" className="inline-block" />
                                    <span className="ml-[20px]">{session?.data?.user.name} 님</span>
                                </div>
                            )}

                            {isOpen && (
                                <div
                                    className="absolute divide-y divide-gray-100 right-50 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                    role="menu"
                                    aria-orientation="vertical"
                                    aria-labelledby="menu-button"
                                >
                                    <div className="px-4 py-3 text-sm text-gray-700 leading-6">
                                        <p>내정보</p>
                                        {/* <p className="font-medium truncate">{user?.email}</p> */}
                                    </div>
                                    <div className="py-1" role="none">
                                        <button
                                            onClick={handleSignOut}
                                            className="text-gray-700 block w-full px-4 py-2 text-left text-sm"
                                            role="menuitem"
                                            id="menu-item-3"
                                        >
                                            로그아웃
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </span>


                </div>
            </div>
        </nav>
    );
}
