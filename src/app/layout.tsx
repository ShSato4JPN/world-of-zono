"use client";
import "./globals.scss";
import SwrConfig from "components/SwrConfig";
import { ReactNode } from "react";
import fetcher from "libs/fetcehr";
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <SwrConfig value={{ fetcher }}>{children}</SwrConfig>
      </body>
    </html>
  );
}
