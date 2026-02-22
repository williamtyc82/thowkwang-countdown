import React from 'react';

function TimeUnit({ value, label }) {
    const paddedValue = String(value).padStart(2, '0');

    return (
        <div className="flex flex-col items-center">
            <span className="font-display text-4xl font-bold text-primary tabular-nums tracking-tighter transition-all duration-300">
                {paddedValue}
            </span>
            <span className="text-xs uppercase tracking-wide opacity-60 mt-1">{label}</span>
        </div>
    );
}

export default function CountdownDisplay({ targetDate, loading, isZero, days, hours, minutes, seconds }) {
    return (
        <section className="relative px-6 py-8">
            <div className="text-center mb-8">
                <h2 className="font-display text-3xl font-bold mb-2 text-primary dark:text-white leading-tight">Singapore's Oldest Dragon Kiln</h2>
                <div className="h-1 w-24 bg-primary mx-auto rounded-full mb-3 opacity-60"></div>
                <p className="text-sm uppercase tracking-widest text-text-light/80 dark:text-text-dark/80 font-semibold">Preserving the Fire Since 1965</p>
            </div>

            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 shadow-lg border border-white/50 dark:border-white/5 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>

                <div className="relative z-10 text-center">
                    {loading ? (
                        <div className="animate-pulse flex flex-col items-center py-6">
                            <div className="h-4 bg-primary/20 rounded w-48 mb-6"></div>
                            <div className="flex space-x-6">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="h-12 w-12 bg-primary/20 rounded-lg"></div>
                                ))}
                            </div>
                            <div className="h-3 bg-primary/20 rounded w-32 mt-6"></div>
                        </div>
                    ) : isZero ? (
                        <div className="py-8 animate-in fade-in zoom-in duration-500">
                            <span className="material-symbols-outlined text-6xl text-primary mb-4 animate-bounce">local_fire_department</span>
                            <h3 className="font-display text-2xl md:text-3xl font-bold text-primary mb-2">The Dragon is Breathing!</h3>
                            <p className="text-lg text-text-light dark:text-text-dark opacity-90">Visit us now to witness the firing.</p>
                        </div>
                    ) : (
                        <>
                            <p className="font-display text-lg italic text-text-light dark:text-text-dark mb-6">"Watch the flames breathe life into clay"</p>

                            <div className="flex justify-center items-center space-x-3 md:space-x-4 mb-4">
                                <TimeUnit value={days} label="Days" />
                                <span className="text-2xl text-accent-light dark:text-accent-dark font-display self-start mt-1">:</span>
                                <TimeUnit value={hours} label="Hours" />
                                <span className="text-2xl text-accent-light dark:text-accent-dark font-display self-start mt-1">:</span>
                                <TimeUnit value={minutes} label="Mins" />
                                <span className="text-2xl text-accent-light dark:text-accent-dark font-display self-start mt-1">:</span>
                                <TimeUnit value={seconds} label="Secs" />
                            </div>

                            <p className="text-sm font-medium opacity-70 mt-6">Until the next Dragon Kiln Firing</p>
                            <p className="text-xs opacity-50 mt-1">Target: {targetDate}</p>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}
