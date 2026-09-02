import React from 'react';
import { Link } from 'react-router';


const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-slate-900 text-slate-300 dark:bg-black overflow-hidden border-t-2 border-slate-800">
      {/* Top subtle ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-primary/10 via-transparent to-transparent blur-2xl pointer-events-none" />

      {/* Main Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-[100px] pt-16 pb-10">
        
        {/* Newsletter / CTA Banner */}
        <div className="relative bg-gradient-to-r from-slate-800/80 via-slate-800/40 to-slate-800/80 rounded-3xl p-8 sm:p-10 border border-slate-700/70 shadow-2xl mb-16 overflow-hidden">
          <div className="absolute -right-12 -top-12 w-48 h-48 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-primary/20 text-primary-content mb-3 border border-primary/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Stay Ahead of Exam Curves
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Get Weekly Study Roadmaps & Vocab Sets
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                Join 50,000+ students receiving high-yield test insights, model exam routines, and scholarship alerts directly in their inbox.
              </p>
            </div>

            {/* Newsletter Input Form */}
            <form onSubmit={(e) => e.preventDefault()} className="w-full sm:w-auto flex flex-col sm:flex-row gap-2.5 max-w-md">
              <div className="relative flex-1">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  className="w-full sm:w-72 px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-white text-slate-900 hover:bg-primary hover:text-primary-content text-xs sm:text-sm font-bold transition-all duration-200 shadow-md flex items-center justify-center gap-2 flex-shrink-0 cursor-pointer"
              >
                <span>Subscribe</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>
          </div>
        </div>

        {/* 5-Column Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Info & Socials (Spans 2 cols on Desktop) */}
          <div className="col-span-2 space-y-5">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-white text-slate-900 flex items-center justify-center text-xl font-black shadow-md group-hover:scale-105 transition-transform">
                <span>E</span>
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                EDUPATH<span className="text-primary font-bold">.</span>
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              Standardized learning ecosystems engineered for SSC, HSC, English fluency, and competitive global admissions.
            </p>

            {/* Platform Status Chip */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-[11px] font-medium text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>All Systems Operational • 2026-27</span>
            </div>

            {/* Social Media Links */}
            <div className="pt-1 flex items-center gap-2.5">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-xl bg-slate-800/90 border border-slate-700 text-slate-300 hover:text-white hover:bg-blue-600 hover:border-blue-600 transition-all duration-200 flex items-center justify-center shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* WhatsApp */}
              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-xl bg-slate-800/90 border border-slate-700 text-slate-300 hover:text-white hover:bg-emerald-600 hover:border-emerald-600 transition-all duration-200 flex items-center justify-center shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.124-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
              </a>

              {/* Telegram */}
              <a
                href="https://telegram.org"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="w-9 h-9 rounded-xl bg-slate-800/90 border border-slate-700 text-slate-300 hover:text-white hover:bg-sky-500 hover:border-sky-500 transition-all duration-200 flex items-center justify-center shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-xl bg-slate-800/90 border border-slate-700 text-slate-300 hover:text-white hover:bg-red-600 hover:border-red-600 transition-all duration-200 flex items-center justify-center shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Academic Modules */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-white mb-4">
              Academic Tracks
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm font-medium">
              <li>
                <Link to="/ssc" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5">
                  <span>SSC (2026-2027)</span>
                  {/* <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400">Live</span> */}
                </Link>
              </li>
              <li>
                <Link to="/hsc" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5">
                  <span>HSC (2026-2027)</span>
                  {/* <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400">Live</span> */}
                </Link>
              </li>
              <li>
                <Link to="/englishVocub" className="text-slate-400 hover:text-white transition-colors">
                  English Vocabulary
                </Link>
              </li>
              <li>
                <Link to="/studyAbroad" className="text-slate-400 hover:text-white transition-colors">
                  Study Abroad (IELTS/GRE)
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform Features */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-white mb-4">
              Learning Hub
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm font-medium">
              <li>
                <Link to="/presentationBoard" className="text-slate-400 hover:text-white transition-colors">
                  Presentation Board
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-slate-400 hover:text-white transition-colors">
                  Student Dashboard
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-slate-400 hover:text-white transition-colors">
                  Batch Enrollment
                </Link>
              </li>
              <li>
                <a href="#all-programs" className="text-slate-400 hover:text-white transition-colors">
                  Curriculum Catalog
                </a>
              </li>
            </ul>
          </div>

          {/* Trust & Legal */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-white mb-4">
              Trust & Security
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm font-medium">
              <li>
                <Link to="/privacy" className="text-slate-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-slate-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-slate-400 hover:text-white transition-colors">
                  Student Helpdesk
                </Link>
              </li>
              <li>
                <span className="text-emerald-400 text-xs flex items-center gap-1.5 font-semibold">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  256-bit Encrypted
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright, Developer Credits & Back to Top */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-400">
          
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} <span className="text-white font-bold">EduPath Inc.</span> All rights reserved. Standardized Academic System.
          </p>

          {/* Developer Tribute */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80">
            <span className="text-slate-400">Designed & Developed</span>
            <span className="text-slate-400">by</span>
            <span className="text-white font-bold tracking-wide">Asif Ruhani</span>
          </div>

          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <div className="w-6 h-6 rounded-md bg-slate-800 flex items-center justify-center border border-slate-700">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
              </svg>
            </div>
          </button>

        </div>

      </div>
    </footer>
  );
};

export default Footer;