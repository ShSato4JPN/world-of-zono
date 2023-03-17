"use client";
import useSWR from "swr";
import { useMemo } from "react";
import { GetEntryData } from "app/api/entries/[entryId]/route";
import styles from "./style.module.scss";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { parseISO, format } from "date-fns";

type BlogEntryProps = {
  entryId: string;
};

function BlogEntry({ entryId }: BlogEntryProps): JSX.Element {
  const { data } = useSWR<GetEntryData>(
    `${process.env.NEXT_PUBLIC_URL}/api/entries/${entryId}`
  );

  const categoryItems = useMemo(
    () =>
      data?.fields.category.map((name) => (
        <Link className={styles.anchor} href={`/category/${name}`} key={name}>
          <div className={styles.categoryItem}>{name}</div>
        </Link>
      )) || [],
    [data]
  );

  const article = useMemo(
    () =>
      data ? (
        <article>
          <div className={styles.title}>{data.fields.title}</div>
          <div className={styles.publishedAt}>
            {format(parseISO(data.fields.publishedAt), "yyyy-MM-dd")}
          </div>
          <div className={styles.categoryies}>{categoryItems}</div>
          <div className={styles.body}>
            <ReactMarkdown>{data.fields.body}</ReactMarkdown>
          </div>
        </article>
      ) : null,
    [categoryItems, data]
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <div className={styles.browserBack}>
          {article}
          <Link className={styles.anchor} href="/blog">
            戻る 💨
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BlogEntry;
