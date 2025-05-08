// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         // Primary Colors
//         'primary': {
//           DEFAULT: '#09acb4',
//           light: '#0bc4cd',
//           dark: '#078a91',
//           hover: '#08a0a8',
//         },
//         'secondary': {
//           DEFAULT: '#05a1a8',
//           light: '#06b9c1',
//           dark: '#04858b',
//         },
        
//         // Neutral Colors
//         'gray': {
//           DEFAULT: '#7f7f7f',
//           light: '#a3a3a3',
//           dark: '#4a4a4a',
//           lighter: '#f3f4f6',
//           darker: '#1f2937',
//         },
        
//         // Text Colors
//         'text': {
//           primary: '#1f2937',
//           secondary: '#4b5563',
//           tertiary: '#6b7280',
//           light: '#9ca3af',
//           dark: '#111827',
//         },
        
//         // Background Colors
//         'bg': {
//           primary: '#ffffff',
//           secondary: '#f9fafb',
//           tertiary: '#f3f4f6',
//           dark: '#1f2937',
//         },
        
//         // Border Colors
//         'border': {
//           DEFAULT: '#e5e7eb',
//           light: '#f3f4f6',
//           dark: '#d1d5db',
//           primary: '#09acb4',
//         },
        
//         // Status Colors
//         'success': {
//           DEFAULT: '#10b981',
//           light: '#d1fae5',
//           dark: '#059669',
//         },
//         'error': {
//           DEFAULT: '#ef4444',
//           light: '#fee2e2',
//           dark: '#dc2626',
//         },
//         'warning': {
//           DEFAULT: '#f59e0b',
//           light: '#fef3c7',
//           dark: '#d97706',
//         },
//         'info': {
//           DEFAULT: '#3b82f6',
//           light: '#dbeafe',
//           dark: '#2563eb',
//         },
//       },
      
//       // Typography
//       fontSize: {
//         'xs': ['0.75rem', { lineHeight: '1rem' }],
//         'sm': ['0.875rem', { lineHeight: '1.25rem' }],
//         'base': ['1rem', { lineHeight: '1.5rem' }],
//         'lg': ['1.125rem', { lineHeight: '1.75rem' }],
//         'xl': ['1.25rem', { lineHeight: '1.75rem' }],
//         '2xl': ['1.5rem', { lineHeight: '2rem' }],
//         '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
//         '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
//         '5xl': ['3rem', { lineHeight: '1' }],
//         '6xl': ['3.75rem', { lineHeight: '1' }],
//       },
      
//       // Spacing
//       spacing: {
//         '4.5': '1.125rem',
//         '5.5': '1.375rem',
//         '6.5': '1.625rem',
//         '7.5': '1.875rem',
//         '8.5': '2.125rem',
//         '9.5': '2.375rem',
//         '10.5': '2.625rem',
//       },
      
//       // Border Radius
//       borderRadius: {
//         '4xl': '2rem',
//         '5xl': '2.5rem',
//       },
      
//       // Box Shadow
//       boxShadow: {
//         'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
//         'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
//         'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
//         'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
//         'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
//         '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
//         'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
//         'primary': '0 4px 6px -1px rgba(9, 172, 180, 0.1), 0 2px 4px -1px rgba(9, 172, 180, 0.06)',
//       },
      
//       // Animation
//       animation: {
//         'spin-slow': 'spin 3s linear infinite',
//         'bounce-slow': 'bounce 3s infinite',
//       },
      
//       // Transition
//       transitionDuration: {
//         '2000': '2000ms',
//         '3000': '3000ms',
//       },
//     },
//   },
//   plugins: [],
// }
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': {
          DEFAULT: '#09acb4',
          light: '#0bc4cd',
          dark: '#078a91',
          hover: '#08a0a8',
        },
        'secondary': {
          DEFAULT: '#05a1a8',
          light: '#06b9c1',
          dark: '#04858b',
        },
        
        // Neutral Colors
        'gray': {
          DEFAULT: '#7f7f7f',
          light: '#a3a3a3',
          dark: '#4a4a4a',
          lighter: '#f3f4f6',
          darker: '#1f2937',
        },
        
        // Text Colors
        'text': {
          primary: '#1f2937',
          secondary: '#4b5563',
          tertiary: '#6b7280',
          light: '#9ca3af',
          dark: '#111827',
        },
        
        // Background Colors
        'bg': {
          primary: '#ffffff',
          secondary: '#f9fafb',
          tertiary: '#f3f4f6',
          dark: '#1f2937',
        },
        
        // Border Colors
        'border': {
          DEFAULT: '#e5e7eb',
          light: '#f3f4f6',
          dark: '#d1d5db',
          primary: '#09acb4',
        },
        
        // Status Colors
        'success': {
          DEFAULT: '#10b981',
          light: '#d1fae5',
          dark: '#059669',
        },
        'error': {
          DEFAULT: '#ef4444',
          light: '#fee2e2',
          dark: '#dc2626',
        },
        'warning': {
          DEFAULT: '#f59e0b',
          light: '#fef3c7',
          dark: '#d97706',
        },
        'info': {
          DEFAULT: '#3b82f6',
          light: '#dbeafe',
          dark: '#2563eb',
        },
      },
      
      // Typography
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      
      // Spacing
      spacing: {
        '4.5': '1.125rem',
        '5.5': '1.375rem',
        '6.5': '1.625rem',
        '7.5': '1.875rem',
        '8.5': '2.125rem',
        '9.5': '2.375rem',
        '10.5': '2.625rem',
      },
      
      // Border Radius
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      
      // Box Shadow
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'primary': '0 4px 6px -1px rgba(9, 172, 180, 0.1), 0 2px 4px -1px rgba(9, 172, 180, 0.06)',
      },
      
      // Animation
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
      },
      
      // Transition
      transitionDuration: {
        '2000': '2000ms',
        '3000': '3000ms',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          /* IE and Edge */
          '-ms-overflow-style': 'none',
          /* Firefox */
          'scrollbar-width': 'none',
          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      })
    }
  ],
}