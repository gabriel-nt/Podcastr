import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { GetStaticProps } from "next";
import ptBR from "date-fns/locale/pt-BR";
import { format, parseISO } from "date-fns";

import api from "../services/api";

import { Container, LatestEpisodes, AllEpisodes } from "../styles/pages/home";
import { convertDurantionToTimeString } from "../utils/convertDurantionToTimeString";
import { usePlayer } from "../hooks/player";

interface EpisodeProps {
  id: string;
  title: string;
  thumbnail: string;
  members: string;
  publishedAt: string;
  duration: number;
  durantionAsString: string;
  url: string;
}

interface HomeProps {
  allEpisodes: EpisodeProps[];
  lastestEpisodes: EpisodeProps[];
}

export default function Home({ lastestEpisodes, allEpisodes }: HomeProps) {
  const { playList } = usePlayer();

  const episodeList = [...lastestEpisodes, ...allEpisodes];

  return (
    <Container>
      <Head>
        <title>Home | Podcastr</title>
      </Head>

      <LatestEpisodes>
        <h2>Últimos lançamentos</h2>

        <ul>
          {lastestEpisodes.map((episode, index) => (
            <li key={episode.id}>
              <Image
                width={192}
                height={192}
                src={episode.thumbnail}
                alt={episode.title}
                objectFit="cover"
              />

              <div>
                <Link href={`/episodes/${episode.id}`}>
                  <a>{episode.title}</a>
                </Link>
                <p>{episode.members}</p>
                <span>{episode.publishedAt}</span>
                <span>{episode.durantionAsString}</span>
              </div>

              <button
                type="button"
                onClick={() => {
                  playList(episodeList, index);
                }}
              >
                <img src="/play-green.svg" alt="Tocar episódio" />
              </button>
            </li>
          ))}
        </ul>
      </LatestEpisodes>

      <AllEpisodes>
        <h2>Todos episódios</h2>

        <table cellSpacing={0}>
          <thead>
            <tr>
              <th colSpan={2}>Podcast</th>
              <th>Integrantes</th>
              <th>Data</th>
              <th colSpan={2}>Duração</th>
            </tr>
          </thead>
          <tbody>
            {allEpisodes.map((episode, index) => (
              <tr key={episode.id}>
                <td style={{ width: 72 }} className="td-img">
                  <Image
                    width={120}
                    height={120}
                    src={episode.thumbnail}
                    alt={episode.title}
                    objectFit="cover"
                  />
                </td>
                <td>
                  <Link href={`/episodes/${episode.id}`}>
                    <a>{episode.title}</a>
                  </Link>
                </td>
                <td>{episode.members}</td>
                <td style={{ width: 100 }}>{episode.publishedAt}</td>
                <td>{episode.durantionAsString}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => {
                      playList(episodeList, index + lastestEpisodes.length);
                    }}
                  >
                    <img src="/play-green.svg" alt="Tocar episódio" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </AllEpisodes>
    </Container>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get("episodes", {
    params: {
      _limit: 12,
      _sort: "published_at",
      _order: "desc",
    },
  });

  const episodes = data.map((episode) => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), "d MMM yy", {
        locale: ptBR,
      }),
      duration: Number(episode.file.duration),
      durantionAsString: convertDurantionToTimeString(
        Number(episode.file.duration)
      ),
      url: episode.file.url,
    };
  });

  const lastestEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.length);

  return {
    props: {
      allEpisodes,
      lastestEpisodes,
    },
    revalidate: 60 * 60 * 8,
  };
};
