import { account } from "@prisma/client";
import { useUser } from "hooks";
import { useRouter } from "next/router";
import { useEffect } from "react";

const defaultOnRedirecting = (): JSX.Element => <>Redirecting...</>;

export interface WithRedirectIfAutheticatedOptions {
  redirectTo?: string;
  onRedirecting?: () => JSX.Element;
}

/**
 * @ignore
 */
export interface WithRedirectIfAutheticatedProps {
  user: account;
  [key: string]: any;
}

export type IWithRedirectIfAutheticated = <
  P extends WithRedirectIfAutheticatedProps
>(
  Component: React.ComponentType<P>,
  options?: WithRedirectIfAutheticatedOptions
) => React.FC<Omit<P, "user">>;

const WithRedirectIfAutheticated: IWithRedirectIfAutheticated = (
  Component,
  options = {}
) => {
  return function WithRedirectIfAuthenticated(props): JSX.Element {
    const { redirectTo, onRedirecting = defaultOnRedirecting } = options;
    const { user, isLoading } = useUser();
    const dashboardUrl = "/";
    const router = useRouter();
    useEffect(() => {
      if (!user || isLoading) return;
      if (redirectTo) {
        router.push(redirectTo);
      } else {
        router.push(dashboardUrl);
      }
    }, [user, isLoading, redirectTo, router]);

    if (!user) return <Component {...(props as any)} />;
    return onRedirecting();
  };
};

export default WithRedirectIfAutheticated;
