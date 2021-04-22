import { ThemeProvider } from 'styled-components';

import theme from '../styles/theme/light';
import GlobalStyle from '../styles/global';
import Header from '../components/Header';
import Player from '../components/Player';
import { Wrapper } from '../styles/app';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      <Wrapper>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        
        <Player />
      </Wrapper>
    </ThemeProvider>
  )
}

export default MyApp
