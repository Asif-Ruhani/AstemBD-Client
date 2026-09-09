// import React, { useState } from 'react';
// import { Link } from 'react-router';

// const Registration = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     targetExam: 'SSC (2026-2027)',
//     password: '',
//     confirmPassword: '',
//     agreeTerms: false,
//   });

//   const [passwordStrength, setPasswordStrength] = useState(0);

//   // Compute live password strength
//   const evaluatePassword = (pass) => {
//     let score = 0;
//     if (pass.length >= 8) score += 1;
//     if (/[A-Z]/.test(pass)) score += 1;
//     if (/[0-9]/.test(pass)) score += 1;
//     if (/[^A-Za-z0-9]/.test(pass)) score += 1;
//     return score;
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     const val = type === 'checkbox' ? checked : value;
    
//     setFormData((prev) => ({
//       ...prev,
//       [name]: val,
//     }));

//     if (name === 'password') {
//       setPasswordStrength(evaluatePassword(val));
//     }
//   };

//   const handleRegister = (e) => {
//     e.preventDefault();
//     if (formData.password !== formData.confirmPassword) {
//       alert("Passwords do not match!");
//       return;
//     }
//     console.log('Registration details:', formData);
//     // Integrate backend registration logic here
//   };

//   const handleGoogleSignup = () => {
//     console.log('Initiating Google OAuth Registration...');
//     // Integrate Google OAuth sign-up here
//   };

//   const getStrengthColor = () => {
//     switch (passwordStrength) {
//       case 1:
//         return 'bg-red-500 w-1/4';
//       case 2:
//         return 'bg-amber-500 w-2/4';
//       case 3:
//         return 'bg-blue-500 w-3/4';
//       case 4:
//         return 'bg-emerald-500 w-full';
//       default:
//         return 'bg-slate-200 dark:bg-zinc-700 w-0';
//     }
//   };

//   return (
//     <section className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-slate-50/70 dark:bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="w-full max-w-lg">
        
//         {/* Main Card Container */}
//         <div className="bg-white dark:bg-zinc-900 rounded-3xl border-2 border-slate-200/80 dark:border-zinc-800 shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)] overflow-hidden">
          
//           {/* Top Decorative Gradient Stripe */}
//           <div className="h-2 w-full bg-gradient-to-r from-emerald-400 via-teal-500 to-indigo-500" />

//           <div className="p-8 sm:p-10">
//             {/* Header / Brand Emblem */}
//             <div className="text-center mb-8">
//               <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black text-2xl shadow-md mb-4 ring-4 ring-slate-100 dark:ring-zinc-800">
//                 E
//               </div>
//               <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
//                 Create an Account
//               </h2>
//               <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 mt-1.5">
//                 Join thousands of students achieving their target scores
//               </p>
//             </div>

//             {/* Google Authentication Button */}
//             <button
//               type="button"
//               onClick={handleGoogleSignup}
//               className="w-full py-3 px-4 rounded-xl border-2 border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 text-sm font-bold flex items-center justify-center gap-3 hover:bg-slate-50 dark:hover:bg-zinc-700/60 hover:border-slate-300 dark:hover:border-zinc-600 transition-all duration-200 shadow-sm active:scale-[0.99]"
//             >
//               <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
//                 <path
//                   fill="#4285F4"
//                   d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//                 />
//                 <path
//                   fill="#34A853"
//                   d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//                 />
//                 <path
//                   fill="#FBBC05"
//                   d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
//                 />
//                 <path
//                   fill="#EA4335"
//                   d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
//                 />
//               </svg>
//               <span>Sign up with Google</span>
//             </button>

//             {/* Visual Divider */}
//             <div className="relative my-7">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-slate-200 dark:border-zinc-800" />
//               </div>
//               <div className="relative flex justify-center text-xs uppercase">
//                 <span className="bg-white dark:bg-zinc-900 px-3 text-slate-400 dark:text-zinc-500 font-bold tracking-wider">
//                   Or register with email
//                 </span>
//               </div>
//             </div>

//             {/* Registration Form */}
//             <form onSubmit={handleRegister} className="space-y-4">
              
//               {/* Full Name */}
//               <div>
//                 <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-zinc-300 mb-1.5">
//                   Full Name
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
//                     <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                     </svg>
//                   </div>
//                   <input
//                     type="text"
//                     name="fullName"
//                     required
//                     value={formData.fullName}
//                     onChange={handleChange}
//                     placeholder="John Doe"
//                     className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-800/40 text-slate-900 dark:text-white text-sm focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:border-slate-900 dark:focus:border-white transition-all"
//                   />
//                 </div>
//               </div>

//               {/* Email Address */}
//               <div>
//                 <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-zinc-300 mb-1.5">
//                   Email Address
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
//                     <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
//                     </svg>
//                   </div>
//                   <input
//                     type="email"
//                     name="email"
//                     required
//                     value={formData.email}
//                     onChange={handleChange}
//                     placeholder="student@example.com"
//                     className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-800/40 text-slate-900 dark:text-white text-sm focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:border-slate-900 dark:focus:border-white transition-all"
//                   />
//                 </div>
//               </div>

//               {/* Target Academic Track Selection */}
//               <div>
//                 <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-zinc-300 mb-1.5">
//                   Primary Study Track
//                 </label>
//                 <select
//                   name="targetExam"
//                   value={formData.targetExam}
//                   onChange={handleChange}
//                   className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-800/40 text-slate-900 dark:text-white text-sm font-medium focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:border-slate-900 dark:focus:border-white transition-all cursor-pointer"
//                 >
//                   <option value="English Vocabulary">English Vocabulary & Syntax</option>
//                   <option value="SSC (2026-2027)">SSC Science (2026-2027)</option>
//                   <option value="HSC (2026-2027)">HSC Science (2026-2027)</option>
//                   <option value="IELTS / GRE">Study Abroad (IELTS / GRE)</option>
//                   <option value="Job / Admission">University Admission & Job Prep</option>
//                 </select>
//               </div>

//               {/* Password */}
//               <div>
//                 <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-zinc-300 mb-1.5">
//                   Create Password
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
//                     <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//                     </svg>
//                   </div>
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     name="password"
//                     required
//                     value={formData.password}
//                     onChange={handleChange}
//                     placeholder="At least 8 characters"
//                     className="w-full pl-10 pr-11 py-2.5 rounded-xl border-2 border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-800/40 text-slate-900 dark:text-white text-sm focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:border-slate-900 dark:focus:border-white transition-all"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
//                   >
//                     {showPassword ? (
//                       <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
//                       </svg>
//                     ) : (
//                       <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                       </svg>
//                     )}
//                   </button>
//                 </div>

//                 {/* Password Strength Meter */}
//                 {formData.password && (
//                   <div className="mt-2">
//                     <div className="h-1.5 w-full bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden">
//                       <div className={`h-full transition-all duration-300 ${getStrengthColor()}`} />
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Confirm Password */}
//               <div>
//                 <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-zinc-300 mb-1.5">
//                   Confirm Password
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
//                     <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//                     </svg>
//                   </div>
//                   <input
//                     type={showConfirmPassword ? 'text' : 'password'}
//                     name="confirmPassword"
//                     required
//                     value={formData.confirmPassword}
//                     onChange={handleChange}
//                     placeholder="Repeat password"
//                     className={`w-full pl-10 pr-11 py-2.5 rounded-xl border-2 bg-slate-50/50 dark:bg-zinc-800/40 text-slate-900 dark:text-white text-sm focus:bg-white dark:focus:bg-zinc-900 focus:outline-none transition-all ${
//                       formData.confirmPassword && formData.password !== formData.confirmPassword
//                         ? 'border-red-500 focus:border-red-500'
//                         : 'border-slate-200 dark:border-zinc-800 focus:border-slate-900 dark:focus:border-white'
//                     }`}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
//                   >
//                     {showConfirmPassword ? (
//                       <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
//                       </svg>
//                     ) : (
//                       <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                       </svg>
//                     )}
//                   </button>
//                 </div>
//               </div>

//               {/* Terms Checkbox */}
//               <div className="flex items-start pt-1">
//                 <input
//                   id="agreeTerms"
//                   name="agreeTerms"
//                   type="checkbox"
//                   required
//                   checked={formData.agreeTerms}
//                   onChange={handleChange}
//                   className="w-4 h-4 mt-0.5 text-slate-900 dark:text-white rounded border-slate-300 dark:border-zinc-700 focus:ring-slate-900 cursor-pointer"
//                 />
//                 <label
//                   htmlFor="agreeTerms"
//                   className="ml-2.5 block text-xs font-semibold text-slate-600 dark:text-zinc-400 cursor-pointer"
//                 >
//                   I agree to the{' '}
//                   <Link to="/terms" className="text-primary underline">
//                     Terms of Service
//                   </Link>{' '}
//                   and{' '}
//                   <Link to="/privacy" className="text-primary underline">
//                     Privacy Policy
//                   </Link>
//                 </label>
//               </div>

//               {/* Register CTA Button */}
//               <div className="pt-2">
//                 <button
//                   type="submit"
//                   className="w-full py-3.5 px-4 rounded-xl text-sm font-bold bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-primary hover:text-primary-content dark:hover:bg-primary dark:hover:text-primary-content transition-all duration-200 flex items-center justify-center gap-2 shadow-md active:scale-[0.99]"
//                 >
//                   <span>Create Student Account</span>
//                   <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
//                   </svg>
//                 </button>
//               </div>
//             </form>

//             {/* Bottom Sign In Prompt */}
//             <div className="text-center mt-8 pt-6 border-t border-slate-100 dark:border-zinc-800">
//               <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 font-medium">
//                 Already registered?{' '}
//                 <Link
//                   to="/login"
//                   className="font-bold text-slate-900 dark:text-white hover:text-primary underline underline-offset-4 decoration-2"
//                 >
//                   Sign in here
//                 </Link>
//               </p>
//             </div>

//           </div>
//         </div>

//       </div>
//     </section>
//   );
// };

// export default Registration;

import React, { useState } from 'react';
import { Link } from 'react-router';

const Registration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    targetExam: 'SSC (2026-2027)',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });

  const [passwordStrength, setPasswordStrength] = useState(0);

  const evaluatePassword = (pass) => {
    let score = 0;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    return score;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: val,
    }));

    if (name === 'password') {
      setPasswordStrength(evaluatePassword(val));
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Registration details:', formData);
  };

  const handleGoogleSignup = () => {
    console.log('Initiating Google OAuth Registration...');
  };

  const getStrengthBar = () => {
    switch (passwordStrength) {
      case 1:
        return { width: 'w-1/4', color: 'bg-rose-500', label: 'Weak' };
      case 2:
        return { width: 'w-2/4', color: 'bg-amber-500', label: 'Fair' };
      case 3:
        return { width: 'w-3/4', color: 'bg-blue-500', label: 'Good' };
      case 4:
        return { width: 'w-full', color: 'bg-emerald-500', label: 'Strong' };
      default:
        return { width: 'w-0', color: 'bg-slate-200 dark:bg-zinc-700', label: '' };
    }
  };

  const strength = getStrengthBar();

  return (
    <section className="min-h-screen flex items-center justify-center bg-slate-100/60 dark:bg-zinc-950 p-4 sm:p-6 lg:p-10">
      {/* Outer Card Container */}
      <div className="w-full max-w-6xl bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200/80 dark:border-zinc-800 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
        
        {/* Left Side: Brand Value Showcase (5 Columns) */}
        <aside className="relative hidden lg:flex lg:col-span-5 flex-col justify-between p-12 bg-gradient-to-br from-slate-900 via-zinc-900 to-slate-950 text-white overflow-hidden">
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-10">
              <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-white text-slate-900 font-black text-xl shadow-lg">
                E
              </div>
              <span className="text-xl font-bold tracking-tight">EduPlatform</span>
            </div>

            <h1 className="text-3xl xl:text-4xl font-black tracking-tight leading-tight mb-4">
              Master your exams with focused learning.
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed">
              Access curated question banks, personalized mock tests, and real-time performance analytics crafted for your success.
            </p>

            {/* Feature List */}
            <ul className="mt-8 space-y-4">
              {['Smart adaptive diagnostic tests', 'Comprehensive subject roadmaps', 'Direct mentor question resolution'].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">
                    ✓
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Testimonial Snippet */}
          <div className="relative z-10 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <p className="text-xs italic text-slate-300 leading-relaxed">
              "The targeted prep track helped me improve my diagnostic score by 28% within 6 weeks."
            </p>
            <div className="mt-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center font-bold text-xs">
                AK
              </div>
              <div>
                <p className="text-xs font-semibold text-white">Anisul Karim</p>
                <p className="text-[10px] text-slate-400">SSC Candidate, Top 1% Rank</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Right Side: Registration Form (7 Columns) */}
        <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-center">
          <div className="max-w-xl w-full mx-auto">
            
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Create your student account
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 mt-1">
                Get started with your free personalized study dashboard.
              </p>
            </div>

            {/* Google Signup */}
            <button
              type="button"
              onClick={handleGoogleSignup}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 text-xs sm:text-sm font-semibold flex items-center justify-center gap-3 hover:bg-slate-50 dark:hover:bg-zinc-700/60 transition shadow-sm active:scale-[0.99]"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Sign up with Google</span>
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-zinc-800" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-zinc-900 px-3 text-slate-400 font-semibold tracking-wider">
                  or register with email
                </span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleRegister} className="space-y-4">
              
              {/* Row 1: Full Name & Primary Track */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-zinc-400 mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-zinc-700 bg-slate-50/50 dark:bg-zinc-800/40 text-slate-900 dark:text-white text-sm focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-zinc-400 mb-1.5">
                    Primary Study Track
                  </label>
                  <select
                    name="targetExam"
                    value={formData.targetExam}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-zinc-700 bg-slate-50/50 dark:bg-zinc-800/40 text-slate-900 dark:text-white text-sm focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white transition cursor-pointer"
                  >
                    <option value="SSC (2026-2027)">SSC Science (2026-2027)</option>
                    <option value="HSC (2026-2027)">HSC Science (2026-2027)</option>
                    <option value="English Vocabulary">English Vocabulary & Syntax</option>
                    <option value="IELTS / GRE">Study Abroad (IELTS / GRE)</option>
                    <option value="Job / Admission">University & Job Prep</option>
                  </select>
                </div>
              </div>

              {/* Row 2: Email */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-zinc-400 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email Address"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-zinc-700 bg-slate-50/50 dark:bg-zinc-800/40 text-slate-900 dark:text-white text-sm focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white transition"
                />
              </div>

              {/* Row 3: Password & Confirm Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-zinc-400">
                      Password
                    </label>
                    {formData.password && (
                      <span className="text-[10px] font-bold text-slate-500 uppercase">{strength.label}</span>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Min. 8 characters"
                      className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-slate-300 dark:border-zinc-700 bg-slate-50/50 dark:bg-zinc-800/40 text-slate-900 dark:text-white text-sm focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  {/* Strength Bar */}
                  {formData.password && (
                    <div className="h-1 w-full bg-slate-200 dark:bg-zinc-800 rounded-full mt-2 overflow-hidden">
                      <div className={`h-full transition-all duration-300 ${strength.color} ${strength.width}`} />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-zinc-400 mb-1.5">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Re-enter password"
                      className={`w-full pl-3.5 pr-10 py-2.5 rounded-xl border bg-slate-50/50 dark:bg-zinc-800/40 text-slate-900 dark:text-white text-sm focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-2 transition ${
                        formData.confirmPassword && formData.password !== formData.confirmPassword
                          ? 'border-rose-500 focus:ring-rose-500'
                          : 'border-slate-300 dark:border-zinc-700 focus:ring-slate-900 dark:focus:ring-white'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      {showConfirmPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start pt-1">
                <input
                  id="agreeTerms"
                  name="agreeTerms"
                  type="checkbox"
                  required
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="w-4 h-4 mt-0.5 rounded border-slate-300 text-slate-900 focus:ring-slate-900 cursor-pointer"
                />
                <label htmlFor="agreeTerms" className="ml-2.5 text-xs text-slate-600 dark:text-zinc-400 cursor-pointer">
                  I agree to the{' '}
                  <Link to="/terms" className="font-semibold text-slate-900 dark:text-white hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="font-semibold text-slate-900 dark:text-white hover:underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full mt-2 py-3 px-4 rounded-xl text-sm font-semibold bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-zinc-100 transition shadow-md active:scale-[0.99] flex items-center justify-center gap-2"
              >
                <span>Create Account</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>

            {/* Bottom Footer */}
            <p className="text-center mt-6 text-xs text-slate-600 dark:text-zinc-400">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-slate-900 dark:text-white hover:underline">
                Sign in
              </Link>
            </p>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Registration;