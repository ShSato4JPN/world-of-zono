"use client";
import { SWRConfig } from "swr";
import { ReactNode } from "react";

export type SwrConfigProps = {
  children: ReactNode;
  // eslint-disable-next-line
  value: any;
};

function SwrConfig({ children, value }: SwrConfigProps): JSX.Element {
  return <SWRConfig value={value}>{children}</SWRConfig>;
}

export default SwrConfig;
