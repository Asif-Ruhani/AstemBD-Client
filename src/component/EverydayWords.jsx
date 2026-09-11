import React, { useEffect, useState } from 'react';
import { LiaExternalLinkSquareAltSolid } from 'react-icons/lia';
import { Link } from 'react-router';
import useAuth from '../Hooks/useAuth';

const EverydayWords = () => {
  const [activeTab, setActiveTab] = useState('vocab'); // 'vocab' or 'grammar'
  const [searchQuery, setSearchQuery] = useState('');
  const [sections, setSection] = useState([]);

  const { user, loading } = useAuth();

  useEffect(() => {
    // Wait until Firebase finishes checking the session and ensures a user is logged in
    if (loading || !user) return;

    const fetchSections = async () => {
      try {
        const token = await user.getIdToken();

        const response = await fetch(
          'https://astembd-server.onrender.com/sections',
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch sections: ${response.status}`);
        }

        const data = await response.json();
        setSection(data);
      } catch (error) {
        console.error('Error fetching sections:', error);
      }
    };

    fetchSections();
  }, [user, loading]);

  const extraCategories = [
    { name: "Hospital & Medical", icon: "🏥" },
    { name: "Bank & Financial", icon: "🏦" },
    { name: "Airport & Travel", icon: "✈️" },
    { name: "Restaurant & Cafe", icon: "☕" },
    { name: "Emergency Services", icon: "🚨" },
    { name: "Tech & Software", icon: "💻" },
  ];

  const grammarTopics = [
    { id: 1, title: "Tense Mastery for Daily Speech", desc: "Present indefinite, continuous & perfect in conversation." },
    { id: 2, title: "Prepositions of Place & Time", desc: "In, On, At, Under, Over - Daily context usage." },
    { id: 3, title: "Modal Verbs for Polite Requests", desc: "Could, Would, Should, Might, May." },
    { id: 4, title: "Imperative Sentences for Daily Orders", desc: "Do's and Don'ts around home and office." },
    { id: 5, title: "Conjunctions for Complex Sentences", desc: "Although, Because, Therefore, While, Whereas." },
    { id: 6, title: "Active to Passive in Formal Scenarios", desc: "Transforming office statements politely." },
  ];

  const filteredSections = sections.filter((s) => {
    const q = searchQuery.toLowerCase();
    const titleMatch = s?.title ? s.title.toLowerCase().includes(q) : false;
    const engTitleMatch = s?.engTitle ? s.engTitle.toLowerCase().includes(q) : false;
    const noMatch = s?.no ? String(s.no).includes(searchQuery) : false;
    return titleMatch || engTitleMatch || noMatch;
  });

  return (
    <section className="bg-slate-50/70 dark:bg-zinc-950 py-16 px-4 sm:px-6 lg:px-[100px] min-h-screen">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-200/70 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {sections.length > 0 ? `${sections.length}-Day Conversational Blueprint` : 'Conversational Blueprint'}
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Everyday English & Grammar Hub
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-zinc-400">
            Select a life scenario to master categorized verbs, nouns, adjectives, and adverbs.
          </p>
        </div>

        {/* 1. TOP TWO TABS (Matching Image Design) */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-10 max-w-4xl mx-auto">
          {/* VOCABULARIES TAB */}
          <button
            onClick={() => setActiveTab('vocab')}
            className={`py-6 sm:py-8 px-6 rounded-2xl border-2 font-black text-lg sm:text-2xl tracking-wider transition-all duration-200 cursor-pointer shadow-sm flex flex-col items-center justify-center gap-2 ${activeTab === 'vocab'
              ? 'bg-white dark:bg-zinc-900 border-slate-900 dark:border-white text-slate-900 dark:text-white shadow-lg ring-2 ring-slate-900/10 dark:ring-white/10'
              : 'bg-slate-200/60 dark:bg-zinc-900/60 border-slate-200 dark:border-zinc-800 text-slate-500 dark:text-zinc-400 hover:bg-white dark:hover:bg-zinc-900'
              }`}
          >
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span>VOCABULARIES</span>
            </div>
            <span className="text-xs font-semibold text-slate-400 dark:text-zinc-500">
              {sections.length > 0 ? `${sections.length} Categorized Daily Life Sections` : 'Categorized Daily Life Sections'}
            </span>
          </button>

          {/* GRAMMAR TAB */}
          <button
            onClick={() => setActiveTab('grammar')}
            className={`py-6 sm:py-8 px-6 rounded-2xl border-2 font-black text-lg sm:text-2xl tracking-wider transition-all duration-200 cursor-pointer shadow-sm flex flex-col items-center justify-center gap-2 ${activeTab === 'grammar'
              ? 'bg-white dark:bg-zinc-900 border-slate-900 dark:border-white text-slate-900 dark:text-white shadow-lg ring-2 ring-slate-900/10 dark:ring-white/10'
              : 'bg-slate-200/60 dark:bg-zinc-900/60 border-slate-200 dark:border-zinc-800 text-slate-500 dark:text-zinc-400 hover:bg-white dark:hover:bg-zinc-900'
              }`}
          >
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              <span>GRAMMAR</span>
            </div>
            <span className="text-xs font-semibold text-slate-400 dark:text-zinc-500">
              Structures, Syntax & Usage
            </span>
          </button>
        </div>

        {/* 2. MAIN CONTENT AREA */}
        {activeTab === 'vocab' ? (
          <div className="space-y-10">

            {/* Search and Section Stats */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-zinc-900 p-4 rounded-2xl border-2 border-slate-200/80 dark:border-zinc-800">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-zinc-200">
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span>{sections.length} Daily Life Scenarios Available</span>
              </div>

              {/* Search Bar */}
              <div className="relative w-full sm:w-80">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search section by keyword (e.g. ঘুম, নাশতা)..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 focus:outline-none focus:border-slate-900 dark:focus:border-white"
                />
                <svg className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Interactive Section Cards */}
            {/* <Link to={`/everydayWordSectionDetail/${item.sectionNumber}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {filteredSections.map((item, index) => (
                  <div
                    key={item._id}
                    className="group bg-white dark:bg-zinc-900 rounded-xl p-4 border-2 border-slate-200/80 dark:border-zinc-800 shadow-sm hover:border-slate-400 dark:hover:border-zinc-600 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 flex-shrink-0 flex items-center justify-center font-black text-xs border border-slate-200/80 dark:border-zinc-700 group-hover:bg-slate-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-slate-900 transition-colors">
                        {item.no ?? index + 1}
                      </span>
                      <div>
                        <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug group-hover:text-primary transition-colors">
                          SECTION {item.no ?? index + 1}: {item.title}
                        </h3>
                        <p className="text-[11px] text-slate-500 dark:text-zinc-400 font-medium mt-0.5">
                          {item.engTitle}
                        </p>
                      </div>
                    </div>

                    <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white flex items-center justify-center flex-shrink-0">
                      <svg className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </Link> */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {filteredSections.map((item, index) => (
                <Link
                  key={item._id}
                  to={`/english-vocab/everyday-Word/section/${item.sectionNumber}`}
                  className="group bg-white dark:bg-zinc-900 rounded-xl p-4 border-2 border-slate-200/80 dark:border-zinc-800 shadow-sm hover:border-slate-400 dark:hover:border-zinc-600 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 flex-shrink-0 flex items-center justify-center font-black text-xs border border-slate-200/80 dark:border-zinc-700 group-hover:bg-slate-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-slate-900 transition-colors">
                      {item.no ?? index + 1}
                    </span>
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug group-hover:text-primary transition-colors">
                        SECTION {item.no ?? index + 1}: {item.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 dark:text-zinc-400 font-medium mt-0.5">
                        {item.engTitle}
                      </p>
                    </div>
                  </div>

                  <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>

            {/* 3. EXTRA VOCABULARY FOR IMPORTANT AREAS */}
            <div className="mt-14 pt-10 border-t-2 border-slate-200/80 dark:border-zinc-800">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
                  Extra Vocabulary for Important Areas:
                </h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
                {extraCategories.map((cat, idx) => (
                  <button
                    key={idx}
                    className="p-4 rounded-xl bg-white dark:bg-zinc-900 border-2 border-slate-200/80 dark:border-zinc-800 shadow-sm hover:border-primary hover:shadow-md transition-all text-center flex flex-col items-center justify-center gap-2 group cursor-pointer"
                  >
                    <span className="text-2xl group-hover:scale-110 transition-transform">{cat.icon}</span>
                    <span className="text-xs font-bold text-slate-800 dark:text-zinc-200 group-hover:text-primary transition-colors">
                      {cat.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        ) : (
          /* GRAMMAR MODULE VIEW */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {grammarTopics.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border-2 border-slate-200/80 dark:border-zinc-800 shadow-sm hover:border-slate-400 dark:hover:border-zinc-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[11px] font-bold text-indigo-500 uppercase tracking-wider block mb-1">
                    Lesson {item.id}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <button
                  onClick={() => alert(`Opening grammar practice module: ${item.title}`)}
                  className="mt-6 w-full py-2.5 rounded-xl bg-slate-100 dark:bg-zinc-800 hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 text-xs font-bold transition-colors cursor-pointer"
                >
                  Start Grammar Lesson →
                </button>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default EverydayWords;