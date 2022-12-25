/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    // backgroundImage: {
    //   'home': "url('/src/assets/imgs/front-view-tasty-meat-burger-with-cheese-salad-dark-background.jpg')"
    // },
    screens: {
      '2xl': {'max': '1400px'},
      'xl': {'max': '1279px'},
      '2lg': {'max': '859px'},
      'lg': {'max': '1023px'},
      'md': {'max': '767px'},
      'sm': {'max': '419px'},
    },
    extend: {
      colors:{
        transparent: 'transparent',
        current: 'currentColor',
        'maintext':'#576574',
        'text2':'#dfe6e9',
        'maincolor':'#ff5e57',
        'footercolor':'#ffeae3',
      },
      display: ["group-hover"],
      keyframes: {
        fade: {
          'from': { bottom:'50px' },
          'to': { bottom: '32px' },
        },
        // showForm: {
        //   'from': { top:'30%' },
        //   'to': { top: '50%' },
        // },
        // fadeInfo:{
        //   'from': { opacity:'0' },
        //   'to': { opacity: '1' },
        // },
        // fadeNav:{
        //   'from': { width: '0' },
        //   'to': { width: '300px' },
        // }
      },
      animation: {
        'fadeBtn': 'fade 0.3s linear',
        // 'showLogin':'showForm 0.3s ease-out',
        // 'fadeinfo': 'fadeInfo 0.3s linear',
        // 'fadenav': 'fadeNav 0.3s ease-out'
      },
    },
  },
  plugins: [
    
  ],
}