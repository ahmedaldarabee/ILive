
import React, { Suspense } from 'react'
import Content from './_components/Content'
import Loading from '@/animations/Loading/page'

const page = () => {
    return (
        <div className='container mx-auto w-full py-20'>
            <Suspense fallback={<Loading/>}>
                <Content/>
            </Suspense>
        </div>
    )
}

export default page