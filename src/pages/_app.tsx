import { AuthProvider } from "@/context";
// import "@primer/css/dist/primer.css";
import { BaseStyles, ThemeProvider } from "@primer/react";
import { AnimatePresence } from "motion/react";
import { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <ThemeProvider>
      <BaseStyles>
        <Head>
          <title>Opton</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <AnimatePresence mode="wait">
          <AuthProvider>
            <Component key={router.route} {...pageProps} />
          </AuthProvider>
        </AnimatePresence>
      </BaseStyles>
    </ThemeProvider>
  );
}
