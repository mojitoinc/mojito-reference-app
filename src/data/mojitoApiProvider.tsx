import { FC, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { ApolloLink } from "@apollo/client/core";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
import { SubscriptionClient } from "subscriptions-transport-ws";
import moment from "moment";
import { setContext } from "@apollo/client/link/context";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { config } from "@constants";

interface MojitoApiProviderProps {
  children: React.ReactNode;
}

export const MojitoApiProvider: FC<MojitoApiProviderProps> = ({ children }) => {
  const { getIdTokenClaims } = useAuth0();

  const dataNormalizers = new ApolloLink((operation, forward) => {
    return forward(operation).map((response) => {
      if (response?.data) {
        const _data = response.data;

        if (_data.serverTime) {
          const serverTimeOffset =
            new Date(_data.serverTime).getTime() - Date.now();

          moment.now = function () {
            return serverTimeOffset + Date.now();
          };
        }

        response.data = _data;
      }

      return response;
    });
  });

  const authLink = setContext(async (_, { headers }) => {
    const token = await getIdTokenClaims();
    return {
      headers: {
        ...headers,
        ...(token
          ? {
              authorization: `Bearer ${token.__raw}`,
            }
          : {}),
      },
    };
  });

  const httpLink = createHttpLink({
    uri: config.MOJITO_API_URL,
  });

  const ssrMode = !process.browser;
  let link = httpLink;

  if (!ssrMode) {
    // Create a WebSocket link:
    const wsLink = new WebSocketLink(
      new SubscriptionClient(config.MOJITO_API_WS_URL || "", {
        reconnect: true,
        lazy: true,
      })
    );
    // using the ability to split links, you can send data to each link
    // depending on what kind of operation is being sent
    link = ApolloLink.split(
      // split based on operation type
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === "OperationDefinition" &&
          definition.operation === "subscription"
        );
      },
      wsLink,
      authLink.concat(dataNormalizers).concat(httpLink)
    );
  }

  const client = useRef(
    new ApolloClient({
      ssrMode: ssrMode,
      link: link,
      cache: new InMemoryCache(),
    })
  );

  return <ApolloProvider client={client.current}>{children}</ApolloProvider>;
};
