"use client";
import React, { useCallback, useMemo } from "react";
import Link from "next/link";
import useSWRInfinite, { SWRInfiniteKeyLoader } from "swr/infinite";
import InfiniteScroll, { Props } from "react-infinite-scroll-component";
import { GetEntriesData } from "app/api/entries/route";
import { Oval } from "react-loader-spinner";
import styles from "./style.module.scss";
import queryString from "query-string";

const getKey: SWRInfiniteKeyLoader<GetEntriesData> = (
  pageIndex,
  previousPageData
) =>
  previousPageData && !previousPageData.items.length
    ? null
    : queryString.stringifyUrl({
        url: `${process.env.NEXT_PUBLIC_URL}/api/entries`,
        query: {
          skip: pageIndex * 5,
          limit: 5,
          order: "-fields.publishedAt",
        },
      });

function BlogTop(): JSX.Element {
  const { data, size, setSize } = useSWRInfinite<GetEntriesData>(getKey);

  const items = useMemo(
    () =>
      data
        ?.map(({ items }) =>
          items.map(({ fields: { body, publishedAt, title }, sys: { id } }) => (
            <div className={styles.entryItem} key={id}>
              <p className={styles.publishedAt}>{publishedAt.slice(0, 10)}</p>
              <h2 className={styles.title}>
                <Link className={styles.anchor} href={`/blog/${id}`}>
                  {title}
                </Link>
              </h2>
              <p className={styles.openingSentence}>{body.slice(0, 100)}...</p>
              <p className={styles.readMore}>
                <Link className={styles.anchor} href={`/blog/${id}`}>
                  続きを読む 👆
                </Link>
              </p>
            </div>
          ))
        )
        .flat() || [],
    [data]
  );
  const next = useCallback<Props["next"]>(() => {
    setSize(size + 1);
  }, [setSize, size]);
  const hasMore = useMemo<Props["hasMore"]>(
    () => (data?.at(0)?.total || 0) > items.length,
    [data, items.length]
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <InfiniteScroll
          dataLength={items.length}
          next={next}
          hasMore={hasMore}
          loader={
            <div className={styles.loaderWrapper}>
              <Oval
                color="#609dc9f9"
                secondaryColor="#808080"
                strokeWidth={2}
                strokeWidthSecondary={2}
                visible={true}
                height={50}
                width={50}
              />
            </div>
          }
        >
          {items}
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default BlogTop;
