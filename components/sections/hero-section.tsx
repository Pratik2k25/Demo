"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const word = "SafarUp";

const sideImages = [
  {
    src: "/images/bodh-gaya.jpg",
    alt: "Mahabodhi Temple Bodh Gaya",
    position: "left",
    span: 1,
  },
  {
    src: "/images/rajgir.jpg",
    alt: "Rajgir Hills Peace Pagoda",
    position: "left",
    span: 1,
  },
  {
    src: "/images/nalanda.jpg",
    alt: "Ancient Nalanda University Ruins",
    position: "right",
    span: 1,
  },
  {
    src: "/images/vaishali.jpg",
    alt: "Vaishali Archaeological Site",
    position: "right",
    span: 1,
  },
];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollableHeight = window.innerHeight * 2;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableHeight));
      
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Text fades out first (0 to 0.2)
  const textOpacity = Math.max(0, 1 - (scrollProgress / 0.2));
  
  // Image transforms start after text fades (0.2 to 1)
  const imageProgress = Math.max(0, Math.min(1, (scrollProgress - 0.2) / 0.8));
  
  // Mobile-specific values
  if (isMobile) {
    const mobileProgress = imageProgress;
    const mobileCenterHeight = 60 - (mobileProgress * 15); // 60% to 45%
    const mobileGap = mobileProgress * 8;
    const mobileBorderRadius = mobileProgress * 16;
    const mobileSideOpacity = mobileProgress;
    const mobileSideHeight = mobileProgress * 18; // 0% to 18%

    return (
      <section ref={sectionRef} className="relative bg-background">
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="flex h-full w-full flex-col items-center justify-center px-4" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
            {/* Top Side Images Row */}
            <div 
              className="flex w-full gap-2 mb-2"
              style={{ 
                height: `${mobileSideHeight}%`,
                opacity: mobileSideOpacity,
                gap: `${mobileGap}px`,
              }}
            >
              {sideImages.filter(img => img.position === "left").map((img, idx) => (
                <div 
                  key={idx}
                  className="relative flex-1 overflow-hidden"
                  style={{ borderRadius: `${mobileBorderRadius}px` }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Main Hero Image */}
            <div 
              className="relative w-full overflow-hidden"
              style={{
                height: `${mobileCenterHeight}%`,
                borderRadius: `${mobileBorderRadius}px`,
              }}
            >
              <Image
                src="/images/bihar-hero.jpg"
                alt="Discover the Soul of Bihar"
                fill
                className="object-cover"
                priority
              />
              
              {/* Overlay Text */}
              <div 
                className="absolute inset-0 flex items-end overflow-hidden"
                style={{ opacity: textOpacity }}
              >
                <h1 className="w-full text-[18vw] font-medium leading-[0.8] tracking-tighter text-white pb-4 pl-4">
                  {word.split("").map((letter, index) => (
                    <span
                      key={index}
                      className="inline-block animate-[slideUp_0.8s_ease-out_forwards] opacity-0"
                      style={{ animationDelay: `${index * 0.08}s` }}
                    >
                      {letter}
                    </span>
                  ))}
                </h1>
              </div>
            </div>

            {/* Bottom Side Images Row */}
            <div 
              className="flex w-full gap-2 mt-2"
              style={{ 
                height: `${mobileSideHeight}%`,
                opacity: mobileSideOpacity,
                gap: `${mobileGap}px`,
              }}
            >
              {sideImages.filter(img => img.position === "right").map((img, idx) => (
                <div 
                  key={idx}
                  className="relative flex-1 overflow-hidden"
                  style={{ borderRadius: `${mobileBorderRadius}px` }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll space */}
        <div className="h-[200vh]" />

        {/* Tagline */}
        <div className="px-6 pt-24 pb-20 md:pt-48 md:px-12 md:pb-36 lg:px-20 lg:pt-56 lg:pb-44">
          <p className="mx-auto max-w-2xl text-center text-xl leading-relaxed text-muted-foreground md:text-3xl lg:text-[2.5rem] lg:leading-snug">
            AI-powered travel platform
            <br />
            transforming tourism from Bihar to India.
          </p>
        </div>
      </section>
    );
  }
  
  // Desktop layout
  const centerWidth = 100 - (imageProgress * 58);
  const centerHeight = 100 - (imageProgress * 30);
  const sideWidth = imageProgress * 22;
  const sideOpacity = imageProgress;
  const sideTranslateLeft = -100 + (imageProgress * 100);
  const sideTranslateRight = 100 - (imageProgress * 100);
  const borderRadius = imageProgress * 24;
  const gap = imageProgress * 16;
  const sideTranslateY = -(imageProgress * 15);

  return (
    <section ref={sectionRef} className="relative bg-background">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="flex h-full w-full items-center justify-center">
          <div 
            className="relative flex h-full w-full items-stretch justify-center"
            style={{ gap: `${gap}px`, padding: `${imageProgress * 16}px`, paddingBottom: `${60 + (imageProgress * 40)}px` }}
          >
            
            {/* Left Column */}
            <div 
              className="flex flex-col will-change-transform"
              style={{
                width: `${sideWidth}%`,
                gap: `${gap}px`,
                transform: `translateX(${sideTranslateLeft}%) translateY(${sideTranslateY}%)`,
                opacity: sideOpacity,
              }}
            >
              {sideImages.filter(img => img.position === "left").map((img, idx) => (
                <div 
                  key={idx} 
                  className="relative overflow-hidden will-change-transform"
                  style={{
                    flex: img.span,
                    borderRadius: `${borderRadius}px`,
                  }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Main Hero Image */}
            <div 
              className="relative overflow-hidden will-change-transform"
              style={{
                width: `${centerWidth}%`,
                height: `${centerHeight}%`,
                flex: "0 0 auto",
                borderRadius: `${borderRadius}px`,
              }}
            >
              <Image
                src="/images/bihar-hero.jpg"
                alt="Discover the Soul of Bihar"
                fill
                className="object-cover"
                priority
              />
              
              <div 
                className="absolute inset-0 flex items-end overflow-hidden"
                style={{ opacity: textOpacity }}
              >
                <h1 className="w-full text-[22vw] font-medium leading-[0.8] tracking-tighter text-white">
                  {word.split("").map((letter, index) => (
                    <span
                      key={index}
                      className="inline-block animate-[slideUp_0.8s_ease-out_forwards] opacity-0"
                      style={{
                        animationDelay: `${index * 0.08}s`,
                        transition: 'all 1.5s',
                        transitionTimingFunction: 'cubic-bezier(0.86, 0, 0.07, 1)',
                      }}
                    >
                      {letter}
                    </span>
                  ))}
                </h1>
              </div>
            </div>

            {/* Right Column */}
            <div 
              className="flex flex-col will-change-transform"
              style={{
                width: `${sideWidth}%`,
                gap: `${gap}px`,
                transform: `translateX(${sideTranslateRight}%) translateY(${sideTranslateY}%)`,
                opacity: sideOpacity,
              }}
            >
              {sideImages.filter(img => img.position === "right").map((img, idx) => (
                <div 
                  key={idx} 
                  className="relative overflow-hidden will-change-transform"
                  style={{
                    flex: img.span,
                    borderRadius: `${borderRadius}px`,
                  }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      <div className="h-[200vh]" />

      <div className="px-6 pt-32 pb-28 md:pt-48 md:px-12 md:pb-36 lg:px-20 lg:pt-56 lg:pb-44">
        <p className="mx-auto max-w-2xl text-center text-2xl leading-relaxed text-muted-foreground md:text-3xl lg:text-[2.5rem] lg:leading-snug">
          AI-powered travel platform
          <br />
          transforming tourism from Bihar to India.
        </p>
      </div>
    </section>
  );
}
