"use client";
import React from 'react'
import SplitText from "@/components/SplitText";
import GradientText from '@/components/GradientText'
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

const Homepage = () => {
  return (
    <div className="flex h-screen">
      {/* Left side - 50% for image/animation */}
      <div className="w-1/2 h-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center relative overflow-hidden">
        <div className="text-center">
          {/* Placeholder for image or animation */}
          <div className="w-64 h-64 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-6xl font-bold shadow-2xl">
            👨‍💻
          </div>
          {/* Simple animation - floating elements */}
          <div className="absolute top-20 left-20 w-8 h-8 bg-yellow-400 rounded-full animate-bounce"></div>
          <div className="absolute bottom-32 right-16 w-6 h-6 bg-green-400 rounded-full animate-pulse"></div>
          <div className="absolute top-1/2 left-10 w-4 h-4 bg-red-400 rounded-full animate-ping"></div>
        </div>
      </div>

      {/* Right side - 50% for text */}
      <BackgroundBeamsWithCollision className="w-1/2 h-full flex items-center justify-center !h-full">
        <div className="max-w-2xl text-center relative z-20 px-8 py-4">
          {/* Profile Image Circle */}
          <div className="w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mx-auto mb-8 flex items-center justify-center shadow-2xl overflow-hidden">
            <img
              src="./pixel_me.jpeg"
              alt="Ayush Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <SplitText
            text="Hi"
            className="text-9xl font-semibold text-center"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
            />
            <br/>
            <SplitText
            text="I'm Ayush"
            className="text-5xl font-semibold text-center"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
            />
         <GradientText
            colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
            animationSpeed={3}
            showBorder={false}
            className="custom-class"
          >
            Full-Stack Developer & Designer
          </GradientText>
          <p className="text-2xl text-gray-500 mb-10 leading-relaxed">
            I create beautiful, functional web applications and user experiences.
            Passionate about clean code, innovative design, and solving complex problems.
          </p>
          <div className="flex gap-6 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-lg font-medium transition-colors text-xl">
              View My Work
            </button>
            <button className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 px-10 py-4 rounded-lg font-medium transition-colors text-xl">
              Get In Touch
            </button>
          </div>
        </div>
      </BackgroundBeamsWithCollision>
    </div>
  )
}

export default Homepage