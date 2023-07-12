import React from 'react'
import { Oval, ProgressBar } from 'react-loader-spinner';

export default function Loading() {
    return <Oval
        height={40}
        width={40}
        color="#43a4ee"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel='oval-loading'
        secondaryColor="#43a4ee"
        strokeWidth={2}
        strokeWidthSecondary={2}

    />
}
