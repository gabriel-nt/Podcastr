import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  width: 26.25rem;
  padding: 3rem 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  color:  ${({ theme }) => theme.colors.white};
  background: ${({ theme }) => theme.colors.purple500};

  header {
    gap: 1rem;
    display: flex;
    align-items: center;
  }

  strong {
    font-family: Lexend, sans-serif;
    font-weight: 600;
  }

  .emptyPlayer {
    width: 100%;
    height: 20rem;
    border-radius: 1.5rem;
    border: 1.5px dashed ${({ theme }) => theme.colors.purple300};
    background: linear-gradient(143.8deg, rgba(145, 100, 250, 0.8) 0%, rgba(0, 0, 0, 0) 100%);

    padding: 4rem;
    text-align: center;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .playingEpisode {
    text-align: center;

    img {
      border-radius: 1.5rem;
    }

    strong {
      display: block;
      margin-top: 2rem;
      line-height: 1.75rem;
      font: 600 1.25rem Lexend, sans-serif;
    }

    span {
      display: block;
      margin-top: 1rem;
      opacity: 0.6;
      line-height: 1.5rem;
    }
  }

  footer {
    align-self: stretch;

    &.empty {
      opacity: 0.5;
    }
  }
`;

export const Progress = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;

  span {
    display: inline-block;
    width: 4rem;
    text-align: center;
  }

  .slider {
    flex: 1;

    .emptySlider {
      width: 100%;
      height: 4px;
      border-radius: 3px;
      background: ${({ theme }) => theme.colors.purple300};
    }
  }
`;

export const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2.5rem;
  gap: 1.5rem;

  button {
    background: transparent;
    border: 0;
    font-size: 0;
    transition: filter 0.2s;

    &:disabled {
      cursor: default;
    }

    &:hover:not(:disabled) {
      filter: brightness(0.7);
    }
   
    &.playButton {
      width: 4rem;
      height: 4rem;
      border-radius: 1rem;
      background: ${({ theme }) => theme.colors.purple400};

      &:hover:not(:disabled) {
        filter: brightness(0.95);
      }
    }
  }
`;


