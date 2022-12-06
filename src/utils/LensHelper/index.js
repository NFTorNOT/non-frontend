import PublicationApi from "../../graphql/PublicationApi/index";

class LensHelper {
  async postCommentWithDispatcher({
    commentMetadataCid,
    profileId,
    publicationId,
  }) {
    const postRequest = {
      profileId: profileId,
      publicationId: publicationId,
      contentURI: `ipfs://${commentMetadataCid}`,
      collectModule: {
        revertCollectModule: true,
      },
      referenceModule: {
        degreesOfSeparationReferenceModule: {
          commentsRestricted: true,
          mirrorsRestricted: true,
          degreesOfSeparation: 0,
        },
      },
    };

    const response = await PublicationApi.createCommentViaDispatcher(
      postRequest
    );
    const { txHash, txId } = response.data.createCommentViaDispatcher || {};
    return { txHash, txId };
  }

  async pollUntilIndexed({ txId, txHash }) {
    while (true) {
      console.log("pool until indexed: polling again")
      const response = (await PublicationApi.hasTxBeenIndexed({txId, txHash})).data.hasTxHashBeenIndexed;
      console.log("pool until indexed: result", response);

      if (response.__typename === "TransactionIndexedResult") {
        console.log("pool until indexed: indexed", response.indexed);
        console.log(
          "pool until metadataStatus: metadataStatus",
          response.metadataStatus
        );

        console.log(response.metadataStatus);
        if (response.metadataStatus) {
          if (response.metadataStatus.status === "SUCCESS") {
            return response;
          }

          if (response.metadataStatus.status === "METADATA_VALIDATION_FAILED") {
            throw new Error(response.metadataStatus.status);
          }
        } else {
          if (response.indexed) {
            return response;
          }
        }

        console.log(
          "pool until indexed: sleep 1500 milliseconds"
        );
        await new Promise((resolve) => setTimeout(resolve, 1500));
      } else {
        console.log("error", response.reason)
        throw new Error(response.reason);
      }
    }
  }
}

export default new LensHelper();
