import React, { Suspense } from 'react'
import PropertyDetails from './_components/PropertyDetails'
import Loading from '@/animations/Loading/page';

interface IPageUrlProps {
    params: {id:string}
}

const page = ({params}:IPageUrlProps) => {

    const propertyId = params.id;

    return (
        <div className='container mx-auto py-20 w-full min-h-screen'>
            <Suspense fallback={<Loading/>}>
                <PropertyDetails propertyId={propertyId}/>
            </Suspense>
        </div>
    )
}

export default page