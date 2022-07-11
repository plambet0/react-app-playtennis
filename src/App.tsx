import { ThemeProvider } from '@mui/system';
import { Container } from '@mui/system';
import { useEffect } from 'react';
import theme from './styles/theme';
import Appbar from './components/appbar';
import ClubsProvider from './context';

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
    </Container>
    </ThemeProvider>
  );
}

export default App;
