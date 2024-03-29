
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Colors } from '../../styles/theme';
import { useState, useContext, useEffect } from 'react';
import ClubForm from './clubForm'
import { Context } from '../../context';
import { Actions } from '../../ActionEnums';
import ReservationForm from '../reservations/reservationForm';
import { TextField } from '@mui/material';


export type IClub = {
    id: string ;
    name: string ;
    city: string;
    pricePerHour: number;
    numberOfCourts: number;
    surface: string;
    image: string;
};



export default function Clubs() {
    const {state, dispatch} = useContext(Context)
    const [clubInfo, setclubInfo] = useState<IClub>();
    const [openForm, setOpenForm] = useState(false);
    const [openReservationForm, setopenReservationForm] = useState(false);
    const [query, setQuery] = useState('');
    const [clubs, setClubs] = useState(state.clubs);
    
    useEffect(() => {
      if (state && state.clubs) {
        if (query.length > 0) {
          setClubs(state.clubs.filter((c) => c.name.toLowerCase().includes(query.toLowerCase())));
        } else {
          setClubs(state.clubs);
        }
      }
    }, [query, state]);
    
    
    const handleEdit = (club : IClub) => {
        setclubInfo(club);
        setOpenForm(true);
    }
    const remove = (club: IClub) =>
    dispatch({
      type: Actions.ShowConfirmation,
      payload: {
        text: `Are you sure you want to delete ${club.name}?`,
        agreeAction: handleDelete,
        params: club
      }
    });
    
    const  handleDelete = (club: IClub) => {
        dispatch({ type: Actions.HideConfirmation });
        dispatch({type: Actions.DeleteClub, payload:{id:club.id}})
        
    };

    const  handleReservation = (club: IClub) => {
      setopenReservationForm(true);
      setclubInfo(club);
  };
        
    
    return(
            <Container sx={{paddingTop: '20px', width: '100%'}} >
            {/* End hero unit */}
            <Grid container style={{ paddingBottom: '20px'}} >
            <TextField
            placeholder="Search by Club Name ..."
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            style={{ borderRadius: 5, background: Colors.light_gray }}
            />
            </Grid>
            <Grid container spacing={2} >
              {clubs.map((club) => (
                <Grid item key={club.id} xs={3}>
                  <Card
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column', background: Colors.light_gray }}
                  >
                    <CardMedia
                      component="img"
                      height='230'
                      image={club.image}
                      alt={club.name}
                    />
                    <CardContent sx={{ flexGrow: 1}}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {club.name}
                      </Typography>
                      <Typography>
                        City: {club.city}
                      </Typography>
                      <Typography>
                        Price per hour: {club.pricePerHour} lv.
                      </Typography>
                      <Typography>
                        Number of courts: {club.numberOfCourts}
                      </Typography>
                      <Typography>
                        Surface: {club.surface}
                      </Typography>
                    </CardContent>
                      <CardActions style={{justifyContent: 'center' , display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))'}}>
                      <Button sx={{ gridColumn: 'span 1' }} onClick={() => remove(club)} size="small" variant='contained' color='success' >Delete</Button>
                      <Button sx={{ gridColumn: 'span 1' }} onClick={() => handleEdit(club)} size="small" variant='contained' color='info'>Edit</Button>
                      <Button sx={{ gridColumn: 'span 1' }} onClick={() => handleReservation(club)} size="small" variant='contained' color='secondary'>Reserve</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
            {openForm && <ClubForm handleClose={() => setOpenForm(false)} clubInput={clubInfo}/>}
            {openReservationForm && <ReservationForm handleClose={() => setopenReservationForm(false)} clubInput={clubInfo}/>}
          </Container>
          
    )
}
