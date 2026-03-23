"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";

const problems = [
  "Multiple apps needed for one trip",
  "No personalized trip planning",
  "Limited access to trusted local guides",
  "Hidden gems remain undiscovered",
  "Scattered and unreliable booking options",
  "Language and cultural barriers",
];

const solutions = [
  "One integrated platform for everything",
  "AI-powered smart itinerary planning",
  "Verified local guide matching system",
  "Hidden destination discovery feature",
  "Transparent and secure booking",
  "Travel companion matching",
];

export function PhilosophySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [problemTranslateX, setProblemTranslateX] = useState(-100);
  const [solutionTranslateX, setSolutionTranslateX] = useState(100);
  const [titleOpacity, setTitleOpacity] = useState(1);
  const rafRef = useRef<number | null>(null);

  const updateTransforms = useCallback(() => {
    if (!sectionRef.current) return;
    
    const rect = sectionRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const sectionHeight = sectionRef.current.offsetHeight;
    
    // Calculate progress based on scroll position
    const scrollableRange = sectionHeight - windowHeight;
    const scrolled = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / scrollableRange));
    
    // Problem comes from left (-100% to 0%)
    setProblemTranslateX((1 - progress) * -100);
    
    // Solution comes from right (100% to 0%)
    setSolutionTranslateX((1 - progress) * 100);
    
    // Title fades out as blocks come together
    setTitleOpacity(1 - progress);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Cancel any pending animation frame
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      
      // Use requestAnimationFrame for smooth updates
      rafRef.current = requestAnimationFrame(updateTransforms);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateTransforms();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updateTransforms]);

  return (
    <section id="destinations" className="bg-background">
      {/* Scroll-Animated Product Grid */}
      <div ref={sectionRef} className="relative" style={{ height: "200vh" }}>
        <div className="sticky top-0 h-screen flex items-center justify-center">
          <div className="relative w-full">
            {/* Title - positioned behind the blocks */}
            <div 
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
              style={{ opacity: titleOpacity }}
            >
              <h2 className="text-[10vw] font-medium leading-[0.95] tracking-tighter text-foreground md:text-[8vw] lg:text-[6vw] text-center px-6">
                Problem & Solution.
              </h2>
            </div>

            {/* Cards Grid */}
            <div className="relative z-10 grid grid-cols-1 gap-4 px-4 md:grid-cols-2 md:px-12 lg:px-20">
              {/* Problem Card - comes from left */}
              <div 
                className="relative overflow-hidden rounded-2xl bg-red-50 border border-red-100 p-6 md:p-8"
                style={{
                  transform: `translate3d(${problemTranslateX}%, 0, 0)`,
                  WebkitTransform: `translate3d(${problemTranslateX}%, 0, 0)`,
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  minHeight: '280px',
                }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold text-red-700">The Problem</h3>
                </div>
                <ul className="space-y-3">
                  {problems.map((problem, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm md:text-base text-red-600">
                      <span className="text-red-400 mt-1">-</span>
                      <span>{problem}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Solution Card - comes from right */}
              <div 
                className="relative overflow-hidden rounded-2xl bg-green-50 border border-green-100 p-6 md:p-8"
                style={{
                  transform: `translate3d(${solutionTranslateX}%, 0, 0)`,
                  WebkitTransform: `translate3d(${solutionTranslateX}%, 0, 0)`,
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  minHeight: '280px',
                }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold text-green-700">SafarUp Solution</h3>
                </div>
                <ul className="space-y-3">
                  {solutions.map((solution, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm md:text-base text-green-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{solution}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description with Image */}
      <div className="px-6 py-16 md:px-12 md:py-24 lg:px-20 lg:py-32">
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Why SafarUp
          </p>
          <p className="mt-8 leading-relaxed text-muted-foreground text-xl md:text-2xl lg:text-3xl text-center max-w-4xl mx-auto">
            Multiple apps for one trip. No personalized planning. Limited access to trusted guides. Hidden destinations undiscovered. SafarUp solves it all with one integrated platform.
          </p>
        </div>
        
        {/* Image below Why SafarUp */}
        <div className="mt-16 relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden rounded-2xl">
          <Image
            src="/images/safarup-vision.jpg"
            alt="SafarUp - Transforming travel in Bihar"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
