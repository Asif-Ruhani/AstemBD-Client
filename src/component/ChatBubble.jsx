
import React, { useState } from 'react'
import { BiChat } from "react-icons/bi";
import { FaFacebookMessenger, FaPhone, FaTelegram, FaWhatsapp } from 'react-icons/fa';

const ChatBubble = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Replace these strings with your actual social links/numbers
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
        <div className="fixed bottom-15 right-5 z-[1000] flex flex-col-reverse items-center gap-4">

            {/* 1. Main Toggle Button */}
            <div
                onClick={() => setIsOpen(!isOpen)}
                tabIndex={0}
                role="button"
                className="cursor-pointer transition-transform active:scale-90"
            >
                {isOpen ? (
                    /* Shows 'X' when open */
                    <div className="bg-[#4F46E5] w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center text-white text-2xl shadow-xl">
                        ✕
                    </div>
                ) : (
                    /* Shows Chat Icon when closed */
                    <span className='text-5xl md:text-6xl text-[#4F46E5] drop-shadow-lg'>
                        <BiChat />
                    </span>
                )}
            </div>

            {/* 2. Social Icons Menu (Visible when isOpen is true) */}
            <div className={`flex flex-col gap-4 transition-all duration-300 transform ${isOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-0 pointer-events-none"
                }`}>

                {/* Phone Call */}
                <button
                    onClick={() => window.location.href = socialLinks.phone}
                    className="btn-circle p-3 text-white bg-gray-700 shadow-lg hover:scale-110 transition-transform"
                >
                    <FaPhone className="text-xl md:text-2xl" />
                </button>

                {/* WhatsApp */}
                <button
                    onClick={() => handleLinkClick(socialLinks.whatsapp)}
                    className="btn-circle p-3 text-white bg-[#25D366] shadow-lg hover:scale-110 transition-transform"
                >
                    <FaWhatsapp className="text-xl md:text-2xl" />
                </button>

                {/* Messenger */}
                <button
                    onClick={() => handleLinkClick(socialLinks.messenger)}
                    className="btn-circle p-3 text-white bg-[#0084FF] shadow-lg hover:scale-110 transition-transform"
                >
                    <FaFacebookMessenger className="text-xl md:text-2xl" />
                </button>

                {/* Telegram */}
                <button
                    onClick={() => handleLinkClick(socialLinks.telegram)}
                    className="btn-circle p-3 text-white bg-[#0088cc] shadow-lg hover:scale-110 transition-transform"
                >
                    <FaTelegram className="text-xl md:text-2xl" />
                </button>



            </div>
        </div>
    )
}

export default ChatBubble;