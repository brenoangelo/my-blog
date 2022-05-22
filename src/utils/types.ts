export interface IPost {
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
      heading: {
        text: string;
      };
      body: {
        text: string;
      }[];
    }[];
  };
}