"use client"

import { useRouter } from 'next/navigation'
import React from 'react'

const Navbar = () => {

    const router = useRouter();
    return (
            <div className='container mx-auto'>
                <nav className="fixed top-0 left-0 z-50 w-full !m-0 flex items-center justify-between backdrop-blur-md bg-white/30 px-6 py-4 text-black text-sm ">
                    <h3 
                    onClick={() => router.push("/")}
                    className='text-xl font-medium cursor-pointer'>Smart <span className='text-[#2b79e0] font-semibold'> Living</span>
                    </h3>

                    <div className="hidden md:flex items-center gap-6 ml-7">
                        <a href="#" className="relative overflow-hidden h-6 group">
                            <span className="block group-hover:-translate-y-full transition-transform duration-300">Products</span>
                            <span
                                className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300">Products</span>
                        </a>
                        <a href="#" className="relative overflow-hidden h-6 group">
                            <span className="block group-hover:-translate-y-full transition-transform duration-300">Stories</span>
                            <span
                                className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300">Stories</span>
                        </a>
                        <a href="#" className="relative overflow-hidden h-6 group">
                            <span className="block group-hover:-translate-y-full transition-transform duration-300">Pricing</span>
                            <span
                                className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300">Pricing</span>
                        </a>
                        <a href="#" className="relative overflow-hidden h-6 group">
                            <span className="block group-hover:-translate-y-full transition-transform duration-300">Docs</span>
                            <span
                                className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300">Docs</span>
                        </a>
                    </div>

                    <div className="hidden ml-14 md:flex items-center gap-4">
                        <button
                            className="border border-slate-600 cursor-pointer hover:bg-slate-100 px-4 py-2 rounded-full text-sm font-medium transition">
                            Contact
                        </button>
                        <button
                            className="bg-white hover:shadow-[0px_0px_30px_14px] cursor-pointer shadow-[0px_0px_30px_7px] hover:shadow-white/50 shadow-white/50 text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-100 transition duration-300">
                            Get Started
                        </button>
                    </div>
                    <button id="menuToggle" className="md:hidden text-gray-600">
                        
                    </button>
                    <div id="mobileMenu" className="absolute hidden top-48 text-base left-0 bg-black w-full flex-col items-center gap-4">
                        <a className="hover:text-indigo-600" href="#">
                            Products
                        </a>
                        <a className="hover:text-indigo-600" href="#">
                            Customer Stories
                        </a>
                        <a className="hover:text-indigo-600" href="#">
                            Pricing
                        </a>
                        <a className="hover:text-indigo-600" href="#">
                            Docs
                        </a>
                        <button
                            className="border border-slate-600 hover:bg-slate-800 px-4 py-2 rounded-full text-sm font-medium transition">
                            Contact
                        </button>
                        <button
                            className="bg-white hover:shadow-[0px_0px_30px_14px] shadow-[0px_0px_30px_7px] hover:shadow-white/50 shadow-white/50 text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-100 transition duration-300">
                            Get Started
                        </button>
                    </div>
                </nav>
            </div>
    )
}

export default Navbar