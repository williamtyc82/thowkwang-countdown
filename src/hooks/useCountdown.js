import { useState, useEffect } from 'react';

/**
 * Custom hook to calculate the remaining time until a target date.
 */
export function useCountdown(targetDateStr) {
    const [timeRemaining, setTimeRemaining] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });
    const [isZero, setIsZero] = useState(false);

    useEffect(() => {
        if (!targetDateStr) return;

        const targetDate = new Date(targetDateStr).getTime();

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference <= 0) {
                clearInterval(interval);
                setIsZero(true);
                setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            } else {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                setTimeRemaining({ days, hours, minutes, seconds });
                setIsZero(false);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDateStr]);

    return { ...timeRemaining, isZero };
}
