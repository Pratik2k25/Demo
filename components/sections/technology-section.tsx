"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function ScrollRevealText({ text }: { text: string }) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const startOffset = windowHeight * 0.9;
      const endOffset = windowHeight * 0.1;
      
      const totalDistance = startOffset - endOffset;
      const currentPosition = startOffset - rect.top;
      
      const newProgress = Math.max(0, Math.min(1, currentPosition / totalDistance));
      setProgress(newProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const words = text.split(" ");
  
  return (
    <p
      ref={containerRef}
      className="text-2xl font-semibold leading-snug md:text-3xl lg:text-4xl"
    >
      {words.map((word, index) => {
        const wordProgress = index / words.length;
        const isRevealed = progress > wordProgress;
        
        return (
          <span
            key={index}
            className="transition-colors duration-150"
            style={{
              color: isRevealed ? "var(--foreground)" : "#e4e4e7",
            }}
          >
            {word}{index < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </p>
  );
}

const sideImages = [
  {
    src: "/images/tech-side-1.jpg",
    alt: "Vikramshila Buddhist ruins Bihar",
    position: "left",
    span: 1,
  },
  {
    src: "/images/tech-side-2.jpg",
    alt: "Bihar Sikki grass craft artisan",
    position: "left",
    span: 1,
  },
  {
    src: "/images/tech-side-3.jpg",
    alt: "Gridhakuta Hill sunset Rajgir",
    position: "right",
    span: 1,
  },
  {
    src: "/images/tech-side-4.jpg",
    alt: "Traditional Mithila wedding Bihar",
    position: "right",
    span: 1,
  },
];

export function TechnologySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textSectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  const descriptionText = "SafarUp is building a structured and AI-powered travel ecosystem to connect travelers with authentic experiences across Bihar and beyond. Smart itinerary planning, local guide matching, transparent booking, and hidden destination discovery - all in one integrated platform.";

  useEffect(() => {
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

  // Title fades out first (0 to 0.2)
  const titleOpacity = Math.max(0, 1 - (scrollProgress / 0.2));
  
  // Image transforms start after title fades (0.2 to 1)
  const imageProgress = Math.max(0, Math.min(1, (scrollProgress - 0.2) / 0.8));

  // Mobile layout
  if (isMobile) {
    const mobileProgress = imageProgress;
    const mobileCenterHeight = 60 - (mobileProgress * 15);
    const mobileGap = mobileProgress * 8;
    const mobileBorderRadius = mobileProgress * 16;
    const mobileSideOpacity = mobileProgress;
    const mobileSideHeight = mobileProgress * 18;

    return (
      <section ref={sectionRef} className="relative bg-foreground">
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

            {/* Main Center Image */}
            <div 
              className="relative w-full overflow-hidden"
              style={{
                height: `${mobileCenterHeight}%`,
                borderRadius: `${mobileBorderRadius}px`,
              }}
            >
              <Image
                src="/images/tech-bihar.jpg"
                alt="Kesariya Stupa - Ancient Bihar heritage"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-foreground/40" />
              
              {/* Title Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
                <h2 className="text-4xl font-medium leading-tight tracking-tight text-white">
                  {["Escape", "Out", "to Explore."].map((word, index) => {
                    const wordFadeStart = index * 0.07;
                    const wordFadeEnd = wordFadeStart + 0.07;
                    const wordProgress = Math.max(0, Math.min(1, (scrollProgress - wordFadeStart) / (wordFadeEnd - wordFadeStart)));
                    const wordOpacity = 1 - wordProgress;
                    const wordBlur = wordProgress * 10;
                    
                    return (
                      <span
                        key={index}
                        className="inline-block"
                        style={{
                          opacity: wordOpacity,
                          filter: `blur(${wordBlur}px)`,
                          marginRight: index < 2 ? '0.3em' : '0',
                        }}
                      >
                        {word}
                        {index === 1 && <br />}
                      </span>
                    );
                  })}
                </h2>
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

        <div className="h-[200vh]" />

        {/* Description Section */}
        <div 
          ref={textSectionRef}
          className="relative overflow-hidden bg-background px-6 py-20 md:px-12 md:py-32 lg:px-20 lg:py-40"
        >
          <div className="relative z-10 mx-auto max-w-4xl">
            <ScrollRevealText text={descriptionText} />
          </div>
        </div>
      </section>
    );
  }
  
  // Desktop layout
  const centerWidth = 100 - (imageProgress * 58);
  const sideWidth = imageProgress * 22;
  const sideOpacity = imageProgress;
  const sideTranslateLeft = -100 + (imageProgress * 100);
  const sideTranslateRight = 100 - (imageProgress * 100);
  const borderRadius = imageProgress * 24;
  const gap = imageProgress * 16;

  return (
    <section ref={sectionRef} className="relative bg-foreground">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="flex h-full w-full items-center justify-center">
          <div 
            className="relative flex h-full w-full items-stretch justify-center"
            style={{ gap: `${gap}px`, padding: `${imageProgress * 16}px` }}
          >
            
            {/* Left Column */}
            <div 
              className="flex flex-col will-change-transform"
              style={{
                width: `${sideWidth}%`,
                gap: `${gap}px`,
                transform: `translateX(${sideTranslateLeft}%)`,
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

            {/* Main Center Image */}
            <div 
              className="relative overflow-hidden will-change-transform"
              style={{
                width: `${centerWidth}%`,
                height: "100%",
                flex: "0 0 auto",
                borderRadius: `${borderRadius}px`,
              }}
            >
              <Image
                src="/images/tech-bihar.jpg"
                alt="Kesariya Stupa - Ancient Bihar heritage"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-foreground/40" />
              
              <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                <h2 className="max-w-3xl font-medium leading-tight tracking-tight text-white md:text-5xl lg:text-7xl text-5xl">
                  {["Escape", "Out", "to Explore."].map((word, index) => {
                    const wordFadeStart = index * 0.07;
                    const wordFadeEnd = wordFadeStart + 0.07;
                    const wordProgress = Math.max(0, Math.min(1, (scrollProgress - wordFadeStart) / (wordFadeEnd - wordFadeStart)));
                    const wordOpacity = 1 - wordProgress;
                    const wordBlur = wordProgress * 10;
                    
                    return (
                      <span
                        key={index}
                        className="inline-block"
                        style={{
                          opacity: wordOpacity,
                          filter: `blur(${wordBlur}px)`,
                          transition: 'opacity 0.1s linear, filter 0.1s linear',
                          marginRight: index < 2 ? '0.3em' : '0',
                        }}
                      >
                        {word}
                        {index === 1 && <br />}
                      </span>
                    );
                  })}
                </h2>
              </div>
            </div>

            {/* Right Column */}
            <div 
              className="flex flex-col will-change-transform"
              style={{
                width: `${sideWidth}%`,
                gap: `${gap}px`,
                transform: `translateX(${sideTranslateRight}%)`,
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

      {/* Description Section */}
      <div 
        ref={textSectionRef}
        className="relative overflow-hidden bg-background px-6 py-24 md:px-12 md:py-32 lg:px-20 lg:py-40"
      >
        <div className="relative z-10 mx-auto max-w-4xl">
          <ScrollRevealText text={descriptionText} />
        </div>
      </div>
    </section>
  );
}
