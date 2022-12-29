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

  createProfile: gql`
    mutation CreateProfile($request: CreateProfileRequest!) {
      createProfile(request: $request) {
        ... on RelayerResult {
          txHash
        }
        ... on RelayError {
          reason
        }
        __typename
      }
    }
  `,

  enableDispatcher: gql`
    mutation CreateSetDispatcherTypedData($request: SetDispatcherRequest!) {
      createSetDispatcherTypedData(request: $request) {
        id
        expiresAt
        typedData {
          types {
            SetDispatcherWithSig {
              name
              type
            }
          }
          domain {
            name
            chainId
            version
            verifyingContract
          }
          value {
            nonce
            deadline
            profileId
            dispatcher
          }
        }
      }
    }
  `,
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

  createProfile({ handle }) {
    return apolloClient.mutate({
      mutation: Query.createProfile,
      variables: {
        request: {
          handle,
        },
      },
    });
  }

  enableDispatcher({ profileId }) {
    return apolloClient.mutate({
      mutation: Query.enableDispatcher,
      variables: {
        request: {
          profileId,
        },
      },
    });
  }
}

export default new UserApi();
