import { GetEntriesData } from "app/api/entries/route";
import queryString from "query-string";
import BlogTop from "components/BlogTop";
import SwrConfig from "components/SwrConfig";

async function getEntries(): Promise<GetEntriesData> {
  const res = await fetch(
    queryString.stringifyUrl({
      url: `${process.env.NEXT_PUBLIC_URL}/api/entries`,
      query: {
        skip: 0,
        limit: 5,
        order: "-fields.publishedAt",
      },
    }),
    { cache: "no-store" }
  );

  return res.json();
}

async function Page() {
  const data = await getEntries();

  return (
    <SwrConfig value={{ fallbackData: [data] }}>
      <BlogTop />
    </SwrConfig>
  );
}

export default Page;
