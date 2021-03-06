import { ThemeProvider } from '@mui/system';
import { Container } from '@mui/system';
import { useEffect } from 'react';
import theme from './styles/theme';
import Appbar from './components/appbar';
import Message from './components/message';
import Confirmation from './components/confirmation';


function App() {
  useEffect(() => {
    document.title = 'Play Tennis - Home'
  })

  return (
    <div>
    <ThemeProvider theme={theme}>
    <Container
      maxWidth="xl"
      sx={{
        background: '#fff'
      }}
    >
      <Appbar />
    </Container>
    <Confirmation />
    <Message />
    </ThemeProvider>
    </div>
  );
}

export default App;
