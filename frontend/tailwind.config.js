export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                // Paleta personalizada
                primary: {
                50:  '#eff6ff',
                100: '#e0edff',
                200: '#bfdbfe',
                300: '#9ec5ff',
                400: '#60a5fa',
                500: '#3b82f6',
                600: '#2563eb',
                700: '#1d4ed8',
                800: '#001C63',
                900: '#150063',
                },
                secondary: '#004E63',
                neutral: '#fffae0',
            },
        },
    },
    plugins: [],
};
