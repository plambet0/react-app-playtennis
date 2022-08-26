import { styled } from "@mui/material/styles";
import { Box } from '@mui/system';
import { List, Typography } from '@mui/material';
import { Colors } from '../theme'
import '@fontsource/montez';


export const AppbarContainer = styled(Box)(() => ({
    display: 'flex',
    marginTop: 4,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2px 8px'
}));

export const AppBarHeader = styled(Typography)(() => ({
    padding: '4px',
    flexGrow: 1,
    fontSize: '4em',
    fontFamily: '"Montez", "cursive"',
    color: Colors.secondary,
}));

type IProps = {
    type: string,
}

export const MyList = styled(List)(({ type } : IProps) => ({
    display: type === 'row' ? 'flex' : 'block',
    flexGrow: 3,
    justifyContent: 'center',
    alignItems: 'center'

}));

