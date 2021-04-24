import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Slider from 'rc-slider';

import 'rc-slider/assets/index.css';

import { usePlayer } from '../../hooks/player';
import { Container, Progress, Buttons} from './styles';

const Player = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const { 
    episodeList, 
    currentEpisodeIndex, 
    isPlaying, 
    tooglePlay,
    setPlayingState
  } = usePlayer();

  const episode = episodeList[currentEpisodeIndex];

  useEffect(() => {
    if (!audioRef.current) 
      return;
    
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <Container>
      <header>
        <img src="/playing.svg" alt="Tocando agora"/>
        <strong>Tocando agora</strong>
      </header>

      {
        episode ? (
          <div className="playingEpisode">
            <Image 
              width={592}
              height={592}
              src={episode.thumbnail}
              objectFit="cover"
            />

            <strong>{episode.title}</strong>
            <span>{episode.members}</span>
          </div>
        ) : (
          <div className="emptyPlayer">
            <strong>Selecione um podcast para ouvir</strong>
          </div>
        )
      }
      
      <footer className={!episode && 'empty'}>
        <Progress>
          <span>00:00</span>
          <div className="slider">
            {
              episode ? (
                <Slider 
                  trackStyle={{ background: '#04b361' }}
                  railStyle={{ background: '#9f75ff' }}
                  handleStyle={{ borderColor: '#04b361', borderWidth: 4 }}
                />
              ) : (
                <div className="emptySlider" />
              )
            }
          </div>
          <span>00:00</span>
        </Progress>
        
        {
          episode && (
            <audio 
              autoPlay
              src={episode.url}
              ref={audioRef}
              onPlay={() => { setPlayingState(true) }}
              onPause={() => { setPlayingState(false) }}
            />
          )
        }

        <Buttons>
          <button type="button" disabled={!episode}>
            <img src="/shuffle.svg" alt="Embaralhar"/>
          </button>

          <button type="button" disabled={!episode}>
            <img src="/play-previous.svg" alt="Toca anterior"/>
          </button>

          <button 
            type="button" 
            className="playButton" 
            disabled={!episode} 
            onClick={tooglePlay}
          >
            <img src={isPlaying ? '/pause.svg' : '/play.svg'} alt="Tocar"/>
          </button>

          <button type="button" disabled={!episode}>
            <img src="/play-next.svg" alt="Toca próxima"/>
          </button>

          <button type="button" disabled={!episode}>
            <img src="/repeat.svg" alt="Repetir"/>
          </button>
        </Buttons>
      </footer>
    </Container>
  )
}

export default Player;