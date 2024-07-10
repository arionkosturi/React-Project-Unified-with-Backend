const { mauve, violet, red, blackA, slate } = require('@radix-ui/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                ...mauve,
                ...violet,
                ...red,
                ...slate,
                ...blackA,
                warning: 'hsl(var(--warning))',
                'warning-foreground': 'hsl(var(--warning-foreground))',
            },
            keyframes: {
                hide: {
                    from: { opacity: '1' },
                    to: { opacity: '0' },
                },
                slideIn: {
                    from: {
                        transform:
                            'translateX(calc(100% + var(--viewport-padding)))',
                    },
                    to: { transform: 'translateX(0)' },
                },
                swipeOut: {
                    from: {
                        transform: 'translateX(var(--radix-toast-swipe-end-x))',
                    },
                    to: {
                        transform:
                            'translateX(calc(100% + var(--viewport-padding)))',
                    },
                },
                overlayShow: {
                    from: { opacity: '0' },
                    to: { opacity: '1' },
                },
                contentShow: {
                    from: {
                        opacity: '0',
                        transform: 'translate(-50%, -48%) scale(0.96)',
                    },
                    to: {
                        opacity: '1',
                        transform: 'translate(-50%, -50%) scale(1)',
                    },
                },
            },
            animation: {
                hide: 'hide 100ms ease-in',
                slideIn: 'slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1)',
                swipeOut: 'swipeOut 100ms ease-out',
                overlayShow: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
                contentShow: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
            },
        },
    },
    plugins: [require('tailwindcss-animate')],
};
