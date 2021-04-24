import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import ptBR from 'date-fns/locale/pt-BR';
import { format, parseISO } from 'date-fns';
import { GetStaticProps, GetStaticPaths } from 'next';

import api from '../../services/api';

import { Container } from '../../styles/pages/episodes';
import { convertDurantionToTimeString } from '../../utils/convertDurantionToTimeString';
import { usePlayer } from '../../hooks/player';

interface Episode {
  id: string;
  title: string;
  thumbnail: string;
  members: string;
  publishedAt: string;
  duration: number;
  description: string;
  durantionAsString: string;
  url: string;
}

interface EpisodeProps {
  episode: Episode
}

export default function Episode({ episode }: EpisodeProps) {
  const { play } = usePlayer();

  return (
    <Container>
      <Head>
        <title>{episode.title} | Podcastr</title>
      </Head>

      <div>
        <Link href="/">
          <button type="button">
            <img src="/arrow-left.svg" alt="Voltar"/>
          </button>
        </Link>

        <Image 
          width={700}
          height={160}
          src={episode.thumbnail}
          objectFit="cover"
        />

        <button type="button">
          <img src="/play.svg" alt="Tocar episódio" onClick={() => { play(episode) }}/>
        </button>
      </div>

      <header>
        <h1>{episode.title}</h1>
        <span>{episode.members}</span>
        <span>{episode.publishedAt}</span>
        <span>{episode.durantionAsString}</span>
      </header>

      <div 
        className="description" 
        dangerouslySetInnerHTML={{ 
          __html: episode.description
        }} 
      />
    </Container>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get('episodes', {
    params: {
      _limit: 2,
      _sort: 'published_at',
      _order: 'desc'
    }
  });

  const paths = data.map(episode => ({
    params: {
      slug: episode.id
    }
  }))

  return {
    paths,
    fallback: 'blocking' 
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params;
  const { data } = await api.get(`episodes/${slug}`);

  const episode =  {
    id: data.id,
    title: data.title,
    thumbnail: data.thumbnail,
    members: data.members,
    publishedAt:  format(parseISO(data.published_at), 'd MMM yy', {
      locale: ptBR
    }),
    duration: Number(data.file.duration),
    durantionAsString: convertDurantionToTimeString(Number(data.file.duration)),
    description: data.description,
    url: data.file.url 
  }

  return {
    props: {
      episode
    },
    revalidate: 60 * 60 * 24 // 24 hours
  }
}