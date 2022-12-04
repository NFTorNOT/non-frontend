import PublicationApi from "../../graphql/PublicationApi";

class LensHelper {
  async postCommentWithDispatcher({ commentMetadataCid, profileId, publicationId }) {
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
  }
  
}

export default new LensHelper();
