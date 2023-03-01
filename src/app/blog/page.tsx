import { GetEntriesData } from "app/api/entries/route";
import queryString from "query-string";

async function getEntries(): Promise<GetEntriesData> {
  const res = await fetch(
    queryString.stringifyUrl({
      url: `${process.env.URL}/api/entries`,
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
  console.dir(data.items);

  return <div>aaa</div>;
}

export default Page;
