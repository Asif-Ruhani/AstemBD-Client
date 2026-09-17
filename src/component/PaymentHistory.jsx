import React, { useEffect, useMemo, useState } from 'react';
import useAuth from '../Hooks/useAuth';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const PaymentHistory = () => {
    const { user, loading: authLoading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingAction, setUpdatingAction] = useState(null); // format: `${id}-${action}`

    // Search & Filter States
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMethod, setSelectedMethod] = useState('all'); // 'all' | 'bkash' | 'nagad'
    const [selectedStatus, setSelectedStatus] = useState('all'); // 'all' | 'pending' | 'approved' | 'rejected'
    const [copiedId, setCopiedId] = useState(null);

    // Fetch payment records
    useEffect(() => {
        if (authLoading || !user) return;

        const fetchHistory = async () => {
            setLoading(true);
            try {
                const response = await axiosSecure.get('/payment-info');

                // Safe extraction whether backend sends { data: [...] } or { payments: [...] }
                const records = response.data?.data || response.data?.payments || [];
                setPayments(Array.isArray(records) ? records : []);
            } catch (error) {
                console.error('Fetch payment history error:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Load Failed',
                    text: error.response?.data?.message || error.message || 'Unable to retrieve payment records'
                });
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, [user, authLoading, axiosSecure]);

    // Handle Payment Status Update (Accept -> 'approved' / Reject -> 'rejected')
    // Handle Payment Status Update (Accept -> 'approved' / Reject -> 'rejected')
    const handleToggleStatus = async (item, targetStatus) => {
        const paymentId = item._id;
        const currentStatus = (item.verificationStatus || 'pending').toLowerCase();

        if (currentStatus === targetStatus) return;

        setUpdatingAction(`${paymentId}-${targetStatus}`);
        try {
            // Updated to POST, sending ONLY the desired status
            await axiosSecure.post(`/payment-info/${paymentId}/verify`, {
                verificationStatus: targetStatus
            });

            // Optimistically update local records
            setPayments((prev) =>
                prev.map((p) => (p._id === paymentId ? { ...p, verificationStatus: targetStatus } : p))
            );

            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: targetStatus === 'approved' ? 'Payment Approved' : 'Payment Rejected',
                showConfirmButton: false,
                timer: 2000
            });
        } catch (error) {
            console.error('Status toggle error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Update failed',
                text: error.response?.data?.message || error.message
            });
        } finally {
            setUpdatingAction(null);
        }
    };

    // Copy helper
    const handleCopyTrx = (trxId) => {
        navigator.clipboard.writeText(trxId);
        setCopiedId(trxId);
        setTimeout(() => setCopiedId(null), 1800);
    };

    // Search & Filtering
    const filteredPayments = useMemo(() => {
        const q = searchQuery.toLowerCase().trim();

        return payments.filter((item) => {
            const email = (item.email || '').toLowerCase();
            const phone = (item.senderPhone || '').toLowerCase();
            const trxId = (item.transactionId || '').toLowerCase();
            const date = (item.submittedAtBDT || item.createdAtBDT || '').toLowerCase();
            const method = (item.paymentMethod || '').toLowerCase();
            const rawStatus = (item.verificationStatus || 'pending').toLowerCase();

            // Support both internal status names and common aliases
            const isApproved = rawStatus === 'approved' || rawStatus === 'paid';
            const isRejected = rawStatus === 'rejected' || rawStatus === 'unpaid';

            const statusAliases = [
                rawStatus,
                isApproved ? 'approved accepted paid' : '',
                isRejected ? 'rejected unpaid declined' : ''
            ].filter(Boolean);

            const coursesString = Array.isArray(item.courses)
                ? item.courses.map((c) => `${c.title || c.courseName || ''} ${c.courseId || ''}`).join(' ').toLowerCase()
                : (item.courseIds || []).join(' ').toLowerCase();

            const matchesQuery =
                !q ||
                email.includes(q) ||
                phone.includes(q) ||
                trxId.includes(q) ||
                date.includes(q) ||
                method.includes(q) ||
                coursesString.includes(q) ||
                statusAliases.some((st) => st.includes(q));

            const matchesMethod =
                selectedMethod === 'all' || method === selectedMethod.toLowerCase();

            let matchesStatus = true;
            if (selectedStatus === 'pending') {
                matchesStatus = rawStatus === 'pending';
            } else if (selectedStatus === 'approved') {
                matchesStatus = isApproved;
            } else if (selectedStatus === 'rejected') {
                matchesStatus = isRejected;
            }

            return matchesQuery && matchesMethod && matchesStatus;
        });
    }, [payments, searchQuery, selectedMethod, selectedStatus]);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 py-10 px-4 sm:px-6 lg:px-10">
            <div className="max-w-[96rem] mx-auto space-y-6">

                {/* Page Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-zinc-900 p-7 rounded-3xl border border-slate-200/80 dark:border-zinc-800 shadow-sm">
                    <div>
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 mb-2.5">
                            Financial Audit
                        </span>
                        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                            Payment Verification Logs
                        </h1>
                        <p className="text-sm sm:text-base text-slate-500 dark:text-zinc-400 mt-1.5">
                            Audit submitted student fees, courses chosen, TrxIDs, and manual verification states.
                        </p>
                    </div>

                    {/* Quick Metrics */}
                    <div className="flex items-center gap-4">
                        <div className="px-5 py-3 bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/60 rounded-2xl text-center min-w-[120px]">
                            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Total Records</span>
                            <span className="text-xl font-black text-slate-900 dark:text-white">{payments.length}</span>
                        </div>
                        <div className="px-5 py-3 bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/60 rounded-2xl text-center min-w-[120px]">
                            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Filtered</span>
                            <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">{filteredPayments.length}</span>
                        </div>
                    </div>
                </div>

                {/* Search & Filtering Bar */}
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-slate-200/80 dark:border-zinc-800 shadow-sm space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                        {/* Search Input */}
                        <div className="relative md:col-span-1">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search email, phone, TrxID, course..."
                                className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white transition"
                            />
                        </div>

                        {/* Method Filter Dropdown */}
                        <div>
                            <select
                                value={selectedMethod}
                                onChange={(e) => setSelectedMethod(e.target.value)}
                                className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white transition cursor-pointer"
                            >
                                <option value="all">All Gateways (bKash & Nagad)</option>
                                <option value="bkash">bKash Only</option>
                                <option value="nagad">Nagad Only</option>
                            </select>
                        </div>

                        {/* Verification Status Filter */}
                        <div>
                            <select
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white transition cursor-pointer"
                            >
                                <option value="all">All Statuses</option>
                                <option value="pending">Pending Verification</option>
                                <option value="approved">Approved (Paid)</option>
                                <option value="rejected">Rejected (Unpaid)</option>
                            </select>
                        </div>

                    </div>

                    {/* Filter Reset */}
                    {(searchQuery || selectedMethod !== 'all' || selectedStatus !== 'all') && (
                        <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-zinc-800 text-sm">
                            <span className="text-slate-500 dark:text-zinc-400">
                                Filters active &mdash; Showing {filteredPayments.length} of {payments.length} submissions
                            </span>
                            <button
                                type="button"
                                onClick={() => {
                                    setSearchQuery('');
                                    setSelectedMethod('all');
                                    setSelectedStatus('all');
                                }}
                                className="font-bold text-rose-500 hover:text-rose-600 transition cursor-pointer"
                            >
                                Reset Filters
                            </button>
                        </div>
                    )}
                </div>

                {/* Expanded Data Table */}
                <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200/80 dark:border-zinc-800 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[1050px]">
                            <thead>
                                <tr className="border-b border-slate-200 dark:border-zinc-800 bg-slate-50/70 dark:bg-zinc-800/40 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-zinc-400">
                                    <th className="py-5 px-7">User Details</th>
                                    <th className="py-5 px-7">Gateway & TrxID</th>
                                    <th className="py-5 px-7">Courses</th>
                                    <th className="py-5 px-7">Amount & Time</th>
                                    <th className="py-5 px-7 text-right">Verification Action</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/60 text-base">
                                {loading ? (
                                    <tr>
                                        <td colSpan={5} className="py-20 text-center text-slate-400 dark:text-zinc-500">
                                            <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-slate-300 border-t-slate-900 dark:border-zinc-700 dark:border-t-white mb-3" />
                                            <p className="text-sm font-semibold">Loading payment transactions...</p>
                                        </td>
                                    </tr>
                                ) : filteredPayments.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="py-20 text-center text-slate-400 dark:text-zinc-500">
                                            <p className="text-base font-semibold">No payment history records found.</p>
                                            <p className="text-sm mt-1 text-slate-400 dark:text-zinc-600">Try adjusting your search criteria or reset filters.</p>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredPayments.map((item) => {
                                        const isBkash = (item.paymentMethod || '').toLowerCase() === 'bkash';
                                        const rawStatus = (item.verificationStatus || 'pending').toLowerCase();
                                        const isApproved = rawStatus === 'approved' || rawStatus === 'paid';
                                        const isRejected = rawStatus === 'rejected' || rawStatus === 'unpaid';

                                        const isAccepting = updatingAction === `${item._id}-approved`;
                                        const isRejecting = updatingAction === `${item._id}-rejected`;
                                        const isBusy = isAccepting || isRejecting;

                                        return (
                                            <tr
                                                key={item._id || item.transactionId}
                                                className="hover:bg-slate-50/80 dark:hover:bg-zinc-800/50 transition-colors duration-150"
                                            >
                                                {/* Column 1: User Email & Phone */}
                                                <td className="py-5 px-7">
                                                    <div className="flex flex-col">
                                                        <span className="font-bold text-slate-900 dark:text-white text-base truncate">
                                                            {item.email}
                                                        </span>
                                                        <span className="text-sm font-mono text-slate-500 dark:text-zinc-400 mt-1">
                                                            📞 {item.senderPhone}
                                                        </span>
                                                    </div>
                                                </td>

                                                {/* Column 2: Gateway & TrxID */}
                                                <td className="py-5 px-7">
                                                    <div className="flex flex-col gap-1.5">
                                                        <div>
                                                            <span
                                                                className={`inline-block px-2.5 py-1 rounded-lg text-xs font-black tracking-wider uppercase ${isBkash
                                                                    ? 'bg-pink-100 text-pink-700 dark:bg-pink-950/60 dark:text-pink-300'
                                                                    : 'bg-orange-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-300'
                                                                    }`}
                                                            >
                                                                {item.paymentMethod}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-mono text-sm font-bold text-slate-800 dark:text-zinc-200">
                                                                {item.transactionId}
                                                            </span>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleCopyTrx(item.transactionId)}
                                                                title="Copy Transaction ID"
                                                                className="text-xs text-slate-400 hover:text-slate-900 dark:hover:text-white transition cursor-pointer p-0.5"
                                                            >
                                                                {copiedId === item.transactionId ? '✓' : '⧉'}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Column 3: Courses */}
                                                <td className="py-5 px-7">
                                                    <div className="flex flex-col gap-1.5 max-w-sm">
                                                        {Array.isArray(item.courses) && item.courses.length > 0 ? (
                                                            item.courses.map((course, idx) => (
                                                                <span
                                                                    key={course.courseId || idx}
                                                                    className="inline-flex items-center justify-between gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-zinc-800 border border-slate-200/70 dark:border-zinc-700/70 text-xs font-semibold text-slate-800 dark:text-zinc-200 w-full"
                                                                >
                                                                    <span>{course.title || course.courseName || course.courseId}</span>
                                                                    {(course.price !== undefined || course.coursePrice !== undefined) && (
                                                                        <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-zinc-400 shrink-0">
                                                                            ৳{course.price ?? course.coursePrice}
                                                                        </span>
                                                                    )}
                                                                </span>
                                                            ))
                                                        ) : Array.isArray(item.courseIds) && item.courseIds.length > 0 ? (
                                                            item.courseIds.map((cid, idx) => (
                                                                <span
                                                                    key={idx}
                                                                    className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-zinc-800 border border-slate-200/70 dark:border-zinc-700/70 text-xs font-mono text-slate-700 dark:text-zinc-300 w-full"
                                                                >
                                                                    {cid}
                                                                </span>
                                                            ))
                                                        ) : (
                                                            <span className="text-sm text-slate-400 italic">No courses recorded</span>
                                                        )}
                                                    </div>
                                                </td>

                                                {/* Column 4: Amount & Submission Time */}
                                                <td className="py-5 px-7">
                                                    <div className="flex flex-col gap-1.5">
                                                        <div className="text-sm font-bold text-slate-700 dark:text-zinc-300">
                                                            Total:{' '}
                                                            <span className="font-mono text-base font-extrabold text-emerald-600 dark:text-emerald-400">
                                                                ৳{item.amount || 0}
                                                            </span>{' '}
                                                            {item.currency || 'BDT'}
                                                        </div>
                                                        <span className="text-xs text-slate-500 dark:text-zinc-400 font-medium">
                                                            {item.submittedAtBDT || item.createdAtBDT || 'N/A'}
                                                        </span>
                                                    </div>
                                                </td>

                                                {/* Column 5: Verification Action Buttons */}
                                                <td className="py-5 px-7 text-right">
                                                    <div className="inline-flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100/90 dark:bg-zinc-800/80 border border-slate-200/80 dark:border-zinc-700/60 shadow-inner">

                                                        {/* Approve Button */}
                                                        <button
                                                            type="button"
                                                            disabled={isBusy}
                                                            onClick={() => handleToggleStatus(item, 'approved')}
                                                            title="Mark payment as Approved"
                                                            className={`group relative inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 shadow-sm select-none cursor-pointer active:scale-95 disabled:opacity-50 ${isApproved
                                                                ? 'bg-emerald-600 text-white shadow-emerald-600/25 ring-2 ring-emerald-500/20'
                                                                : 'bg-white/90 dark:bg-zinc-900/90 text-slate-700 dark:text-zinc-300 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-slate-200/80 dark:border-zinc-700/60'
                                                                }`}
                                                        >
                                                            {isAccepting ? (
                                                                <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                                            ) : (
                                                                <svg
                                                                    className={`w-4 h-4 transition-transform group-hover:scale-110 ${isApproved ? 'text-white' : 'text-emerald-600 dark:text-emerald-400'}`}
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    stroke="currentColor"
                                                                >
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                                                </svg>
                                                            )}
                                                            <span>Approve</span>
                                                        </button>

                                                        {/* Reject Button */}
                                                        <button
                                                            type="button"
                                                            disabled={isBusy}
                                                            onClick={() => handleToggleStatus(item, 'rejected')}
                                                            title="Mark payment as Rejected"
                                                            className={`group relative inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 shadow-sm select-none cursor-pointer active:scale-95 disabled:opacity-50 ${isRejected
                                                                ? 'bg-rose-600 text-white shadow-rose-600/25 ring-2 ring-rose-500/20'
                                                                : 'bg-white/90 dark:bg-zinc-900/90 text-slate-700 dark:text-zinc-300 hover:text-rose-700 dark:hover:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-slate-200/80 dark:border-zinc-700/60'
                                                                }`}
                                                        >
                                                            {isRejecting ? (
                                                                <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                                            ) : (
                                                                <svg
                                                                    className={`w-4 h-4 transition-transform group-hover:scale-110 ${isRejected ? 'text-white' : 'text-rose-600 dark:text-rose-400'}`}
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    stroke="currentColor"
                                                                >
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                                                </svg>
                                                            )}
                                                            <span>Reject</span>
                                                        </button>

                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PaymentHistory;