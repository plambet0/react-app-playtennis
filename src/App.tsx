import { ThemeProvider } from '@mui/system';
import { Container } from '@mui/system';
import { useEffect } from 'react';
import theme from './styles/theme';
import Appbar from './components/appbar';
import { Banner } from './components/appbar/banner'
import Clubs from './components/clubs';


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
      <Banner />
      <Clubs/>
      {
        /*
        Promotions
        title
        Products
        footer
        searchbox
        apprawer
        */
      }
    </Container>
    </ThemeProvider>
  );
}

export default App;
