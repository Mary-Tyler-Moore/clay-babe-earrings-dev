module.exports = {
  theme: {
    extend: {
      colors: {
        // palette generated with https://javisperez.github.io/tailwindcolorshades/#/?Tolopea=2b0447&tv=1
        "trendy-brand": {
          default: "#2b0447",
          "100": "#f5f5f5",
          "200": "#eeeeee",
          "300": "#e0e0e0",
          "400": "#bdbdbd",
          "500": "#9e9e9e",
          "600": "#757575",
          "700": "#616161",
          "800": "#424242",
          "900": "#2b0447",
        },
      },
      height: {
        "50vh": "50vh",
      },
      maxWidth: {
        "1/4": "25%",
        "1/3": "33%",
        "1/2": "50%",
        "3/4": "75%",
      },
    },
    fontFamily: {
      sans: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
      serif: ["Georgia", "Cambria"],
      mono: ["SFMono-Regular", "Menlo"],
      display: ["Oswald"],
      body: ["Helvetica Neue", "Open Sans"],
    },
  },
  variants: {},
  plugins: [],
};
