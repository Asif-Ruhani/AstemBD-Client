import React, { useState } from 'react';

const EverydayWordSectionDetail = ({ section, onBack }) => {
  const [activeTab, setActiveTab] = useState('verbs');

  // Sample categorized words for the selected section
  const classifiedData = {
    verbs: [
      { word: "Wake up", ipa: "/weɪk ʌp/", bangla: "ঘুম থেকে ওঠা / জাগ্রত হওয়া", example: "I usually wake up at 6:00 AM every morning." },
      { word: "Turn off", ipa: "/tɜːrn ɔːf/", bangla: "বন্ধ করা (অ্যালার্ম/লাইট)", example: "He turned off the alarm as soon as it rang." },
      { word: "Stretch", ipa: "/strɛtʃ/", bangla: "শরীর টানটান করা / আড়মোড়া ভাঙা", example: "I stretch my arms before getting out of bed." },
      { word: "Yawn", ipa: "/jɔːn/", bangla: "হাই তোলা", example: "She yawned deeply as she was still feeling sleepy." },
      { word: "Rise", ipa: "/raɪz/", bangla: "শয্যা ত্যাগ করা", example: "He rises early to start his morning prayer." },
    ],
    nouns: [
      { word: "Alarm clock", ipa: "/əˈlɑːrm klɒk/", bangla: "অ্যালার্ম ঘড়ি", example: "My alarm clock is set for 5:30 AM." },
      { word: "Dawn", ipa: "/dɔːn/", bangla: "ভোর / প্রত্যুষ", example: "The sky looks mesmerizing right at dawn." },
      { word: "Blanket", ipa: "/ˈblæŋkɪt/", bangla: "কম্বল", example: "Fold the blanket properly after waking up." },
      { word: "Snooze", ipa: "/snuːz/", bangla: "সাময়িক বিরতি (অ্যালার্মের)", example: "Avoid hitting the snooze button repeatedly." },
      { word: "Daylight", ipa: "/ˈdeɪlaɪt/", bangla: "দিনের আলো", example: "Daylight slowly filtered through the window blinds." },
    ],
    adjectives: [
      { word: "Groggy", ipa: "/ˈɡrɒɡi/", bangla: "ঘুম ঘুম ভাব / আচ্ছন্ন", example: "I feel groggy if I don't get at least 7 hours of sleep." },
      { word: "Refreshed", ipa: "/rɪˈfrɛʃt/", bangla: "সতেজ / পুনরুজ্জীবিত", example: "A splash of cold water makes me feel refreshed." },
      { word: "Early", ipa: "/ˈɜːrli/", bangla: "সকাল সকাল / সময়মতো", example: "Being an early riser keeps your mind proactive." },
      { word: "Drowsy", ipa: "/ˈdraʊzi/", bangla: "তন্দ্রাচ্ছন্ন", example: "The cool morning breeze took away his drowsy feeling." },
    ],
    adverbs: [
      { word: "Promptly", ipa: "/ˈprɒmptli/", bangla: "বিলম্ব ছাড়া / তৎক্ষণাৎ", example: "She stepped out of bed promptly after the chime." },
      { word: "Gradually", ipa: "/ˈɡrædʒuəli/", bangla: "ধীরে ধীরে / ক্রমান্বয়ে", example: "The room gradually filled with natural morning light." },
      { word: "Early", ipa: "/ˈɜːrli/", bangla: "ভোরে / প্রত্যুষে", example: "He woke up early to complete his assignments." },
      { word: "Reluctantly", ipa: "/rɪˈlʌktəntli/", bangla: "অনিচ্ছা সত্ত্বেও", example: "I reluctantly left the cozy bed on a cold morning." },
    ],
  };

  const tabs = [
    { id: 'verbs', label: 'Verbs (ক্রিয়া)', count: classifiedData.verbs.length, color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40' },
    { id: 'nouns', label: 'Nouns (বিশেষ্য)', count: classifiedData.nouns.length, color: 'text-blue-600 bg-blue-50 dark:bg-blue-950/40' },
    { id: 'adjectives', label: 'Adjectives (বিশেষণ)', count: classifiedData.adjectives.length, color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40' },
    { id: 'adverbs', label: 'Adverbs (ক্রিয়াবিশেষণ)', count: classifiedData.adverbs.length, color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/40' },
  ];

  return (
    <section className="bg-slate-50/70 dark:bg-zinc-950 py-16 px-4 sm:px-6 lg:px-[100px] min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Navigation & Breadcrumb */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-200/80 dark:border-zinc-800">
          <button
            onClick={onBack}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-white dark:bg-zinc-900 border-2 border-slate-200 dark:border-zinc-800 text-slate-800 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-all flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to All Sections</span>
          </button>

          <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-200/80 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300">
            SECTION {section.no}
          </span>
        </div>

        {/* Section Title Banner */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 sm:p-8 border-2 border-slate-200/80 dark:border-zinc-800 shadow-sm mb-8">
          <span className="text-xs font-black text-primary uppercase tracking-widest block mb-1">
            Life Scenario Breakdown
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            SECTION {section.no}: {section.title}
          </h1>
          <p className="text-sm font-medium text-slate-500 dark:text-zinc-400 mt-1">
            {section.engTitle}
          </p>
        </div>

        {/* 4 Classification Tabs (Verbs, Nouns, Adjectives, Adverbs) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`p-4 rounded-xl border-2 font-bold text-xs sm:text-sm transition-all duration-200 flex flex-col items-center justify-center gap-1 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white shadow-md'
                  : 'bg-white dark:bg-zinc-900 border-slate-200/80 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:border-slate-300'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${activeTab === tab.id ? 'bg-white/20 text-white dark:bg-black/20 dark:text-black' : tab.color}`}>
                {tab.count} Words
              </span>
            </button>
          ))}
        </div>

        {/* Word Details Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {classifiedData[activeTab].map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-zinc-900 rounded-xl p-5 border-2 border-slate-200/80 dark:border-zinc-800 shadow-sm hover:border-slate-400 dark:hover:border-zinc-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
                      {item.word}
                    </h3>
                    <span className="text-xs font-mono font-semibold text-slate-400 dark:text-zinc-500">
                      {item.ipa}
                    </span>
                  </div>

                  {/* Audio Pronunciation Button (Stub) */}
                  <button
                    onClick={() => {
                      const utterance = new SpeechSynthesisUtterance(item.word);
                      utterance.lang = 'en-US';
                      window.speechSynthesis.speak(utterance);
                    }}
                    className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300 hover:bg-primary hover:text-white transition-colors flex items-center justify-center cursor-pointer"
                    title="Listen Pronunciation"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                  </button>
                </div>

                {/* Bengali Meaning */}
                <div className="mt-2 mb-3">
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-md">
                    বাংলা: {item.bangla}
                  </span>
                </div>

                {/* Example Sentence */}
                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-zinc-800">
                  <p className="text-xs text-slate-500 dark:text-zinc-400 font-semibold mb-0.5">
                    Real-life Scenario:
                  </p>
                  <p className="text-xs sm:text-sm text-slate-800 dark:text-zinc-200 italic font-medium">
                    "{item.example}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default EverydayWordSectionDetail;