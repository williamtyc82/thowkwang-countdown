import React, { useState } from 'react';
import Header from './components/Header';
import CountdownDisplay from './components/CountdownDisplay';
import KilnSecrets from './components/KilnSecrets';
import SettingsModal from './components/SettingsModal';
import BookingBottomSheet from './components/BookingBottomSheet';
import { useTargetDate } from './hooks/useTargetDate';
import { useCountdown } from './hooks/useCountdown';

function App() {
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [globalNotify, setGlobalNotify] = useState(true);
    const { targetDate, loading } = useTargetDate();
    const { days, hours, minutes, seconds, isZero } = useCountdown(targetDate);

    const handleWorkshopClick = () => {
        setIsBookingOpen(true);
    };

    return (
        <div className="bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark font-body antialiased min-h-screen flex flex-col transition-colors duration-300">
            <Header onOpenSettings={() => setSettingsOpen(true)} />

            <main className="flex-grow overflow-y-auto no-scrollbar pb-24">
                <CountdownDisplay
                    targetDate={targetDate}
                    loading={loading}
                    isZero={isZero}
                    days={days}
                    hours={hours}
                    minutes={minutes}
                    seconds={seconds}
                />

                {/* Existing Notification Banner styled from code.html */}
                <section className="px-6 mb-10">
                    <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 flex items-center justify-between shadow-sm border border-neutral-100 dark:border-neutral-700">
                        <div className="flex items-center space-x-3">
                            <span className="material-symbols-outlined text-primary">notifications_active</span>
                            <div>
                                <p className="font-bold text-sm">Notify Me</p>
                                <p className="text-xs opacity-60">Get alerts for firing dates</p>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={globalNotify}
                                onChange={(e) => setGlobalNotify(e.target.checked)}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                        </label>
                    </div>
                </section>

                <KilnSecrets />

                {/* Closing Quote from code.html */}
                <section className="px-6 mb-8">
                    <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 border-l-4 border-primary shadow-sm">
                        <span className="material-symbols-outlined text-primary mb-2 text-3xl">format_quote</span>
                        <p className="font-display italic text-lg leading-relaxed mb-4">
                            Experience Singapore's oldest surviving dragon kiln, conducting educational tours and workshops since 2001.
                        </p>
                        <div className="flex items-center space-x-3">
                            <div className="h-px w-8 bg-current opacity-30"></div>
                            <p className="text-xs font-bold uppercase tracking-widest opacity-60">Tan Family</p>
                        </div>
                    </div>
                </section>
            </main>

            {/* Floating Action Button from code.html */}
            <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background-light via-background-light to-transparent dark:from-background-dark dark:via-background-dark pointer-events-none z-40">
                <button
                    onClick={handleWorkshopClick}
                    className="pointer-events-auto w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl shadow-xl shadow-primary/30 transform transition-all active:scale-[0.98] flex items-center justify-center space-x-2 group"
                >
                    <span className="material-symbols-outlined group-hover:animate-bounce">calendar_month</span>
                    <span className="text-lg tracking-wide">Book a Workshop</span>
                </button>
            </div>

            <SettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
            <BookingBottomSheet isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
        </div>
    );
}

export default App;
