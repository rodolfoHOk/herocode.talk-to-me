import type { Config } from 'tailwindcss';

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
        'app-gray-100': '#D7D7D7',
        'app-gray-200': '#A8A8A8',
        'app-gray-300': '#A0AEC0',
        'app-gray-500': '#4E4E4E',
        'app-gray-600': '#2E2E2E',
        'app-gray-700': '#2C2C2C',
        'app-gray-800': '#212121',
        'app-gray-900': '#1B212D',
        'app-gray-950': '#0F0F0F',
        'app-cyan-500': '#81E6D9',
        'app-pink-500': '#C636EA',
        'app-white': '#FFFFFF',
      },
    },
  },
  plugins: [],
};
export default config;
