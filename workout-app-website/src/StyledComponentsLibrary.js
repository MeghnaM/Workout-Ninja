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
    padding: '0px 8px 4px 8px',
    borderRadius: '50%',
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.background.main,
    "&:hover": { backgroundColor: theme.palette.primary.contrastText }
}));

// const MenuButton = styled(BaseMenuButton)(
//     ({ theme }) => `
//     font-family: 'IBM Plex Sans', sans-serif;
//     font-weight: 600;
//     font-size: 0.875rem;
//     line-height: 1.5;
//     border-radius: 8px;
//     color: white;
//     transition: all 150ms ease;
//     cursor: pointer;
//     background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
//     border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
//     color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
//     box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  
//     &:hover {
//       background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
//       border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
//     }
  
//     &:active {
//       background: ${theme.palette.mode === 'dark' ? grey[700] : grey[100]};
//     }
  
//     &:focus-visible {
//       box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
//       outline: none;
//     }
//     `,
//   );

export const StyledSectionHeading = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
    padding: 20
}));

export const StyledBox = styled(Box)(({ theme }) => ({
    width: '100%', 
    height: 400, 
    maxWidth: 360, 
    backgroundColor: theme.palette.background.main,
    borderRadius: '10%'
}));