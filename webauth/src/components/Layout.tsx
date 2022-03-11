import Head from "next/head";
import { ReactNode } from "react";
import * as tw from "tailwindcss-classnames";

export interface LayoutProps {
  children: ReactNode;
  title: string;
}

export default function Layout({ children, title }: LayoutProps) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.svg" />
        <meta name="description" content="authentication web ui" />
      </Head>
      <main>
        <div
          className={tw.classnames(
            tw.display("flex"),
            tw.flexDirection("flex-col"),
            tw.justifyContent("justify-center"),
            tw.alignItems("items-center"),
            tw.minHeight("min-h-screen"),
            tw.padding("p-10")
          )}
        >
          {children}
        </div>
      </main>
    </div>
  );
}
