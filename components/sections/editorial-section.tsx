"use client";

import Image from "next/image";

const credentials = [
  { 
    label: "IIM Bodh Gaya", 
    value: "Incubated",
    logo: "/images/logo-iim.jpg"
  },
  { 
    label: "Startup Bihar", 
    value: "Selected",
    logo: "/images/logo-startup-bihar.jpg"
  },
  { 
    label: "DPIIT", 
    value: "Recognized",
    logo: "/images/logo-dpiit.jpg"
  },
  { 
    label: "Bihar Tourism", 
    value: "Partner",
    logo: "/images/logo-bihar-tourism.jpg"
  },
];

export function EditorialSection() {
  return (
    <section className="bg-background">
      {/* Section Title */}
      <div className="px-6 py-12 text-center md:px-12 md:py-16 lg:px-20">
        <h2 className="text-2xl font-medium tracking-tight text-foreground md:text-3xl lg:text-4xl">
          Backed by the Best
        </h2>
        <p className="mt-4 text-sm text-muted-foreground max-w-md mx-auto">
          Recognized and supported by leading institutions
        </p>
      </div>

      {/* Credentials Grid - Fixed Mobile Layout */}
      <div className="grid grid-cols-2 gap-4 px-4 pb-12 md:grid-cols-4 md:gap-0 md:px-0 md:border-t md:border-border">
        {credentials.map((cred, index) => (
          <div
            key={cred.label}
            className="flex flex-col items-center justify-center p-6 text-center bg-secondary/30 rounded-2xl md:rounded-none md:bg-transparent md:border-b md:border-r md:border-border md:p-8 md:last:border-r-0"
          >
            {/* Logo */}
            <div className="relative w-16 h-16 mb-4 rounded-full overflow-hidden bg-white shadow-sm">
              <Image
                src={cred.logo}
                alt={cred.label}
                fill
                className="object-cover"
              />
            </div>
            {/* Label */}
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
              {cred.label}
            </p>
            {/* Value */}
            <p className="font-semibold text-foreground text-lg md:text-2xl lg:text-3xl">
              {cred.value}
            </p>
          </div>
        ))}
      </div>

      {/* Full-width Video */}
      <div className="relative aspect-[16/9] w-full md:aspect-[21/9]">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/bcdafadc-cb7e-4cb7-9cbf-edcbaf2360a5_1.mp4"
        />
      </div>
    </section>
  );
}
