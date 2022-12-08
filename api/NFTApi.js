import axios from "axios";
class NFTApi {
  submitToVote({ receiverAddress, imageUrl, imageTitle }) {
    return axios.post("https://nftornot.com/api/mint-nft", {
      receiver_address: receiverAddress,
      image_url: imageUrl,
      description: imageTitle
    });
  }
}

export default new NFTApi();
