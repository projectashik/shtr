import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&family=Mulish:wght@600;700;800&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body className="bg-gray101 dark:bg-dark101">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
