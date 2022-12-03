import { gql } from "@apollo/client";
import { apolloClient } from "..";
import { Constants } from "../../utils/Constants";

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
  verifyToken: gql(`query($request: VerifyRequest!){
    verify(request: $request)
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

  verifyToken(){
    const accessToken = sessionStorage.getItem(Constants.SESSION_STORAGE_ACCESS_TOKEN_KEY)
    return apolloClient.query({
      query: Query.verifyToken,
      variables: {
        request: {
          accessToken
        }
      }
    })
  }
}

export default new AuthApi();
