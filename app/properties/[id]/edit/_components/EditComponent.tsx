"use client"

import PropertyForm from '@/app/properties/_components/PropertyForm'
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const EditComponent = ({params}:{
    params:Promise<{id:string}>,
}) => {
    
    const router = useRouter();

    const [propertyID,setPropertyID] = useState<string | null>(null);
    const property = useQuery(api.properties.getProperty,
        propertyID ? { id:propertyID as any} : "skip"
    )

    useEffect(() => {
        params.then((resolve) => {
            setPropertyID(resolve?.id);
        })
    },[params]);

    if(!propertyID || propertyID === undefined){
        return <div className='w-full h-screen flex items-center justify-center'>Loading, please wait...</div>
    }

    if(propertyID === null){
        return (
            <p 
                onClick={() => router.push("/")}
                className='font-semibold text-3xl text-red-700'>Sorry, this property not found!, click to go back</p>
        )
    }

    return (
        <PropertyForm
            propertyId={propertyID}
            isEditing={true}
            data={property}
        />
    )
}

export default EditComponent