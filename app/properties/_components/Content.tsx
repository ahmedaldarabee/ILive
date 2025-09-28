"use client"

import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { propertiesListedStatus } from '@/app/_components/Home/FeaturedProperties'
import {PropertyFilters as Filters} from "@/app/type"
import PropertyCard from '@/app/_components/Home/PropertyCard'
import PropertyFilters from './PropertyFilters'

const Content = () => {
    const [filters,setFilters] = useState<Filters>({});
    const properties = useQuery(api.properties.getProperties,filters);

    return (
        <div className='w-full container mx-auto'>
            <div className='w-full flex-col flex justify-between items-center my-8 space-y-12'>
                <h2>all properties </h2>
                
                <PropertyFilters
                    filters={filters}
                    onFiltersChange={setFilters}
                />

                {
                    properties === undefined ? 
                    (
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                            {[...Array(6).map((_,idx) => (
                                <div key={idx} className='bg-gray-200 animate-pulse rounded-lg h-80'></div>
                            ))]}
                        </div>
                    ) 
                    
                    : properties.length === 0 ?
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
                                properties?.map((property,idx) => (
                                    <PropertyCard
                                        key={idx}
                                        property={property}
                                    />
                                ))
                            }
                        </div>
                    )
                }                
            </div>
        </div>
    )
}

export default Content