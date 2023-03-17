import client from "libs/client";
import { Entry } from "contentful";

export type GetEntryData = Entry<Contentful.IEntryWorldOfZonoFields>;

type ApiProps = {
  params: {
    entryId: string;
  };
};

export async function GET(
  _: Request,
  { params: { entryId } }: ApiProps
): Promise<Response> {
  const entry = await client.getEntry<GetEntryData>(entryId);

  return new Response(JSON.stringify(entry));
}
