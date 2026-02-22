import React from 'react';

export default function Header({ onOpenSettings }) {
    return (
        <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-accent-light/30 dark:border-accent-dark/30 shadow-sm">
            <div className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <img src="/logo.png" alt="Thow Kwang Logo" className="w-10 h-10 rounded-full object-cover shadow-md" />
                    <div>
                        <h1 className="font-display font-bold text-lg leading-tight text-primary">Thow Kwang</h1>
                        <p className="text-xs uppercase tracking-widest opacity-70">Pottery Jungle</p>
                    </div>
                </div>
                <button
                    onClick={onOpenSettings}
                    className="p-2 rounded-full hover:bg-surface-light dark:hover:bg-surface-dark transition-colors"
                    aria-label="Settings"
                >
                    <span className="material-symbols-outlined">settings</span>
                </button>
            </div>
        </header>
    );
}
