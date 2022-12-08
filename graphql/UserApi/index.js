import { gql } from "@apollo/client";
import { apolloClient } from "..";

const Query = {
  profiles: gql(`query UserProfiles($request: ProfileQueryRequest!) {
    profiles(request: $request) {
      items {
        ...ProfileFields
        interests
        stats {
          totalFollowing
        }
        isDefault
        dispatcher {
          canUseRelay
        }
      }
    }
    userSigNonces {
      lensHubOnChainSigNonce
    }
  }
  
  fragment ProfileFields on Profile {
    id
    name
    handle
    bio
    ownedBy
    isFollowedByMe
    stats {
      totalFollowers
      totalFollowing
    }
    attributes {
      key
      value
    }
    picture {
      ... on MediaSet {
        original {
          url
        }
      }
      ... on NftImage {
        uri
      }
    }
  }
  `),
};

class UserApi {
  profiles({ownedBy}) {
    console.log({ownedBy})
    return apolloClient.query({
      query: Query.profiles,
      variables: {
        request: {
            ownedBy,
        },
      },
    });
  }
}

export default new UserApi();
