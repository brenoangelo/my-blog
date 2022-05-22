import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';
import { createClient } from '../../services/prismic';

import commonStyles from '../../styles/commonStyles.module.scss';
import { calcEstimatedReadTime } from '../../utils/constants';

import { RichText } from 'prismic-dom';

type PostProps = {
  post: {
    title: string;
    author: string;
    first_publication_date: string;
    banner: {
      url?: string;
      alt?: string;
    };
    content: {
      heading: {
        text: string;
      };
      body: {
        text: string;
      }[];
    }[];
  };
};

export default function Post({ post }: PostProps) {
  return (
    <>
      <Head>
        <title>{post.title} | Só sobre tudo</title>
      </Head>

      <main>
        <div>
          <img src={post.banner.url} alt={post.banner.alt} />
        </div>

        <header>
          <h1>{post.title}</h1>
          <div className={commonStyles.postInfo}>
            <span>
              <FiCalendar size={20} />
              {format(new Date(post.first_publication_date), 'PP', {
                locale: ptBR,
              })}
            </span>
            <span>
              <FiUser size={20} />
              {post.author}
            </span>
            <span>
              <FiClock size={20} />
              {calcEstimatedReadTime(post.content)} min
            </span>
          </div>
        </header>

        <div>
          {/* <div dangerouslySetInnerHTML={{ _html: RichText.asHtml(post.content) }}/> */}
        </div>
      </main>
    </>
  );
}

// export const getStaticPaths: GetStaticPaths = async () => {
// 	return {
// 		paths: [],
// 		fallback: 'blocking'
// 	}
// }

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const { slug } = params;
  const prismic = createClient({});
  const postResponse = await prismic.getByUID('post', String(slug), {});

  const post = {
    title: postResponse.data.title[0].text,
    author: postResponse.data.author,
    first_publication_date: postResponse.first_publication_date,
    banner: postResponse.data.banner,
    content: postResponse.data.content,
  };

  return {
    props: {
      post,
    },
  };
};
