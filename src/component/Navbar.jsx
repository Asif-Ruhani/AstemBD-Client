import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';



const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Eng Vocab', path: '/english-vocab' },
    { name: 'SSC', path: '/ssc' },
    { name: 'HSC', path: '/hsc' },
    { name: 'Study Abroad', path: '/study-abroad' },
    { name: 'Presentation Board', path: '/presentationBoard' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/85 dark:bg-zinc-950/85 backdrop-blur-md shadow-md border-b border-slate-200/80 dark:border-zinc-800'
          : 'bg-white/70 dark:bg-zinc-950/70 backdrop-blur-sm border-b border-slate-200/40 dark:border-zinc-800/40'
      }`}
    >
      <div className="w-full px-4 sm:px-8 lg:px-[100px]">
        <div className="flex items-center justify-between h-20">
          
          {/* LEFT: Brand Logo (Always on the left on all devices) */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-slate-900 text-xl font-black shadow-sm group-hover:scale-105 transition-transform">
              <span>E</span>
            </div>
            <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              EDUPATH<span className="text-primary font-bold">.</span>
            </span>
          </Link>

          {/* CENTER: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-slate-100/80 dark:bg-zinc-900/80 p-1.5 rounded-full border border-slate-200/60 dark:border-zinc-800">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
                    isActive
                      ? 'bg-white dark:bg-zinc-800 text-slate-900 dark:text-white shadow-sm ring-1 ring-black/5'
                      : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT (DESKTOP): Auth Buttons (Hidden on mobile) */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/login"
              className="px-4 py-2.5 rounded-xl text-sm font-bold text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800/60 transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/registration"
              className="px-5 py-2.5 rounded-xl text-sm font-bold bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-primary hover:text-primary-content dark:hover:bg-primary dark:hover:text-primary-content transition-all duration-200 shadow-sm"
            >
              Registration
            </Link>
          </div>

          {/* RIGHT (MOBILE/TABLET): Hamburger Menu with All Nav + Auth Links */}
          <div className="dropdown dropdown-end lg:hidden">
            <label
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle text-slate-700 dark:text-zinc-300"
              aria-label="Toggle Menu"
            >
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content mt-3 z-[60] p-4 shadow-2xl bg-white dark:bg-zinc-900 border-2 border-slate-200 dark:border-zinc-800 rounded-2xl w-72 space-y-1.5"
            >
              {/* Navigation Links */}
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className={`block px-4 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                        isActive
                          ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                          : 'text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                );
              })}

              {/* Mobile Auth Buttons inside Hamburger */}
              <li className="pt-3 mt-2 border-t border-slate-200 dark:border-zinc-800 space-y-2">
                <Link
                  to="/login"
                  className="block w-full text-center py-2.5 rounded-xl text-sm font-bold border-2 border-slate-200 dark:border-zinc-700 text-slate-800 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/registration"
                  className="block w-full text-center py-2.5 rounded-xl text-sm font-bold bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-primary hover:text-primary-content dark:hover:bg-primary dark:hover:text-primary-content transition-all shadow-sm"
                >
                  Registration
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;