import { AppbarContainer, AppBarHeader, MyList } from "../../styles/appbar";
import { ListItemButton, ListItemText, ListItemIcon } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";

type IProps = {
    matches: boolean;
  };

export default function AppbarDesktop({matches} : IProps) {

    return (
      <AppbarContainer>
        <AppBarHeader>Play Tennis</AppBarHeader>
        <MyList type={"row"}>
             <ListItemText primary='Home'/>
             <ListItemText primary='Clubs'/>
             <ListItemText primary='Players'/>
             <ListItemText primary='Trainers'/>
             <ListItemText primary='Become a Player'/>
             <ListItemText primary='Contact us'/>
             <ListItemButton>
                <ListItemIcon>
                    <SearchIcon />
                </ListItemIcon>
             </ListItemButton>
        </MyList>
      </AppbarContainer>
    );

}