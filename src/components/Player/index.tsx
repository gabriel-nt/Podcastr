import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Slider from 'rc-slider';

import 'rc-slider/assets/index.css';

import { usePlayer } from '../../hooks/player';
import { Container, Progress, Buttons} from './styles';
import { convertDurantionToTimeString } from '../../utils/convertDurantionToTimeString';

const Player = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);

  const { 
    episodeList, 
    currentEpisodeIndex, 
    isPlaying, 
    togglePlay,
    toggleShuffle,
    isShuffling,
    setPlayingState,
    playPrevious,
    playNext,
    hasNext,
    hasPrevious,
    isLooping,
    toggleLoop,
    clearPlayerState
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

  const setupProgressListener = () => {
    audioRef.current.currentTime = 0;

    audioRef.current.addEventListener('timeupdate', () => {
      setProgress(Math.floor(audioRef.current.currentTime));
    });
  }

  const handleSeek = (amount: number) => {
    audioRef.current.currentTime = amount;
    setProgress(amount);
  }

  const handleEpisodeEnded = () => {
    if (hasNext) {
      playNext();
    } else {
      clearPlayerState();
    }
  }

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
      
      <footer className={!episode ? 'empty' : ''}>
        <Progress>
         <span>{convertDurantionToTimeString(progress)}</span>
          <div className="slider">
            {
              episode ? (
                <Slider
                  value={progress} 
                  max={episode.duration}
                  onChange={handleSeek}
                  trackStyle={{ background: '#04b361' }}
                  railStyle={{ background: '#9f75ff' }}
                  handleStyle={{ borderColor: '#04b361', borderWidth: 4 }}
                />
              ) : (
                <div className="emptySlider" />
              )
            }
          </div>
          <span>{convertDurantionToTimeString(episode?.duration ?? 0)}</span>
        </Progress>
        
        {
          episode && (
            <audio 
              autoPlay
              src={episode.url}
              ref={audioRef}
              loop={isLooping}
              onEnded={handleEpisodeEnded}
              onLoadedMetadata={setupProgressListener}
              onPlay={() => { setPlayingState(true) }}
              onPause={() => { setPlayingState(false) }}
            />
          )
        }

        <Buttons>
          <button 
            type="button" 
            disabled={!episode || episodeList.length === 1}  
            onClick={toggleShuffle}
            className={isShuffling ? 'active' : ''}
          >
            <img src="/shuffle.svg" alt="Embaralhar"/>
          </button>

          <button type="button" disabled={!episode || !hasPrevious} onClick={playPrevious}>
            <img src="/play-previous.svg" alt="Toca anterior"/>
          </button>

          <button 
            type="button" 
            className="playButton" 
            disabled={!episode} 
            onClick={togglePlay}
          >
            <img src={isPlaying ? '/pause.svg' : '/play.svg'} alt="Tocar"/>
          </button>

          <button type="button" disabled={!episode || !hasNext} onClick={playNext}>
            <img src="/play-next.svg" alt="Toca próxima"/>
          </button>

          <button 
            type="button" 
            disabled={!episode}
            onClick={toggleLoop}
            className={isLooping ? 'active' : ''}
          >
            <img src="/repeat.svg" alt="Repetir"/>
          </button>
        </Buttons>
      </footer>
    </Container>
  )
}

export default Player;