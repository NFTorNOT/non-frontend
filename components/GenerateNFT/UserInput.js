import React, { useState } from "react";
import styles from "./Generate.module.scss";

function UserInput(handleSubmit, style) {
  console.log({ handleSubmit, style });
  const [imageTitle, setImageTitle] = useState("");
  return (
    <div>
      <input
        type="text"
        value={imageTitle}
        onChange={(event) => setImageTitle(event.target.value)}
        onSubmit={() => handleSubmit}
        placeholder="Enter a title for your masterpiece..."
        className={styles.masterpeice}
      />
    </div>
  );
}

export default UserInput;
