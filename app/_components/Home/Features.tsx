"use client"

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const Features = () => {
    const [stopScroll, setStopScroll] = useState(false);
    const router = useRouter();

    const cardData = [
        {
            title: "Needed to see all houses?",
            image: "/assets/Imgs/feature-part-1.jpg",
        },
        {
            title: "Needed to see all apartment?",
            image: "/assets/Imgs/feature-part-2.jpg",
        },
        {
            title: "Needed to see all town house?",
            image: "/assets/Imgs/feature-part-3.jpg",
        },
        {
            title: "Needed to see all more?",
            image: "/assets/Imgs/feature-part-4.jpg",
        },
    ];

    return (
        <section>
            <div className='flex items-center justify-center flex-col gap-4 my-4'>
                <h2 className='text-3xl font-medium'>our latest works</h2>
                <p 
                className='text-gray-600 md:px-80 text-center'
                >We provide professional real estate services, assisting clients in buying, selling, and renting properties. With market knowledge, transparency, and dedication, we deliver reliable solutions and build lasting client relationships.</p>

            </div>
            <div 
            
            className="overflow-hidden cursor-pointer w-full relative max-w-6xl mx-auto" 
            onMouseEnter={() => setStopScroll(true)} 
            onMouseLeave={() => setStopScroll(false)}>
            
                <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
                <div className="marquee-inner flex w-fit" style={{ animationPlayState: stopScroll ? "paused" : "running", animationDuration: cardData.length * 2500 + "ms" }}>
                    <div className="flex">
                        {[...cardData, ...cardData].map((card, index) => (
                            <Link
                            href={`/properties?type=${index == 0 ? "house" :
                                index == 1 ? "apartment" :
                                index == 2 ? "townhouse" : "condo"}`}
                            key={index}
                            className="w-56 mx-4 h-[20rem] relative group hover:scale-90 transition-all duration-300">
                                <img src={card.image} alt="card" className="w-full h-full object-cover rounded-lg cursor-pointer" />
                                <div className="flex items-center justify-center px-4 opacity-0 group-hover:opacity-100 transition-all duration-300 absolute bottom-0 backdrop-blur-md left-0 w-full h-full bg-black/20">
                                    <p className="text-white text-lg font-semibold text-center">{card.title}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />
            </div>
        </section>
    );
}

export default Features