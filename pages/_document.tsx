import { DocumentContext, Head, Html, Main, NextScript } from "next/document";

import {
DocumentHeadTags,
  DocumentHeadTagsProps,
documentGetInitialProps,
} from '@mui/material-nextjs/v13-pagesRouter';

export default function Document(props: JSX.IntrinsicAttributes & DocumentHeadTagsProps) {
  return (
    <Html lang="en">
      <Head>
        <DocumentHeadTags {...props} />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD"
          crossOrigin="anonymous"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

Document.getInitialProps = async (ctx: DocumentContext) => {
const finalProps = await documentGetInitialProps(ctx);
return finalProps;
};
