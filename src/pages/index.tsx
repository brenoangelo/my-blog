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

interface IPost {
  uid: string;
  first_publication_date: string;
  data: {
    title: {
      text: string;
    }[];
    subtitle: string;
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
                text={'Inscreva-se'}
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
              <Link href="/">
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
                  Breno Angelo
                </span>
                <span>
                  <FiClock size={20} />4 min
                </span>
              </div>

              <Button
                text={'Ler mais'}
                icon={<IoArrowForwardSharp size={20} />}
              />
            </div>
            <div className={styles.articleImg}>
              <img src="/images/Banner.png" alt="teste" />
            </div>
          </article>
        </div>
      </section>

      <section className={styles.postsListSection}>
        <div className={commonStyles.container}>
          <article className={styles.articleSimple}>
            <div className={styles.articleImg}>
              <Link href="/">
                <a>
                  <img src="/images/Banner.png" alt="teste" />
                </a>
              </Link>
            </div>
            <div className={styles.articleText}>
              <Link href="/">
                <a>
                  <h2>Lorem ipsum</h2>
                </a>
              </Link>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Asperiores voluptatum velit enim quisquam eius explicabo veniam
                error deserunt, laboriosam accusantium eum dolorem doloribus
                inventore fugiat saepe autem omnis, quod atque.
              </p>
              <div className={commonStyles.postInfo}>
                <span>
                  <FiCalendar size={20} />
                  15 Mar 2021
                </span>
                <span>
                  <FiUser size={20} />
                  Breno Angelo
                </span>
                <span>
                  <FiClock size={20} />4 min
                </span>
              </div>
            </div>
          </article>

          <article className={styles.articleSimple}>
            <div className={styles.articleImg}>
              <Link href="/">
                <a>
                  <img src="/images/Banner.png" alt="teste" />
                </a>
              </Link>
            </div>
            <div className={styles.articleText}>
              <Link href="/">
                <a>
                  <h2>Lorem ipsum</h2>
                </a>
              </Link>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Asperiores voluptatum velit enim quisquam eius explicabo veniam
                error deserunt, laboriosam accusantium eum dolorem doloribus
                inventore fugiat saepe autem omnis, quod atque.
              </p>
              <div className={commonStyles.postInfo}>
                <span>
                  <FiCalendar size={20} />
                  15 Mar 2021
                </span>
                <span>
                  <FiUser size={20} />
                  Breno Angelo
                </span>
                <span>
                  <FiClock size={20} />4 min
                </span>
              </div>
            </div>
          </article>

          <article className={styles.articleSimple}>
            <div className={styles.articleImg}>
              <Link href="/">
                <a>
                  <img src="/images/Banner.png" alt="teste" />
                </a>
              </Link>
            </div>
            <div className={styles.articleText}>
              <Link href="/">
                <a>
                  <h2>Lorem ipsum</h2>
                </a>
              </Link>

              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Asperiores voluptatum velit enim quisquam eius explicabo veniam
                error deserunt, laboriosam accusantium eum dolorem doloribus
                inventore fugiat saepe autem omnis, quod atque.
              </p>
              <div className={commonStyles.postInfo}>
                <span>
                  <FiCalendar size={20} />
                  15 Mar 2021
                </span>
                <span>
                  <FiUser size={20} />
                  Breno Angelo
                </span>
                <span>
                  <FiClock size={20} />4 min
                </span>
              </div>
            </div>
          </article>

          <a className={styles.loadingMorePosts}>Carregar mais posts</a>
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
    pageSize: 4,
  });

  const postSpotlight = {
    slug: postResponse.results[0].uid,
    first_publication_date: postResponse.results[0].first_publication_date,
    data: postResponse.results[0].data,
  };

  const posts = postResponse.results.slice(1).map((post) => {
    return {
      uid: post.uid,
      first_publication_data: post.first_publication_date,
      data: post.data,
    };
  });

  console.log(postSpotlight)

  return {
    props: {
      postSpotlight: postSpotlight,
      posts: posts,
      nextPage: postResponse.next_page,
    },
  };
};
