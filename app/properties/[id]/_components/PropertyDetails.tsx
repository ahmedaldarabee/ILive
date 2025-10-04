"use client"

import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { useMutation, useQuery } from 'convex/react'
import { BadgeDollarSign, BadgeInfo, BedDouble, BrickWall, ChevronRight, Cog,MapPinHouse,Send,Toilet,Trash2 } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'
import Swal from 'sweetalert2'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import ScheduleDetails from './ScheduleDetails'


interface IPropertyDetailsProps{
    propertyId:string
}

const PropertyDetails = ({propertyId}:IPropertyDetailsProps) => {
    const [selectedImageIdx,setSelectedImageIdx] = useState(0);
    
    const property = useQuery(api.properties.getProperty,{
        id:propertyId as any
    });
    const propertyPrice = property?.price;

    const deleteProperty  = useMutation(api.properties.deleteProperty);
    const router = useRouter();
    
    const handlePropertyDeletion = async () => {
        Swal.fire({
            title: "Are you sure?",
            text:  `Are you want to be able delete this property ${property?.title}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#2b79e0",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
            }).then( async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteProperty({ id: propertyId as any });
                    toast.success("Property deleted successfully");
                    router.push("/properties");
                } catch (error) {
                    toast.error("Wrong property deletion");
                    console.error(error);
                }
            }
        });
    };

    return (
        <div className='max-w-5xl cursor-pointer mx-auto max-sm:px-10'>

            {/* Headlines */}
            
            <div className='w-full flex-col gap-6 md:gap-0 md:flex-row flex  items-center justify-between'>
                <h3 className='capitalize text-3xl font-medium flex items-center gap-2'>{property?.title}   </h3>
                <div 
                    className='flex items-center gap-4'>
                        <Button 
                        onClick={() => router.push(`/properties/${propertyId}/edit`)}
                        className='transition-all duration-300 capitalize bg-sky-600 cursor-pointer hover:bg-sky-800 px-10'
                            >edit <Cog className='w-4 h-4' /></Button>

                        <Button 
                        onClick={handlePropertyDeletion}
                        className='transition-all duration-300 capitalize bg-black cursor-pointer hover:bg-black/80 px-10'
                            >delete <Trash2 className='w-4 h-4' /></Button>
                </div>
            </div>

            {/* Image Gallery */}
            <div className='my-4'>
                {
                    property?.images && property?.images?.length > 0 ?
                    (
                        <div 
                            className='space-y-4'>
                                {/* Main Image */}

                                <div className='relative h-96 w-full'>
                                    <Image
                                        src={property?.images[selectedImageIdx]}
                                        alt='property name'
                                        fill
                                        className='object-cover rounded-lg'
                                    />
                                </div>

                                {/* Sub Images */}
                                <div className='flex items-center justify-center flex-wrap gap-4'>
                                    {
                                        property?.images?.map((img,idx) => (
                                            <Image
                                                onClick={() => setSelectedImageIdx(idx)}
                                                key={idx}
                                                src={img}
                                                alt="sub image"
                                                width={150}
                                                height={150}
                                                className='rounded-lg shadow-lg transition-all duration-300 w-[150px] h-[150px] object-cover'
                                            />
                                        ))
                                    }
                                </div>
                        </div>
                    ):
                    (
                        <div 
                        onClick={() => router.push("/properties")}
                        className='text-red-600 cursor-pointer hover:text-red-800'> Sorry, there are an errors about this property,click to go back </div>
                    )
                }
            </div>

            {/* Main Content */}

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

                <div
                    className='w-full my-9 space-y-4'
                    >

                        <h3 className='flex items-center gap-2'>
                            <BadgeInfo  className='w-4 h-4'/> 
                            <span className='text-gray-500 font-medium'>Info details about this property</span>
                        </h3>

                        <div className='flex items-center gap-2'>
                            <MapPinHouse className='w-4 h-4'/> 
                            <span className='capitalize text-gray-700'>{property?.address} in {property?.city} in { property?.state} with { property?.zipCode} as a zip code</span>
                        </div>

                        <div className='flex items-center gap-2'>
                            <BadgeDollarSign className='w-4 h-4'/> 
                            <span className='text-gray-400 space-x-1 line-through'>{Number(propertyPrice)-50}$</span>
                            <span className='text-gray-700'>{property?.price}$</span>
                        </div>
                        
                        <div className='flex items-center gap-2'>
                            <ChevronRight className='w-4 h-4' />
                            <p className='text-gray-700'>{property?.description}</p>
                        </div>

                        <div className='flex items-center flex-wrap gap-4'>
                            <span className='detailsStyle'> <BedDouble className='w-4 h-4' /> {property?.bedrooms} as a bedrooms </span>
                            <span className='detailsStyle'> <Toilet className='w-4 h-4' /> {property?.bathrooms} as a bathrooms </span>
                            <span className='detailsStyle'> <BrickWall className='w-4 h-4' /> {property?.propertyType} type </span>
                        </div>
                </div>

                <div className='flex md:items-center justify-center gap-4 flex-col'>
                    <h2 className='text-sky-600 text-2xl font-medium'>Contact Us Information's</h2>
                    <Dialog>
                        <DialogTrigger>
                            <div className='flex items-start'>
                                <Button className='contactDetailBtn'>contact agent</Button>
                            </div>
                        </DialogTrigger>

                        <DialogContent>
                            <DialogHeader>
                            <DialogTitle className='my-2 capitalize'>whatsApp phone number</DialogTitle>
                            <DialogDescription 
                                className='flex md:items-center gap-2 cursor-pointer'
                            > <Send className='w-4 h-4' /> +962-785266266 </DialogDescription>
                            </DialogHeader>
                        </DialogContent>

                    </Dialog>
                    {/* schedule component */}                    
                    <ScheduleDetails
                        property = {{
                            _id:property?._id,
                            title:property?.title,
                        }}
                    />
                    <Button className='contactDetailBtn'>save property</Button>
                </div>
            </div>

        </div>
    )
}

export default PropertyDetails