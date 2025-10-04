"use client"

import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import React, { useEffect } from 'react'
import PropertyCard from './PropertyCard'
import { ArrowRightIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { motion } from "framer-motion"
import AnimatedCounter from './AnimatedCounter'

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
                        <motion.div
                        initial={{
                            opacity:0,
                            y:200,
                        }}
                        
                        whileInView={{
                            opacity:1,
                            y:0,
                            transition:{
                                duration:1,
                                ease: "easeInOut"
                            }
                        }}

                        viewport={{
                            once:true,
                            amount:0.1
                        }}
                        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                            {
                                featuredData?.map((property,idx) => (
                                    <PropertyCard
                                        key={idx}
                                        property={property}
                                    />
                                ))
                            }
                        </motion.div>
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
                            <AnimatedCounter key={idx} mainNumber={list.number} info={list.info} />
                        ))
                    }

                </div>

            </div>
        </section>
    )
}

export default FeaturedProperties