
import { ListItemButton, Divider, ListItemIcon } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import Actions from "./actions";
import { MyList, AppbarContainer, AppBarHeader} from "../../styles/appbar";
import { useState } from 'react';
import ClubForm from '../clubForm';
import Clubs from '../clubs';
import { Banner } from './banner';
import Reservations from '../reservations';


type IProps = {
    matches: boolean;
  };

export default function AppbarDesktop({matches} : IProps) {
  const [loadClubForm, setloadClubForm] = useState(false);
  const [loadClubs, setloadClubs] = useState(false);
  const [loadReservations, setloadReservations] = useState(false);

  const handleLoadClubs = () => {
    setloadClubs(!loadClubs);
  }

  const handleLoadClubForm = () => {
    setloadClubForm(!loadClubForm);
  }

  const handleLoadReservations = () => {
    setloadReservations(!loadReservations);
  }

    return (
      <>
      <AppbarContainer>
        <AppBarHeader>Play Tennis</AppBarHeader>
        <MyList type={"row"}>
             <Divider orientation="vertical" flexItem />
             <ListItemButton>Home</ListItemButton>
             <Divider orientation="vertical" flexItem />
             <ListItemButton onClick={handleLoadClubs}>Clubs</ListItemButton>
             <Divider orientation="vertical" flexItem />
             <ListItemButton onClick={handleLoadClubForm}>Add Club</ListItemButton>
             <Divider orientation="vertical" flexItem />
             <ListItemButton onClick={handleLoadReservations}>My Reservations</ListItemButton>
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
      <Banner/>
      {loadClubs && <Clubs/>}
      {loadReservations && <Reservations/>}
      </>
    );

}