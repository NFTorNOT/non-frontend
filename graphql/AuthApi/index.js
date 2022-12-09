import { gql } from "@apollo/client";
import { apolloClient } from "..";

export const AuthApiOperationName = {
  refreshTokens: "refreshTokens"
}

const Query = {
  challenge: gql(`query($request: ChallengeRequest!) {
    challenge(request: $request) {
          text
      }
    }
  `),
  authenticate: gql(`mutation($request: SignedAuthChallenge!) {
    authenticate(request: $request) {
      accessToken
      refreshToken
    }
  }`),
  refresh: gql(`mutation ${AuthApiOperationName.refreshTokens}($request: RefreshRequest!){
    refresh(request:$request){
      accessToken
      refreshToken
    }
  }`)
};

class AuthApi {
  queryChallengeText({address}) {
    return apolloClient.query({
      query: Query.challenge,
      variables: {
        request: {
          address,
        },
      },
    });
  }

  verifySignature({address, signature}) {
    return apolloClient.mutate({
      mutation: Query.authenticate,
      variables: {
        request: {
          address,
          signature,
        },
      },
    });
  }

  refresh({refreshToken}){
    return apolloClient.mutate({
      mutation: Query.refresh,
      variables: {
        request: {
          refreshToken
        }
      }
    })
  }
}

export default new AuthApi();
