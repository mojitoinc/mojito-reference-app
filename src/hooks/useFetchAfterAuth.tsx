import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

export function useFetchAfterAuth(cb: () => void): boolean {
  const { isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) cb();
  }, [isAuthenticated, isLoading]);
  return isLoading;
}
