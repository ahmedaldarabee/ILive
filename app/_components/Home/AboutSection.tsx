"use client"

import React from 'react'
import {motion, Variants} from 'framer-motion'


const AboutSection = () => {
    
    const childVariants : Variants = {
        hidden: { x: -100, opacity: 0 },
        visible: { 
            x: 0, 
            opacity: 1,
            transition: {
                duration: 0.7,
                ease: "easeOut"
            }
        },
        
    }
    return (
        <motion.section
            initial={{
                opacity:0,
                y:-200,
            }}

            whileInView={{
                opacity:1,
                y:0,
                transition:{
                    duration:1,
                    ease: "easeOut"
                }
            }}

            viewport={{
                once:true,
                amount:0.1
            }}
        >
            <h1 className="text-3xl font-semibold text-center mx-auto cursor-pointer">About our website</h1>
                <p className="text-sm text-slate-500 text-center mt-2 max-w-md mx-auto">
                    A visual collection of our most recent works - each piece crafted with intention, emotion and style.
                </p>
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 px-4 md:px-0 py-10">
                    
                    <img className="max-w-md w-full rounded-xl h-[350px] cursor-pointer"
                        src="/assets/Imgs/about-us.jpg"
                        alt="about us"
                        
                        />
                    <div>
                        <h1 className="text-3xl font-semibold">Our Latest features</h1>
                        <p className="text-sm text-slate-500 mt-2">
                            Ship Beautiful Frontends Without the Overhead — Customizable, Scalable and Developer-Friendly UI
                            Components.
                        </p>
                
                        <motion.div 
                            initial="hidden"
                            whileInView="visible"
                            transition={{ staggerChildren: 0.3 }}
                            viewport={{ once: true, amount: 0.1 }}
                        
                        className="flex flex-col gap-5 mt-6 cursor-pointer">
                            <motion.div 
                            variants={childVariants}
                            className="flex items-center gap-4">
                                <div className="size-9 p-2 bg-indigo-50 border border-indigo-200 rounded">
                                    <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/flashEmoji.png" alt="" />
                                </div>
                                <div>
                                    <h3 className="text-base font-medium text-slate-600">Lightning-Fast Performance</h3>
                                    <p className="text-sm text-slate-500">Built with speed — minimal load times and optimized.</p>
                                </div>
                            </motion.div>
                            
                            <motion.div
                            variants={childVariants}
                            className="flex items-center gap-4">
                                <div className="size-9 p-2 bg-indigo-50 border border-indigo-200 rounded">
                                    <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/colorsEmoji.png" alt="" />
                                </div>
                                <div>
                                    <h3 className="text-base font-medium text-slate-600">Beautifully Designed Components</h3>
                                    <p className="text-sm text-slate-500">Modern, pixel-perfect UI components ready for any project.</p>
                                </div>
                            </motion.div>
                            
                            <motion.div
                            variants={childVariants}
                            className="flex items-center gap-4">
                                <div className="size-9 p-2 bg-indigo-50 border border-indigo-200 rounded">
                                    <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/puzzelEmoji.png" alt="" />
                                </div>
                                <div>
                                    <h3 className="text-base font-medium text-slate-600">Plug-and-Play Integration</h3>
                                    <p className="text-sm text-slate-500">Simple setup with support for React, Next.js and Tailwind css.</p>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
        </motion.section>
    )
}

export default AboutSection