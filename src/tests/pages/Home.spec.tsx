import { render, screen } from '@testing-library/react';
import { createClient } from '../../services/prismic';
import { mocked } from 'jest-mock';
import Home, { getStaticProps } from '../../pages';

const posts = [
  {
    slug: 'my-new-post',
    first_publication_date: '01-25-2021',
    data: {
      title: [{ type: 'heading1', text: 'My New Post', spans: [] }],
      subtitle: 'lorem ipsum',
      author: 'John Doe',
      banner: {
        url: null,
        alt: null,
      },
      content: [
        {
          heading: 'Sessão lorem',
          body: [
            {
              type: 'paragraph',
              text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vitae nisl pretium, gravida felis nec, auctor diam. Morbi interdum sapien quis turpis lacinia, non consectetur urna hendrerit. Duis sed ligula dignissim, consequat arcu et, eleifend purus. Mauris eget ante in nulla accumsan suscipit. Sed vestibulum nulla pretium mauris viverra, nec aliquet tellus cursus. Nulla blandit imperdiet enim, vel suscipit odio elementum ut. Etiam lobortis tristique erat quis finibus. Nullam vitae blandit felis. Phasellus eleifend urna condimentum dignissim sollicitudin. Nulla bibendum diam ut est pretium suscipit.',
            },
          ],
        },
      ],
    },
  },
  {
    slug: 'my-second-new-post',
    first_publication_date: '01-04-2021',
    data: {
      title: [{ type: 'heading1', text: 'Testing new post', spans: [] }],
      subtitle: 'dolor amet',
      author: 'Breno Angelo',
      banner: {
        url: null,
        alt: null,
      },
      content: [
        {
          heading: 'Sessão lorem',
          body: [{ type: 'heading', text: 'Exactly' }],
        },
      ],
    },
  },
];

jest.mock('../../services/prismic')

describe('Home page', () => {
  it('postSpotlight renders correctly', () => {
    render(
      <Home posts={posts.slice(1)} postSpotlight={posts[0]} nextPage={null} />,
    );

    expect(screen.queryByText('My New Post')).toBeInTheDocument();
    expect(screen.getByText('lorem ipsum')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('25 jan 2021')).toBeInTheDocument();
    expect(screen.getByText('4 min')).toBeInTheDocument();
  });

  it('posts renders correctly', () => {
    render(
      <Home posts={posts.slice(1)} postSpotlight={posts[0]} nextPage={null} />,
    );

    expect(screen.getByText('Testing new post')).toBeInTheDocument();
    expect(screen.getByText('dolor amet')).toBeInTheDocument();
    expect(screen.getByText('Breno Angelo')).toBeInTheDocument();
    expect(screen.getByText('4 jan 2021')).toBeInTheDocument();
    expect(screen.getByText('1 min')).toBeInTheDocument();
  });

  it('Loading more posts dont render if no exists posts', () => {
    render(
      <Home posts={posts.splice(1)} postSpotlight={posts[0]} nextPage={null} />,
    );

    expect(screen.queryByText(/Carregar mais posts/i)).not.toBeInTheDocument();
  });

  it('Loading more post render if exists posts in next page', () => {
    render(
      <Home
        posts={posts.splice(1)}
        postSpotlight={posts[0]}
        nextPage={'fake-next-page'}
      />,
    );

    expect(screen.queryByText(/Carregar mais posts/i)).toBeInTheDocument();
  });

  it('Loads correctly', async () => {
    const createClientMocked = mocked(createClient)

    createClientMocked.mockReturnValueOnce({
      getByType: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: 'fake-slug-postSpotlight',
            first_publication_date: '14-05-2022',
            data: {
              title: {
                text: 'Titulo Spotlight',
              },
              subtitle: 'exemplo de subtitulo Spotlight',
              author: 'John Doe',
              banner: {
                alt: 'descrição da foto Spotlight',
                url: 'fake-url',
              },
              content: [
                {
                  heading: 'Exemplo de heading',
                  body: [
                    {
                      type: 'paragraph',
                      text: 'exemplo de paragrafo Spotlight',
                    },
                  ],
                },
              ],
            },
          },
          {
            uid: 'fake-slug-post',
            first_publication_date: '14-05-2022',
            data: {
              title: {
                text: 'Titulo',
              },
              subtitle: 'exemplo de subtitulo',
              author: 'John Doe',
              banner: {
                alt: 'descrição da foto',
                url: 'fake-url',
              },
              content: [
                {
                  heading: 'Exemplo de heading',
                  body: [{ type: 'paragraph', text: 'exemplo de paragrafo' }],
                },
              ],
            },
          },
        ],
      }),
    } as any);

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          postSpotlight: {
            slug: 'fake-slug-postSpotlight',
            first_publication_date: '14-05-2022',
            data: {
              title: {
                text: 'Titulo Spotlight',
              },
              subtitle: 'exemplo de subtitulo Spotlight',
              author: 'John Doe',
              banner: {
                alt: 'descrição da foto Spotlight',
                url: 'fake-url',
              },
              content: [
                {
                  heading: 'Exemplo de heading',
                  body: [
                    {
                      type: 'paragraph',
                      text: 'exemplo de paragrafo Spotlight',
                    },
                  ],
                },
              ],
            },
          },
          posts: [
            {
              slug: 'fake-slug-post',
              first_publication_date: '14-05-2022',
              data: {
                title: {
                  text: 'Titulo',
                },
                subtitle: 'exemplo de subtitulo',
                author: 'John Doe',
                banner: {
                  alt: 'descrição da foto',
                  url: 'fake-url',
                },
                content: [
                  {
                    heading: 'Exemplo de heading',
                    body: [{ type: 'paragraph', text: 'exemplo de paragrafo' }],
                  },
                ],
              },
            },
          ],
        },
      }),
    );
  });

  it('Empty posts renders correctly', () => {
    render(
      <Home 
        posts={[]}
        postSpotlight={{}}
        nextPage={null}
      />
    )
  })
});
