import { createContext, useContext, useState } from 'react';

interface Episode {
  title: string;
  thumbnail: string;
  duration: number;
  url: string;
  members: string;
}

interface PlayerContextData {
  isPlaying: boolean;
  episodeList: Episode[];
  currentEpisodeIndex: number;
  tooglePlay: () => void;
  play: (episode: Episode) => void;
  setPlayingState: (state: boolean) => void
}

const PlayerContext = createContext<PlayerContextData>({} as PlayerContextData);

const PlayerProvider: React.FC = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [episodeList, setEpisodeList] = useState<Episode[]>([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);

  const play = (episode: Episode) => {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  const tooglePlay = () => {
    setIsPlaying(!isPlaying);
  }

  const setPlayingState = (state) => {
    setIsPlaying(state);
  }

  return (
    <PlayerContext.Provider value={{ episodeList, currentEpisodeIndex, play, isPlaying, tooglePlay, setPlayingState }}>
      {children}
    </PlayerContext.Provider>
  )
}

function usePlayer(): PlayerContextData {
  const context = useContext(PlayerContext);

  if (!context) {
    throw new Error('usePlayer must be used within an PlayerProvider');
  }

  return context;
}

export { PlayerProvider, usePlayer }