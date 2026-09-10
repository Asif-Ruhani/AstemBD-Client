const apiFetch = async (url, options = {}, csrfToken = null) => {
    const method = (options.method || 'GET').toUpperCase();

    const headers = {
        ...(options.headers || {})
    };

    // Add CSRF token only for state-changing requests
    if (
        ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method) &&
        csrfToken
    ) {
        headers['X-CSRF-Token'] = csrfToken;
    }

    const response = await fetch(url, {
        ...options,
        method,
        credentials: 'include',
        headers
    });

    return response;
};

export default apiFetch;