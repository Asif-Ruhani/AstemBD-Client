import React, { useState } from 'react';
import SectionWordDetails from './EverydayWordSectionDetail';

const EverydayWords = () => {
  const [activeTab, setActiveTab] = useState('vocab'); // 'vocab' or 'grammar'
  const [selectedSection, setSelectedSection] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // 30 Daily Sections from the provided image
  const sections = [
    { id: 1, no: "01", title: "ঘুম থেকে জাগরণ ও সকালের সূচনা", engTitle: "Waking Up & Morning Routine" },
    { id: 2, no: "02", title: "মশারি খোলা, সরানো ও গুছিয়ে রাখা", engTitle: "Folding & Storing Mosquito Net" },
    { id: 3, no: "03", title: "বিছানা গোছানো ও শয়নকক্ষ পরিপাটি করা", engTitle: "Making Bed & Tidying Bedroom" },
    { id: 4, no: "04", title: "লাইট, ফ্যান, দরজা ও জানালার ব্যবহার", engTitle: "Using Lights, Fans, Doors & Windows" },
    { id: 5, no: "05", title: "সকালের ঘর পরিষ্কার ও গৃহস্থালি গুছিয়ে নেওয়া", engTitle: "Morning House Cleaning & Chores" },
    { id: 6, no: "06", title: "বাথরুমের ব্যবহার ও ব্যক্তিগত পরিচ্ছন্নতা", engTitle: "Bathroom Use & Personal Hygiene" },
    { id: 7, no: "07", title: "গোসল ও শরীরের দৈনন্দিন পরিচর্যা", engTitle: "Showering & Daily Body Care" },
    { id: 8, no: "08", title: "পোশাক পরিধান ও দিনের জন্য প্রস্তুতি", engTitle: "Dressing Up & Getting Ready" },
    { id: 9, no: "09", title: "নামাজ আদায় ও দৈনন্দিন ধর্মীয় কার্যক্রম", engTitle: "Prayers & Daily Religious Deeds" },
    { id: 10, no: "10", title: "রান্নাঘরে সকালের নাশতা প্রস্তুতকরণ", engTitle: "Preparing Morning Breakfast" },
    { id: 11, no: "11", title: "সকালের নাশতা ও খাবার গ্রহণের কার্যক্রম", engTitle: "Having Breakfast & Eating Routine" },
    { id: 12, no: "12", title: "খাবারের পর বাসন পরিষ্কার ও রান্নাঘর গোছানো", engTitle: "Dishwashing & Kitchen Cleanup" },
    { id: 13, no: "13", title: "মোবাইল ব্যবহার, যোগাযোগ ও দিনের প্রস্তুতি", engTitle: "Phone Usage, Messaging & Day Planning" },
    { id: 14, no: "14", title: "বাসা থেকে বের হওয়া ও দৈনন্দিন যাতায়াত", engTitle: "Leaving Home & Daily Commute" },
    { id: 15, no: "15", title: "অফিস ও কর্মস্থলের দৈনন্দিন কার্যক্রম", engTitle: "Office & Workplace Routine" },
    { id: 16, no: "16", title: "শিক্ষার্থীদের দৈনন্দিন পড়াশোনা ও শিক্ষা কার্যক্রম", engTitle: "Students Study & Academic Routine" },
    { id: 17, no: "17", title: "দুপুরের খাবার প্রস্তুতি, পরিবেশন ও গ্রহণ", engTitle: "Lunch Prep, Serving & Dining" },
    { id: 18, no: "18", title: "দুপুরের বিশ্রাম ও স্বল্প সময়ের ঘুম", engTitle: "Midday Rest & Power Nap" },
    { id: 19, no: "19", title: "বিকেলের সময়, অবসর ও বিনোদনমূলক কার্যক্রম", engTitle: "Afternoon Leisure & Entertainment" },
    { id: 20, no: "20", title: "বাজার করা, কেনাকাটা ও মূল্য নিয়ে দরদাম", engTitle: "Grocery Shopping & Bargaining" },
    { id: 21, no: "21", title: "সন্ধ্যায় বাসায় ফেরা ও পারিবারিক সময়", engTitle: "Returning Home & Family Evening" },
    { id: 22, no: "22", title: "সন্ধ্যার নামাজ ও ধর্মীয় অনুশীলন", engTitle: "Evening Prayers & Practices" },
    { id: 23, no: "23", title: "রাতের খাবারের প্রস্তুতি ও রান্নার কার্যক্রম", engTitle: "Dinner Preparation & Cooking" },
    { id: 24, no: "24", title: "রাতের খাবার গ্রহণ ও পরবর্তী গৃহস্থালি কাজ", engTitle: "Dining & Post-Dinner Chores" },
    { id: 25, no: "25", title: "পরিবারের সঙ্গে সময় কাটানো ও রাতের পারিবারিক কার্যক্রম", engTitle: "Family Bonding & Night Activities" },
    { id: 26, no: "26", title: "ঘুমানোর আগে মোবাইল ব্যবহার ও ডিজিটাল কার্যক্রম", engTitle: "Bedtime Screen Time & Media" },
    { id: 27, no: "27", title: "পরবর্তী দিনের জন্য পোশাক, ব্যাগ ও প্রয়োজনীয় সামগ্রী প্রস্তুত", engTitle: "Next-Day Preparation & Packing" },
    { id: 28, no: "28", title: "ঘুমানোর আগে ব্যক্তিগত পরিচর্যা ও পরিচ্ছন্নতা", engTitle: "Night-time Hygiene & Skincare" },
    { id: 29, no: "29", title: "বিছানায় যাওয়া ও ঘুমের পূর্বপ্রস্তুতি", engTitle: "Going to Bed & Wind-Down" },
    { id: 30, no: "30", title: "ঘুমিয়ে পড়া, গভীর নিদ্রা ও পরবর্তী দিনের সূচনা", engTitle: "Deep Sleep & Next Morning Transition" },
  ];

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

  const filteredSections = sections.filter(
    (s) =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.engTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.no.includes(searchQuery)
  );

  // If a section is clicked, show its word classification details
  if (selectedSection) {
    return (
      <SectionWordDetails
        section={selectedSection}
        onBack={() => setSelectedSection(null)}
      />
    );
  }

  return (
    <section className="bg-slate-50/70 dark:bg-zinc-950 py-16 px-4 sm:px-6 lg:px-[100px] min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-200/70 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            30-Day Conversational Blueprint
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
            className={`py-6 sm:py-8 px-6 rounded-2xl border-2 font-black text-lg sm:text-2xl tracking-wider transition-all duration-200 cursor-pointer shadow-sm flex flex-col items-center justify-center gap-2 ${
              activeTab === 'vocab'
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
              30 Categorized Daily Life Sections
            </span>
          </button>

          {/* GRAMMAR TAB */}
          <button
            onClick={() => setActiveTab('grammar')}
            className={`py-6 sm:py-8 px-6 rounded-2xl border-2 font-black text-lg sm:text-2xl tracking-wider transition-all duration-200 cursor-pointer shadow-sm flex flex-col items-center justify-center gap-2 ${
              activeTab === 'grammar'
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
                <span>30 Daily Life Scenarios Available</span>
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

            {/* 30 Interactive Section Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {filteredSections.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedSection(item)}
                  className="group bg-white dark:bg-zinc-900 rounded-xl p-4 border-2 border-slate-200/80 dark:border-zinc-800 shadow-sm hover:border-slate-400 dark:hover:border-zinc-600 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 flex-shrink-0 flex items-center justify-center font-black text-xs border border-slate-200/80 dark:border-zinc-700 group-hover:bg-slate-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-slate-900 transition-colors">
                      {item.no}
                    </span>
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug group-hover:text-primary transition-colors">
                        SECTION {item.no}: {item.title}
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
                    onClick={() =>
                      setSelectedSection({
                        id: 100 + idx,
                        no: `EX-${idx + 1}`,
                        title: cat.name,
                        engTitle: `${cat.name} Terminology & Phrases`,
                      })
                    }
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