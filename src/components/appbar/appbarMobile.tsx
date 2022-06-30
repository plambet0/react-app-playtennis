import { IconButton } from "@mui/material";
import { AppbarContainer, AppBarHeader } from "../../styles/appbar";
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Actions from "./actions";

type IProps = {
    matches: boolean;
  };


export default function AppbarMobile({ matches } : IProps) {

    return (
        <AppbarContainer>
            <IconButton>
                <MenuIcon/>
            </IconButton>
            <AppBarHeader textAlign={'center'} variant='h4'>
                Play Tennis
            </AppBarHeader>
            <IconButton>
                <SearchIcon/>
            </IconButton>
            <Actions matches={matches}/>
        </AppbarContainer>
    )

}