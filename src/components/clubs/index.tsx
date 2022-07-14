
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Colors } from '../../styles/theme';
import { useState, useContext } from 'react';
import ClubForm from '../clubForm';
import { Context } from '../../context';
import { Actions } from '../../ActionEnums';


export type IClub = {
    id: string ;
    name: string ;
    city: string;
    pricePerHour: number;
    numberOfCourts: number;
    surface: string;
    image?: string;
};



export default function Clubs() {
    const {state, dispatch} = useContext(Context)
    const [clubInfo, setclubInfo] = useState<IClub>();
    const [openForm, setOpenForm] = useState(false);
    
   
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
        
    
    return(
            <Container sx={{ py: 8 }} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={16} columns={8}>
              {state.clubs.map((club) => (
                <Grid item key={club.id} xs={12} sm={6} md={4}>
                  <Card
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column', background: Colors.light_gray }}
                  >
                    <CardMedia
                      component="img"
                      height='330'
                      sx={{
                        // 16:9
                        pt: '56.25%',
                      }}
                      image={club.image}
                      alt={club.name}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
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
                    <CardActions>
                      <Button onClick={() => remove(club)} size="small" variant='contained' color='success' >Delete</Button>
                      <Button onClick={() => handleEdit(club)} size="small" variant='contained' color='info'>Edit</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
            {openForm && <ClubForm handleClose={() => setOpenForm(false)} clubInput={clubInfo}/>}
          </Container>
          
    )
}
