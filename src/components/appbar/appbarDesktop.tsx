
import { ListItemButton, Divider } from '@mui/material';
import { MyList, AppbarContainer, AppBarHeader} from "../../styles/appbar";
import { useState } from 'react';
import ClubForm from '../clubs/clubForm';
import Clubs from '../clubs/clubList';
import { Banner } from './banner';
import Reservations from '../reservations/reservationList';
import PlayerForm from '../players/playerForm';


export default function AppbarDesktop() {
  const [loadClubForm, setloadClubForm] = useState(false);
  const [loadPlayerForm, setloadPlayerForm] = useState(false);
  const [loadClubs, setloadClubs] = useState(false);
  const [loadReservations, setloadReservations] = useState(false);
  const [loadPlayers, setloadPlayers] = useState(false);

  const handleLoadClubs = () => {
    setloadClubs(true);
  }

  const handleLoadClubForm = () => {
    setloadClubForm(true);
  }

  const handleLoadPlayerForm = () => {
    setloadPlayerForm(true);
  }

  const handleLoadReservations = () => {
    setloadReservations(true);
  }

  const handleLoadPlayers = () => {
    setloadPlayers(true);
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
             <ListItemButton onClick={handleLoadPlayerForm}>Add Player</ListItemButton>
             <Divider orientation="vertical" flexItem />
             <ListItemButton onClick={handleLoadPlayers}>Players</ListItemButton>
        </MyList>
        {loadClubForm && <ClubForm handleClose={() => {setloadClubForm(false)}}/>}
        {loadPlayerForm && <PlayerForm handleClose={() => {setloadPlayerForm(false)}}/>}
      </AppbarContainer>
      <Banner/>
      {loadClubs && <Clubs/>}
      {loadReservations && <Reservations/>}
      {loadPlayers && <Players/>}
      </>
    );

}