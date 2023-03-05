"use client";
import "./globals.scss";
import { SWRConfig } from "swr";
import { ReactNode } from "react";
import fetcher from "libs/fetcher";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <SWRConfig value={{ fetcher }}>{children}</SWRConfig>
      </body>
    </html>
  );
}
