import React, { useState } from 'react';

const Gallery = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [activeVideo, setActiveVideo] = useState(null);

  // Video Success Stories
  const videoStories = [
    {
      id: 1,
      name: "Tanvir Ahmed",
      role: "IELTS Candidate • Band 8.0",
      target: "University of Toronto Admit",
      thumbnail: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with your actual video URL
      duration: "3:45 min",
      highlight: "From Band 6.0 to 8.0 in 8 Weeks",
    },
    {
      id: 2,
      name: "Nusrat Jahan",
      role: "HSC Science (Batch '26)",
      target: "GPA 5.0 (Golden) • BUET CSE Aspirant",
      thumbnail: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with your actual video URL
      duration: "4:12 min",
      highlight: "How I Mastered Higher Math & Physics CQ",
    },
    {
      id: 3,
      name: "Rahim Chowdhury",
      role: "GRE General Test",
      target: "Score: 328 (Q:168, V:160)",
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with your actual video URL
      duration: "2:55 min",
      highlight: "Vocabulary Flashcards & Quant Algorithm Drills",
    },
  ];

  // Written Testimonials
  const reviews = [
    {
      id: 1,
      name: "Sadia Rahman",
      category: "hsc",
      badge: "HSC Science",
      achievement: "GPA 5.0 • Dhaka Board",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
      rating: 5,
      date: "2 weeks ago",
      text: "The conceptual breakdown of Organic Chemistry and Calculus in this platform is unmatched. Solving past 10 years of board CQ with step-by-step guidance gave me complete confidence on exam day.",
    },
    {
      id: 2,
      name: "Mahmudul Hasan",
      category: "ielts-gre",
      badge: "Study Abroad",
      achievement: "GRE 325 • Erasmus Scholar",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150",
      rating: 5,
      date: "1 month ago",
      text: "The High-Yield GRE Vocabulary module and Writing Task evaluations were game-changers. The personalized SOP feedback from mentors helped me secure full funding for my Master’s.",
    },
    {
      id: 3,
      name: "Anika Tabassum",
      category: "vocab",
      badge: "Vocabulary",
      achievement: "3,000+ Words Mastered",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150",
      rating: 5,
      date: "3 weeks ago",
      text: "I used to forget difficult words within days. The spaced repetition drills and contextual sentences made retaining high-frequency academic vocabulary effortless.",
    },
    {
      id: 4,
      name: "Farhan Kabir",
      category: "ssc",
      badge: "SSC Science",
      achievement: "GPA 5.0 • Rajshahi Board",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=150",
      rating: 5,
      date: "Just now",
      text: "The weekly model tests and chapter-wise formula sheets are lifesavers. It pointed out my exact weak zones in General Math theorems before the final exams.",
    },
    {
      id: 5,
      name: "Fariha Sultana",
      category: "ielts-gre",
      badge: "IELTS Prep",
      achievement: "Overall Band 8.5",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
      rating: 5,
      date: "2 months ago",
      text: "The 1-on-1 speaking mock sessions simulate the real exam perfectly. The instant pronunciation feedback and structural templates for Writing Task 2 made all the difference.",
    },
    {
      id: 6,
      name: "Sajid Karim",
      category: "hsc",
      badge: "HSC Science",
      achievement: "Physics 1st & 2nd Paper (96%)",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150",
      rating: 5,
      date: "1 month ago",
      text: "Mechanics and Electromagnetism were always intimidating until I went through the live problem-solving classes here. Truly high-standard preparation.",
    },
  ];

  const filteredReviews = activeTab === 'all' 
    ? reviews 
    : reviews.filter((r) => r.category === activeTab);

  return (
    <section className="bg-slate-50/70 dark:bg-zinc-950 py-20 px-4 sm:px-6 lg:px-[100px] border-b border-slate-200/80 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header & Metrics Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-200/70 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Verified Results & Reviews
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Stories from Our Achievers
            </h2>
            <p className="mt-2 text-slate-600 dark:text-zinc-400 text-sm max-w-xl">
              Hear directly from students who achieved their dream board GPAs, top percentile IELTS/GRE scores, and university admissions.
            </p>
          </div>

          {/* Social Proof Metric Pill */}
          <div className="flex items-center gap-4 bg-white dark:bg-zinc-900 p-4 rounded-2xl border-2 border-slate-200/80 dark:border-zinc-800 shadow-sm flex-shrink-0">
            <div className="flex -space-x-2 overflow-hidden">
              <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white dark:ring-zinc-900 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" alt="Student" />
              <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white dark:ring-zinc-900 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" alt="Student" />
              <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white dark:ring-zinc-900 object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100" alt="Student" />
            </div>
            <div>
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-xs font-bold text-slate-900 dark:text-white ml-1">4.9 / 5.0</span>
              </div>
              <p className="text-[11px] font-semibold text-slate-500 dark:text-zinc-400">Based on 2,400+ Verified Ratings</p>
            </div>
          </div>
        </div>

        {/* 1. Video Testimonials Row */}
        <div className="mb-16">
          <h3 className="text-lg font-black text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <span>Featured Video Journeys</span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">Watch</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videoStories.map((video) => (
              <div
                key={video.id}
                onClick={() => setActiveVideo(video)}
                className="group relative bg-white dark:bg-zinc-900 rounded-2xl border-2 border-slate-200/80 dark:border-zinc-800 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)] hover:shadow-xl hover:border-slate-400 dark:hover:border-zinc-700 transition-all duration-200 overflow-hidden cursor-pointer"
              >
                {/* Thumbnail Container with Play Button Overlay */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                  <img
                    src={video.thumbnail}
                    alt={video.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-black/30 to-transparent" />
                  
                  {/* Pulsing Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/90 text-slate-900 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-content transition-all duration-200">
                      <svg className="w-5 h-5 fill-current ml-0.5" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>

                  {/* Video Duration Badge */}
                  <span className="absolute bottom-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded bg-black/70 text-white backdrop-blur-sm">
                    {video.duration}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <span className="text-[11px] font-bold text-primary uppercase tracking-wider block mb-1">
                    {video.highlight}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                    {video.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                    {video.role} • <span className="font-semibold text-slate-700 dark:text-zinc-300">{video.target}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Written Testimonials Section with Filters */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              Student Reviews
            </h3>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 dark:bg-zinc-900 p-1.5 rounded-xl border border-slate-200/80 dark:border-zinc-800">
              {[
                { id: 'all', label: 'All Reviews' },
                { id: 'hsc', label: 'HSC' },
                { id: 'ssc', label: 'SSC' },
                { id: 'ielts-gre', label: 'IELTS / GRE' },
                { id: 'vocab', label: 'Vocabulary' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                      : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReviews.map((review) => (
              <div
                key={review.id}
                className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border-2 border-slate-200/80 dark:border-zinc-800 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] hover:shadow-lg hover:border-slate-300 dark:hover:border-zinc-700 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Top Row: Badge & Rating */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold uppercase tracking-wide px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-slate-200/60 dark:border-zinc-700">
                      {review.badge}
                    </span>
                    <div className="flex items-center text-amber-500">
                      {[...Array(review.rating)].map((_, i) => (
                        <svg key={i} className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>

                  {/* Review Quote */}
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed italic mb-6">
                    "{review.text}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-4 border-t border-slate-100 dark:border-zinc-800/80 flex items-center gap-3">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-10 h-10 rounded-full object-cover ring-1 ring-slate-200 dark:ring-zinc-700"
                  />
                  <div>
                    <h5 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-tight">
                      {review.name}
                    </h5>
                    <p className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                      {review.achievement}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Video Lightbox Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-slate-900 rounded-3xl overflow-hidden border-2 border-slate-700 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Embedded Video Player */}
            <div className="aspect-video w-full">
              <iframe
                src={activeVideo.videoUrl}
                title={activeVideo.name}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Video Footer Metadata */}
            <div className="p-5 bg-slate-900 border-t border-slate-800 flex items-center justify-between">
              <div>
                <h4 className="text-base font-black text-white">{activeVideo.name}</h4>
                <p className="text-xs text-slate-400">{activeVideo.role} • {activeVideo.target}</p>
              </div>
              <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-lg border border-primary/20">
                {activeVideo.highlight}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;