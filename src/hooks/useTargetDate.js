import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';

const GOOGLE_SHEETS_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vT2V7zWjD_qP7d9f7gP_I8vT2V7zWjD_qP7d9f7gP/pub?output=csv"; // Placeholder url
const DEFAULT_FALLBACK_DATE = "May 15, 2026";

/**
 * Custom hook to manage fetching the target countdown date.
 */
export function useTargetDate(sheetUrl = GOOGLE_SHEETS_CSV_URL) {
    const [targetDate, setTargetDate] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkAndSetLocalOverride = () => {
        const localDate = localStorage.getItem('admin_target_date');
        if (localDate) {
            setTargetDate(localDate);
            setLoading(false);
            return true;
        }
        return false;
    };

    useEffect(() => {
        // 1. Listen for cross-tab storage changes
        const handleStorageChange = (e) => {
            if (e.key === 'admin_target_date') {
                checkAndSetLocalOverride();
            }
        };

        // 2. Listen for same-tab custom events
        const handleLocalSync = () => {
            checkAndSetLocalOverride();
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('local-target-update', handleLocalSync);

        // 3. Initial fetch logic
        async function fetchDate() {
            // Priority 1: Local Admin Override
            if (checkAndSetLocalOverride()) {
                return;
            }

            // Priority 2: Google Sheets Live Data
            try {
                Papa.parse(sheetUrl, {
                    download: true,
                    header: false,
                    complete: (results) => {
                        let fetchedDate = null;
                        if (results && results.data && results.data.length > 0 && results.data[0].length > 0) {
                            fetchedDate = results.data[0][0];
                        }

                        if (!fetchedDate || isNaN(new Date(fetchedDate).getTime())) {
                            console.warn("Invalid or missing date in Google Sheets. Using fallback.");
                            setTargetDate(DEFAULT_FALLBACK_DATE);
                        } else {
                            setTargetDate(fetchedDate);
                        }
                        setLoading(false);
                    },
                    error: (error) => {
                        console.error("Error parsing Google Sheets data:", error);
                        setTargetDate(DEFAULT_FALLBACK_DATE);
                        setLoading(false);
                    }
                });
            } catch (error) {
                console.error("Fetch failed:", error);
                setTargetDate(DEFAULT_FALLBACK_DATE);
                setLoading(false);
            }
        }

        fetchDate();

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('local-target-update', handleLocalSync);
        };
    }, [sheetUrl]);

    return { targetDate, loading };
}
