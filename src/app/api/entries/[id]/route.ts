import client from "libs/client";
import { Entry } from "contentful";

export type GetEntryData = Entry<Contentful.IEntryWorldOfZonoFields>;

type ApiProps = {
  params: {
    id: string;
  };
};

export async function GET(
  _: Request,
  { params: { id } }: ApiProps
): Promise<Response> {
  const entry = await client.getEntry<GetEntryData>(id);

  return new Response(JSON.stringify(entry));
}
