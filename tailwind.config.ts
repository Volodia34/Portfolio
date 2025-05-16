// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            colors: {
            },
            animation: {
                'blink-cursor': 'blinkCursor 0.75s infinite',
                'pulse-slow': 'pulseSlow 8s infinite ease-in-out',
                'pulse-slower': 'pulseSlow 10s 2s infinite ease-in-out',
                'bounce-slow': 'bounceSlow 2.5s infinite ease-in-out',
            },
            keyframes: {
                blinkCursor: {
                    '0%, 100%': { borderColor: 'transparent' },
                    '50%': { borderColor: '#67e8f9' },
                },
                pulseSlow: {
                    '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
                    '50%': { opacity: '0.8', transform: 'scale(1.05)' },
                },
                bounceSlow: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                }
            }
        },
    },
    plugins: [],
}
export default config
