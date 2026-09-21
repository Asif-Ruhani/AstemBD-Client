// import React, { useState, useEffect } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router';
// import useAuth from '../Hooks/useAuth';
// import Swal from 'sweetalert2';

// const Navbar = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const location = useLocation();
//   const { user, authStatus, userLogout, loading } = useAuth();
//   const navigate = useNavigate();

//   // Exactly checks your provider's initial loading states
//   const isAuthLoading = loading || authStatus === 'loading';

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 20);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Close menu automatically whenever route changes
//   useEffect(() => {
//     setMenuOpen(false);
//   }, [location.pathname]);

//   const allNavLinks = [
//     { name: 'Home', path: '/' },
//     { name: 'Eng Vocab', path: '/courses/english-vocabulary' },
//     { name: 'Study Abroad', path: '/courses/study-abroad-courses' },
//     { name: 'CSE', path: '/courses/cse-courses' },
//     { name: 'HSC', path: '/courses/hsc-courses' },
//     { name: 'SSC', path: '/courses/ssc-courses' },
//     { name: 'My Courses', path: '/my-courses' },
//     { name: 'presentation', path: '/Presentation' },
//     { name: 'Data Manipulation', path: '/data-manipulation', adminOnly: true },
//     { name: 'Payment History', path: '/payment-history', adminOnly: true },
//     { name: 'Users', path: '/users', adminOnly: true },
//     { name: 'User-Log', path: '/user-log', adminOnly: true },
//   ];

//   const adminPaths = [
//     '/',
//     '/data-manipulation',
//     '/payment-history',
//     '/users',
//     '/user-log',
//   ];

//   // While auth is resolving, render nothing so neither user nor admin links flash
//   const visibleNavLinks = isAuthLoading
//     ? []
//     : authStatus === 'admin'
//       ? allNavLinks.filter((link) => adminPaths.includes(link.path))
//       : allNavLinks.filter((link) => !link.adminOnly);

//   const closeMenu = () => {
//     setMenuOpen(false);
//     if (document.activeElement instanceof HTMLElement) {
//       document.activeElement.blur();
//     }
//   };

//   const handleSignOut = () => {
//     closeMenu();
//     userLogout()
//       .then(() => {
//         Swal.fire({
//           position: 'top-center',
//           icon: 'success',
//           title: 'Successfully Logged out',
//           showConfirmButton: false,
//           timer: 1500,
//         });
//         navigate('/login');
//       })
//       .catch((error) => {
//         console.error('Sign out failed:', error);
//         Swal.fire({
//           icon: 'error',
//           title: 'Logout Failed',
//           text: error.message || 'Something went wrong.',
//         });
//       });
//   };

//   return (
//     <header
//       className={`relative sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled
//           ? 'bg-white/85 dark:bg-zinc-950/85 backdrop-blur-md shadow-md border-b border-slate-200/80 dark:border-zinc-800'
//           : 'bg-white/70 dark:bg-zinc-950/70 backdrop-blur-sm border-b border-slate-200/40 dark:border-zinc-800/40'
//         }`}
//     >
//       {/* Full Blur Shield active for ALL users while loading is true or authStatus is 'loading' */}
//       {isAuthLoading && (
//         <div
//           className="absolute inset-0 z-50 bg-white/75 dark:bg-zinc-950/75 backdrop-blur-2xl transition-opacity duration-300 pointer-events-auto"
//           aria-hidden="true"
//         />
//       )}

//       <div
//         className={`w-full px-4 sm:px-8 lg:px-[100px] transition-opacity duration-200 ${isAuthLoading ? 'opacity-0 invisible' : 'opacity-100 visible'
//           }`}
//       >
//         <div className="flex items-center justify-between h-20">

//           {/* LEFT: Brand Logo */}
//           <Link to="/" className="flex items-center gap-3 group">
//             <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-slate-900 text-xl font-black shadow-sm group-hover:scale-105 transition-transform">
//               <span>A</span>
//             </div>
//             <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
//               ASTEM
//             </span>
//           </Link>

//           {/* CENTER: Desktop Navigation Links */}
//           <nav className="hidden lg:flex items-center gap-1.5 bg-slate-100/80 dark:bg-zinc-900/80 p-1.5 rounded-full border border-slate-200/60 dark:border-zinc-800 min-h-[46px]">
//             {visibleNavLinks.map((link) => {
//               const isActive = location.pathname === link.path;
//               return (
//                 <Link
//                   key={link.path}
//                   to={link.path}
//                   className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 ${isActive
//                       ? 'bg-white dark:bg-zinc-800 text-slate-900 dark:text-white shadow-sm ring-1 ring-black/5'
//                       : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
//                     }`}
//                 >
//                   {link.name}
//                 </Link>
//               );
//             })}
//           </nav>

//           {/* RIGHT (DESKTOP): Auth Buttons */}
//           <div className="hidden lg:flex items-center gap-3">
//             {!isAuthLoading && (
//               user ? (
//                 <button
//                   onClick={handleSignOut}
//                   className="px-4 py-2.5 rounded-xl text-sm font-bold text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800/60 transition-colors cursor-pointer"
//                 >
//                   Sign Out
//                 </button>
//               ) : (
//                 <Link
//                   to="/login"
//                   className="px-4 py-2.5 rounded-xl text-sm font-bold text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800/60 transition-colors"
//                 >
//                   Sign In
//                 </Link>
//               )
//             )}

//             <Link
//               to="/registration"
//               className="px-5 py-2.5 rounded-xl text-sm font-bold bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-primary hover:text-primary-content dark:hover:bg-primary dark:hover:text-primary-content transition-all duration-200 shadow-sm"
//             >
//               Registration
//             </Link>
//           </div>

//           {/* RIGHT (MOBILE/TABLET): Hamburger Menu */}
//           <div className={`dropdown dropdown-end lg:hidden ${menuOpen ? 'dropdown-open' : ''}`}>
//             <button
//               type="button"
//               onClick={() => setMenuOpen(!menuOpen)}
//               className="btn btn-ghost btn-circle text-slate-700 dark:text-zinc-300"
//               aria-label="Toggle Menu"
//             >
//               {menuOpen ? (
//                 <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               ) : (
//                 <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
//                 </svg>
//               )}
//             </button>

//             {menuOpen && (
//               <ul className="dropdown-content mt-3 z-[60] p-4 shadow-2xl bg-white dark:bg-zinc-900 border-2 border-slate-200 dark:border-zinc-800 rounded-2xl w-72 space-y-1.5">
//                 {visibleNavLinks.map((link) => {
//                   const isActive = location.pathname === link.path;
//                   return (
//                     <li key={link.path}>
//                       <Link
//                         to={link.path}
//                         onClick={closeMenu}
//                         className={`block px-4 py-2.5 rounded-xl text-sm font-bold transition-colors ${isActive
//                             ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
//                             : 'text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800 hover:text-slate-900 dark:hover:text-white'
//                           }`}
//                       >
//                         {link.name}
//                       </Link>
//                     </li>
//                   );
//                 })}

//                 <li className="pt-3 mt-2 border-t border-slate-200 dark:border-zinc-800 space-y-2">
//                   {!isAuthLoading && (
//                     user ? (
//                       <button
//                         type="button"
//                         onClick={handleSignOut}
//                         className="block w-full text-center py-2.5 rounded-xl text-sm font-bold border-2 border-slate-200 dark:border-zinc-700 text-slate-800 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
//                       >
//                         Sign Out
//                       </button>
//                     ) : (
//                       <Link
//                         to="/login"
//                         onClick={closeMenu}
//                         className="block w-full text-center py-2.5 rounded-xl text-sm font-bold border-2 border-slate-200 dark:border-zinc-700 text-slate-800 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
//                       >
//                         Sign In
//                       </Link>
//                     )
//                   )}

//                   <Link
//                     to="/registration"
//                     onClick={closeMenu}
//                     className="block w-full text-center py-2.5 rounded-xl text-sm font-bold bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-primary hover:text-primary-content dark:hover:bg-primary dark:hover:text-primary-content transition-all shadow-sm"
//                   >
//                     Registration
//                   </Link>
//                 </li>
//               </ul>
//             )}
//           </div>

//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;

import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../Hooks/useAuth';
import Swal from 'sweetalert2';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { user, authStatus, userLogout, loading } = useAuth();
  const navigate = useNavigate();

  // Exactly checks your provider's initial loading states
  const isAuthLoading = loading || authStatus === 'loading';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu automatically whenever route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const allNavLinks = [
    { name: 'Home', path: '/' },
    { name: 'Eng Vocab', path: '/courses/english-vocabulary' },
    { name: 'Study Abroad', path: '/courses/study-abroad-courses' },
    { name: 'CSE', path: '/courses/cse-courses' },
    { name: 'HSC', path: '/courses/hsc-courses' },
    { name: 'SSC', path: '/courses/ssc-courses' },
    { name: 'My Courses', path: '/my-courses' },
    { name: 'presentation', path: '/Presentation' },
    { name: 'Data Manipulation', path: '/data-manipulation', adminOnly: true },
    { name: 'Payment History', path: '/payment-history', adminOnly: true },
    { name: 'Users', path: '/users', adminOnly: true },
    { name: 'User-Log', path: '/user-log', adminOnly: true },
  ];

  const adminPaths = [
    '/',
    '/data-manipulation',
    '/payment-history',
    '/users',
    '/user-log',
  ];

  // While auth is resolving, render nothing so neither user nor admin links flash
  const visibleNavLinks = isAuthLoading
    ? []
    : authStatus === 'admin'
      ? allNavLinks.filter((link) => adminPaths.includes(link.path))
      : allNavLinks.filter((link) => !link.adminOnly);

  const closeMenu = () => {
    setMenuOpen(false);
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  const handleSignOut = () => {
    closeMenu();
    userLogout()
      .then(() => {
        Swal.fire({
          position: 'top-center',
          icon: 'success',
          title: 'Successfully Logged out',
          showConfirmButton: false,
          timer: 1500,
        });
        navigate('/login');
      })
      .catch((error) => {
        console.error('Sign out failed:', error);
        Swal.fire({
          icon: 'error',
          title: 'Logout Failed',
          text: error.message || 'Something went wrong.',
        });
      });
  };

  return (
    <header
      className={`relative sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled
          ? 'bg-white/85 dark:bg-zinc-950/85 backdrop-blur-md shadow-md border-b border-slate-200/80 dark:border-zinc-800'
          : 'bg-white/70 dark:bg-zinc-950/70 backdrop-blur-sm border-b border-slate-200/40 dark:border-zinc-800/40'
        }`}
    >
      {/* Full Blur Shield active for ALL users while loading is true or authStatus is 'loading' */}
      {isAuthLoading && (
        <div
          className="absolute inset-0 z-50 bg-white/75 dark:bg-zinc-950/75 backdrop-blur-2xl transition-opacity duration-300 pointer-events-auto"
          aria-hidden="true"
        />
      )}

      {/* Outer padding adjusted: px-3 on mobile so brand and hamburger sit clean */}
      <div
        className={`w-full px-3 sm:px-8 lg:px-[100px] transition-opacity duration-200 ${isAuthLoading ? 'opacity-0 invisible' : 'opacity-100 visible'
          }`}
      >
        {/* Height changed: Mobile h-14 (56px), Desktop lg:h-20 (80px) */}
        <div className="flex items-center justify-between h-14 lg:h-20">

          {/* LEFT: Brand Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-slate-900 text-base sm:text-xl font-black shadow-sm group-hover:scale-105 transition-transform">
              <span>A</span>
            </div>
            <span className="text-lg sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              ASTEM
            </span>
          </Link>

          {/* CENTER: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-slate-100/80 dark:bg-zinc-900/80 p-1.5 rounded-full border border-slate-200/60 dark:border-zinc-800 min-h-[46px]">
            {visibleNavLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 ${isActive
                      ? 'bg-white dark:bg-zinc-800 text-slate-900 dark:text-white shadow-sm ring-1 ring-black/5'
                      : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT (DESKTOP): Auth Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {!isAuthLoading && (
              user ? (
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2.5 rounded-xl text-sm font-bold text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800/60 transition-colors cursor-pointer"
                >
                  Sign Out
                </button>
              ) : (
                <Link
                  to="/login"
                  className="px-4 py-2.5 rounded-xl text-sm font-bold text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800/60 transition-colors"
                >
                  Sign In
                </Link>
              )
            )}

            <Link
              to="/registration"
              className="px-5 py-2.5 rounded-xl text-sm font-bold bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-primary hover:text-primary-content dark:hover:bg-primary dark:hover:text-primary-content transition-all duration-200 shadow-sm"
            >
              Registration
            </Link>
          </div>

          {/* RIGHT (MOBILE/TABLET): Hamburger Menu */}
          <div className="lg:hidden flex items-center">
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-1.5 text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
              aria-label="Toggle Menu"
            >
              {menuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>

            {/* Mobile Drawer Dropdown:
                - 'fixed right-0 top-14': Starts exactly at the screen's right edge (Zero gap)
                - 'w-64 max-h-[calc(100vh-4.5rem)]': Compact width and prevents offscreen overflow
                - 'rounded-r-none': Touches the right edge seamlessly
            */}
            {menuOpen && (
              <div className="fixed right-0 top-14 z-[60] p-2.5 shadow-2xl bg-white dark:bg-zinc-900 border-l border-b border-slate-200 dark:border-zinc-800 rounded-l-2xl rounded-r-none w-64 max-h-[75vh] overflow-y-auto">
                <ul className="space-y-0.5">
                  {visibleNavLinks.map((link) => {
                    const isActive = location.pathname === link.path;
                    return (
                      <li key={link.path}>
                        <Link
                          to={link.path}
                          onClick={closeMenu}
                          className={`block px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${isActive
                              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                              : 'text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800 hover:text-slate-900 dark:hover:text-white'
                            }`}
                        >
                          {link.name}
                        </Link>
                      </li>
                    );
                  })}

                  <li className="pt-2 mt-1.5 border-t border-slate-100 dark:border-zinc-800 space-y-1.5">
                    {!isAuthLoading && (
                      user ? (
                        <button
                          type="button"
                          onClick={handleSignOut}
                          className="block w-full text-center py-2 rounded-lg text-xs font-bold border border-slate-200 dark:border-zinc-700 text-slate-800 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                        >
                          Sign Out
                        </button>
                      ) : (
                        <Link
                          to="/login"
                          onClick={closeMenu}
                          className="block w-full text-center py-2 rounded-lg text-xs font-bold border border-slate-200 dark:border-zinc-700 text-slate-800 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
                        >
                          Sign In
                        </Link>
                      )
                    )}

                    <Link
                      to="/registration"
                      onClick={closeMenu}
                      className="block w-full text-center py-2 rounded-lg text-xs font-bold bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-primary hover:text-primary-content dark:hover:bg-primary dark:hover:text-primary-content transition-all shadow-sm"
                    >
                      Registration
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;