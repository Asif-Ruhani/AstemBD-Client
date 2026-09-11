import React, { useEffect, useMemo, useState } from 'react';
import useAuth from '../Hooks/useAuth';
import Swal from 'sweetalert2';

const PaymentHistory = () => {
    const { user, loading: authLoading } = useAuth();
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingAction, setUpdatingAction] = useState(null); // format: `${id}-${action}`

    // Search & Filter States
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMethod, setSelectedMethod] = useState('all'); // 'all' | 'bkash' | 'nagad'
    const [selectedStatus, setSelectedStatus] = useState('all'); // 'all' | 'pending' | 'paid' | 'unpaid'
    const [copiedId, setCopiedId] = useState(null);

    // Fetch payment records
    useEffect(() => {
        if (authLoading || !user) return;

        const fetchHistory = async () => {
            setLoading(true);
            try {
                const token = await user.getIdToken();
                const response = await fetch('https://astembd-server.onrender.com/payment-history', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`Failed to load payment history (${response.status})`);
                }

                const data = await response.json();
                setPayments(data.payments || []);
            } catch (error) {
                console.error('Fetch payment history error:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Load Failed',
                    text: error.message || 'Unable to retrieve payment records'
                });
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, [user, authLoading]);

    // Handle Payment Status Update (Accept / Reject)
    const handleToggleStatus = async (item, targetStatus) => {
        const paymentId = item._id;
        const currentStatus = (item.verificationStatus || 'pending').toLowerCase();

        // Prevent redundant network calls if already in target status
        if (currentStatus === targetStatus) return;

        setUpdatingAction(`${paymentId}-${targetStatus}`);
        try {
            const token = await user.getIdToken();
            const response = await fetch(`https://astembd-server.onrender.com/payment-history/${paymentId}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    verificationStatus: targetStatus,
                    userEmail: item.email
                })
            });

            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                throw new Error(errData.message || 'Failed to update payment status');
            }

            // Optimistically update local records
            setPayments((prev) =>
                prev.map((p) => (p._id === paymentId ? { ...p, verificationStatus: targetStatus } : p))
            );

            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: targetStatus === 'paid' ? 'Payment Accepted' : 'Payment Rejected',
                showConfirmButton: false,
                timer: 2000
            });
        } catch (error) {
            console.error('Status toggle error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Update failed',
                text: error.message
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

    // Multi-parameter live filtering
    const filteredPayments = useMemo(() => {
        const q = searchQuery.toLowerCase().trim();

        return payments.filter((item) => {
            const email = (item.email || '').toLowerCase();
            const phone = (item.senderPhone || '').toLowerCase();
            const trxId = (item.transactionId || '').toLowerCase();
            const date = (item.submittedAtBDT || item.createdAtBDT || '').toLowerCase();

            const matchesQuery =
                !q ||
                email.includes(q) ||
                phone.includes(q) ||
                trxId.includes(q) ||
                date.includes(q);

            const method = (item.paymentMethod || '').toLowerCase();
            const matchesMethod =
                selectedMethod === 'all' || method === selectedMethod;

            const status = (item.verificationStatus || 'pending').toLowerCase();
            const matchesStatus =
                selectedStatus === 'all' || status === selectedStatus;

            return matchesQuery && matchesMethod && matchesStatus;
        });
    }, [payments, searchQuery, selectedMethod, selectedStatus]);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Page Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-slate-200/80 dark:border-zinc-800 shadow-sm">
                    <div>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 mb-2">
                            Financial Audit
                        </span>
                        <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                            Payment Verification Logs
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 mt-1">
                            Audit submitted student fees, TrxIDs, and manual verification states.
                        </p>
                    </div>

                    {/* Quick Metrics */}
                    <div className="flex items-center gap-3">
                        <div className="px-4 py-2.5 bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/60 rounded-2xl text-center">
                            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Records</span>
                            <span className="text-lg font-black text-slate-900 dark:text-white">{payments.length}</span>
                        </div>
                        <div className="px-4 py-2.5 bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/60 rounded-2xl text-center">
                            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Filtered</span>
                            <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">{filteredPayments.length}</span>
                        </div>
                    </div>
                </div>

                {/* Search & Filtering Bar */}
                <div className="bg-white dark:bg-zinc-900 p-5 rounded-3xl border border-slate-200/80 dark:border-zinc-800 shadow-sm space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

                        {/* Search Input */}
                        <div className="relative md:col-span-1">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search email, phone, TrxID, date..."
                                className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white transition"
                            />
                        </div>

                        {/* Method Filter Dropdown */}
                        <div>
                            <select
                                value={selectedMethod}
                                onChange={(e) => setSelectedMethod(e.target.value)}
                                className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white transition cursor-pointer"
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
                                className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white transition cursor-pointer"
                            >
                                <option value="all">All Statuses</option>
                                <option value="paid">Accepted (Paid)</option>
                                <option value="unpaid">Rejected (Unpaid)</option>
                            </select>
                        </div>

                    </div>

                    {/* Quick Clear Filter Pill */}
                    {(searchQuery || selectedMethod !== 'all' || selectedStatus !== 'all') && (
                        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-zinc-800 text-xs">
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

                {/* Data Table Card */}
                <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200/80 dark:border-zinc-800 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-800/30 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
                                    <th className="py-4 px-6">Student & Contact</th>
                                    <th className="py-4 px-6">Gateway & TrxID</th>
                                    <th className="py-4 px-6 text-center">Amount</th>
                                    <th className="py-4 px-6">Submission Time (BDT)</th>
                                    <th className="py-4 px-6 text-right">Verification Action</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/60 text-sm">
                                {loading ? (
                                    <tr>
                                        <td colSpan={5} className="py-16 text-center text-slate-400 dark:text-zinc-500">
                                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-slate-300 border-t-slate-900 dark:border-zinc-700 dark:border-t-white mb-2" />
                                            <p className="text-xs font-semibold">Loading payment transactions...</p>
                                        </td>
                                    </tr>
                                ) : filteredPayments.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="py-16 text-center text-slate-400 dark:text-zinc-500">
                                            <p className="text-sm font-semibold">No payment history records found.</p>
                                            <p className="text-xs mt-1 text-slate-400 dark:text-zinc-600">Try adjusting your search criteria or reset filters.</p>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredPayments.map((item) => {
                                        const isBkash = (item.paymentMethod || '').toLowerCase() === 'bkash';
                                        const status = (item.verificationStatus || 'pending').toLowerCase();
                                        const isAccepting = updatingAction === `${item._id}-paid`;
                                        const isRejecting = updatingAction === `${item._id}-unpaid`;
                                        const isBusy = isAccepting || isRejecting;

                                        return (
                                            <tr
                                                key={item._id || item.transactionId}
                                                className="hover:bg-slate-50/70 dark:hover:bg-zinc-800/40 transition-colors duration-150"
                                            >
                                                {/* 1. Student / Contact Info */}
                                                <td className="py-4 px-6">
                                                    <div className="flex flex-col">
                                                        <span className="font-bold text-slate-900 dark:text-white truncate">
                                                            {item.email}
                                                        </span>
                                                        <span className="text-xs font-mono text-slate-500 dark:text-zinc-400 mt-0.5">
                                                            📞 {item.senderPhone}
                                                        </span>
                                                    </div>
                                                </td>

                                                {/* 2. Gateway & TrxID */}
                                                <td className="py-4 px-6">
                                                    <div className="flex flex-col gap-1">
                                                        <div className="flex items-center gap-2">
                                                            <span
                                                                className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-black tracking-wide uppercase ${isBkash
                                                                    ? 'bg-pink-100 text-pink-700 dark:bg-pink-950/60 dark:text-pink-300'
                                                                    : 'bg-orange-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-300'
                                                                    }`}
                                                            >
                                                                {item.paymentMethod}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-1.5">
                                                            <span className="font-mono text-xs font-bold text-slate-800 dark:text-zinc-200">
                                                                {item.transactionId}
                                                            </span>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleCopyTrx(item.transactionId)}
                                                                title="Copy Transaction ID"
                                                                className="text-[11px] text-slate-400 hover:text-slate-900 dark:hover:text-white transition cursor-pointer"
                                                            >
                                                                {copiedId === item.transactionId ? '✓' : '⧉'}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* 3. Amount */}
                                                <td className="py-4 px-6 text-center">
                                                    <span className="font-mono font-bold text-sm text-slate-900 dark:text-white">
                                                        ৳{item.amount || 1000}
                                                    </span>
                                                    <span className="block text-[10px] text-slate-400 dark:text-zinc-500 uppercase">
                                                        {item.currency || 'BDT'}
                                                    </span>
                                                </td>

                                                {/* 4. Submission Date / Time */}
                                                <td className="py-4 px-6">
                                                    <span className="text-xs text-slate-600 dark:text-zinc-300 block">
                                                        {item.submittedAtBDT || item.createdAtBDT || 'N/A'}
                                                    </span>
                                                </td>

                                                {/* 5. Direct Decision Actions (Accept / Reject) */}
                                                <td className="py-4 px-6 text-right">
                                                    <div className="inline-flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100/90 dark:bg-zinc-800/80 border border-slate-200/80 dark:border-zinc-700/60 shadow-inner">

                                                        {/* Accept (Paid) Action Button */}
                                                        <button
                                                            type="button"
                                                            disabled={isBusy}
                                                            onClick={() => handleToggleStatus(item, 'paid')}
                                                            title="Mark payment as Accepted (Paid)"
                                                            className={`group relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 shadow-sm select-none cursor-pointer active:scale-95 disabled:opacity-50 ${status === 'paid'
                                                                ? 'bg-emerald-600 text-white shadow-emerald-600/25 ring-2 ring-emerald-500/20'
                                                                : 'bg-white/90 dark:bg-zinc-900/90 text-slate-700 dark:text-zinc-300 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-slate-200/80 dark:border-zinc-700/60'
                                                                }`}
                                                        >
                                                            {isAccepting ? (
                                                                <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                                            ) : (
                                                                <svg
                                                                    className={`w-3.5 h-3.5 transition-transform group-hover:scale-110 ${status === 'paid' ? 'text-white' : 'text-emerald-600 dark:text-emerald-400'
                                                                        }`}
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    stroke="currentColor"
                                                                >
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                                                </svg>
                                                            )}
                                                            <span>Accept</span>
                                                        </button>

                                                        {/* Reject (Unpaid) Action Button */}
                                                        <button
                                                            type="button"
                                                            disabled={isBusy}
                                                            onClick={() => handleToggleStatus(item, 'unpaid')}
                                                            title="Mark payment as Rejected (Unpaid)"
                                                            className={`group relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 shadow-sm select-none cursor-pointer active:scale-95 disabled:opacity-50 ${status === 'unpaid'
                                                                ? 'bg-rose-600 text-white shadow-rose-600/25 ring-2 ring-rose-500/20'
                                                                : 'bg-white/90 dark:bg-zinc-900/90 text-slate-700 dark:text-zinc-300 hover:text-rose-700 dark:hover:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-slate-200/80 dark:border-zinc-700/60'
                                                                }`}
                                                        >
                                                            {isRejecting ? (
                                                                <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                                            ) : (
                                                                <svg
                                                                    className={`w-3.5 h-3.5 transition-transform group-hover:scale-110 ${status === 'unpaid' ? 'text-white' : 'text-rose-600 dark:text-rose-400'
                                                                        }`}
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