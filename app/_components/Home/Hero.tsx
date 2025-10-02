import Image from 'next/image'
import React from 'react'

const Hero = () => {
    return (
        <div
        className="w-full h-[500px] bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/Imgs/hero-2.jpg')" }}
        ></div>
    )
}

export default Hero