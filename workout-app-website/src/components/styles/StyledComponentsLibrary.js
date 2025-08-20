import { fontFamily, styled } from "@mui/system";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { createTheme } from "@mui/material/styles";
import { MenuItem } from "@mui/base/MenuItem";
import { MenuButton } from "@mui/base/MenuButton";
import { colors } from "./colors.tsx";

export const theme = createTheme({
  palette: {
    primary: {
      // main: "#c70073",
      main: colors["pink-vivid-500"],
    },
    secondary: {
      // main: "#009a1f",
      main: colors["green-vivid-500"],
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

export const StyledWebsiteHeading = styled(Typography)(({ theme }) => ({
  fontFamily: "Lato",
  fontWeight: "bold",
}));

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

export const StyledSectionHeading = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontFamily: "Lato",
  padding: 20,
}));

export const StyledSectionSubheading = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

export const StyledBox = styled(Box)(({ theme }) => ({
  width: "100%",
  height: 400,
  maxWidth: 400,
  backgroundColor: theme.palette.background.main,
  borderRadius: "10%",
  margin: 20,
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
