import React from 'react'
import PropertyDetails from './_components/PropertyDetails'

interface IPageUrlProps {
    params: {id:string}
}

const page = ({params}:IPageUrlProps) => {

    const propertyId = params.id;

    return (
        <div className='container mx-auto py-20 w-full min-h-screen'>
            <PropertyDetails propertyId={propertyId}/>
        </div>
    )
}

export default page