import { render, screen } from '@testing-library/react';
import { createClient } from '../../services/prismic';
import { mocked } from 'jest-mock';
import Home from '../../pages';

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

describe('Home page', () => {
  it('postSpotlight renders correctly', () => {
    const getPrismicClientMocked = mocked(createClient);

    render(
      <Home posts={posts.splice(1, )} postSpotlight={posts[0]} nextPage={null} />,
    );

    expect(screen.getByText('My New Post')).toBeInTheDocument();
    expect(screen.getByText('lorem ipsum example')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('25 jan 2021')).toBeInTheDocument();
    expect(screen.getByText('4 min')).toBeInTheDocument();
  });

  it('posts renders correctly', () => {
    render(
      <Home posts={posts.splice(1, )} postSpotlight={posts[0]} nextPage={null} />,
    );

    expect(screen.getByText('Testing new post')).toBeInTheDocument();
    expect(screen.getByText('dolor amet')).toBeInTheDocument();
    expect(screen.getByText('Breno Angelo')).toBeInTheDocument();
    expect(screen.getByText('4 jan 2021')).toBeInTheDocument();
    expect(screen.getByText('1 min')).toBeInTheDocument();
  });

  it('Loading more posts dont render if no exists posts', () => {
    render(
      <Home posts={posts.splice(1, )} postSpotlight={posts[0]} nextPage={null}/>
    )

    expect(screen.queryByText(/Carregar mais posts/i)).not.toBeInTheDocument();
  })
});
