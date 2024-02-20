import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

// export const tokens = (mode) => ({
//   ...(mode == "dark"
//     ? {
//         grey_old: {
//           100: "#e0e0e0",
//           200: "#c2c2c2",
//           300: "#a3a3a3",
//           400: "#858585",
//           500: "#666666",
//           600: "#525252",
//           700: "#3d3d3d",
//           800: "#292929",
//           900: "#141414",
//         },
//         grey: {
//           // 100: "#d9dde2",
//           100: "#41546e",
//           200: "#b3bbc5",
//           300: "#8d98a8",
//           400: "#67768b",
//           500: "#41546e",
//           600: "#344358",
//           700: "#273242",
//           800: "#1a222c",
//           900: "#0d1116",
//         },
//         primary: {
//           100: "#d0d1d5",
//           200: "#a1a4ab",
//           300: "#727681",
//           400: "#1f2a40",
//           500: "#141b2d",
//           600: "#101624",
//           700: "#0c101b",
//           800: "#080b12",
//           900: "#040509",
//         },
//         greenAccent: {
//           100: "#dbf5ee",
//           200: "#b7ebde",
//           300: "#94e2cd",
//           400: "#70d8bd",
//           500: "#4cceac",
//           600: "#3da58a",
//           700: "#2e7c67",
//           800: "#1e5245",
//           900: "#0f2922",
//         },
//         redAccent: {
//           100: "#f8dcdb",
//           200: "#f1b9b7",
//           300: "#e99592",
//           400: "#e2726e",
//           500: "#db4f4a",
//           600: "#af3f3b",
//           700: "#832f2c",
//           800: "#58201e",
//           900: "#2c100f",
//         },
//         blueAccent: {
//           100: "#e1e2fe",
//           200: "#c3c6fd",
//           300: "#a4a9fc",
//           400: "#868dfb",
//           500: "#6870fa",
//           600: "#535ac8",
//           700: "#3e4396",
//           800: "#2a2d64",
//           900: "#151632",
//         },
//       }
//     : {
//         grey: {
//           100: "#141414",
//           200: "#292929",
//           300: "#3d3d3d",
//           400: "#525252",
//           500: "#666666",
//           600: "#858585",
//           700: "#a3a3a3",
//           800: "#c2c2c2",
//           900: "#e0e0e0",
//         },
//         primary: {
//           100: "#040509",
//           200: "#080b12",
//           300: "#0c101b",
//           400: "#f2f0f0",
//           500: "#141b2d",
//           600: "#434957",
//           700: "#727681",
//           800: "#a1a4ab",
//           900: "#d0d1d5",
//         },
//         greenAccent: {
//           100: "#0f2922",
//           200: "#1e5245",
//           300: "#2e7c67",
//           400: "#3da58a",
//           500: "#4cceac",
//           600: "#70d8bd",
//           700: "#94e2cd",
//           800: "#b7ebde",
//           900: "#dbf5ee",
//         },
//         redAccent: {
//           100: "#2c100f",
//           200: "#58201e",
//           300: "#832f2c",
//           400: "#af3f3b",
//           500: "#db4f4a",
//           600: "#e2726e",
//           700: "#e99592",
//           800: "#f1b9b7",
//           900: "#f8dcdb",
//         },
//         blueAccent: {
//           100: "#151632",
//           200: "#2a2d64",
//           300: "#3e4396",
//           400: "#535ac8",
//           500: "#6870fa",
//           600: "#868dfb",
//           700: "#a4a9fc",
//           800: "#c3c6fd",
//           900: "#e1e2fe",
//         },
//       }),
// });

export const tokens = (mode) => ({
  ...(mode == "dark"
    ? {
        grey_old: {
          100: "#e0e0e0",
          200: "#c2c2c2",
          300: "#a3a3a3",
          400: "#858585",
          500: "#666666",
          600: "#525252",
          700: "#3d3d3d",
          800: "#292929",
          900: "#141414",
        },
        grey: {
          100: "#d9dde2",
          // 100: "#41546e",
          200: "#b3bbc5",
          300: "#8d98a8",
          400: "#67768b",
          500: "#41546e",
          600: "#344358",
          700: "#273242",
          800: "#1a222c",
          900: "#0d1116",
        },
        primary: {
          100: "#e3e9f0",
          200: "#c7d2e2",
          300: "#aabcd3",
          400: "#8ea5c5",
          500: "#728fb6",
          600: "#5b7292",
          700: "#44566d",
          800: "#2e3949",
          900: "#171d24",
        },
        primary_old: {
          100: "#d0d1d5",
          200: "#a1a4ab",
          300: "#727681",
          400: "#1f2a40",
          500: "#141b2d",
          600: "#101624",
          700: "#0c101b",
          800: "#080b12",
          900: "#040509",
        },
        greenAccent: {
          100: "#dbf5ee",
          200: "#b7ebde",
          300: "#94e2cd",
          400: "#70d8bd",
          500: "#4cceac",
          600: "#3da58a",
          700: "#2e7c67",
          800: "#1e5245",
          900: "#0f2922",
        },
        redAccent: {
          100: "#f8dcdb",
          200: "#f1b9b7",
          300: "#e99592",
          400: "#e2726e",
          500: "#db4f4a",
          600: "#af3f3b",
          700: "#832f2c",
          800: "#58201e",
          900: "#2c100f",
        },
        blueAccent: {
          100: "#e1e2fe",
          200: "#c3c6fd",
          300: "#a4a9fc",
          400: "#868dfb",
          500: "#6870fa",
          600: "#535ac8",
          700: "#3e4396",
          800: "#2a2d64",
          900: "#151632",
        },
      }
    : {
        grey: {
          900: "#141414",
          800: "#292929",
          700: "#3d3d3d",
          600: "#525252",
          500: "#666666",
          400: "#858585",
          300: "#a3a3a3",
          200: "#c2c2c2",
          100: "#e0e0e0",
        },
        primary: {
          900: "#dadee4",
          800: "#b5bdc8",
          700: "#919cad",
          600: "#6c7b91",
          500: "#475a76",
          400: "#39485e",
          300: "#2b3647",
          200: "#1c242f",
          100: "#0e1218",
        },
        greenAccent: {
          900: "#cff5f9",
          800: "#9febf3",
          700: "#6ee1ec",
          600: "#3ed7e6",
          500: "#0ecde0",
          400: "#0ba4b3",
          300: "#087b86",
          200: "#06525a",
          100: "#03292d",
        },
        greenAccent_old: {
          100: "#0f2922",
          200: "#1e5245",
          300: "#2e7c67",
          400: "#3da58a",
          500: "#4cceac",
          600: "#70d8bd",
          700: "#94e2cd",
          800: "#b7ebde",
          900: "#dbf5ee",
        },
        redAccent: {
          100: "#cff5f9",
          200: "#9febf3",
          300: "#6ee1ec",
          400: "#3ed7e6",
          500: "#0ecde0",
          600: "#0ba4b3",
          700: "#087b86",
          800: "#06525a",
          900: "#03292d",
        },
        blueAccent: {
          100: "#cff5f9",
          200: "#9febf3",
          300: "#6ee1ec",
          400: "#3ed7e6",
          500: "#0ecde0",
          600: "#0ba4b3",
          700: "#087b86",
          800: "#06525a",
          900: "#03292d",
        },
      }),
});

export const themeSettings = (mode) => {
  const colors = tokens(mode);

  return {
    palette: {
      mode: mode,
      ...(mode == "dark"
        ? {
            primary: {
              main: colors.primary[500],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: colors.primary[500],
            },
          }
        : {
            primary: {
              // main: colors.primary[100],
              main: colors.primary[200],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: "#fcfcfc",
            },
          }),
    },
    typography: {
      fontFamily: ["Open Sans"].join(","),
      fonstSize: 10,
      h1: {
        fontFamily: ["Open Sans"].join(","),
        fonstSize: 32,
      },
      h2: {
        fontFamily: ["Open Sans"].join(","),
        fonstSize: 24,
      },
      h3: {
        fontFamily: ["Open Sans"].join(","),
        fonstSize: 20,
      },
      h4: {
        fontFamily: ["Open Sans"].join(","),
        fonstSize: 16,
      },
      h5: {
        fontFamily: ["Open Sans"].join(","),
        fonstSize: 14,
      },
      h6: {
        fontFamily: ["Open Sans"].join(","),
        fonstSize: 12,
      },
    },
  };
};

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return [theme, colorMode];
};
