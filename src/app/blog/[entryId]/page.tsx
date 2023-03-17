import SwrConfig from "components/SwrConfig";
import BlogEntry from "components/BlogEntry";
import { GetEntryData } from "app/api/entries/[entryId]/route";

async function getEntry({
  entryId,
}: {
  entryId: string;
}): Promise<GetEntryData> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/entries/${entryId}`,
    {
      cache: "no-store",
    }
  );

  return res.json();
}

type PageProps = {
  params: {
    entryId: string;
  };
};

async function Page({ params: { entryId } }: PageProps): Promise<JSX.Element> {
  const data = await getEntry({ entryId });

  return (
    <>
      <SwrConfig value={{ fallbackData: data }}>
        <BlogEntry entryId={entryId} />
      </SwrConfig>
    </>
  );
}

export default Page;
