"use client";
import useSWR from "swr";
import { Fragment, useMemo } from "react";
import { GetEntryData } from "app/api/entries/[id]/route";
import styles from "./style.module.scss";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

type BlogEntryProps = {
  id: string;
};

function BlogEntry({ id }: BlogEntryProps): JSX.Element {
  const { data } = useSWR<GetEntryData>(
    `${process.env.NEXT_PUBLIC_URL}/api/entries/${id}`
  );

  const categoryItems = useMemo(
    () =>
      data?.fields.category.map((name, index) => (
        <Fragment key={index}>
          <Link className={styles.anchor} href={`/category/${name}`}>
            <div className={styles.categoryItem} key={index}>
              {name}
            </div>
          </Link>
        </Fragment>
      )) || [],
    [data]
  );

  const article = useMemo(
    () =>
      data ? (
        <article>
          <div className={styles.title}>{data.fields.title}</div>
          <div className={styles.publishedAt}>
            {data.fields.publishedAt.slice(0, 10)}
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
