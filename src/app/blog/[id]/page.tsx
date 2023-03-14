import SwrConfig from "components/SwrConfig";
import BlogEntry from "components/BlogEntry";
import { GetEntryData } from "app/api/entries/[id]/route";

async function getEntry({ id }: { id: string }): Promise<GetEntryData> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/entries/${id}`, {
    cache: "no-store",
  });

  return res.json();
}

type PageProps = {
  params: {
    id: string;
  };
};

async function Page({ params: { id } }: PageProps): Promise<JSX.Element> {
  const data = await getEntry({ id });

  return (
    <>
      <SwrConfig value={{ fallbackData: data }}>
        <BlogEntry id={id} />
      </SwrConfig>
    </>
  );
}

export default Page;
