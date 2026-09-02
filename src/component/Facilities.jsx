import React, { useState } from 'react';

const Facilities = () => {
  // 30 Curated facility images tailored for EduPath
  const allFacilities = [
    {
      id: 1,
      title: "Smart Multimedia Classrooms",
      category: "Classrooms",
      desc: "Equipped with 4K interactive digital smartboards and acoustic sound insulation.",
      img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=800",
      featured: true,
    },
    {
      id: 2,
      title: "Central Digital Library",
      category: "Self Study",
      desc: "Over 20,000+ academic volumes, e-journals, and high-speed research terminals.",
      img: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=800",
      featured: false,
    },
    {
      id: 3,
      title: "Advanced Physics Research Lab",
      category: "Laboratories",
      desc: "Precision optical benches, mechanics apparatus, and digital sensor kits.",
      img: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800",
      featured: false,
    },
    {
      id: 4,
      title: "IELTS & GRE Language Lab",
      category: "Language",
      desc: "Individual soundproof booths with studio headsets for authentic speaking mocks.",
      img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800",
      featured: false,
    },
    {
      id: 5,
      title: "Collaborative Study Pods",
      category: "Self Study",
      desc: "Ergonomic spaces designed for group problem-solving and peer learning.",
      img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
      featured: true,
    },
    {
      id: 6,
      title: "Chemistry Analytical Lab",
      category: "Laboratories",
      desc: "Fume hoods, digital titrators, and comprehensive organic reagent stations.",
      img: "https://images.unsplash.com/photo-1603555501671-8f96b3fce8b4?auto=format&fit=crop&q=80&w=800",
      featured: false,
    },
    {
      id: 7,
      title: "Auditorium & Masterclass Hall",
      category: "Classrooms",
      desc: "Tiered 250-seat lecture hall for guest lectures, seminars, and orientation.",
      img: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=800",
      featured: false,
    },
    {
      id: 8,
      title: "Modern Computer Vision Lab",
      category: "Tech & IT",
      desc: "High-spec workstations configured for STEM modeling and diagnostic tests.",
      img: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800",
      featured: false,
    },
    {
      id: 9,
      title: "Biology & Genetics Lab",
      category: "Laboratories",
      desc: "Compound electron microscopes and specimens for medical batch prep.",
      img: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=800",
      featured: false,
    },
    {
      id: 10,
      title: "Quiet Individual Study Zone",
      category: "Self Study",
      desc: "Distraction-free environment with individual study cubicles and power outlets.",
      img: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=800",
      featured: false,
    },
    {
      id: 11,
      title: "Study Abroad Advisory Lounge",
      category: "Counseling",
      desc: "Private 1-on-1 counseling rooms for visa mock drills and SOP reviews.",
      img: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800",
      featured: true,
    },
    {
      id: 12,
      title: "Mock Exam Testing Hall",
      category: "Classrooms",
      desc: "Strict board & GRE-standard exam environment for weekly full-length tests.",
      img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800",
      featured: false,
    },
    {
      id: 13,
      title: "Robotics & STEM Workshop",
      category: "Laboratories",
      desc: "Hands-on project desks equipped with 3D printers and micro-controllers.",
      img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800",
      featured: false,
    },
    {
      id: 14,
      title: "Faculty Discussion Lounge",
      category: "Counseling",
      desc: "Open consultation zone for personalized doubt-clearing sessions.",
      img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800",
      featured: false,
    },
    {
      id: 15,
      title: "Cafeteria & Relaxation Commons",
      category: "Campus Life",
      desc: "Hygienic dining and relaxation space for students between intensive classes.",
      img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800",
      featured: true,
    },
    {
      id: 16,
      title: "Online Live Broadcast Studio",
      category: "Tech & IT",
      desc: "4K studio cameras and soundproof baffling for crystal-clear online live classes.",
      img: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=800",
      featured: false,
    },
    {
      id: 17,
      title: "Mathematical Olympiad Workshop",
      category: "Classrooms",
      desc: "Equipped with oversized collaborative chalk and dry-erase magnetic boards.",
      img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800",
      featured: false,
    },
    {
      id: 18,
      title: "Server Room & Campus Network",
      category: "Tech & IT",
      desc: "Gigabit BDIX fiber network providing low-latency server connections.",
      img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800",
      featured: false,
    },
    {
      id: 19,
      title: "Open-Air Reading Terrace",
      category: "Campus Life",
      desc: "Greenery-filled outdoor seating for refreshing morning study sessions.",
      img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800",
      featured: false,
    },
    {
      id: 20,
      title: "Student Health & First Aid Center",
      category: "Campus Life",
      desc: "On-campus basic medical support with certified health personnel.",
      img: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800",
      featured: false,
    },
    {
      id: 21,
      title: "Digital Archive & E-Reader Section",
      category: "Self Study",
      desc: "Dedicated Kindle and tablet stations for foreign research papers.",
      img: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800",
      featured: true,
    },
    {
      id: 22,
      title: "Conference & Seminar Room",
      category: "Classrooms",
      desc: "Executive boardroom setup for scholarship panels and committee meetings.",
      img: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800",
      featured: false,
    },
    {
      id: 23,
      title: "Interactive Debate & Presentation Zone",
      category: "Language",
      desc: "Microphone-fitted stage for student presentations and public speaking.",
      img: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=800",
      featured: false,
    },
    {
      id: 24,
      title: "24/7 Monitored Campus Security",
      category: "Campus Life",
      desc: "CCTV surveillance and access control for student safety.",
      img: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=800",
      featured: false,
    },
    {
      id: 25,
      title: "Physics Mechanics Rigging Hub",
      category: "Laboratories",
      desc: "Dedicated rigs for projectile and harmonic motion experiments.",
      img: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80&w=800",
      featured: false,
    },
    {
      id: 26,
      title: "Organic Chemistry Glassware Unit",
      category: "Laboratories",
      desc: "Custom glassware sets for distillation, extraction, and synthesis.",
      img: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=800",
      featured: false,
    },
    {
      id: 27,
      title: "Student Locker & Storage Bays",
      category: "Campus Life",
      desc: "Secure individual lockers for academic equipment and books.",
      img: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&q=80&w=800",
      featured: false,
    },
    {
      id: 28,
      title: "Scholarship Research Corner",
      category: "Counseling",
      desc: "Direct access to international university admission databases.",
      img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800",
      featured: true,
    },
    {
      id: 29,
      title: "Audio/Video Post-Production Suite",
      category: "Tech & IT",
      desc: "Where video lectures and animations are edited for student portals.",
      img: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=800",
      featured: false,
    },
    {
      id: 30,
      title: "Green Campus Central Plaza",
      category: "Campus Life",
      desc: "Vibrant community center connecting all academic and laboratory wings.",
      img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
      featured: false,
    },
  ];

  // State to manage visible count (starts at 10, increments by 10)
  const [visibleCount, setVisibleCount] = useState(10);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSeeMore = () => {
    setVisibleCount((prev) => Math.min(prev + 10, allFacilities.length));
  };

  const visibleFacilities = allFacilities.slice(0, visibleCount);
  const hasMore = visibleCount < allFacilities.length;

  return (
    <section className="bg-slate-50/70 dark:bg-zinc-950 py-16 px-4 sm:px-6 lg:px-[100px] border-b border-slate-200/80 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-200/70 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Infrastructure & Amenities
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              World-Class Campus Facilities
            </h2>
          </div>
          <p className="text-slate-600 dark:text-zinc-400 text-xs sm:text-sm max-w-md">
            Explore our cutting-edge labs, modern smart classrooms, and collaborative spaces engineered to support your academic success.
          </p>
        </div>

        {/* Compact 4-Column Grid with reduced height (auto-rows-[195px]) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[195px]">
          {visibleFacilities.map((item, index) => {
            // Apply 2-column span to maintain dynamic grid rhythm
            const isFeaturedSpan = item.featured && index % 4 === 0;

            return (
              <div
                key={item.id}
                onClick={() => setSelectedImage(item)}
                className={`group relative rounded-xl overflow-hidden cursor-pointer border-2 border-slate-200/80 dark:border-zinc-800 bg-slate-900 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.06)] hover:shadow-xl hover:border-slate-400 dark:hover:border-zinc-600 transition-all duration-300 ${
                  isFeaturedSpan ? 'sm:col-span-2 lg:col-span-2' : 'col-span-1'
                }`}
              >
                {/* Image */}
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out brightness-95 group-hover:brightness-105"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                {/* Top Category Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-slate-900/80 backdrop-blur-md text-white border border-white/10 shadow-sm">
                    {item.category}
                  </span>
                </div>

                {/* Bottom Card Content */}
                <div className="absolute bottom-0 inset-x-0 p-3.5 sm:p-4 z-10 flex flex-col justify-end">
                  <h3 className="text-sm font-bold text-white group-hover:text-primary transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="mt-0.5 text-[11px] text-slate-300 leading-snug line-clamp-1">
                    {item.desc}
                  </p>

                  {/* Expand preview hint */}
                  <div className="mt-2 flex items-center gap-1 text-[10px] font-bold text-slate-400 group-hover:text-white transition-colors">
                    <span>View photo</span>
                    <svg className="w-3 h-3 transform group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Counter & See More Button */}
        <div className="mt-12 flex flex-col items-center justify-center gap-3">
          <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-zinc-400">
            Showing <span className="text-slate-900 dark:text-white font-bold">{visibleFacilities.length}</span> of <span className="text-slate-900 dark:text-white font-bold">{allFacilities.length}</span> facilities
          </p>

          {hasMore ? (
            <button
              onClick={handleSeeMore}
              className="px-7 py-3 rounded-xl text-xs sm:text-sm font-bold bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-primary hover:text-primary-content dark:hover:bg-primary dark:hover:text-primary-content transition-all duration-200 flex items-center justify-center gap-2 shadow-md active:scale-[0.99] cursor-pointer"
            >
              <span>See More Facilities (+10)</span>
              <svg className="w-3.5 h-3.5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          ) : (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-xs font-bold text-slate-600 dark:text-zinc-400">
              <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              <span>You have viewed all 30 campus facilities</span>
            </div>
          )}
        </div>

      </div>

      {/* Fullscreen Lightbox / Modal when clicking an image */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-slate-900 rounded-3xl overflow-hidden border-2 border-slate-700 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Image */}
            <div className="h-[320px] sm:h-[420px] w-full">
              <img
                src={selectedImage.img}
                alt={selectedImage.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Modal Details Footer */}
            <div className="p-5 sm:p-6 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                  {selectedImage.category}
                </span>
                <h3 className="text-lg font-black text-white mt-0.5">
                  {selectedImage.title}
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  {selectedImage.desc}
                </p>
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-white text-xs font-bold hover:bg-slate-700 transition-colors cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Facilities;