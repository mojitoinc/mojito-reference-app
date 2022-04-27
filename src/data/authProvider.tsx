import { ReactNode } from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { useRouter } from "next/router";
import { config } from "@constants";
export interface IAuth0State {
  returnTo?: string;
  origin?: string;
  query?: { [key: string]: string };
}

export const AuthProvider = ({
  children,
}: {
  children: ReactNode | ReactNode[];
}) => {
  const router = useRouter();

  const onRedirectCallback = (appState?: IAuth0State) => {
    router.push({
      pathname: appState?.returnTo || window.location.pathname,
      query: { redirect_url: appState?.origin, ...appState?.query },
    });
  };

  return (
    <Auth0Provider
      domain={config.AUTH0_DOMAIN!}
      clientId={config.AUTH0_CLIENT_ID!}
      redirectUri={config.AUTH0_REDIRECT_URI}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};
