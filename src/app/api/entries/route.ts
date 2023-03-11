import client from "libs/client";
import { EntryCollection } from "contentful";

export type GetEntriesData =
  EntryCollection<Contentful.IEntryWorldOfZonoFields>;

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);

  const entries = await client.getEntries<Contentful.IEntryWorldOfZonoFields>({
    content_type: "entryWorldOfZono",
    skip: searchParams.get("skip"),
    limit: searchParams.get("limit"),
    order: searchParams.get("order"),
    "fields.category": searchParams.get("category"),
  });

  return new Response(JSON.stringify(entries as GetEntriesData));
}
