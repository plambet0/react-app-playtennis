import { Button, Card, CardActions, CardContent, CardMedia, Container, Grid, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Actions } from "../../ActionEnums";
import { Context } from "../../context";
import { Colors } from "../../styles/theme";
import PlayerForm, { IPlayer } from "./playerForm";




export default function Players() {
    const {state, dispatch} = useContext(Context)
    const [playerInfo, setPlayerInfo] = useState<IPlayer>();
    const [openPlayerForm, setOpenPlayerForm] = useState(false);
    const [query, setQuery] = useState('');
    const [players, setPlayers] = useState(state.players);
    
    useEffect(() => {
      if (state && state.players) {
        if (query.length > 0) {
            setPlayers(state.players.filter((p) => p.name.toLowerCase().includes(query.toLowerCase())));
        } else {
            setPlayers(state.players);
        }
      }
    }, [query, state]);
    
    
    const handleEdit = (player : IPlayer) => {
        setPlayerInfo(player);
        setOpenPlayerForm(true);
    }
    const remove = (player: IPlayer) => {
    dispatch({
      type: Actions.ShowConfirmation,
      payload: {
        text: `Are you sure you want to delete ${player.name}?`,
        agreeAction: handleDelete,
        params: player
      }
    })
   };
    
    const  handleDelete = (player: IPlayer) => {
        dispatch({ type: Actions.HideConfirmation });
        dispatch({type: Actions.DeletePlayer, payload:{id:player.id}})
        
    };
        
    
    return (
            <Container sx={{paddingTop: '20px', width: '100%'}} >
            {/* End hero unit */}
            <Grid container style={{ paddingBottom: '20px'}} >
            <TextField
            placeholder="Search by Player Name ..."
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            style={{ borderRadius: 5, background: Colors.light_gray }}
            />
            </Grid>
            <Grid container spacing={2} >
              {players.map((player) => (
                <Grid item key={player.id} xs={3}>
                  <Card
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column', background: Colors.light_gray }}
                  >
                    <CardMedia
                      component="img"
                      height='230'
                      image={player.image}
                      alt={player.name}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        Name: {player.name}
                      </Typography>
                      <Typography>
                        City: {player.city}
                      </Typography>
                      <Typography>
                        Hand: {player.hand}
                      </Typography>
                      <Typography>
                        Sex: {player.sex}
                      </Typography>
                    </CardContent>
                    <CardActions style={{justifyContent: 'center', display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))'}}>
                      <Button sx={{ gridColumn: 'span 1' }}  onClick={() => remove(player)} size="small" variant='contained' color='success' >Delete</Button>
                      <Button sx={{ gridColumn: 'span 1' }} onClick={() => handleEdit(player)} size="small" variant='contained' color='info'>Edit</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
            {openPlayerForm && <PlayerForm handleClose={() => setOpenPlayerForm(false)} playerInput={playerInfo}/>}
          </Container> 
    )
}
