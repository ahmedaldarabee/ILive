"use client"

import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import React from 'react'
import PropertyCard from './PropertyCard'
import { ArrowRightIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

export const propertiesListedStatus = [
    {
        id:1,
        number:500,
        info:"property listed"
    },{
        id:2,
        number:200,
        info:"happy clients"
    },{
        id:3,
        number:820,
        info:"cities that covered"
    }
]

const FeaturedProperties = () => {
    const router = useRouter();
    const featuredData = useQuery(api.properties.getFeaturedProperties);

    return (
        <section className='w-full container mx-auto'>
            <div className='w-full flex-col flex justify-between items-center my-8 space-y-12'>
                <h2>featured properties </h2>
                {
                    featuredData === undefined ? 
                    (
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                            {[...Array(6).map((_,idx) => (
                                <div key={idx} className='bg-gray-200 animate-pulse rounded-lg h-80'></div>
                            ))]}
                        </div>
                    ) 
                    
                    : featuredData.length === 0 ?
                    (
                        <div className='text-center py-12'>
                            <h3 className='text-xl font-semibold text-gray-600 my-4'>no featured property yet!</h3>
                            <Button
                                className='capitalize'
                            >
                                add your properties
                            </Button>
                        </div>
                    ) : (
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                            {
                                featuredData?.map((property,idx) => (
                                    <PropertyCard
                                        key={idx}
                                        property={property}
                                    />
                                ))
                            }
                        </div>
                    )
                }
                <div className='w-full flex justify-center items-center'>
                    <Button
                        onClick={() => router.push("/properties")}
                        className='capitalize  bg-sky-600 hover:bg-sky-700 cursor-pointer'
                        >
                            see more features...
                            <ArrowRightIcon/>
                        </Button>
                </div>

                <div
                    className='w-full max-sm:max-w-sm grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center gap-6 py-8'
                >   

                    {
                        propertiesListedStatus.map((list,idx) => (
                            <div 
                                key={idx}
                                className='hover:-translate-y-4 transform transition-all duration-300 text-center cursor-pointer '
                            >
                                <h3 className='text-4xl font-bold text-[#2b79e0]'>{list.number}+</h3>
                                <p className='text-gray-600'>{list.info}</p>
                            </div>
                        ))
                    }

                </div>

            </div>
        </section>
    )
}

export default FeaturedProperties