import Head from "next/head";
import { memo, useEffect, useState } from "react";
import Navbar from "../nav";

export const metadata = {
  title: "Bundo App",
  description: "We’re simplifying Retail for everyday people who sell and buy",
};

// eslint-disable-next-line react/display-name
const Layout = memo((props) => {

  return (
    <div className="wrapper pt-32 w-100 position-relative">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="Bundo App"
          content="We’re simplifying Retail for everyday people who sell and buy"
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <main className="h-screen">
        <div>
          <Navbar />
          <div className="flex w-full">
            <div className="md:w-48 border-r border-base-color-3"> 
            </div>
            <div className={`w-full ${props.className}`}>{props.children}</div>
          </div>
        </div>
      </main>
    </div>
  );
});

export default Layout;
