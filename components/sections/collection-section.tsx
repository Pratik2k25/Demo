"use client";

import { FadeImage } from "@/components/fade-image";

const destinations = [
  {
    id: 1,
    name: "Bodh Gaya",
    description: "The sacred site of Buddha's enlightenment",
    price: "Heritage",
    image: "/images/dest-bodhgaya.jpg",
  },
  {
    id: 2,
    name: "Rajgir",
    description: "Ancient capital with hot springs and hills",
    price: "Nature",
    image: "/images/dest-rajgir.jpg",
  },
  {
    id: 3,
    name: "Nalanda",
    description: "World's oldest university ruins",
    price: "History",
    image: "/images/dest-nalanda.jpg",
  },
  {
    id: 4,
    name: "Vaishali",
    description: "Birthplace of democracy and Jainism",
    price: "Culture",
    image: "/images/dest-vaishali.jpg",
  },
  {
    id: 5,
    name: "Chhath Puja",
    description: "Traditional arts and vibrant festivals",
    price: "Experience",
    image: "/images/dest-culture.jpg",
  },
  {
    id: 6,
    name: "Sacred Rivers",
    description: "Spiritual journeys along ancient waterways",
    price: "Spiritual",
    image: "/images/dest-river.jpg",
  },
];

export function CollectionSection() {
  return (
    <section id="explore" className="bg-background">
      {/* Section Title */}
      <div className="px-6 py-20 md:px-12 lg:px-20 md:py-10">
        <h2 className="text-3xl font-medium tracking-tight text-foreground md:text-4xl">
          Top Bihar Destinations
        </h2>
      </div>

      {/* Destinations Grid/Carousel */}
      <div className="pb-24">
        {/* Mobile: Horizontal Carousel */}
        <div className="flex gap-6 overflow-x-auto px-6 pb-4 md:hidden snap-x snap-mandatory scrollbar-hide">
          {destinations.map((destination) => (
            <div key={destination.id} className="group flex-shrink-0 w-[75vw] snap-center">
              {/* Image */}
              <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-secondary">
                <FadeImage
                  src={destination.image || "/placeholder.svg"}
                  alt={destination.name}
                  fill
                  className="object-cover group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="py-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium leading-snug text-foreground">
                      {destination.name}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {destination.description}
                    </p>
                  </div>
                  <span className="text-lg font-medium text-foreground">
                    {destination.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 md:px-12 lg:px-20">
          {destinations.map((destination) => (
            <div key={destination.id} className="group">
              {/* Image */}
              <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-secondary">
                <FadeImage
                  src={destination.image || "/placeholder.svg"}
                  alt={destination.name}
                  fill
                  className="object-cover group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="py-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium leading-snug text-foreground">
                      {destination.name}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {destination.description}
                    </p>
                  </div>
                  <span className="font-medium text-foreground text-2xl">
                    {destination.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
