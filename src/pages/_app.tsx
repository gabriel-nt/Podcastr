import { ThemeProvider } from 'styled-components';

import theme from '../styles/theme/light';
import GlobalStyle from '../styles/global';
import Header from '../components/Header';
import Player from '../components/Player';
import { Wrapper } from '../styles/app';
import { PlayerProvider } from '../hooks/player';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      <PlayerProvider>
        <Wrapper>
          <main>
            <Header />
            <Component {...pageProps} />
          </main>
          
          <Player />
        </Wrapper>
      </PlayerProvider>
    </ThemeProvider>
  )
}

export default MyApp
