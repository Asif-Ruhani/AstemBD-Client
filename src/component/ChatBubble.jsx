
// import React, { useState } from 'react'
// import { BiChat } from "react-icons/bi";
// import { FaFacebookMessenger, FaPhone, FaTelegram, FaWhatsapp } from 'react-icons/fa';

// const ChatBubble = () => {
//     const [isOpen, setIsOpen] = useState(false);

//     // Replace these strings with your actual social links/numbers
//     const socialLinks = {
//         telegram: "https://t.me/AxyMart",
//         whatsapp: "https://wa.me/8801762202837",
//         messenger: "https://www.facebook.com/share/1GkbFYkn52/",
//         phone: "tel:+8801762202837"
//     };

//     const handleLinkClick = (url) => {
//         window.open(url, "_blank", "noopener,noreferrer");
//     };

//     return (
//         <div className="fixed bottom-15 right-5 z-[1000] flex flex-col-reverse items-center gap-4">

//             {/* 1. Main Toggle Button */}
//             <div
//                 onClick={() => setIsOpen(!isOpen)}
//                 tabIndex={0}
//                 role="button"
//                 className="cursor-pointer transition-transform active:scale-90"
//             >
//                 {isOpen ? (
//                     /* Shows 'X' when open */
//                     <div className="bg-[#4F46E5] w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center text-white text-2xl shadow-xl">
//                         ✕
//                     </div>
//                 ) : (
//                     /* Shows Chat Icon when closed */
//                     <span className='text-5xl md:text-6xl text-[#4F46E5] drop-shadow-lg'>
//                         <BiChat />
//                     </span>
//                 )}
//             </div>

//             {/* 2. Social Icons Menu (Visible when isOpen is true) */}
//             <div className={`flex flex-col gap-4 transition-all duration-300 transform ${isOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-0 pointer-events-none"
//                 }`}>

//                 {/* Phone Call */}
//                 <button
//                     onClick={() => window.location.href = socialLinks.phone}
//                     className="btn-circle p-3 text-white bg-gray-700 shadow-lg hover:scale-110 transition-transform"
//                 >
//                     <FaPhone className="text-xl md:text-2xl" />
//                 </button>

//                 {/* WhatsApp */}
//                 <button
//                     onClick={() => handleLinkClick(socialLinks.whatsapp)}
//                     className="btn-circle p-3 text-white bg-[#25D366] shadow-lg hover:scale-110 transition-transform"
//                 >
//                     <FaWhatsapp className="text-xl md:text-2xl" />
//                 </button>

//                 {/* Messenger */}
//                 <button
//                     onClick={() => handleLinkClick(socialLinks.messenger)}
//                     className="btn-circle p-3 text-white bg-[#0084FF] shadow-lg hover:scale-110 transition-transform"
//                 >
//                     <FaFacebookMessenger className="text-xl md:text-2xl" />
//                 </button>

//                 {/* Telegram */}
//                 <button
//                     onClick={() => handleLinkClick(socialLinks.telegram)}
//                     className="btn-circle p-3 text-white bg-[#0088cc] shadow-lg hover:scale-110 transition-transform"
//                 >
//                     <FaTelegram className="text-xl md:text-2xl" />
//                 </button>



//             </div>
//         </div>
//     )
// }

// export default ChatBubble;

import React, { useState, useEffect } from 'react';
import { BiChat } from "react-icons/bi";
import { FaFacebookMessenger, FaPhone, FaTelegram, FaWhatsapp } from 'react-icons/fa';

const ChatBubble = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isPresentationPage, setIsPresentationPage] = useState(
        typeof window !== 'undefined' && window.location.pathname.includes('/presentation')
    );

    useEffect(() => {
        const updatePresentationStatus = () => {
            const isPres = window.location.pathname.includes('/presentation');
            setIsPresentationPage(isPres);
        };

        // ১. ব্যাক / ফরোয়ার্ড বাটনের জন্য
        window.addEventListener('popstate', updatePresentationStatus);

        // ২. সিঙ্গেল পেজ অ্যাপ্লিকেশনের internal route change ট্র্যাক করা (pushState / replaceState)
        const originalPushState = window.history.pushState;
        const originalReplaceState = window.history.replaceState;

        window.history.pushState = function (...args) {
            const result = originalPushState.apply(this, args);
            updatePresentationStatus();
            return result;
        };

        window.history.replaceState = function (...args) {
            const result = originalReplaceState.apply(this, args);
            updatePresentationStatus();
            return result;
        };

        // ৩. ব্যাকআপ সেফটি পোলিং (instant sync নিশ্চিত করার জন্য)
        const interval = setInterval(updatePresentationStatus, 250);

        return () => {
            window.removeEventListener('popstate', updatePresentationStatus);
            window.history.pushState = originalPushState;
            window.history.replaceState = originalReplaceState;
            clearInterval(interval);
        };
    }, []);

    const socialLinks = {
        telegram: "https://t.me/AxyMart",
        whatsapp: "https://wa.me/8801762202837",
        messenger: "https://www.facebook.com/share/1GkbFYkn52/",
        phone: "tel:+8801762202837"
    };

    const handleLinkClick = (url) => {
        window.open(url, "_blank", "noopener,noreferrer");
    };

    return (
        <div
            className={`fixed right-4 sm:right-5 bottom-15 z-[1000] items-center gap-3 transition-all duration-300 ${isPresentationPage
                    ? 'hidden lg:flex flex-col-reverse' // Presentation পেজে মোবাইল ও ট্যাবলেটে সরাসরি গায়েব, পিসিতে দৃশ্যমান
                    : 'flex flex-col-reverse'          // বাকি সব পেজে স্বাভাবিক
                }`}
        >
            {/* 1. Main Toggle Button */}
            <div
                onClick={() => setIsOpen(!isOpen)}
                tabIndex={0}
                role="button"
                className="cursor-pointer transition-transform active:scale-90"
            >
                {isOpen ? (
                    <div className="bg-[#4F46E5] w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center text-white text-2xl shadow-xl">
                        ✕
                    </div>
                ) : (
                    <span className='text-5xl md:text-6xl text-[#4F46E5] drop-shadow-lg'>
                        <BiChat />
                    </span>
                )}
            </div>

            {/* 2. Social Icons Menu */}
            <div className={`flex flex-col gap-3.5 transition-all duration-300 transform ${isOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-0 pointer-events-none"
                }`}>
                <button
                    type="button"
                    onClick={() => window.location.href = socialLinks.phone}
                    className="p-3 text-white bg-gray-700 shadow-lg hover:scale-110 active:scale-95 rounded-full transition-transform"
                >
                    <FaPhone className="text-xl md:text-2xl" />
                </button>

                <button
                    type="button"
                    onClick={() => handleLinkClick(socialLinks.whatsapp)}
                    className="p-3 text-white bg-[#25D366] shadow-lg hover:scale-110 active:scale-95 rounded-full transition-transform"
                >
                    <FaWhatsapp className="text-xl md:text-2xl" />
                </button>

                <button
                    type="button"
                    onClick={() => handleLinkClick(socialLinks.messenger)}
                    className="p-3 text-white bg-[#0084FF] shadow-lg hover:scale-110 active:scale-95 rounded-full transition-transform"
                >
                    <FaFacebookMessenger className="text-xl md:text-2xl" />
                </button>

                <button
                    type="button"
                    onClick={() => handleLinkClick(socialLinks.telegram)}
                    className="p-3 text-white bg-[#0088cc] shadow-lg hover:scale-110 active:scale-95 rounded-full transition-transform"
                >
                    <FaTelegram className="text-xl md:text-2xl" />
                </button>
            </div>
        </div>
    );
};

export default ChatBubble;