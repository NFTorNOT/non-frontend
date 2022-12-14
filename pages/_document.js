import { Html, Head, Main, NextScript } from "next/document";

// https://nextjs.org/docs/messages/no-head-import-in-document
// https://nextjs.org/docs/advanced-features/custom-document
export default function Document() {
  return (
    <Html lang="en-US">
      <Head>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
