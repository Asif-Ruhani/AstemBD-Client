// const apiFetch = async (url, options = {}, csrfToken = null) => {
//     const method = (options.method || 'GET').toUpperCase();

//     const headers = {
//         ...(options.headers || {})
//     };

//     // Add CSRF token only for state-changing requests
//     if (
//         ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method) &&
//         csrfToken
//     ) {
//         headers['X-CSRF-Token'] = csrfToken;
//     }

//     const response = await fetch(url, {
//         ...options,
//         method,
//         credentials: 'include',
//         headers
//     });

//     return response;
// };

// export default apiFetch;


import { auth } from '../Firebase/Firebase.config';

const apiFetch = async (url, options = {}) => {
    const method = (options.method || 'GET').toUpperCase();
    const token = auth.currentUser ? await auth.currentUser.getIdToken() : null;

    const headers = {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {})
    };

    const response = await fetch(url, {
        ...options,
        method,
        headers
    });

    return response;
};

export default apiFetch;