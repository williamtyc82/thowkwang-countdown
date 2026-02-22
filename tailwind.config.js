/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: "#C05640", // Terracotta
                "primary-dark": "#9A3E2D",
                "background-light": "#FDFBF7", // Cream
                "background-dark": "#1F1D1B", // Dark warm grey
                "surface-light": "#F4EFE6",
                "surface-dark": "#2D2A28",
                "text-light": "#4A403A",
                "text-dark": "#E5DCD5",
                "accent-light": "#D4C5B0",
                "accent-dark": "#5C544D",
            },
            fontFamily: {
                display: ["Playfair Display", "serif"],
                body: ["Lato", "sans-serif"],
            },
            borderRadius: {
                DEFAULT: "12px",
                'xl': "1rem",
                '2xl': "1.5rem",
            },
            animation: {
                shimmer: 'shimmer 2s linear infinite',
            },
            keyframes: {
                shimmer: {
                    from: { backgroundPosition: '200% 0' },
                    to: { backgroundPosition: '-200% 0' },
                }
            }
        },
    },
    plugins: [],
}
