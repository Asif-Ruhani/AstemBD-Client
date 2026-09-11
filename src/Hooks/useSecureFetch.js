// import { useContext } from 'react';
// import { CsrfContext } from '../Auth/CsrfContext';
// import apiFetch from '../Utils/apiFetch';

// const useSecureFetch = () => {

//     const { csrfToken } = useContext(CsrfContext);

//     const secureFetch = (url, options = {}) => {
//         return apiFetch(url, options, csrfToken);
//     };

//     return secureFetch;
// };

// export default useSecureFetch;



import apiFetch from '../Utils/apiFetch';

const useSecureFetch = () => {
    
    const secureFetch = (url, options = {}) => {
        return apiFetch(url, options);
    };

    return secureFetch;
};

export default useSecureFetch;