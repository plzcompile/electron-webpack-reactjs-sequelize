// tailwind.config.js
module.exports = {
  theme: {
   fontSize: {
     'xs': '.75rem',
     'sm': '.875rem',
     'tiny': '.875rem',
     'base': '1rem',
     'lg': '1.125rem',
     'xl': '1.25rem',
     '2xl': '1.5rem',
     '3xl': '1.875rem',
     '4xl': '2.25rem',
     '5xl': '3rem',
     '6xl': '4rem',
     '7xl': '5rem',
     '8xl': '6rem',
   },
   screens: {
     xs: '400px',
     sm: '640px',
     md: '768px',
     lg: '1024px',
     xl: '1280px',
     xxl: '1920px',
   },
   fontFamily: {
     display: ['Gilroy', 'sans-serif'],
     body: ['Graphik', 'sans-serif']
   },
   borderWidth: {
     default: '1px',
     '0': '0',
     '2': '2px',
     '4': '4px',
   },
   extend: {
     colors: {
       cyan: '#9cdbff',
     },
     spacing: {
       '96': '24rem',
       '128': '32rem',
     }
   }
 },
 purge: [
   // Use *.tsx if using TypeScript
   './src/**/*.js'
 ],
 variants: {
   backgroundColor: ['responsive', 'hover', 'focus', 'active'],
   textColor: ['responsive', 'hover', 'focus', 'group-hover', 'active'],
   borderColor: ['responsive', 'hover', 'focus', 'focus-within', 'active'],
   translate: ['responsive', 'hover', 'focus', 'motion-safe'],
   border: ['responsive', 'hover', 'focus', 'focus-within', 'active'],
 },

 }