import React, { useEffect, useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router';
import Swal from 'sweetalert2';
import useAuth from '../Hooks/useAuth';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const Payment = () => {
  const { user, checkAuthStatus, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();


  const [instructionData, setInstructionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState('en');
  const [copiedField, setCopiedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCourseIds, setSelectedCourseIds] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors }
  } = useForm({
    mode: 'onTouched',
    defaultValues: {
      paymentMethod: 'bKash',
      senderPhone: '',
      transactionId: '',
      promoCode: '',
      email: user?.email || ''
    }
  });

  const currentSelectedMethod = watch('paymentMethod');

  // Helper to reliably extract the key for any item (bundle or individual course)
  const getItemKey = (item) => item?.courseId || item?.bundleKey || item?.category;

  useEffect(() => {
    if (!authLoading && !user) {
      Swal.fire({
        icon: 'warning',
        title: 'Please login first',
        text: 'You must have an active account to submit payment details',
        confirmButtonColor: '#0f172a'
      }).then(() => {
        navigate('/login', { state: { from: location }, replace: true });
      });
    }
  }, [user, authLoading, navigate, location]);

  useEffect(() => {
    if (user?.email) {
      setValue('email', user.email);
    }
  }, [user, setValue]);

  useEffect(() => {
    const fetchInstructions = async () => {
      setLoading(true);
      try {
        const response = await axiosSecure.get('/payment-instructions');
        const resData = response.data;

        if (resData.success && resData.data) {
          setInstructionData(resData.data);
          if (resData.data.gateways?.length > 0) {
            setValue('paymentMethod', resData.data.gateways[0].name);
          }
        } else {
          throw new Error(resData.message || 'No instruction data returned');
        }
      } catch (err) {
        console.error('Fetch instruction error:', err);
        // 🛑 FIX: Silence the popup if it is just a 401/403 missing auth error
        if (err.response?.status === 401 || err.response?.status === 403) {
          return;
        }
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.response?.data?.message || err.message || 'Could not load payment information'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchInstructions();
  }, [axiosSecure, setValue]);

  const activeGateway = useMemo(() => {
    if (!instructionData?.gateways) return null;
    return (
      instructionData.gateways.find(
        (g) => g.name.toLowerCase() === (currentSelectedMethod || '').toLowerCase()
      ) || instructionData.gateways[0]
    );
  }, [instructionData, currentSelectedMethod]);

  const selectableItems = useMemo(() => {
    return instructionData?.allSelectableItems || [];
  }, [instructionData]);

  const selectedTotal = useMemo(() => {
    if (selectableItems.length === 0 || selectedCourseIds.length === 0) return 0;
    return selectableItems
      .filter((item) => selectedCourseIds.includes(getItemKey(item)))
      .reduce((sum, item) => sum + (Number(item.price) || 0), 0);
  }, [selectableItems, selectedCourseIds]);

  // Auto-select course or bundle from router state
  useEffect(() => {
    const preSelectedId = location.state?.selectedCourseId;
    if (!preSelectedId || selectableItems.length === 0) return;

    const match = selectableItems.find((item) => {
      const directKey = getItemKey(item);
      const isDirectMatch = directKey === preSelectedId;
      const isChildMatch = Array.isArray(item.childCourseIds) && item.childCourseIds.includes(preSelectedId);
      return isDirectMatch || isChildMatch;
    });

    const targetKey = getItemKey(match);
    if (targetKey) {
      setSelectedCourseIds((prev) => {
        if (!prev.includes(targetKey)) {
          return [...prev, targetKey];
        }
        return prev;
      });
    }
  }, [location.state, selectableItems]);

  const handleCourseToggle = (targetKey) => {
    if (!targetKey) return;
    setSelectedCourseIds((prev) =>
      prev.includes(targetKey) ? prev.filter((id) => id !== targetKey) : [...prev, targetKey]
    );
  };

  const handleCopy = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const highlightInstruction = (text) => {
    if (!text) return '';
    const regex = /(Send Money|সেন্ড মানি|Personal Number|পার্সোনাল নাম্বার|Reference|রেফারেন্স|Transaction ID|TrxID|ট্রানজেকশন আইডি|Amount|পরিমাণ)/gi;
    const parts = text.split(regex);
    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="font-extrabold text-indigo-600 dark:text-indigo-400 underline decoration-indigo-400/40 underline-offset-2">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const onSubmit = async (formData) => {
    if (!user?.email) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Your session has expired. Please log in again.'
      });
      return;
    }

    if (selectedCourseIds.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: lang === 'bn' ? 'কোর্স নির্বাচন করুন' : 'Course Selection Required',
        text: instructionData?.content?.[lang]?.form?.courseSelectRequired || 'Please select at least one course to proceed.'
      });
      return;
    }

    const expandedCourseIds = [];
    selectedCourseIds.forEach((id) => {
      const match = selectableItems.find((item) => getItemKey(item) === id);
      if (match?.childCourseIds && match.childCourseIds.length > 0) {
        expandedCourseIds.push(...match.childCourseIds);
      } else {
        expandedCourseIds.push(id);
      }
    });

    const uniqueCourseIds = Array.from(new Set(expandedCourseIds));

    setIsSubmitting(true);
    try {
      const payload = {
        email: user.email.trim().toLowerCase(),
        paymentMethod: formData.paymentMethod,
        senderPhone: formData.senderPhone.trim(),
        transactionId: formData.transactionId.trim().toUpperCase(),
        promoCode: formData.promoCode?.trim().toUpperCase() || null,
        selectedCourseIds: uniqueCourseIds,
        primarySelectionIds: selectedCourseIds,
        amount: selectedTotal
      };

      await axiosSecure.post('/payments', payload);

      const activeAlerts = instructionData?.content?.[lang]?.alerts;

      await Swal.fire({
        icon: 'success',
        title: activeAlerts?.successTitle || 'Submission Successful',
        text: activeAlerts?.successText || 'Your payment details have been submitted for verification.',
        confirmButtonColor: '#008000'
      });

      if (checkAuthStatus) {
        await checkAuthStatus();
      }

      reset({
        paymentMethod: instructionData.gateways?.[0]?.name || 'bKash',
        senderPhone: '',
        transactionId: '',
        promoCode: '',
        email: user.email
      });
      setSelectedCourseIds([]);

    } catch (err) {
      console.error('Submission error:', err);
      const activeAlerts = instructionData?.content?.[lang]?.alerts;
      Swal.fire({
        icon: 'error',
        title: activeAlerts?.errorTitle || 'Submission Error',
        text: err.response?.data?.message || 'Failed to submit payment details.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-zinc-950">
        <div className="h-11 w-11 rounded-full border-4 border-slate-300 border-t-slate-900 dark:border-zinc-700 dark:border-t-white animate-spin mb-3" />
        <p className="text-sm font-bold text-slate-600 dark:text-zinc-300">Loading payment details...</p>
      </div>
    );
  }

  if (!instructionData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-zinc-950 p-4">
        <p className="text-base font-bold text-rose-500">Failed to load payment instructions. Please try again later.</p>
      </div>
    );
  }

  const t = instructionData.content[lang] || instructionData.content['en'];
  const currencySymbol = instructionData.pricing?.currencySymbol || '৳';
  const currencyCode = instructionData.pricing?.currency || 'BDT';
  const catalog = instructionData.courseCatalog || {};

  return (
    <section className="min-h-screen bg-slate-50 dark:bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-8 mb-8 border-b border-slate-200 dark:border-zinc-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 mb-3 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {t.badge || 'Payment Gateway'}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-slate-700 dark:text-white tracking-tight leading-tight">
              {t.title}
            </h1>
            <p className="mt-2 text-base font-medium text-slate-600 dark:text-zinc-400 max-w-xl">
              {t.subtitle}
            </p>
          </div>

          <div className="flex items-center bg-slate-100 dark:bg-zinc-800 p-1.5 rounded-2xl border border-slate-200 dark:border-zinc-700 self-start sm:self-center shadow-xs">
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${lang === 'en'
                ? 'bg-white dark:bg-zinc-900 text-slate-900 dark:text-white shadow-sm ring-1 ring-slate-200 dark:ring-zinc-700'
                : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
                }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLang('bn')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${lang === 'bn'
                ? 'bg-white dark:bg-zinc-900 text-slate-900 dark:text-white shadow-sm ring-1 ring-slate-200 dark:ring-zinc-700'
                : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
                }`}
            >
              BN
            </button>
          </div>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Side: Course Selection Tracks */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200/90 dark:border-zinc-800 p-6 sm:p-8 shadow-sm">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100 dark:border-zinc-800">
                <h2 className="text-base font-black uppercase tracking-wider text-slate-900 dark:text-white">
                  {t.form?.courseSelectLabel || '1. Select Course Tracks'}
                </h2>
                <span className="text-xs font-black px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900">
                  {selectedCourseIds.length} {lang === 'bn' ? 'টি নির্বাচিত' : 'Selected'}
                </span>
              </div>

              {/* Vocab Bundles */}
              {catalog.vocabBundles?.length > 0 && (
                <div className="mb-7 space-y-3">
                  <span className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-zinc-400">
                    English Vocabulary Tracks
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {catalog.vocabBundles.map((bundle, index) => {
                      const bundleKey = getItemKey(bundle);
                      const isChecked = selectedCourseIds.includes(bundleKey);

                      return (
                        <div
                          key={bundleKey || index}
                          onClick={() => handleCourseToggle(bundleKey)}
                          className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer select-none transition-all ${isChecked
                            ? 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/30 shadow-md ring-1 ring-emerald-500'
                            : 'border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 hover:border-slate-300 dark:hover:border-zinc-700'
                            }`}
                        >
                          <div className="flex items-center gap-3.5">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => { }}
                              className="w-5 h-5 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 dark:border-zinc-700 pointer-events-none"
                            />
                            <div>
                              <span className="text-sm font-extrabold text-slate-900 dark:text-white block">
                                {bundle.title}
                              </span>
                              <span className="text-xs font-medium text-slate-500 dark:text-zinc-400">
                                Full Category Access ({bundle.courseCount || 0} Courses)
                              </span>
                            </div>
                          </div>
                          <span className="font-mono text-sm font-black text-emerald-700 dark:text-emerald-400">
                            {currencySymbol}{bundle.price}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Academic & Tech Course Grids */}
              {['ssc', 'hsc', 'cse'].map((trackKey) => {
                const subjects = catalog.academicSubjects?.[trackKey] || [];
                if (subjects.length === 0) return null;

                return (
                  <div key={trackKey} className="mb-7 last:mb-0 space-y-3">
                    <span className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-zinc-400">
                      {trackKey.toUpperCase()} Courses
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {subjects.map((course) => {
                        const courseKey = getItemKey(course);
                        const isChecked = selectedCourseIds.includes(courseKey);

                        return (
                          <div
                            key={courseKey}
                            onClick={() => handleCourseToggle(courseKey)}
                            className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer select-none transition-all ${isChecked
                              ? 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/30 shadow-md ring-1 ring-emerald-500'
                              : 'border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 hover:border-slate-300 dark:hover:border-zinc-700'
                              }`}
                          >
                            <div className="flex items-center gap-3.5">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => { }}
                                className="w-5 h-5 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 dark:border-zinc-700 pointer-events-none"
                              />
                              <span className="text-sm font-bold text-slate-900 dark:text-white">
                                {course.title || course.courseName}
                              </span>
                            </div>
                            <span className="font-mono text-sm font-black text-slate-800 dark:text-zinc-200">
                              {currencySymbol}{course.price}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Side: Account Box, Instructions & Payment Form */}
          <div className="lg:col-span-5 lg:sticky lg:top-8 space-y-5">

            <div className="bg-[#494949] dark:bg-zinc-600 text-[#CFCFCF] p-6 sm:p-7 rounded-3xl shadow-xl border border-slate-800 dark:border-zinc-800 space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-slate-800 dark:border-zinc-800">
                <div>
                  <span className="text-xs font-black text-white uppercase tracking-widest block mb-1">
                    {t.recipientLabel} ({activeGateway?.name || 'Gateway'})
                  </span>
                  <span className="font-mono font-black text-xl text-white tracking-wider">
                    {activeGateway?.number || 'N/A'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(activeGateway?.number || '', 'number')}
                  className="px-3.5 py-2 text-xs font-black rounded-xl bg-[#303030] hover:bg-indigo-500 text-[#CFCFCF] transition cursor-pointer shadow-xs"
                >
                  {copiedField === 'number' ? t.copiedBtn : t.copyBtn}
                </button>
              </div>

              <div className="flex justify-between items-end">
                <div>
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-1">
                    {t.amountLabel}
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono tracking-tight">
                      {currencySymbol}{selectedTotal}
                    </span>
                    <span className="text-sm font-bold text-slate-400">{currencyCode}</span>
                  </div>
                </div>
                <button
                  type="button"
                  disabled={selectedTotal === 0}
                  onClick={() => handleCopy(selectedTotal.toString(), 'amount')}
                  className="px-3.5 py-2 text-xs font-black rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  {copiedField === 'amount' ? t.copiedBtn : t.copyBtn}
                </button>
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200/90 dark:border-zinc-800 p-6 shadow-sm space-y-3.5">
              <div className="flex items-center gap-2 pb-2.5 border-b border-slate-100 dark:border-zinc-800">
                <span className="flex h-2.5 w-2.5 rounded-full bg-indigo-500 animate-pulse" />
                <h2 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white">
                  {t.instructionsTitle || 'Payment Instructions'}
                </h2>
              </div>

              <ol className="list-decimal list-inside space-y-2 text-sm text-slate-700 dark:text-zinc-300 font-medium">
                {t.instructions?.map((step, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {highlightInstruction(step)}
                  </li>
                ))}
              </ol>

              <p className="text-xs font-semibold text-slate-600 dark:text-zinc-400 pt-3 border-t border-slate-100 dark:border-zinc-800 leading-normal">
                {t.verificationNote}{' '}
                <a
                  href={`tel:${instructionData.support?.hotline}`}
                  className="font-black text-indigo-600 dark:text-indigo-400 underline underline-offset-2 hover:text-indigo-700"
                >
                  {instructionData.support?.hotline}
                </a>.
              </p>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200/90 dark:border-zinc-800 p-6 sm:p-7 shadow-sm">
              <h2 className="text-base font-black uppercase tracking-wider text-slate-900 dark:text-white mb-6 pb-3 border-b border-slate-100 dark:border-zinc-800">
                2. Transaction Details
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700 dark:text-zinc-300 mb-2">
                    {t.form?.methodLabel} <span className="text-rose-500">*</span>
                  </label>
                  <select
                    {...register('paymentMethod', { required: t.form?.methodRequired })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-600 transition cursor-pointer"
                  >
                    {instructionData.gateways?.map((gw) => (
                      <option key={gw.id} value={gw.name}>
                        {gw.name} ({gw.actionType?.[lang] || 'Send Money'})
                      </option>
                    ))}
                  </select>
                  {errors.paymentMethod && (
                    <p className="mt-1.5 text-xs text-rose-500 font-bold">{errors.paymentMethod.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700 dark:text-zinc-300 mb-2">
                    {t.form?.senderPhoneLabel} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder={t.form?.senderPhonePlaceholder || '01XXXXXXXXX'}
                    {...register('senderPhone', {
                      required: t.form?.senderPhoneRequired,
                      pattern: {
                        value: /^01[3-9]\d{8}$/,
                        message: t.form?.senderPhoneInvalid
                      }
                    })}
                    className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-zinc-800 text-slate-900 dark:text-white text-sm font-bold focus:outline-none focus:ring-2 transition ${errors.senderPhone
                      ? 'border-rose-500 focus:ring-rose-500'
                      : 'border-slate-300 dark:border-zinc-700 focus:ring-indigo-600'
                      }`}
                  />
                  {errors.senderPhone && (
                    <p className="mt-1.5 text-xs text-rose-500 font-bold">{errors.senderPhone.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700 dark:text-zinc-300 mb-2">
                    {t.form?.trxIdLabel} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder={t.form?.trxIdPlaceholder || 'e.g. BL90XQ82'}
                    {...register('transactionId', {
                      required: t.form?.trxIdRequired,
                      minLength: {
                        value: 8,
                        message: t.form?.trxIdMinLength
                      }
                    })}
                    className={`w-full px-4 py-3 rounded-xl border font-mono uppercase bg-white dark:bg-zinc-800 text-slate-900 dark:text-white text-sm font-black tracking-wider focus:outline-none focus:ring-2 transition ${errors.transactionId
                      ? 'border-rose-500 focus:ring-rose-500'
                      : 'border-slate-300 dark:border-zinc-700 focus:ring-indigo-600'
                      }`}
                  />
                  {errors.transactionId && (
                    <p className="mt-1.5 text-xs text-rose-500 font-bold">{errors.transactionId.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700 dark:text-zinc-300 mb-2">
                    Promo Code <span className="text-slate-400 font-semibold text-xs lowercase">(optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="ENTER PROMO CODE"
                    {...register('promoCode')}
                    className="w-full px-4 py-3 rounded-xl border font-mono uppercase font-bold border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700 dark:text-zinc-300 mb-2">
                    {t.form?.emailLabel}{' '}
                    <span className="text-slate-400 font-semibold text-xs lowercase">(linked account)</span>
                  </label>
                  <input
                    type="email"
                    readOnly
                    {...register('email')}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-100 dark:bg-zinc-800/60 text-slate-500 dark:text-zinc-400 font-bold text-sm cursor-not-allowed select-none focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-3 py-3.5 px-5 rounded-xl text-sm font-black uppercase tracking-wider bg-slate-950 text-white dark:bg-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-zinc-100 transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
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
          </div>

        </div>
      </div>
    </section>
  );
};

export default Payment;