import { gql } from "@apollo/client";
import { apolloClient } from "..";

const Query = {
  challenge: gql(`query($request: ChallengeRequest!) {
    challenge(request: $request) {
          text
      }
    }
  `),
  verify: gql(`mutation($request: SignedAuthChallenge!) {
    authenticate(request: $request) {
      accessToken
      refreshToken
    }
  }`),
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
      mutation: Query.verify,
      variables: {
        request: {
          address,
          signature,
        },
      },
    });
  }
}

export default new AuthApi();
