module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#4F46E5', hover: '#4338CA' },
        success: '#22C55E',
        danger: '#EF4444',
        warning: '#F59E0B',
        info: '#0EA5E9',
        text: '#0F172A',
        subtext: '#475569',
        border: '#E2E8F0',
        bg: '#F8FAFC',
        card: '#FFFFFF'
      },
      borderRadius: {
        md: '8px',
        sm: '6px',
        lg: '12px'
      },
      boxShadow: {
        sm: '0 1px 2px rgba(0,0,0,0.06)',
        md: '0 4px 12px rgba(0,0,0,0.08)',
        lg: '0 10px 25px rgba(0,0,0,0.12)'
      }
    },
  },
  plugins: [],
};
