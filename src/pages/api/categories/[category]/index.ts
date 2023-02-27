import type { NextApiRequest, NextApiResponse } from "next";
import * as contentful from "contentful";
import { IEntryWorldOfZonoFields } from "../../../../../@types/generated/contentful";
import { Entry, EntriesApiResponse } from "pages/api/entries";

const PAGENATE_SIZE = 5;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<EntriesApiResponse>
) {
  const client = contentful.createClient({
    accessToken: process.env.CONTENTFUL_DELIVERY_API_ACCESS_TOKEN || "",
    environment: process.env.CONTENTFUL_ENVIRONMENT,
    space: process.env.CONTENTFUL_SPACE_ID || "",
  });
  const page = Number((req.query.page as string) || 0);
  const category = req.query.category as string;

  await client
    .getEntries<IEntryWorldOfZonoFields>({
      content_type: "entryWorldOfZono",
      skip: page * PAGENATE_SIZE,
      limit: PAGENATE_SIZE,
      order: "-fields.publishedAt",
      "fields.category": category,
    })
    .then(({ items }) => {
      const entries = items.map(
        ({
          fields: { title, publishedAt, body, category },
          sys: { id },
        }): Entry => ({
          id: id,
          entry: {
            title,
            publishedAt,
            body,
            category,
          },
        })
      );
      res.json(entries);
      res.status(200);
      res.end();
    })
    .catch(() => {
      res.json([]);
      res.status(500);
      res.end();
    });
}
