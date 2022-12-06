import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client";
import { Constants } from "../utils/Constants";


const httpLink = new HttpLink({ uri: process.env.REACT_APP_LENS_API_URL });

const authLink = new ApolloLink((operation, forward) => {
  const token = sessionStorage.getItem(Constants.SESSION_STORAGE_ACCESS_TOKEN_KEY);
  if(token){
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
  cache: new InMemoryCache({resultCaching: false}),
  queryDeduplication: false,
});
