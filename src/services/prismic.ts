import * as prismic from '@prismicio/client';
import { HttpRequestLike } from '@prismicio/client';
import { enableAutoPreviews } from '@prismicio/next';

export interface PrismicConfig {
  req?: HttpRequestLike;
}

export function createClient(config: PrismicConfig): prismic.Client {
  const client = prismic.createClient(process.env.PRISMIC_ENDPOINT);

  enableAutoPreviews({
    client,
    req: config.req,
  });

  return client;
}