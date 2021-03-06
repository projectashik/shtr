import { account } from "@prisma/client";
import { useUser } from "hooks";
import { useRouter } from "next/router";
import { useEffect } from "react";

/**
 * @ignore
 */
export interface WithPageAuthRequiredProps {
  user: account;
  [key: string]: any;
}

export type IWithPageAuthRequired = <P extends WithPageAuthRequiredProps>(
  Component: any,
  options?: { [key: string]: any }
) => React.FC<Omit<P, "user">>;
const WithPageAuthRequired: IWithPageAuthRequired = (
  Component,
  options = {}
) => {
  return function WithPageAuthRequired(props): JSX.Element {
    const { user, isLoading, error } = useUser();
    const router = useRouter();

    useEffect(() => {
      if ((user && !error) || !isLoading) return;
      router.push("/login");
    }, [user, error, isLoading, router]);
    if (isLoading || !error) return <div>Loading...</div>;
    if (user) return <Component user={user} {...(props as any)} />;
    return <div>Redirecting...</div>;
  };
};

export default WithPageAuthRequired;
