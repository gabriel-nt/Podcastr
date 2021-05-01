import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";

import ToggleTheme from "../components/ToggleTheme";
import light from "../styles/theme/light";
import dark from "../styles/theme/dark";

import GlobalStyle from "../styles/global";
import Header from "../components/Header";
import Player from "../components/Player";
import { Wrapper } from "../styles/pages/app";

import { PlayerProvider } from "../hooks/player";

function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState(light);

  useEffect(() => {
    const storage = localStorage.getItem("@move_theme");

    if (storage) {
      setTheme(storage === "light" ? light : dark);
    }
  }, []);

  const toggleTheme = () => {
    const themeTitle = theme.title === "light" ? "dark" : "light";

    setTheme(theme.title === "light" ? dark : light);
    localStorage.setItem("@move_theme", themeTitle);
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      <PlayerProvider>
        <Wrapper>
          <main>
            <Header />
            <ToggleTheme toggleTheme={toggleTheme} />

            <Component {...pageProps} />
          </main>

          <Player />
        </Wrapper>
      </PlayerProvider>
    </ThemeProvider>
  );
}

export default MyApp;
