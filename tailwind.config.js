/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        /* Culorile tale oficiale din paletă */
        "royal-purple": "#5A2D82", // Primary
        "plum": "#8E44AD",         // Secondary
        "gold": "#F4C542",         // Accent
        "cream": "#FAF7F2",        // Background
        "dark-charcoal": "#2B2B2B",// Text

        /* * Alias-uri de sistem.
         * Le folosim ca să nu se strice clasele de HTML pe care 
         * le-am scris deja (ex: bg-primary, text-accent) 
         */
        "primary": "#5A2D82",      
        "secondary": "#8E44AD",    
        "accent": "#F4C542",       
        
        "background": "#FAF7F2",   
        "bgdark": "#FAF7F2",       
        
        "surface": "#FFFFFF",      // Alb pur pentru cardurile de deasupra fundalului
        
        "text-main": "#2B2B2B",    
        "textlight": "#2B2B2B",    
      },
      fontFamily: {
        "display": ["Manrope", "sans-serif"],
        "body": ["Inter", "sans-serif"]
      }
    },
  },
  plugins: [],
}