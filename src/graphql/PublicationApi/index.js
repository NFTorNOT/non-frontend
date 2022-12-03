import { gql } from "@apollo/client";
import { apolloClient } from "..";

const Query = {
  comment: gql(`
          mutation($request: CreatePublicCommentRequest! ){
            createCommentTypedData(request: $request){
              id
              expiresAt
              typedData{
                types{
                  CommentWithSig{
                    name
                    type
                  }
                }
                domain{
                  name
                  chainId
                  version
                  verifyingContract
                }
                value{
                  nonce
                  deadline
                  profileId
                  contentURI
                  profileIdPointed
                  pubIdPointed
                  collectModule
                  collectModuleInitData
                  referenceModule
                  referenceModuleData
                  referenceModuleInitData
                }
              }
            }
          }
  `),
  commentViaDispatcher: gql(`mutation($request:CreatePublicCommentRequest!){
    createCommentViaDispatcher(request: $request){
      ... on RelayerResult{
        txId
        txHash
      }
      ... on RelayError{
        reason
      }
    }
  }`),

  // publications: gql(``)
};

class PublicationApi {

  createCommentTypedData(request) {
    return apolloClient.mutate({
      mutation: Query.comment,
      variables: {
        request: request
      }
    })
  }

  createCommentViaDispatcher(request){
    return apolloClient.mutate({
      mutation: Query.commentViaDispatcher,
      variables: {
        request
      }
    })
  }


}

export default new PublicationApi();
