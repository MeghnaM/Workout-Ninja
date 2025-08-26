import { color, fontFamily, styled } from "@mui/system";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { createTheme } from "@mui/material/styles";
import { MenuItem } from "@mui/base/MenuItem";
import { MenuButton } from "@mui/base/MenuButton";
import { colors } from "./colors.tsx";
import { IconButton } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      // main: "#c70073",
      main: colors["pink-vivid-600"],
    },
    secondary: {
      // main: "#009a1f",
      main: colors["orange-vivid-600"],
    },
    background: {
      // main: "#faf2e1",
      main: colors["orange-vivid-050"],
    },
    appBackground: {
      // main: "#faf2e1",
      main: colors["orange-vivid-100"],
    },
  },
});

export const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  "& .MuiListItemText-primary": {
    color: theme.palette.secondary.main,
    fontFamily: "Lato",
    fontWeight: "bold",
  },
}));

// export const StyledWebsiteHeading = styled(Typography)(({ theme }) => ({
//   fontFamily: "Lato",
//   fontWeight: "bold",
// }));

export const StyledWebsiteHeading = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "$gradient",
})(({ theme, $gradient }) => {
  // optional: slightly lighter stops in dark mode for contrast
  const pink =
    theme.palette.mode === "dark"
      ? colors["pink-vivid-300"]
      : colors["pink-vivid-500"]; // pink-300 / pink-500
  const orange =
    theme.palette.mode === "dark"
      ? colors["orange-vivid-300"]
      : colors["orange-vivid-500"]; // orange-300 / orange-400

  return {
    fontFamily: "Lato",
    fontWeight: "bold",
    ...($gradient && {
      backgroundImage: `linear-gradient(90deg, ${pink}, ${orange})`,
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      WebkitTextFillColor: "transparent",
      color: "transparent",
      // high-contrast/forced colors fallback
      "@media (forced-colors: active)": {
        backgroundImage: "none",
        WebkitTextFillColor: "currentColor",
        color: "currentColor",
      },
    }),
  };
});

export const StyledWebsiteSubheading = styled(Typography)(({ theme }) => ({
  fontFamily: "Lato",
  fontWeight: "bold",
}));

export const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontFamily: "Lato",
  fontWeight: "bold",
  listStyle: "none",
  padding: "8px",
  borderRadius: "8px",
  cursor: "default",
  userSelect: "none",

  "&:last-of-type": {
    borderBottom: "none",
  },

  "&:focus": {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.primary.main,
  },
}));

export const StyledMenuButton = styled(MenuButton)(({ theme }) => ({
  padding: "0px 10px 4px 10px",
  borderRadius: "50%",
  color: theme.palette.primary.main,
  backgroundColor: theme.palette.background.main,
  fontFamily: "Lato",
  "&:hover": { backgroundColor: theme.palette.primary.contrastText },
}));

export const StyledSectionHeading = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "$gradient",
})(({ theme, $gradient }) => ({
  color: theme.palette.primary.main,
  fontFamily: "Lato",
  padding: 20,

  // optional: slightly lighter stops in dark mode for contrast
  // const pink =
  //   theme.palette.mode === "dark"
  //     ? colors["pink-vivid-300"]
  //     : colors["pink-vivid-500"]; // pink-300 / pink-500
  // const orange =
  //   theme.palette.mode === "dark"
  //     ? colors["orange-vivid-300"]
  //     : colors["orange-vivid-500"]; // orange-300 / orange-400

  // return {
  //   fontFamily: "Lato",
  //   fontWeight: "bold",
  //   ...($gradient && {
  //     backgroundImage: `linear-gradient(90deg, ${pink}, ${orange})`,
  //     WebkitBackgroundClip: "text",
  //     backgroundClip: "text",
  //     WebkitTextFillColor: "transparent",
  //     color: "transparent",
  //     // high-contrast/forced colors fallback
  //     "@media (forced-colors: active)": {
  //       backgroundImage: "none",
  //       WebkitTextFillColor: "currentColor",
  //       color: "currentColor",
  //     },
  //   }),
  // };
}));

export const StyledSectionSubheading = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.secondary,
  padding: 20,
}));

// export const StyledBox = styled(Box)(({ theme }) => ({
//   width: "100%",
//   height: 400,
//   maxWidth: 400,
//   backgroundColor: theme.palette.background.main,
//   borderRadius: "10%",
//   margin: 20,
// }));

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  fontFamily: "Lato",
  padding: "10px 16px",
  margin: 2,
  lineHeight: 1.5,
  borderRadius: "12px",
  color: colors["orange-vivid-600"], // ensure icon/text contrasts with gradient
  /* gradient background */
  // background: `linear-gradient(90deg, ${colors["pink-vivid-500"]}, ${colors["orange-vivid-500"]})`,
  /* subtle shadow */
  boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
  transition: "transform 150ms ease, box-shadow 150ms ease",
  "&:hover": {
    transform: "translateY(-2px)", // little lift
    boxShadow: "0 6px 14px rgba(0,0,0,0.2)",
    background: `linear-gradient(90deg, ${colors["pink-vivid-100"]}, ${colors["orange-vivid-100"]})`,
  },
  "&:active": {
    transform: "translateY(0)", // press back down
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
  },
}));
// const BootstrapButton = styled(Button)({
//   boxShadow: "none",
//   textTransform: "none",
//   fontSize: 16,
//   padding: "6px 12px",
//   border: "1px solid",
//   lineHeight: 1.5,
//   backgroundColor: "#0063cc",
//   borderColor: "#0063cc",
//   fontFamily: [
//     "-apple-system",
//     "BlinkMacSystemFont",
//     '"Segoe UI"',
//     "Roboto",
//     '"Helvetica Neue"',
//     "Arial",
//     "sans-serif",
//     '"Apple Color Emoji"',
//     '"Segoe UI Emoji"',
//     '"Segoe UI Symbol"',
//   ].join(","),
//   "&:hover": {
//     backgroundColor: "#0069d9",
//     borderColor: "#0062cc",
//     boxShadow: "none",
//   },
//   "&:active": {
//     boxShadow: "none",
//     backgroundColor: "#0062cc",
//     borderColor: "#005cbf",
//   },
//   "&:focus": {
//     boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
//   },
// });

export const StyledBox = styled(Box)(({ theme }) => ({
  width: "100%",
  height: 400,
  width: 400,
  backgroundColor: theme.palette.background.paper, // was background.main
  borderRadius: "10%",
  margin: 20,

  boxShadow: "0 14px 28px rgba(0,0,0,0.12), 0 10px 10px rgba(0,0,0,0.08)",
  transform: "translateY(8px)", // vertical offset
  // transition: "transform 200ms ease, box-shadow 200ms ease",
  // "&:hover": {
  //   transform: "translate(4px)",
  //   boxShadow: "0 18px 40px rgba(0,0,0,0.12), 0 12px 14px rgba(0,0,0,0.10)",
  // },

  /* shadow + vertical offset */
  // boxShadow:
  //   theme.palette.mode === "dark"
  //     ? "0 14px 28px rgba(0,0,0,0.45), 0 10px 10px rgba(0,0,0,0.35)"
  //     : "0 14px 28px rgba(0,0,0,0.12), 0 10px 10px rgba(0,0,0,0.08)",
  // transform: "translateY(8px)",

  /* make it feel alive (optional) */
  // transition: "transform 200ms ease, box-shadow 200ms ease",
  // "&:hover": {
  //   transform: "translateY(4px)", // rises a bit on hover
  //   boxShadow:
  //     theme.palette.mode === "dark"
  //       ? "0 18px 40px rgba(0,0,0,0.5), 0 12px 14px rgba(0,0,0,0.4)"
  //       : "0 18px 40px rgba(0,0,0,0.16), 0 12px 14px rgba(0,0,0,0.10)",
  // },
}));

// Todo - Find a better place to put these styles
const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

export const Listbox = styled("ul")(
  ({ theme }) => `
    font-family: 'Lato', sans-serif;
    font-size: 0.875rem;
    box-sizing: border-box;
    padding: 6px;
    margin: 12px 0;
    min-width: 200px;
    border-radius: 12px;
    overflow: auto;
    outline: 0px;
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    box-shadow: 0px 4px 6px ${
      theme.palette.mode === "dark" ? "rgba(0,0,0, 0.50)" : "rgba(0,0,0, 0.05)"
    };
    z-index: 1;
    `
);
