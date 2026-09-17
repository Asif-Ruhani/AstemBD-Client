export const formatExpiry = (expiresAt) => {
    if (!expiresAt) return { text: 'Lifetime Access', isExpiringSoon: false, isExpired: false };

    const expiryDate = new Date(expiresAt);
    const now = new Date();
    const diffTime = expiryDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) {
        return { text: 'Expired', isExpiringSoon: false, isExpired: true };
    }

    const formattedDate = expiryDate.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });

    return {
        text: `Expires: ${formattedDate} (${diffDays} days left)`,
        isExpiringSoon: diffDays <= 15,
        isExpired: false
    };
};