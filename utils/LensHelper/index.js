import PublicationApi from "../../graphql/PublicationApi/index";

class LensHelper {
  async postWithDispatcher({ postMetadataCid, profileId, profileAddress }) {
    const postRequest = {
      profileId: profileId,
      contentURI: `ipfs://${postMetadataCid}`,
      collectModule: {
        feeCollectModule: {
          amount: {
            currency: "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889",
            value: "1.00",
          },
          recipient: profileAddress,
          followerOnly: false,
          referralFee: 0,
        },
      },
      referenceModule: {
        degreesOfSeparationReferenceModule: {
          commentsRestricted: true,
          mirrorsRestricted: true,
          degreesOfSeparation: 0,
        },
      },
    };

    const response = await PublicationApi.createPostViaDispatcher(postRequest);
    const { txHash, txId } = response.data.createPostViaDispatcher || {};
    return { txHash, txId };
  }

  async pollUntilIndexed({ txId, txHash }) {
    while (true) {
      console.log("pool until indexed: polling again");
      const response = (await PublicationApi.hasTxBeenIndexed({ txId, txHash }))
        .data.hasTxHashBeenIndexed;
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

        console.log("pool until indexed: sleep 1500 milliseconds");
        await new Promise((resolve) => setTimeout(resolve, 1500));
      } else {
        console.log("error", response.reason);
        throw new Error(response.reason);
      }
    }
  }
}

export default new LensHelper();
