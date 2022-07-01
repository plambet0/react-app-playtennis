
import { ListItemButton, Divider, ListItemIcon } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import Actions from "./actions";
import { MyList, AppbarContainer, AppBarHeader} from "../../styles/appbar";
import { useState } from 'react';
import ClubForm from '../clubForm';

type IProps = {
    matches: boolean;
  };

export default function AppbarDesktop({matches} : IProps) {
  const [loadClubForm, setloadClubForm] = useState(false);

  const handleLoadClubForm = () => {
    setloadClubForm(true);
  }

    return (
      <AppbarContainer>
        <AppBarHeader>Play Tennis</AppBarHeader>
        <MyList type={"row"}>
             <Divider orientation="vertical" flexItem />
             <ListItemButton>Home</ListItemButton>
             <Divider orientation="vertical" flexItem />
             <ListItemButton>Clubs</ListItemButton>
             <Divider orientation="vertical" flexItem />
             <ListItemButton>Players</ListItemButton>
             <Divider orientation="vertical" flexItem />
             <ListItemButton>Trainers</ListItemButton>
             <Divider orientation="vertical" flexItem />
             <ListItemButton>Become a player</ListItemButton>
             <Divider orientation="vertical" flexItem />
             <ListItemButton onClick={handleLoadClubForm}>Add Club</ListItemButton>
             <Divider orientation="vertical" flexItem />
             <ListItemButton>Contact us</ListItemButton>
             <Divider orientation="vertical" flexItem />
             <ListItemButton>
                <ListItemIcon>
                    <SearchIcon />
                </ListItemIcon>
             </ListItemButton>
             <Actions matches={matches}/>
        </MyList>
        {loadClubForm && <ClubForm handleClose={() => {setloadClubForm(false)}}/>}
      </AppbarContainer>
    );

}