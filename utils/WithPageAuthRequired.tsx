import { useRouter } from "next/router";
import { useEffect } from "react";
import { useUser } from "hooks";
import { user } from "@prisma/client";

/**
 * @ignore
 */
export interface WithPageAuthRequiredProps {
  user: user;
  [key: string]: any;
}

export type IWithPageAuthRequired = <P extends WithPageAuthRequiredProps>(
  Component: React.ComponentType<P>,
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
    if (isLoading) return <div>Loading...</div>;
    if (user) return <Component user={user} {...(props as any)} />;
    if (error) return <div>Error: {error && error.message}</div>;
    return <div>Redirecting...</div>;
  };
};

export default WithPageAuthRequired;
