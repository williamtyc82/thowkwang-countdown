import React, { useState } from 'react';
import kilnFacts from '../data/kilnFacts.json';

export default function KilnSecrets() {
    const [selectedFact, setSelectedFact] = useState(null);

    // Lock body scroll when modal is open
    React.useEffect(() => {
        if (selectedFact) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [selectedFact]);

    return (
        <>
            <section className="px-6 mb-10">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-display text-[26px] font-bold text-text-light dark:text-text-dark tracking-tight">
                        Kiln Secrets
                    </h3>
                    <a href="#" className="text-primary text-[14px] font-semibold flex items-center group transition-all duration-300 hover:opacity-80">
                        VIEW ALL
                        <span className="material-symbols-outlined text-[18px] ml-1 transition-transform duration-300 ease-out group-hover:translate-x-1.5">
                            arrow_right_alt
                        </span>
                    </a>
                </div>

                <div className="flex space-x-6 overflow-x-auto no-scrollbar pb-10 pt-2 snap-x snap-mandatory -mx-6 px-6">
                    {kilnFacts.map((fact) => (
                        <div
                            key={fact.id}
                            onClick={() => setSelectedFact(fact)}
                            className="snap-center shrink-0 w-[290px] h-[420px] rounded-[1.75rem] overflow-hidden relative group bg-surface-dark transition-all duration-[400ms] ease-out shadow-[0_12px_24px_-10px_rgba(0,0,0,0.15)] hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.25)] hover:-translate-y-2 cursor-pointer border border-white/5"
                        >
                            <img
                                src={fact.imageUrl}
                                alt={fact.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                                loading="lazy"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent/10 pointer-events-none transition-opacity duration-500"></div>

                            <div className="absolute bottom-0 left-0 p-7 pointer-events-none w-full flex flex-col justify-end h-full">
                                <div className="transform transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] translate-y-4 group-hover:translate-y-0">
                                    <h4 className="font-display text-[24px] text-white font-bold leading-[1.15] mb-3 drop-shadow-lg tracking-tight">
                                        {fact.title}
                                    </h4>
                                    <p className="text-white/80 text-[14px] leading-[1.65] line-clamp-3 font-body opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                        {fact.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Premium Modal Popup */}
            {selectedFact && (
                <div
                    className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-300"
                    onClick={() => setSelectedFact(null)}
                >
                    <div
                        className="w-full sm:max-w-[520px] bg-[#fdfbf7] dark:bg-[#1a1814] sm:rounded-[2rem] rounded-t-[2rem] rounded-b-none overflow-hidden relative animate-in slide-in-from-bottom-10 sm:zoom-in-95 duration-400 ease-[cubic-bezier(0.2,0.8,0.2,1)] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] border border-white/10 dark:border-white/5 flex flex-col max-h-[90vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setSelectedFact(null)}
                            className="absolute top-5 right-5 z-20 bg-black/30 hover:bg-black/60 backdrop-blur-xl text-white rounded-full w-9 h-9 flex items-center justify-center transition-all duration-300 focus:outline-none hover:scale-105 border border-white/20"
                            aria-label="Close modal"
                        >
                            <span className="material-symbols-outlined text-[20px]">close</span>
                        </button>

                        <div className="h-[35vh] sm:h-[320px] w-full relative shrink-0">
                            <img
                                src={selectedFact.imageUrl}
                                alt={selectedFact.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#fdfbf7] dark:from-[#1a1814] via-transparent to-black/30"></div>
                        </div>

                        <div className="px-8 pb-10 pt-2 relative z-10 overflow-y-auto no-scrollbar -mt-6">
                            <h3 className="font-display text-[32px] sm:text-[36px] font-bold mb-5 text-[#2d241e] dark:text-[#f3efea] tracking-tight leading-[1.1]">
                                {selectedFact.title}
                            </h3>
                            <p className="text-[#594e45] dark:text-[#c4b9b0] text-[16px] sm:text-[17px] leading-[1.8] font-body font-medium">
                                {selectedFact.description}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
