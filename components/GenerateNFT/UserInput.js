import React, { useState } from "react";
import { ClipLoader } from "react-spinners";
import styles from "./Generate.module.scss";

function UserInput({
  onSubmit,
  image,
  onSubmitToVote,
  putImageToVoteInProgress,
}) {
  const [imageTitle, setImageTitle] = useState("");
  return (
    <div>
      <input
        type="text"
        value={imageTitle}
        onChange={(event) => {
          setImageTitle(event.target.value);
          onSubmit(event.target.value);
        }}
        placeholder="Enter a title for your masterpiece..."
        className={styles.masterpeice}
      />
      <button
        disabled={!imageTitle}
        onClick={() => onSubmitToVote(image.image_url)}
        className={`${styles.submitVote} ${!imageTitle ? styles.disabled : {}}`}
        type="submit"
        title="Submit for voting"
      >
        {putImageToVoteInProgress ? (
          <ClipLoader color={"#fff"} loading={true} size={15} />
        ) : (
          "Submit for voting"
        )}
      </button>
    </div>
  );
}

export default UserInput;
