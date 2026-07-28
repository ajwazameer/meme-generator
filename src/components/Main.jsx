import { useState, useEffect } from "react";
export default function Main() {
  const URL = "https://api.imgflip.com/get_memes";
  const [meme, setMeme] = useState({
    topText: "One does not simply",
    bottomText: "Walk into Mordor",
    imageUrl: "http://i.imgflip.com/1bij.jpg",
  });
  function handleChange(event) {
    const { value, name } = event.currentTarget;
    setMeme((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
    console.log(meme.topText);
  }
  const [memeArray, setMemeArray] = useState([]);
  useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => setMemeArray(data.data.memes));
  }, []);

  function generateRandomNumber() {
    return Math.floor(Math.random() * memeArray.length);
  }
  function getNewMeme() {
    const num = generateRandomNumber();
    setMeme((prevValue) => ({
      ...prevValue,
      imageUrl: memeArray[num].url,
    }));
  }
  return (
    <main>
      <div className="form">
        <label>
          Top Text
          <input
            type="text"
            placeholder="One does not simply"
            name="topText"
            onChange={handleChange}
            value={meme.topText}
          />
        </label>

        <label>
          Bottom Text
          <input
            type="text"
            placeholder="Walk into Mordor"
            name="bottomText"
            onChange={handleChange}
            value={meme.bottomText}
          />
        </label>
        <button onClick={getNewMeme}>Get a new meme image 🖼</button>
      </div>
      <div className="meme">
        <img src={meme.imageUrl} />
        <span className="top">{meme.topText}</span>
        <span className="bottom">{meme.bottomText}</span>
      </div>
    </main>
  );
}
