import styles from './home.module.scss';
import commonStyles from '../styles/commonStyles.module.scss';
import { Button } from '../components/Button';

import { IoArrowForwardSharp } from 'react-icons/io5';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { createClient } from '../services/prismic';

import { RichText } from 'prismic-dom';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import axios from 'axios';
import { useState } from 'react';
import { PlaceholderImage } from '../components/PlaceholderImage';

interface IPost {
  slug: string;
  first_publication_date: string;
  data: {
    title: {
      text: string;
    };
    subtitle: string;
    author: string;
    banner: {
      alt: string | null;
      url: string | null;
    };
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}
interface IHomeProps {
  postSpotlight: IPost;
  posts: IPost[];
  nextPage: string;
}

export default function Home({ postSpotlight, posts, nextPage }: IHomeProps) {
  const [postsState, setPostsState] = useState(() => posts);
  const [nextPageState, setNextPageState] = useState(() => nextPage);

  console.log(postSpotlight)

  function calcEstimatedReadTime(post: IPost) {
    const characters = post.data.content.reduce((acc, current) => {
      acc += RichText.asText(current.body).length + current.heading.length;

      return acc;
    }, 0);

    return Math.ceil(characters / 200);
  }

  function handleLoadingMorePosts() {
    if (!nextPageState) {
      return;
    }

    axios.get(nextPageState).then(({ data }) => {
      setPostsState((state) => [...state, data.results[0]]);
      setNextPageState(data.next_page);
    });
  }

  return (
    <main className={styles.main}>
      <section className={styles.headerSection}>
        <div className={commonStyles.container}>
          <div className={styles.hero}>
            <div className={styles.text}>
              <h1>
                Insights para ajudar você <br />{' '}
                <strong>a crescer o seu negócio</strong>
              </h1>
              <p>
                Seja bem-vindo ao blog da the pragmatic. Aprenda sobre como
                criar experiências de conteúdo que atraem, convertem e retêm seu
                público ao longo de todos os estágios da jornada de compra.
              </p>

              <Button
                text="Inscreva-se"
                icon={<IoArrowForwardSharp size={20} />}
              />
            </div>

            <div className={styles.image}>
              <img src="/images/laptop.png" alt="Notebook" />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.spotLightSection}>
        <div className={commonStyles.container}>
          <article className={styles.articleHero}>
            <div className={styles.articleText}>
              <Link href={`/post/${postSpotlight.slug}`}>
                <a>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: RichText.asHtml(postSpotlight.data.title),
                    }}
                  />
                </a>
              </Link>
              <p>{postSpotlight.data.subtitle}</p>
              <div className={commonStyles.postInfo}>
                <time>
                  <FiCalendar size={20} />
                  {format(
                    new Date(postSpotlight?.first_publication_date),
                    'PP',
                    {
                      locale: ptBR,
                    },
                  )}
                </time>
                <span>
                  <FiUser size={20} />
                  {postSpotlight.data.author}
                </span>
                <span>
                  <FiClock size={20} />
                  {calcEstimatedReadTime(postSpotlight)} min
                </span>
              </div>

              <Button
                text={'Ler mais'}
                icon={<IoArrowForwardSharp size={20} />}
              />
            </div>
            <div className={styles.articleImg}>
              {postSpotlight.data.banner.url ? (
                <img
                  src={postSpotlight.data.banner.url}
                  alt={
                    postSpotlight.data.banner.url ?? postSpotlight.data.subtitle
                  }
                />
              ) : (
                <PlaceholderImage />
              )}
            </div>
          </article>
        </div>
      </section>

      <section className={styles.postsListSection}>
        <div className={commonStyles.container}>
          {postsState.map((post) => (
            <article className={styles.articleSimple} key={post.slug}>
              <div className={styles.articleImg}>
                <Link href={`/post/${post.slug}`}>
                  <a>
                    <img
                      src={post.data.banner.url}
                      alt={post.data.banner.alt ?? post.data.subtitle}
                    />
                  </a>
                </Link>
              </div>
              <div className={styles.articleText}>
                <Link href={`/post/${post.slug}`}>
                  <a>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: RichText.asHtml(post.data.title),
                      }}
                    />
                  </a>
                </Link>
                <p>{post.data.subtitle}</p>
                <div className={commonStyles.postInfo}>
                  <span>
                    <FiCalendar size={20} />
                    {format(new Date(post.first_publication_date), 'PP', {
                      locale: ptBR,
                    })}
                  </span>
                  <span>
                    <FiUser size={20} />
                    {post.data.author}
                  </span>
                  <span>
                    <FiClock size={20} />
                    {calcEstimatedReadTime(post)} min
                  </span>
                </div>
              </div>
            </article>
          ))}

          {nextPageState && (
            <a
              className={styles.loadingMorePosts}
              onClick={handleLoadingMorePosts}
            >
              Carregar mais posts
            </a>
          )}
        </div>
      </section>

      <section className={styles.newsletterSection}>
        <div className={commonStyles.container}>
          <div className={styles.newsletterText}>
            <h3>Inscreva-se em nosso blog</h3>
            <p>
              Acesse, em primeira mão, nossos principais posts diretamente em
              seu email
            </p>
          </div>

          <div className={styles.newsletterForm}>
            <input type="email" placeholder="Seu melhor e-mail" />
            <Button text="Enviar" isFilled />
          </div>
        </div>
      </section>
    </main>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = createClient({});
  const postResponse = await prismic.getByType('post', {
    orderings: {
      field: 'document.first_publication_date',
      direction: 'desc',
    },
    pageSize: 5,
  });

  const postSpotlight = {
    slug: postResponse.results[0].uid,
    first_publication_date: postResponse.results[0].first_publication_date,
    data: postResponse.results[0].data,
  };

  const posts = postResponse.results.slice(1).map((post) => {
    return {
      slug: post.uid,
      first_publication_date: post.first_publication_date,
      data: post.data,
    };
  });

  return {
    props: {
      postSpotlight: postSpotlight,
      posts: posts,
      nextPage: postResponse.next_page,
    },
  };
};
