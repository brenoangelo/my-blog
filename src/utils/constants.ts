import { RichText } from 'prismic-dom';

type Content = {
  heading: {
    text: string
  },
  body: {
    text: string;
  }[]
}[]

export function calcEstimatedReadTime(content: Content) {
  const characters = content.reduce((acc, current) => {
    acc += RichText.asText(current.body).length + current.heading.length;

    return acc;
  }, 0);

  return Math.ceil(characters / 200);
}