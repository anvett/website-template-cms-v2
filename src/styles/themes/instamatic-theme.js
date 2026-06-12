import defaultTheme from "./default-theme";

const instamaticTheme = {
  ...defaultTheme,
  id: "instamatic",
  label: "Instamatic Theme",

  colors: {
    ...defaultTheme.colors,
    brandPrimary: "#11418A",
    brandSecondary: "#193C7E",
    brandAccent: "#FEC917",

    bgBase: "#11418A",
    bgSubtle: "#F8FAFC",
    bgMuted: "#EAF1FB",
    bgStrong: "#193C7E",

    textBase: "#193C7E",
    textMuted: "#4B5F82",
    textInverse: "#FFFFFF",
    textAccent: "#0066CC",

    borderBase: "#D6E2F5",
    borderStrong: "#11418A",
  },

  fonts: {
    ...defaultTheme.fonts,
    heading: "var(--font-merriweather), serif",
    body: "var(--font-inter), sans-serif",
  },
};

export default instamaticTheme;
