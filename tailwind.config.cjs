/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,jsx,tsx}",
  ],
  theme: {
    darkMode: "class",
    extend: {
      container: {

      },

      spacing: {
        'v_15px': "15px",
        'v_25px': "25px",
        'v_35px': "35px",
        'v_45px': "45px",
        'v_55px': "55px",
        'v_65px': "65px",
        'v_75px': "75px",
        'v_85px': "85px",
        'v_95px': "95px",
        'v_105px': "105px",
        'v_115px': "115px",
        'v_125px': "125px",

        // Precent
        'v_10%': "10%",
        'v_20%': "20%",
        'v_30%': "30%",
        'v_40%': "40%",
        'v_50%': "50%",
        'v_60%': "60%",
        'v_70%': "70%",
        'v_80%': "80%",
        'v_90%': "90%",
        'v_100%': "100%",
      },

      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
        '14': 'repeat(14, minmax(0, 1fr))',
        '15': 'repeat(15, minmax(0, 1fr))',
        '16': 'repeat(16, minmax(0, 1fr))',
        '17': 'repeat(17, minmax(0, 1fr))',
        '18': 'repeat(18, minmax(0, 1fr))',
        '19': 'repeat(19, minmax(0, 1fr))',
        '20': 'repeat(20, minmax(0, 1fr))',
        '21': 'repeat(21, minmax(0, 1fr))',
      },

      gridColumn: {
        'span-13': 'span 13 / span 13',
        'span-14': 'span 14 / span 14',
        'span-15': 'span 15 / span 15',
        'span-16': 'span 16 / span 16',
        'span-17': 'span 17 / span 17',
        'span-18': 'span 18 / span 18',
        'span-19': 'span 19 / span 19',
        'span-20': 'span 20 / span 20',
        'span-21': 'span 21 / span 21',
      },
    },

    fontSize: {
      v_10: '10px',
      v_11: '11px',
      v_12: '12px',
      v_13: '13px',
      v_14: '14px',
      v_15: '15px',
      v_16: '16px',
      v_17: '17px',
      v_18: '18px',
      v_19: '19px',
      v_20: '20px',
      v_21: '21px',
      v_22: '22px',
      v_23: '23px',
    },
    backgroundColor: {
      'dark': '#0f0f0f',
      "secoundry-dark":"#1b1b1b",
      "dark-300": "#121212",
      "dark-200": "#232323",

      //Whites
      "slate-10": "#fff"

    }
  },
  plugins: [require("daisyui")],
}
