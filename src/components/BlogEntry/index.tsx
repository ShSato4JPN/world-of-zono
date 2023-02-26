"use client";
import useSWR from "swr";
import { Fragment, useMemo } from "react";
import { Entry } from "pages/api/entries/index";
import styles from "./style.module.scss";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import fetcher from "libs/fetcher";

type BlogEntryProps = {
  id: string;
};

function BlogEntry({ id }: BlogEntryProps): JSX.Element {
  const { data } = useSWR<Entry>(`api/entries/${id}`, fetcher);
  const categoryItems = useMemo(
    () =>
      data?.entry.category.map((name, index) => (
        <Fragment key={index}>
          <Link className={styles.anchor} href={`/category/${name}`}>
            <div className={styles.categoryItem} key={index}>
              {name}
            </div>
          </Link>
        </Fragment>
      )),
    [data]
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        {data ? (
          <article>
            <div className={styles.title}>{data?.entry.title}</div>
            <div className={styles.publishedAt}>
              {data.entry.publishedAt.slice(0, 10)}
            </div>
            <div className={styles.categoryies}>{categoryItems}</div>
            <div className={styles.body}>
              <ReactMarkdown>{data.entry.body}</ReactMarkdown>
            </div>
            <div className={styles.browserBack}>
              <Link className={styles.anchor} href="/blog">
                戻る 💨
              </Link>
            </div>
          </article>
        ) : null}
      </div>
    </div>
  );
}

export default BlogEntry;
