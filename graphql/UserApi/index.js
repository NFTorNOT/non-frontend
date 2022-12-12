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

  defaultProfile: gql(`query DefaultProfile($request: DefaultProfileRequest!) {
    defaultProfile(request: $request) {
      id
      name
      bio
      isDefault
      attributes {
        displayType
        traitType
        key
        value
      }
      followNftAddress
      metadata
      handle
      picture {
        ... on NftImage {
          contractAddress
          tokenId
          uri
          chainId
          verified
        }
        ... on MediaSet {
          original {
            url
            mimeType
          }
        }
      }
      coverPicture {
        ... on NftImage {
          contractAddress
          tokenId
          uri
          chainId
          verified
        }
        ... on MediaSet {
          original {
            url
            mimeType
          }
        }
      }
      ownedBy
      dispatcher {
        address
        canUseRelay
      }
      stats {
        totalFollowers
        totalFollowing
        totalPosts
        totalComments
        totalMirrors
        totalPublications
        totalCollects
      }
      followModule {
        ... on FeeFollowModuleSettings {
          type
          contractAddress
          amount {
            asset {
              name
              symbol
              decimals
              address
            }
            value
          }
          recipient
        }
        ... on ProfileFollowModuleSettings {
         type
        }
        ... on RevertFollowModuleSettings {
         type
        }
      }
    }
  }`),
};

class UserApi {
  profiles({ ownedBy }) {
    console.log({ ownedBy });
    return apolloClient.query({
      query: Query.profiles,
      variables: {
        request: {
          ownedBy,
        },
      },
    });
  }

  defaultProfile({ walletAddress }) {
    return apolloClient.query({
      query: Query.defaultProfile,
      variables: {
        request: {
          ethereumAddress: walletAddress,
        },
      },
    });
  }
}

export default new UserApi();
