import { Button} from '@mui/material'
import { ThemeProvider } from '@mui/system';
import { Container } from '@mui/system';
import { useEffect } from 'react';
import theme from './styles/theme';
import Appbar from './components/appbar';


function App() {
  useEffect(() => {
    document.title = 'Play Tennis - Home'
  })

  return (
    <ThemeProvider theme={theme}>
    <Container
      maxWidth="xl"
      sx={{
        background: '#fff'
      }}
    >
      <Appbar />
      {
        /*
        Appbar
        Banner
        Promotions
        title
        Products
        footer
        searchbox
        apprawer
        */
      }
      <Button variant='contained'>Test</Button>
    </Container>
    </ThemeProvider>
  );
}

export default App;
