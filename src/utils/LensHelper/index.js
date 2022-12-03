import PublicationApi from "../../graphql/PublicationApi";
import IPFSHelper from "../IPFSHelper";

class LensHelper {
  async postCommentWithDispatcher({ commentMetadata, profileId, publicationId }) {
    const cid = await IPFSHelper.uploadDataToIPFS(commentMetadata);
    const postRequest = {
      profileId: profileId,
      publicationId: publicationId,
      contentURI: `ipfs://${cid}`,
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
