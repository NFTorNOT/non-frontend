import styles from "./Main.module.scss";

export default function GenerateNFT() {
  const wordOfTheDay = "Light";
  const imageurl = "https://static.nftornot.com/img.png";
  var sectionStyle = {
    backgroundImage: `url(${imageurl})`,
  };
  return (
    <div className={styles.generateNFT}>
      <div className={styles.enter_prompt_container}>
        <div>Enter Prompt</div>
        <textarea className={styles.prompt_area}>
          Dramatic sky and buildings painting
        </textarea>
        <div>Filter</div>
        <div className={styles.generateText}>
          Explore various stylistic filters you can apply
        </div>
        <select className={styles.dropdown} name="cars" id="cars">
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select>

        <button className={styles.button}>Generate Image</button>
      </div>

      <div className={styles.secondTab}>
        <div className={styles.yellow}>Word of the day</div>
        <center>
          <div className={styles.wordOfDay}>"{wordOfTheDay}"</div>
        </center>
        <div className={styles.generatedImage}>
          <div className={styles.generatedImagePrompts} style={sectionStyle}>
            <div className={styles.bottom}>
              <input
                type="text"
                placeholder="Enter a title for your masterpiece..."
                className={styles.masterpeice}
              ></input>

              <button className={styles.submitVote} type="submit">
                Submit for voting
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
