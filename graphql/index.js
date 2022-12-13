import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { Constants } from "../utils/Constants";
import SessionHelper from "../utils/SessionHelper";
import { AuthApiOperationName } from "./AuthApi";

const httpLink = new HttpLink({ uri: process.env.NEXT_PUBLIC_LENS_API_URL });

const authLink = new ApolloLink(async (operation, forward) => {
  if (operation.operationName !== AuthApiOperationName.refreshTokens) {
    await SessionHelper.checkAndUpdateTokens();
  }

  const token = sessionStorage.getItem(
    Constants.SESSION_STORAGE_ACCESS_TOKEN_KEY
  );

  if (token) {
    operation.setContext({
      headers: {
        "x-access-token": token ? `Bearer ${token}` : "",
      },
    });
  }
  return forward(operation);
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({ resultCaching: false }),
  queryDeduplication: false,
});
