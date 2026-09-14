import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../Hooks/useAuth';
import useAxiosSecure from '../Hooks/useAxiosSecure'; // 1. Import hook

const ScreenshotAuditLogs = () => {
    const { user, loading: authLoading } = useAuth();
    const axiosSecure = useAxiosSecure(); // 2. Initialize hook

    const [page, setPage] = useState(1);
    const [searchEmail, setSearchEmail] = useState('');
    const [debouncedEmail, setDebouncedEmail] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // Debounce search input to prevent unnecessary requests
    const handleEmailSearch = (e) => {
        e.preventDefault();
        setPage(1);
        setDebouncedEmail(searchEmail);
    };

    const { data, isLoading, isError, error, isFetching } = useQuery({
        queryKey: ['screenshot-logs', { page, searchEmail: debouncedEmail, uid: user?.uid }],
        queryFn: async () => {
            const params = {
                page: page.toString(),
                limit: '50',
            };

            if (debouncedEmail?.trim()) {
                params.email = debouncedEmail.trim();
            }

            // Secure session cookie & anti-CSRF header sent automatically
            const response = await axiosSecure.get('/audit/screenshot-logs', { params });
            return response.data;
        },
        enabled: !authLoading && !!user, // Runs once user auth state is verified
        staleTime: 1000 * 30, // 30 seconds
        keepPreviousData: true,
    });

    const rawLogs = data?.logs || [];
    const pagination = data?.pagination || { total: 0, totalPages: 1 };

    // Client-side date filtering using createdAtUTC (or fallback parsed timestamp)
    const filteredLogs = useMemo(() => {
        return rawLogs.filter((log) => {
            if (!startDate && !endDate) return true;

            const logTimestamp = new Date(log.createdAtUTC || log.capturedAtBST).getTime();
            if (isNaN(logTimestamp)) return true;

            if (startDate) {
                const start = new Date(startDate).setHours(0, 0, 0, 0);
                if (logTimestamp < start) return false;
            }

            if (endDate) {
                const end = new Date(endDate).setHours(23, 59, 59, 999);
                if (logTimestamp > end) return false;
            }

            return true;
        });
    }, [rawLogs, startDate, endDate]);

    const handleResetFilters = () => {
        setSearchEmail('');
        setDebouncedEmail('');
        setStartDate('');
        setEndDate('');
        setPage(1);
    };

    // Badge stylings per capture trigger
    const renderTriggerBadge = (trigger) => {
        switch (trigger) {
            case 'PRINT_SCREEN_KEY':
                return (
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                        PrintScreen Key
                    </span>
                );
            case 'MAC_KEYBOARD_SHORTCUT':
                return (
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-300 dark:border-purple-800">
                        Mac Shortcut
                    </span>
                );
            case 'PRINT_OR_PDF_TRIGGER':
                return (
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-300 dark:border-rose-800">
                        Ctrl+P / PDF Export
                    </span>
                );
            default:
                return (
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-slate-100 text-slate-800 dark:bg-zinc-800 dark:text-zinc-300 border border-slate-300 dark:border-zinc-700">
                        {trigger || 'UNKNOWN'}
                    </span>
                );
        }
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 w-full max-w-[96%] xl:max-w-[1600px] mx-auto space-y-6">
            {/* Top Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 mb-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse" />
                        Security & Compliance
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                        Screenshot Audit Logs
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 mt-1">
                        Real-time tracking of unauthorized screen capture and export attempts with Bangladesh Standard Time (BST).
                    </p>
                </div>

                {/* Total Count Badge */}
                <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-sm self-start sm:self-auto">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="text-xs font-bold text-slate-700 dark:text-zinc-300">
                        Total Logged Incidents: <span className="text-slate-900 dark:text-white font-mono">{pagination.total}</span>
                    </span>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
                <form onSubmit={handleEmailSearch} className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-end">
                    {/* Email Search */}
                    <div className="md:col-span-4">
                        <label className="block text-xs font-semibold text-slate-600 dark:text-zinc-400 mb-1.5">
                            Search by Student Email
                        </label>
                        <div className="relative">
                            <input
                                type="email"
                                placeholder="e.g. student@gmail.com"
                                value={searchEmail}
                                onChange={(e) => setSearchEmail(e.target.value)}
                                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white transition"
                            />
                            <svg className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>

                    {/* Start Date */}
                    <div className="md:col-span-3">
                        <label className="block text-xs font-semibold text-slate-600 dark:text-zinc-400 mb-1.5">
                            From Date (BST)
                        </label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white transition"
                        />
                    </div>

                    {/* End Date */}
                    <div className="md:col-span-3">
                        <label className="block text-xs font-semibold text-slate-600 dark:text-zinc-400 mb-1.5">
                            To Date (BST)
                        </label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white transition"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="md:col-span-2 flex items-center gap-2">
                        <button
                            type="submit"
                            className="flex-1 py-2 px-3 text-xs sm:text-sm font-bold rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:opacity-90 transition shadow-sm"
                        >
                            Filter
                        </button>
                        <button
                            type="button"
                            onClick={handleResetFilters}
                            className="py-2 px-3 text-xs sm:text-sm font-semibold rounded-xl border border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 transition"
                            title="Reset Filters"
                        >
                            Reset
                        </button>
                    </div>
                </form>
            </div>

            {/* Logs Table */}
            <div className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 rounded-2xl shadow-sm overflow-hidden">
                {isLoading ? (
                    <div className="py-24 text-center text-slate-400 dark:text-zinc-500 font-medium">
                        Loading security logs...
                    </div>
                ) : isError ? (
                    <div className="py-24 text-center text-rose-500 font-medium">
                        {error?.response?.data?.message || error?.message || 'Failed to load audit logs.'}
                    </div>
                ) : filteredLogs.length === 0 ? (
                    <div className="py-24 text-center text-slate-400 dark:text-zinc-500">
                        No capture incidents recorded matching your criteria.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[1000px]">
                            <thead>
                                <tr className="border-b border-slate-200 dark:border-zinc-800 bg-slate-50/60 dark:bg-zinc-950/40 text-slate-600 dark:text-zinc-400 uppercase text-[11px] font-bold tracking-wider">
                                    <th className="py-4 px-6 min-w-[240px]">Student Email</th>
                                    <th className="py-4 px-6 min-w-[280px]">Target Route</th>
                                    <th className="py-4 px-6 min-w-[240px]">Captured Time (BST)</th>
                                    <th className="py-4 px-6 min-w-[180px]">IP Address</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/60">
                                {filteredLogs.map((log) => (
                                    <tr
                                        key={log._id}
                                        className="hover:bg-slate-50/80 dark:hover:bg-zinc-800/40 transition-colors"
                                    >
                                        {/* Email */}
                                        <td className="py-4 px-6">
                                            <div className="font-bold text-slate-900 dark:text-white text-sm">
                                                {log.email}
                                            </div>
                                        </td>

                                        {/* Path / URL */}
                                        <td className="py-4 px-6 font-mono text-xs text-slate-700 dark:text-zinc-300">
                                            <span className="inline-block max-w-[420px] truncate align-middle" title={log.pageUrl}>
                                                {log.pageUrl}
                                            </span>
                                        </td>

                                        {/* Timestamp BST */}
                                        <td className="py-4 px-6 whitespace-nowrap font-medium text-slate-700 dark:text-zinc-300 text-xs sm:text-sm">
                                            {log.capturedAtBST}
                                        </td>

                                        {/* IP Address */}
                                        <td className="py-4 px-6 whitespace-nowrap">
                                            <div className="font-mono text-xs text-slate-600 dark:text-zinc-300">
                                                {log.ipAddress || '127.0.0.1'}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Pagination Controls */}
                <div className="px-6 py-4 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between">
                    <span className="text-xs text-slate-500 dark:text-zinc-400">
                        Page {pagination.page} of {pagination.totalPages || 1}
                    </span>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                            disabled={page === 1 || isFetching}
                            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 dark:border-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-zinc-800 transition"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => setPage((prev) => (prev < pagination.totalPages ? prev + 1 : prev))}
                            disabled={page >= pagination.totalPages || isFetching}
                            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 dark:border-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-zinc-800 transition"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScreenshotAuditLogs;