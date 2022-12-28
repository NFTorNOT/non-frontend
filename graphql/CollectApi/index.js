import { gql } from "@apollo/client";
import { apolloClient } from "..";
import { Constants } from "../../utils/Constants";

const Query = {
  createCollectTypedData:
    gql(`mutation CreateCollectTypedData($request: CreateCollectRequest!) {
    createCollectTypedData(request: $request) {
      id
      expiresAt
      typedData {
        types {
          CollectWithSig {
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
          pubId
          data
        }
      }
    }
  }`),

  generateModuleCurrencyApprovalData:
    gql(`query GenerateModuleCurrencyApprovalData($request: GenerateModuleCurrencyApprovalDataRequest!) {
    generateModuleCurrencyApprovalData(request: $request) {
      to
      from
      data
    }
  }`),

  broadCast: gql(`mutation Broadcast($request: BroadcastRequest!) {
    broadcast(request: $request) {
      ... on RelayerResult {
        txHash
        txId
      }
      ... on RelayError {
        reason
      }
    }
  }`),
};

class CollectApi {
  createCollectTypedData({ publicationId }) {
    return apolloClient.mutate({
      mutation: Query.createCollectTypedData,
      variables: {
        request: {
          publicationId,
        },
      },
    });
  }

  generateModuleCurrencyApprovalData() {
    return apolloClient.mutate({
      mutation: Query.generateModuleCurrencyApprovalData,
      variables: {
        request: {
          currency: Constants.WMATIC_CURRENCY_ADDRESS,
          collectModule: Constants.FEE_COLLECT_MODULE,
          value: "100",
        },
      },
    });
  }

  broadCast({ id, signature }) {
    return apolloClient.mutate({
      mutation: Query.broadCast,
      variables: {
        request: {
          id,
          signature,
        },
      },
    });
  }
}

export default new CollectApi();
