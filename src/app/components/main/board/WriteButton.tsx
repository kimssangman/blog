import Link from 'next/link'
import React from 'react'

export default function WriteButton() {
    return (
        <Link href='/main/board/write' className="bg-transparent hover:bg-[#41a5ee] text-[#41a5ee] font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded float-right mb-2">
            글작성
        </Link>
    )
}
