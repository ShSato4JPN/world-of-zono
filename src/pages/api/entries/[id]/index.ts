import type { NextApiRequest, NextApiResponse } from "next";
import * as contentful from "contentful";
import { IEntryWorldOfZonoFields } from "../../../../../@types/generated/contentful";
import { Entry } from "pages/api/entries/index";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Entry>
) {
  const client = contentful.createClient({
    accessToken: process.env.CONTENTFUL_DELIVERY_API_ACCESS_TOKEN || "",
    environment: process.env.CONTENTFUL_ENVIRONMENT,
    space: process.env.CONTENTFUL_SPACE_ID || "",
  });
  const id = req.query.id as string;

  await client
    .getEntry<IEntryWorldOfZonoFields>(id)
    .then(({ fields: { title, publishedAt, body, category }, sys: { id } }) => {
      res.json({ id: id, entry: { title, publishedAt, body, category } });
      res.status(200);
      res.end();
    })
    .catch(() => {
      res.json({
        id: "ERROR",
        entry: { title: "", publishedAt: "", body: "", category: [] },
      });
      res.status(500);
      res.end();
    });
}
