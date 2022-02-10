import "../styles/globals.css";
import { ThemeProvider, useTheme } from "next-themes";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" enableSystem={true}>
      <Component {...pageProps} />
      <Toaster />
    </ThemeProvider>
  );
}

export default MyApp;
