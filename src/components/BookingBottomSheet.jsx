import React, { useState } from 'react';

export default function BookingBottomSheet({ isOpen, onClose }) {
    const [pax, setPax] = useState(1);
    const [workshopType, setWorkshopType] = useState("Potter's Wheel");

    if (!isOpen) return null;

    const handleSendInquiry = () => {
        // Retrieve the admin-configured WhatsApp number or default
        const waNumber = localStorage.getItem('thowkwang_wa_number') || '6562655808';

        // Clean the number just in case
        const cleanNumber = waNumber.replace(/[^0-9]/g, '');

        // Construct the message
        const textMessage = `Hello Thow Kwang! I would like to inquire about booking a ${workshopType} workshop for ${pax} pax.`;

        // Open WhatsApp API link
        window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(textMessage)}`, '_blank');

        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-end bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose}>
            {/* Bottom Sheet Container */}
            <div
                className="w-full sm:max-w-[480px] bg-white dark:bg-neutral-900 rounded-t-3xl sm:rounded-2xl sm:mb-6 shadow-[0_-10px_40px_rgba(0,0,0,0.3)] animate-in slide-in-from-bottom-[100%] duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Drag Handle Indicator */}
                <div className="w-full flex justify-center pt-4 pb-2 sm:hidden">
                    <div className="w-12 h-1.5 bg-neutral-300 dark:bg-neutral-700 rounded-full"></div>
                </div>

                <div className="px-6 pb-4 sm:pt-6 border-b border-neutral-100 dark:border-neutral-800 flex justify-between items-center">
                    <h2 className="font-display text-2xl font-bold text-text-light dark:text-white">Book a Workshop</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors hidden sm:block">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <div className="p-6 space-y-7">
                    {/* Workshop Type Selector */}
                    <div className="space-y-3">
                        <label className="block text-sm font-bold text-text-light dark:text-text-dark">Workshop Type</label>
                        <div className="relative">
                            <select
                                value={workshopType}
                                onChange={(e) => setWorkshopType(e.target.value)}
                                className="w-full bg-surface-light dark:bg-surface-dark border border-neutral-200 dark:border-neutral-700 rounded-xl px-4 py-3.5 appearance-none text-text-light dark:text-text-dark focus:outline-none focus:border-primary transition-colors font-semibold"
                            >
                                <option value="Potter's Wheel">Potter's Wheel</option>
                                <option value="Hand-building">Hand-building</option>
                                <option value="Dragon Kiln Tour">Dragon Kiln Tour</option>
                            </select>
                            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
                                expand_more
                            </span>
                        </div>
                    </div>

                    {/* Participant Counter */}
                    <div className="space-y-3">
                        <label className="block text-sm font-bold text-text-light dark:text-text-dark">Number of Participants (Pax)</label>
                        <div className="flex items-center justify-between bg-surface-light dark:bg-surface-dark border border-neutral-200 dark:border-neutral-700 rounded-xl p-2 w-full max-w-[200px]">
                            <button
                                onClick={() => setPax(Math.max(1, pax - 1))}
                                className="w-10 h-10 flex items-center justify-center bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-100 dark:border-neutral-700 text-text-light dark:text-white hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors active:scale-95 disabled:opacity-50"
                                disabled={pax <= 1}
                            >
                                <span className="material-symbols-outlined text-lg">remove</span>
                            </button>
                            <span className="font-display text-xl font-bold text-text-light dark:text-white w-12 text-center select-none">
                                {pax}
                            </span>
                            <button
                                onClick={() => setPax(Math.min(20, pax + 1))}
                                className="w-10 h-10 flex items-center justify-center bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-100 dark:border-neutral-700 text-text-light dark:text-white hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors active:scale-95 disabled:opacity-50"
                                disabled={pax >= 20}
                            >
                                <span className="material-symbols-outlined text-lg">add</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                    <button
                        onClick={handleSendInquiry}
                        className="w-full bg-[#C05D47] hover:bg-[#a64e3a] text-white font-bold py-4 rounded-xl shadow-xl shadow-primary/30 transform transition-all active:scale-[0.98] flex items-center justify-center space-x-2 group mb-3"
                    >
                        <span className="material-symbols-outlined">chat</span>
                        <span className="text-lg tracking-wide shadow-none border-none">Send Inquiry via WhatsApp</span>
                    </button>
                    <p className="text-center text-[11px] font-semibold text-text-light/50 dark:text-text-dark/50 uppercase tracking-widest">
                        Directly message the Tan family to secure your slot.
                    </p>
                </div>
            </div>
        </div>
    );
}
