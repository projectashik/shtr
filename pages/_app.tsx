import "../styles/globals.css";
import { ThemeProvider, useTheme } from "next-themes";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { KBarProvider } from "kbar";
import React from "react";
import { actions } from "lib/actions";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" enableColorScheme enableSystem>
      <KBarProvider
        options={{
          enableHistory: true,
        }}
        actions={actions}
      >
        <Component {...pageProps} />
        <Toaster />
      </KBarProvider>
    </ThemeProvider>
  );
}

export default MyApp;
