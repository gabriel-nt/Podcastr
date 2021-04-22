import { Container, Progress, Buttons} from './styles';

const Player = () => {
  return (
    <Container>
      <header>
        <img src="/playing.svg" alt="Tocando agora"/>
        <strong>Tocando agora</strong>
      </header>

      <div className="emptyPlayer">
        <strong>Selecione um podcast para ouvir</strong>
      </div>

      <footer className="empty">
        <Progress>
          <span>00:00</span>
          <div className="slider">
            <div className="emptySlider" />
          </div>
          <span>00:00</span>
        </Progress>

        <Buttons>
          <button type="button">
            <img src="/shuffle.svg" alt="Embaralhar"/>
          </button>

          <button type="button">
            <img src="/play-previous.svg" alt="Toca anterior"/>
          </button>

          <button type="button" className="playButton">
            <img src="/play.svg" alt="Tocar"/>
          </button>

          <button type="button">
            <img src="/play-next.svg" alt="Toca próxima"/>
          </button>

          <button type="button">
            <img src="/repeat.svg" alt="Repetir"/>
          </button>
        </Buttons>
      </footer>
    </Container>
  )
}

export default Player;