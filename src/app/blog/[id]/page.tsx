import SwrConfig from "app/SwrConfig";
import BlogEntry from "components/BlogEntry";
import Title from "components/Title";
import { Entry } from "pages/api/entries";

async function getEntry({ id }: { id: string }): Promise<Entry> {
  const res = await fetch(`${process.env.URL}/api/entries/${id}`, {
    next: { revalidate: 60 * 60 },
  });

  return res.json();
}

type PageProps = {
  params: {
    id: string;
  };
};

async function Page({ params: { id } }: PageProps): Promise<JSX.Element> {
  const entry = await getEntry({ id });

  return (
    <>
      <Title title={entry.entry.title} />
      <SwrConfig fallbackData={entry}>
        <BlogEntry id={id} />
      </SwrConfig>
    </>
  );
}

export default Page;
