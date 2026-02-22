import React, { useState } from 'react';

export default function SettingsModal({ isOpen, onClose }) {
    const [adminVisible, setAdminVisible] = useState(false);
    const [alertsEnabled, setAlertsEnabled] = useState(true);

    // Hidden Admin Mode State
    const [versionClicks, setVersionClicks] = useState(0);
    const [adminState, setAdminState] = useState('hidden'); // hidden, login, editing
    const [passwordInput, setPasswordInput] = useState('');
    const [newDateInput, setNewDateInput] = useState('');
    const [waNumberInput, setWaNumberInput] = useState('');
    const [showSuccessToast, setShowSuccessToast] = useState(false);

    // Reset state when modal closes
    React.useEffect(() => {
        if (!isOpen) {
            setVersionClicks(0);
            setAdminState('hidden');
            setPasswordInput('');
            setShowSuccessToast(false);
        }
    }, [isOpen]);

    const handleVersionClick = () => {
        const newCount = versionClicks + 1;
        setVersionClicks(newCount);
        if (newCount >= 5 && adminState === 'hidden') {
            setAdminState('login');
        }
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        if (passwordInput === 'thowkwang1965') {
            setAdminState('editing');
            // Check if there's an existing local override to pre-fill
            const existingDate = localStorage.getItem('admin_target_date');
            if (existingDate) {
                // Try to format it for the standard date input YYYY-MM-DD
                try {
                    const d = new Date(existingDate);
                    if (!isNaN(d.getTime())) {
                        setNewDateInput(d.toISOString().split('T')[0]);
                    }
                } catch (e) { }
            }

            // pre-fill WhatsApp number
            const existingWa = localStorage.getItem('thowkwang_wa_number');
            setWaNumberInput(existingWa || '6562655808');
        } else {
            alert('Incorrect Password');
        }
    };

    const handleDateSave = (e) => {
        e.preventDefault();
        if (!newDateInput || !waNumberInput) return;

        // Save to LocalStorage
        localStorage.setItem('admin_target_date', newDateInput);
        localStorage.setItem('thowkwang_wa_number', waNumberInput);

        // Dispatch custom event to update the hook in the current tab instantly
        window.dispatchEvent(new Event('local-target-update'));

        // Show toast
        setShowSuccessToast(true);
        setTimeout(() => {
            setShowSuccessToast(false);
            onClose();
        }, 2000);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity p-4">
            <div className="bg-white dark:bg-neutral-900 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
                <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 dark:border-neutral-800">
                    <h2 className="font-display text-xl font-bold text-text-light dark:text-white">
                        {adminState === 'hidden' ? 'Settings' : 'Secret Admin Panel'}
                    </h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* Main Content Area */}
                <div className="relative">
                    {/* Toast Notification */}
                    <div className={`absolute top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 pointer-events-none ${showSuccessToast ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                        <div className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg font-bold text-sm whitespace-nowrap flex items-center gap-2">
                            <span className="material-symbols-outlined text-[18px]">check_circle</span>
                            Dragon Kiln Firing date updated successfully!
                        </div>
                    </div>

                    {adminState === 'hidden' && (
                        <div className="p-6 space-y-6">
                            {/* Notifications Setting */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 rounded-full bg-primary/10 text-primary">
                                        <span className="material-symbols-outlined">notifications_active</span>
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm text-text-light dark:text-text-dark">Firing Alerts</p>
                                        <p className="text-xs text-text-light/60 dark:text-text-dark/60">Get notified when a new date is set</p>
                                    </div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={alertsEnabled}
                                        onChange={(e) => setAlertsEnabled(e.target.checked)}
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                                </label>
                            </div>

                            {/* Theme Placeholder */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 rounded-full bg-primary/10 text-primary">
                                        <span className="material-symbols-outlined">dark_mode</span>
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm text-text-light dark:text-text-dark">App Theme</p>
                                        <p className="text-xs text-text-light/60 dark:text-text-dark/60">Follow system settings</p>
                                    </div>
                                </div>
                                <span className="text-xs font-semibold px-2 py-1 bg-surface-light dark:bg-surface-dark rounded text-text-light dark:text-text-dark">Auto</span>
                            </div>

                            <hr className="border-neutral-100 dark:border-neutral-800" />

                            {/* Admin Section Toggle */}
                            <button
                                onClick={() => setAdminVisible(!adminVisible)}
                                className="w-full flex items-center justify-between text-left group"
                            >
                                <span className="text-sm font-semibold text-text-light/50 dark:text-text-dark/50 group-hover:text-primary transition-colors">Advanced Options</span>
                                <span className="material-symbols-outlined text-text-light/50 dark:text-text-dark/50 transition-transform duration-300" style={{ transform: adminVisible ? 'rotate(180deg)' : 'rotate(0deg)' }}>expand_more</span>
                            </button>

                            {/* Admin Info Content */}
                            {adminVisible && (
                                <div className="p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 rounded-xl mt-2 animate-in slide-in-from-top-2 fade-in duration-200">
                                    <div className="flex items-start space-x-2">
                                        <span className="material-symbols-outlined text-amber-600 dark:text-amber-500 text-lg mt-0.5">admin_panel_settings</span>
                                        <div>
                                            <h4 className="text-sm font-bold text-amber-800 dark:text-amber-400 mb-1">Admin Info</h4>
                                            <p className="text-xs text-amber-700 dark:text-amber-300/80 leading-relaxed">
                                                To update the countdown target, please edit <strong>Cell A1</strong> in the linked Google Sheet.
                                                Changes will reflect automatically when users reload the app.
                                            </p>
                                            <a
                                                href="https://docs.google.com/spreadsheets/d/e/2PACX-1vT2V7zWjD_qP7d9f7gP_I8vT2V7zWjD_qP7d9f7gP/pubhtml"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center mt-2 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline"
                                            >
                                                Open Google Sheet <span className="material-symbols-outlined text-[14px] ml-1">open_in_new</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Secret Admin Login View */}
                    {adminState === 'login' && (
                        <div className="p-6 space-y-6 animate-in slide-in-from-right-4 fade-in duration-300">
                            <form onSubmit={handleLoginSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-text-light dark:text-text-dark mb-2">Admin Password</label>
                                    <input
                                        type="password"
                                        value={passwordInput}
                                        onChange={(e) => setPasswordInput(e.target.value)}
                                        className="w-full bg-surface-light dark:bg-surface-dark border border-neutral-200 dark:border-neutral-700 rounded-xl px-4 py-3 text-text-light dark:text-text-dark focus:outline-none focus:border-primary transition-colors"
                                        placeholder="Enter password..."
                                        autoFocus
                                    />
                                </div>
                                <button type="submit" className="w-full bg-[#C05D47] hover:bg-[#a64e3a] text-white font-bold py-3 rounded-xl transition-colors">
                                    Authenticate
                                </button>
                            </form>
                        </div>
                    )}

                    {/* Secret Admin Date Picker View */}
                    {adminState === 'editing' && (
                        <div className="p-6 space-y-6 animate-in slide-in-from-right-4 fade-in duration-300">
                            <form onSubmit={handleDateSave} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-text-light dark:text-text-dark mb-2">Next Dragon Kiln Firing</label>
                                    <input
                                        type="date"
                                        value={newDateInput}
                                        onChange={(e) => setNewDateInput(e.target.value)}
                                        className="w-full bg-surface-light dark:bg-surface-dark border border-neutral-200 dark:border-neutral-700 rounded-xl px-4 py-3 text-text-light dark:text-text-dark focus:outline-none focus:border-primary transition-colors [&::-webkit-calendar-picker-indicator]:dark:invert"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-text-light dark:text-text-dark mb-1">WhatsApp Booking Number</label>
                                    <p className="text-xs text-text-light/60 dark:text-text-dark/60 mb-2">Include country code without the + sign</p>
                                    <div className="flex space-x-2">
                                        <input
                                            type="tel"
                                            value={waNumberInput}
                                            onChange={(e) => setWaNumberInput(e.target.value.replace(/[^0-9]/g, ''))}
                                            placeholder="e.g., 6562655808"
                                            className="w-full bg-surface-light dark:bg-surface-dark border border-neutral-200 dark:border-neutral-700 rounded-xl px-4 py-3 text-text-light dark:text-text-dark focus:outline-none focus:border-primary transition-colors font-mono"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => window.open(`https://wa.me/${waNumberInput}`, '_blank')}
                                            className="shrink-0 px-4 py-3 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-xl text-sm font-bold text-text-light dark:text-white transition-colors flex items-center justify-center border border-neutral-200 dark:border-neutral-700"
                                            title="Test this WhatsApp number"
                                        >
                                            <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                                        </button>
                                    </div>
                                </div>

                                <button type="submit" className="w-full bg-[#C05D47] hover:bg-[#a64e3a] text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-primary/20">
                                    Save & Update
                                </button>
                            </form>
                        </div>
                    )}

                </div> {/* End relative wrapper */}

                {/* Footer with Secret Trigger */}
                {adminState === 'hidden' && (
                    <div className="px-6 py-3 border-t border-neutral-100 dark:border-neutral-800 text-center">
                        <span
                            onClick={handleVersionClick}
                            className="text-[10px] font-bold tracking-widest text-text-light/30 dark:text-text-dark/30 select-none"
                        >
                            v1.0.0
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}
