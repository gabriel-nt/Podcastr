import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  width: 26.25rem;
  padding: 3rem 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.white};
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
    background: linear-gradient(
      143.8deg,
      rgba(145, 100, 250, 0.8) 0%,
      rgba(0, 0, 0, 0) 100%
    );

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
      > div:first-child {
        opacity: 0.5;
      }
    }
  }

  @media screen and (min-width: 0px) and (max-width: 580px) {
    position: fixed;
    bottom: 0;
    padding: 0;
    padding-top: 3rem;
    padding-bottom: 1rem;
    padding-left: 1rem;
    padding-right: 1rem;
    width: 100%;
    height: auto;
    flex-direction: row;
    justify-content: center;

    header {
      display: none;
    }

    > span {
      position: absolute;
      top: 1rem;
      max-width: 85%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-weight: bold;
    }

    footer {
      align-self: center;
      width: 100%;
    }

    .playingEpisode {
      margin-right: 2rem;
      max-width: 6rem;

      img {
        border-radius: 1rem;
      }

      strong {
        display: none;
      }

      span {
        display: none;
      }
    }

    .emptyPlayer {
      display: none;
    }

    footer {
      width: 100%;
    }
  }

  @media screen and (min-width: 581px) and (max-width: 1500px) {
    position: fixed;
    bottom: 0;
    padding-top: 3rem;
    padding-right: 4rem;
    padding-bottom: 1rem;
    padding-left: 4rem;
    width: 100%;
    height: auto;
    flex-direction: row;
    justify-content: center;

    header {
      display: none;
    }

    > span {
      position: absolute;
      top: 1rem;
      max-width: 60%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-weight: bold;
    }

    footer {
      width: 100%;
      align-self: center;
    }

    .playingEpisode {
      margin-right: 3.25rem;
      max-width: 6rem;

      img {
        border-radius: 1rem;
      }

      strong {
        display: none;
      }

      span {
        display: none;
      }
    }

    .emptyPlayer {
      display: none;
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

  @media screen and (max-width: 1500px) {
    max-width: 340px;
    margin: 0 auto;
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
      opacity: 0.5;
    }

    &:hover:not(:disabled) {
      filter: brightness(0.7);
    }

    svg {
      width: 22px;
      height: 22px;
      color: ${({ theme }) => theme.colors.white};
    }

    &.playButton {
      width: 4rem;
      height: 4rem;
      border-radius: 1rem;
      background: ${({ theme }) => theme.colors.purple400};

      svg {
        width: 28px;
        height: 28px;
        color: ${({ theme }) => theme.colors.white};
      }

      &:hover:not(:disabled) {
        filter: brightness(0.95);
      }
    }

    &.active {
      svg {
        color: ${({ theme }) => theme.colors.green500};
      }

      &:hover {
        svg {
          color: ${({ theme }) => theme.colors.green500};
        }
      }
    }
  }

  @media screen and (min-width: 0px) and (max-width: 580px) {
    margin-top: 1rem;

    button {
      svg {
        width: 20px;
        height: 20px;
        color: ${({ theme }) => theme.colors.white};
      }

      &.playButton {
        width: 3.25rem;
        height: 3.25rem;
      }
    }
  }

  @media screen and (min-width: 581px) and (max-width: 1500px) {
    margin-top: 1rem;
  }
`;
