import React, { useState } from "react";
import styles from "./Generate.module.scss";

function UserInput({ onSubmit }) {
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
    </div>
  );
}

export default UserInput;
