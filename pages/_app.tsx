import useLocale from "hooks/useLocale";
import { KBarProvider } from "kbar";
import { actions } from "lib/actions";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import React from "react";
import { Toaster } from "react-hot-toast";
import { IntlProvider } from "react-intl";
import "../styles/globals.css";

const Intl = ({ children }: { children: React.ReactNode }) => {
  const { locale, messages } = useLocale();

  const Wrapper = ({ children }: any) => (
    <span className={locale}>{children}</span>
  );
  return (
    <IntlProvider
      locale={locale}
      messages={messages[locale]}
      textComponent={Wrapper}
    >
      {children}
    </IntlProvider>
  );
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Intl>
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
    </Intl>
  );
}

export default MyApp;
