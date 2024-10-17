import { styled } from '@mui/system';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { createTheme } from '@mui/material/styles';

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