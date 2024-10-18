import { styled } from '@mui/system';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { createTheme } from '@mui/material/styles';
import { MenuItem } from '@mui/base/MenuItem';
import { MenuButton } from '@mui/base/MenuButton';

export const theme = createTheme({
    palette: {
      primary: {
        main: '#c70073',
      },
      secondary: {
        main: '#009a1f',
      },
      background: {
        main: '#faf2e1'
      },
      appBackground: {
        main: '#faf2e1'
      }
    },
  });

export const StyledListItemText = styled(ListItemText)(({ theme }) => ({
    '& .MuiListItemText-primary': {
        color: theme.palette.secondary.main,
        fontWeight: 'bold'
    },
}));

export const StyledWebsiteHeading = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold'
}));

export const StyledWebsiteSubheading = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold'
}));

export const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    listStyle: 'none',
    padding: '8px',
    borderRadius: '8px',
    cursor: 'default',
    userSelect: 'none',
  
    '&:last-of-type': {
      borderBottom: 'none'
    },

    '&:focus': {
      backgroundColor: theme.palette.secondary.light,
      color: theme.palette.primary.main
    }
}));

export const StyledMenuButton = styled(MenuButton)(({theme}) => ({
    padding: '0px 10px 4px 10px',
    borderRadius: '50%',
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.background.main,
    "&:hover": { backgroundColor: theme.palette.primary.contrastText }
}));

export const StyledSectionHeading = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
    padding: 20
}));

export const StyledSectionSubheading = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
}));

export const StyledBox = styled(Box)(({ theme }) => ({
    width: '100%', 
    height: 400, 
    maxWidth: 400, 
    backgroundColor: theme.palette.background.main,
    borderRadius: '10%',
    margin: 20
}));