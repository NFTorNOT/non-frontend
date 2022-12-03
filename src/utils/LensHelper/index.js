import PublicationApi from "../../graphql/PublicationApi";
import IPFSHelper from "../IPFSHelper";

class LensHelper {
  async postCommentWithDispatcher({ commentMetadata }) {
    const cid = await IPFSHelper.uploadDataToIPFS(commentMetadata);
    const postRequest = {
      profileId: "0x5671",
      publicationId: "0x5671-0x0b",
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
