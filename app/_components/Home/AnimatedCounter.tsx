"use client"

import React, { useEffect } from 'react'
import { animate, motion, useMotionValue, useTransform } from "framer-motion"

interface IAnimatedCounterProps{ 
    mainNumber: number;
    info: string
}

const AnimatedCounter = ({ mainNumber, info }: IAnimatedCounterProps) => {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));

    useEffect(() => {
        const controls = animate(count, mainNumber, { duration: 4 });
        return () => controls.stop();
    }, [mainNumber, count]);

    return (
        <div className="hover:-translate-y-4 transform transition-all duration-300 text-center cursor-pointer">
            <motion.pre className="text-4xl font-bold text-[#2b79e0]">
                <motion.span>{rounded}</motion.span>+
            </motion.pre>
            <p className="text-gray-600">{info}</p>
        </div>
    );
};

export default AnimatedCounter