// import React, { useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import Swal from 'sweetalert2';

// const Payment = () => {
//     const [instructionData, setInstructionData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [lang, setLang] = useState('en'); // 'en' or 'bn'
//     const [copiedField, setCopiedField] = useState(null);
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     const {
//         register,
//         handleSubmit,
//         reset,
//         formState: { errors }
//     } = useForm({
//         mode: 'onTouched',
//         defaultValues: {
//             paymentMethod: 'bKash',
//             senderPhone: '',
//             transactionId: '',
//             email: ''
//         }
//     });

//     // Fetch bilingual instruction document from database
//     useEffect(() => {
//         const fetchInstructions = async () => {
//             setLoading(true);
//             try {
//                 const response = await fetch('https://astembd-server.onrender.com/payment-instructions');
//                 if (!response.ok) {
//                     throw new Error(`Failed to load payment instructions (${response.status})`);
//                 }
//                 const resData = await response.json();
//                 if (resData.success && resData.data) {
//                     setInstructionData(resData.data);
//                 } else {
//                     throw new Error(resData.message || 'No instruction data returned');
//                 }
//             } catch (err) {
//                 console.error('Fetch instruction error:', err);
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Error',
//                     text: err.message || 'Could not load payment information'
//                 });
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchInstructions();
//     }, []);

//     const handleCopy = (text, fieldName) => {
//         navigator.clipboard.writeText(text);
//         setCopiedField(fieldName);
//         setTimeout(() => setCopiedField(null), 2000);
//     };

//     // Normal POST without token
//     const onSubmit = async (formData) => {
//         setIsSubmitting(true);
//         try {
//             const payload = {
//                 email: formData.email,
//                 paymentMethod: formData.paymentMethod,
//                 senderPhone: formData.senderPhone,
//                 transactionId: formData.transactionId.trim().toUpperCase(),
//                 amount: instructionData?.pricing?.amount || 1000,
//                 submittedAt: new Date().toISOString()
//             };

//             const response = await fetch('https://astembd-server.onrender.com/payments', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(payload)
//             });

//             if (!response.ok) {
//                 const errorRes = await response.json().catch(() => ({}));
//                 throw new Error(errorRes.message || 'Payment submission failed');
//             }

//             const activeText = instructionData?.content?.[lang]?.alerts;

//             await Swal.fire({
//                 icon: 'success',
//                 title: activeText?.successTitle || 'Submission Successful',
//                 text: activeText?.successText || 'Your payment details have been submitted.',
//                 confirmButtonColor: '#0f172a'
//             });

//             reset({
//                 paymentMethod: 'bKash',
//                 senderPhone: '',
//                 transactionId: '',
//                 email: ''
//             });
//         } catch (err) {
//             console.error('Submission error:', err);
//             const activeText = instructionData?.content?.[lang]?.alerts;
//             Swal.fire({
//                 icon: 'error',
//                 title: activeText?.errorTitle || 'Submission Error',
//                 text: err.message || 'Failed to submit payment details'
//             });
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     if (loading) {
//         return (
//             <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-zinc-950">
//                 <div className="h-10 w-10 rounded-full border-4 border-slate-300 border-t-slate-900 dark:border-zinc-700 dark:border-t-white animate-spin mb-3" />
//                 <p className="text-xs font-semibold text-slate-500 dark:text-zinc-400">Loading payment details...</p>
//             </div>
//         );
//     }

//     if (!instructionData) {
//         return (
//             <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-zinc-950 p-4">
//                 <p className="text-sm font-semibold text-rose-500">Failed to load payment instructions. Please try again later.</p>
//             </div>
//         );
//     }

//     const t = instructionData.content[lang];
//     const primaryGateway = instructionData.gateways?.[0] || { number: '017XXXXXXXX' };

//     return (
//         <section className="min-h-screen bg-slate-50 dark:bg-zinc-950 py-10 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
//             <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200/80 dark:border-zinc-800 shadow-xl overflow-hidden p-6 sm:p-10 relative">

//                 {/* Top Control Bar: Badge & Language Toggle */}
//                 <div className="flex justify-between items-center mb-6">
//                     <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/50">
//                         <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
//                         {t.badge}
//                     </span>

//                     <div className="flex items-center bg-slate-100 dark:bg-zinc-800 p-1 rounded-2xl border border-slate-200 dark:border-zinc-700">
//                         <button
//                             type="button"
//                             onClick={() => setLang('en')}
//                             className={`px-3 py-1 rounded-xl text-xs font-black transition-all cursor-pointer ${lang === 'en'
//                                     ? 'bg-white dark:bg-zinc-900 text-slate-900 dark:text-white shadow-sm'
//                                     : 'text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-200'
//                                 }`}
//                         >
//                             EN
//                         </button>
//                         <button
//                             type="button"
//                             onClick={() => setLang('bn')}
//                             className={`px-3 py-1 rounded-xl text-xs font-black transition-all cursor-pointer ${lang === 'bn'
//                                     ? 'bg-white dark:bg-zinc-900 text-slate-900 dark:text-white shadow-sm'
//                                     : 'text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-200'
//                                 }`}
//                         >
//                             BN
//                         </button>
//                     </div>
//                 </div>

//                 {/* Title Header */}
//                 <div className="text-center mb-8">
//                     <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
//                         {t.title}
//                     </h1>
//                     <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-zinc-400 max-w-md mx-auto">
//                         {t.subtitle}
//                     </p>
//                 </div>

//                 {/* Payment Target Account Information */}
//                 <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-zinc-800/40 border border-slate-200/80 dark:border-zinc-800 mb-8 space-y-4">
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

//                         {/* Recipient Phone */}
//                         <div className="flex items-center justify-between p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800">
//                             <div className="flex flex-col">
//                                 <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">
//                                     {t.recipientLabel} (bKash/Nagad)
//                                 </span>
//                                 <span className="font-mono font-bold text-sm text-slate-900 dark:text-white">
//                                     {primaryGateway.number}
//                                 </span>
//                             </div>
//                             <button
//                                 type="button"
//                                 onClick={() => handleCopy(primaryGateway.number, 'number')}
//                                 className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-700 transition cursor-pointer"
//                             >
//                                 {copiedField === 'number' ? t.copiedBtn : t.copyBtn}
//                             </button>
//                         </div>

//                         {/* Payable Amount */}
//                         <div className="flex items-center justify-between p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800">
//                             <div className="flex flex-col">
//                                 <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">
//                                     {t.amountLabel}
//                                 </span>
//                                 <span className="font-mono font-bold text-sm text-emerald-600 dark:text-emerald-400">
//                                     {instructionData.pricing?.currencySymbol}{instructionData.pricing?.amount} {instructionData.pricing?.currency}
//                                 </span>
//                             </div>
//                             <button
//                                 type="button"
//                                 onClick={() => handleCopy(instructionData.pricing?.amount?.toString() || '1000', 'amount')}
//                                 className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-700 transition cursor-pointer"
//                             >
//                                 {copiedField === 'amount' ? t.copiedBtn : t.copyBtn}
//                             </button>
//                         </div>

//                     </div>

//                     {/* Dynamic Instructions List */}
//                     <div className="border-t border-slate-200/60 dark:border-zinc-800 pt-4 space-y-2">
//                         <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-zinc-300">
//                             {t.instructionsTitle}
//                         </h2>
//                         <ol className="list-decimal list-inside space-y-1 text-xs sm:text-[13px] text-slate-600 dark:text-zinc-400">
//                             {t.instructions?.map((step, idx) => (
//                                 <li key={idx} className="leading-relaxed">
//                                     {step}
//                                 </li>
//                             ))}
//                         </ol>
//                         <p className="text-[11px] sm:text-xs text-slate-500 dark:text-zinc-400 pt-2 border-t border-slate-200/40 dark:border-zinc-800/60">
//                             {t.verificationNote}{' '}
//                             <a
//                                 href={`tel:${instructionData.support?.hotline}`}
//                                 className="font-bold text-slate-900 dark:text-white underline hover:text-emerald-600 dark:hover:text-emerald-400"
//                             >
//                                 {instructionData.support?.hotline}
//                             </a>.
//                         </p>
//                     </div>
//                 </div>

//                 {/* Editable Form */}
//                 <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">

//                     {/* Method Select */}
//                     <div>
//                         <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-zinc-400 mb-1.5">
//                             {t.form?.methodLabel} <span className="text-rose-500">*</span>
//                         </label>
//                         <select
//                             {...register('paymentMethod', { required: t.form?.methodRequired })}
//                             className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white transition cursor-pointer"
//                         >
//                             {instructionData.gateways?.map((gw) => (
//                                 <option key={gw.id} value={gw.name}>
//                                     {gw.name} ({gw.actionType?.[lang] || 'Send Money'})
//                                 </option>
//                             )) || (
//                                     <>
//                                         <option value="bKash">bKash</option>
//                                         <option value="Nagad">Nagad</option>
//                                     </>
//                                 )}
//                         </select>
//                         {errors.paymentMethod && (
//                             <p className="mt-1 text-xs text-rose-500 font-medium">{errors.paymentMethod.message}</p>
//                         )}
//                     </div>

//                     {/* Sender Phone */}
//                     <div>
//                         <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-zinc-400 mb-1.5">
//                             {t.form?.senderPhoneLabel} <span className="text-rose-500">*</span>
//                         </label>
//                         <input
//                             type="tel"
//                             placeholder={t.form?.senderPhonePlaceholder}
//                             {...register('senderPhone', {
//                                 required: t.form?.senderPhoneRequired,
//                                 pattern: {
//                                     value: /^01[3-9]\d{8}$/,
//                                     message: t.form?.senderPhoneInvalid
//                                 }
//                             })}
//                             className={`w-full px-3.5 py-2.5 rounded-xl border bg-white dark:bg-zinc-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 transition ${errors.senderPhone
//                                     ? 'border-rose-500 focus:ring-rose-500'
//                                     : 'border-slate-300 dark:border-zinc-700 focus:ring-slate-900 dark:focus:ring-white'
//                                 }`}
//                         />
//                         {errors.senderPhone && (
//                             <p className="mt-1 text-xs text-rose-500 font-medium">{errors.senderPhone.message}</p>
//                         )}
//                     </div>

//                     {/* Transaction ID */}
//                     <div>
//                         <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-zinc-400 mb-1.5">
//                             {t.form?.trxIdLabel} <span className="text-rose-500">*</span>
//                         </label>
//                         <input
//                             type="text"
//                             placeholder={t.form?.trxIdPlaceholder}
//                             {...register('transactionId', {
//                                 required: t.form?.trxIdRequired,
//                                 minLength: {
//                                     value: 8,
//                                     message: t.form?.trxIdMinLength
//                                 }
//                             })}
//                             className={`w-full px-3.5 py-2.5 rounded-xl border font-mono uppercase bg-white dark:bg-zinc-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 transition ${errors.transactionId
//                                     ? 'border-rose-500 focus:ring-rose-500'
//                                     : 'border-slate-300 dark:border-zinc-700 focus:ring-slate-900 dark:focus:ring-white'
//                                 }`}
//                         />
//                         {errors.transactionId && (
//                             <p className="mt-1 text-xs text-rose-500 font-medium">{errors.transactionId.message}</p>
//                         )}
//                     </div>

//                     {/* Registered Email */}
//                     <div>
//                         <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-zinc-400 mb-1.5">
//                             {t.form?.emailLabel} <span className="text-rose-500">*</span>
//                         </label>
//                         <input
//                             type="email"
//                             placeholder={t.form?.emailPlaceholder}
//                             {...register('email', {
//                                 required: t.form?.emailRequired,
//                                 pattern: {
//                                     value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//                                     message: t.form?.emailInvalid
//                                 }
//                             })}
//                             className={`w-full px-3.5 py-2.5 rounded-xl border bg-white dark:bg-zinc-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 transition ${errors.email
//                                     ? 'border-rose-500 focus:ring-rose-500'
//                                     : 'border-slate-300 dark:border-zinc-700 focus:ring-slate-900 dark:focus:ring-white'
//                                 }`}
//                         />
//                         {errors.email && (
//                             <p className="mt-1 text-xs text-rose-500 font-medium">{errors.email.message}</p>
//                         )}
//                     </div>

//                     {/* Submit Action */}
//                     <button
//                         type="submit"
//                         disabled={isSubmitting}
//                         className="w-full mt-2 py-3 px-4 rounded-xl text-sm font-bold bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-zinc-100 transition shadow-md active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
//                     >
//                         {isSubmitting ? (
//                             <>
//                                 <div className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
//                                 <span>{t.form?.submittingBtn || 'Submitting...'}</span>
//                             </>
//                         ) : (
//                             <span>{t.form?.submitBtn || 'Submit Payment'}</span>
//                         )}
//                     </button>
//                 </form>

//             </div>
//         </section>
//     );
// };

// export default Payment;


import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAuth from '../Hooks/useAuth';

const Payment = () => {
    const { user, checkAuthStatus } = useAuth();
    const [instructionData, setInstructionData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [lang, setLang] = useState('en'); // 'en' or 'bn'
    const [copiedField, setCopiedField] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isLoggedIn = Boolean(user?.email);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors }
    } = useForm({
        mode: 'onTouched',
        defaultValues: {
            paymentMethod: 'bKash',
            senderPhone: '',
            transactionId: '',
            email: user?.email || ''
        }
    });

    // Auto-fill and lock email field if logged in
    useEffect(() => {
        if (user?.email) {
            setValue('email', user.email);
        }
    }, [user, setValue]);

    // Fetch bilingual instruction document from database
    useEffect(() => {
        const fetchInstructions = async () => {
            setLoading(true);
            try {
                const response = await fetch('https://astembd-server.onrender.com/payment-instructions');
                if (!response.ok) {
                    throw new Error(`Failed to load payment instructions (${response.status})`);
                }
                const resData = await response.json();
                if (resData.success && resData.data) {
                    setInstructionData(resData.data);
                } else {
                    throw new Error(resData.message || 'No instruction data returned');
                }
            } catch (err) {
                console.error('Fetch instruction error:', err);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: err.message || 'Could not load payment information'
                });
            } finally {
                setLoading(false);
            }
        };

        fetchInstructions();
    }, []);

    const handleCopy = (text, fieldName) => {
        navigator.clipboard.writeText(text);
        setCopiedField(fieldName);
        setTimeout(() => setCopiedField(null), 2000);
    };

    // Submit payment verification
    const onSubmit = async (formData) => {
        setIsSubmitting(true);
        try {
            const finalEmail = (user?.email || formData.email).trim().toLowerCase();

            const payload = {
                email: finalEmail,
                paymentMethod: formData.paymentMethod,
                senderPhone: formData.senderPhone.trim(),
                transactionId: formData.transactionId.trim().toUpperCase(),
                amount: instructionData?.pricing?.amount || 1000,
                submittedAt: new Date().toISOString()
            };

            const response = await fetch('https://astembd-server.onrender.com/payments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorRes = await response.json().catch(() => ({}));
                throw new Error(errorRes.message || 'Payment submission failed');
            }

            const activeText = instructionData?.content?.[lang]?.alerts;

            await Swal.fire({
                icon: 'success',
                title: activeText?.successTitle || 'Submission Successful',
                text: isLoggedIn
                    ? (activeText?.successText || 'Your payment details have been submitted.')
                    : 'Payment submitted! Please register your account using this exact email.',
                confirmButtonColor: '#0f172a'
            });

            // Re-sync auth context if user is already logged in
            if (isLoggedIn && checkAuthStatus) {
                await checkAuthStatus();
            }

            reset({
                paymentMethod: 'bKash',
                senderPhone: '',
                transactionId: '',
                email: user?.email || ''
            });
        } catch (err) {
            console.error('Submission error:', err);
            const activeText = instructionData?.content?.[lang]?.alerts;
            Swal.fire({
                icon: 'error',
                title: activeText?.errorTitle || 'Submission Error',
                text: err.message || 'Failed to submit payment details'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-zinc-950">
                <div className="h-10 w-10 rounded-full border-4 border-slate-300 border-t-slate-900 dark:border-zinc-700 dark:border-t-white animate-spin mb-3" />
                <p className="text-xs font-semibold text-slate-500 dark:text-zinc-400">Loading payment details...</p>
            </div>
        );
    }

    if (!instructionData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-zinc-950 p-4">
                <p className="text-sm font-semibold text-rose-500">Failed to load payment instructions. Please try again later.</p>
            </div>
        );
    }

    const t = instructionData.content[lang];
    const primaryGateway = instructionData.gateways?.[0] || { number: '017XXXXXXXX' };

    return (
        <section className="min-h-screen bg-slate-50 dark:bg-zinc-950 py-10 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200/80 dark:border-zinc-800 shadow-xl overflow-hidden p-6 sm:p-10 relative">

                {/* Top Control Bar: Badge & Language Toggle */}
                <div className="flex justify-between items-center mb-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/50">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        {t.badge}
                    </span>

                    <div className="flex items-center bg-slate-100 dark:bg-zinc-800 p-1 rounded-2xl border border-slate-200 dark:border-zinc-700">
                        <button
                            type="button"
                            onClick={() => setLang('en')}
                            className={`px-3 py-1 rounded-xl text-xs font-black transition-all cursor-pointer ${lang === 'en'
                                    ? 'bg-white dark:bg-zinc-900 text-slate-900 dark:text-white shadow-sm'
                                    : 'text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-200'
                                }`}
                        >
                            EN
                        </button>
                        <button
                            type="button"
                            onClick={() => setLang('bn')}
                            className={`px-3 py-1 rounded-xl text-xs font-black transition-all cursor-pointer ${lang === 'bn'
                                    ? 'bg-white dark:bg-zinc-900 text-slate-900 dark:text-white shadow-sm'
                                    : 'text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-200'
                                }`}
                        >
                            BN
                        </button>
                    </div>
                </div>

                {/* Title Header */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                        {t.title}
                    </h1>
                    <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-zinc-400 max-w-md mx-auto">
                        {t.subtitle}
                    </p>
                </div>

                {/* Payment Target Account Information */}
                <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-zinc-800/40 border border-slate-200/80 dark:border-zinc-800 mb-8 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                        {/* Recipient Phone */}
                        <div className="flex items-center justify-between p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">
                                    {t.recipientLabel} (bKash/Nagad)
                                </span>
                                <span className="font-mono font-bold text-sm text-slate-900 dark:text-white">
                                    {primaryGateway.number}
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={() => handleCopy(primaryGateway.number, 'number')}
                                className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-700 transition cursor-pointer"
                            >
                                {copiedField === 'number' ? t.copiedBtn : t.copyBtn}
                            </button>
                        </div>

                        {/* Payable Amount */}
                        <div className="flex items-center justify-between p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">
                                    {t.amountLabel}
                                </span>
                                <span className="font-mono font-bold text-sm text-emerald-600 dark:text-emerald-400">
                                    {instructionData.pricing?.currencySymbol}{instructionData.pricing?.amount} {instructionData.pricing?.currency}
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={() => handleCopy(instructionData.pricing?.amount?.toString() || '1000', 'amount')}
                                className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-700 transition cursor-pointer"
                            >
                                {copiedField === 'amount' ? t.copiedBtn : t.copyBtn}
                            </button>
                        </div>

                    </div>

                    {/* Dynamic Instructions List */}
                    <div className="border-t border-slate-200/60 dark:border-zinc-800 pt-4 space-y-2">
                        <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-zinc-300">
                            {t.instructionsTitle}
                        </h2>
                        <ol className="list-decimal list-inside space-y-1 text-xs sm:text-[13px] text-slate-600 dark:text-zinc-400">
                            {t.instructions?.map((step, idx) => (
                                <li key={idx} className="leading-relaxed">
                                    {step}
                                </li>
                            ))}
                        </ol>
                        <p className="text-[11px] sm:text-xs text-slate-500 dark:text-zinc-400 pt-2 border-t border-slate-200/40 dark:border-zinc-800/60">
                            {t.verificationNote}{' '}
                            <a
                                href={`tel:${instructionData.support?.hotline}`}
                                className="font-bold text-slate-900 dark:text-white underline hover:text-emerald-600 dark:hover:text-emerald-400"
                            >
                                {instructionData.support?.hotline}
                            </a>.
                        </p>
                    </div>
                </div>

                {/* Submission Form */}
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">

                    {/* Method Select */}
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-zinc-400 mb-1.5">
                            {t.form?.methodLabel} <span className="text-rose-500">*</span>
                        </label>
                        <select
                            {...register('paymentMethod', { required: t.form?.methodRequired })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white transition cursor-pointer"
                        >
                            {instructionData.gateways?.map((gw) => (
                                <option key={gw.id} value={gw.name}>
                                    {gw.name} ({gw.actionType?.[lang] || 'Send Money'})
                                </option>
                            )) || (
                                    <>
                                        <option value="bKash">bKash</option>
                                        <option value="Nagad">Nagad</option>
                                    </>
                                )}
                        </select>
                        {errors.paymentMethod && (
                            <p className="mt-1 text-xs text-rose-500 font-medium">{errors.paymentMethod.message}</p>
                        )}
                    </div>

                    {/* Sender Phone */}
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-zinc-400 mb-1.5">
                            {t.form?.senderPhoneLabel} <span className="text-rose-500">*</span>
                        </label>
                        <input
                            type="tel"
                            placeholder={t.form?.senderPhonePlaceholder}
                            {...register('senderPhone', {
                                required: t.form?.senderPhoneRequired,
                                pattern: {
                                    value: /^01[3-9]\d{8}$/,
                                    message: t.form?.senderPhoneInvalid
                                }
                            })}
                            className={`w-full px-3.5 py-2.5 rounded-xl border bg-white dark:bg-zinc-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 transition ${errors.senderPhone
                                    ? 'border-rose-500 focus:ring-rose-500'
                                    : 'border-slate-300 dark:border-zinc-700 focus:ring-slate-900 dark:focus:ring-white'
                                }`}
                        />
                        {errors.senderPhone && (
                            <p className="mt-1 text-xs text-rose-500 font-medium">{errors.senderPhone.message}</p>
                        )}
                    </div>

                    {/* Transaction ID */}
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-zinc-400 mb-1.5">
                            {t.form?.trxIdLabel} <span className="text-rose-500">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder={t.form?.trxIdPlaceholder}
                            {...register('transactionId', {
                                required: t.form?.trxIdRequired,
                                minLength: {
                                    value: 8,
                                    message: t.form?.trxIdMinLength
                                }
                            })}
                            className={`w-full px-3.5 py-2.5 rounded-xl border font-mono uppercase bg-white dark:bg-zinc-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 transition ${errors.transactionId
                                    ? 'border-rose-500 focus:ring-rose-500'
                                    : 'border-slate-300 dark:border-zinc-700 focus:ring-slate-900 dark:focus:ring-white'
                                }`}
                        />
                        {errors.transactionId && (
                            <p className="mt-1 text-xs text-rose-500 font-medium">{errors.transactionId.message}</p>
                        )}
                    </div>

                    {/* Email Field: Read-Only for logged in, Editable for guest */}
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-zinc-400 mb-1.5">
                            {t.form?.emailLabel}{' '}
                            {isLoggedIn ? (
                                <span className="text-slate-400 text-[10px] font-normal lowercase">(auto-detected)</span>
                            ) : (
                                <span className="text-rose-500">*</span>
                            )}
                        </label>
                        <input
                            type="email"
                            readOnly={isLoggedIn}
                            placeholder={t.form?.emailPlaceholder || 'name@example.com'}
                            {...register('email', {
                                required: !isLoggedIn ? (t.form?.emailRequired || 'Email is required') : false,
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: t.form?.emailInvalid || 'Invalid email format'
                                }
                            })}
                            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition ${isLoggedIn
                                    ? 'border-slate-200 dark:border-zinc-800 bg-slate-100 dark:bg-zinc-800/60 text-slate-500 dark:text-zinc-400 font-medium cursor-not-allowed select-none focus:outline-none'
                                    : errors.email
                                        ? 'border-rose-500 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500'
                                        : 'border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white'
                                }`}
                        />
                        {errors.email && (
                            <p className="mt-1 text-xs text-rose-500 font-medium">{errors.email.message}</p>
                        )}
                        {!isLoggedIn && (
                            <p className="mt-1 text-[11px] text-slate-400 dark:text-zinc-500">
                                Make sure to sign up / register with this exact email address.
                            </p>
                        )}
                    </div>

                    {/* Submit Action */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full mt-2 py-3 px-4 rounded-xl text-sm font-bold bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-zinc-100 transition shadow-md active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
                    >
                        {isSubmitting ? (
                            <>
                                <div className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                                <span>{t.form?.submittingBtn || 'Submitting...'}</span>
                            </>
                        ) : (
                            <span>{t.form?.submitBtn || 'Submit Payment'}</span>
                        )}
                    </button>
                </form>

            </div>
        </section>
    );
};

export default Payment;