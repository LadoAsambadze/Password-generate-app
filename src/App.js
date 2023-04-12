import myImage from "./images/myImage.svg";
import iconCheck from "./images/iconCheck.svg";
import rightArrow from "./images/rightArrow.svg";
import rightArrowGreen from "./images/Shape.png";
import styles from "./styles.module.css";
import { useState } from "react";
function App() {
  const [password, setPassword] = useState("Password");
  const [characterLength, setCharacterLength] = useState(10);
  const [includeAppercase, setAppercase] = useState(false);
  const [includeLowercase, setLowercase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [includeSymbols, setSymbols] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [passwordLevel, setLevel] = useState("");

  function copyButton() {
    navigator.clipboard.writeText(password);
  }

  function generateLevel(passwordLevel) {
    let levelAnswer = "";
    let levelType = 0;
    if (includeAppercase) {
      levelType++;
    }
    if (includeLowercase) {
      levelType++;
    }
    if (numbers) {
      levelType++;
    }
    if (includeSymbols) {
      levelType++;
    }
    if (levelType === 0) {
      levelAnswer = "";
    }
    if (
      levelType === 1 ||
      (characterLength < 5 &&
        (includeAppercase || includeLowercase || numbers || includeSymbols))
    ) {
      levelAnswer = "TOO WEAK!";
    }
    if (
      levelType === 2 ||
      (characterLength > 5 &&
        characterLength < 10 &&
        (includeAppercase || includeLowercase || numbers || includeSymbols))
    ) {
      levelAnswer = "WEAK";
    }

    if (
      levelType === 3 ||
      (characterLength > 10 &&
        characterLength < 15 &&
        (includeAppercase || includeLowercase || numbers || includeSymbols))
    ) {
      levelAnswer = "MEDIUM";
    }
    if (
      levelType === 4 ||
      (characterLength > 15 &&
        (includeAppercase || includeLowercase || numbers || includeSymbols))
    ) {
      levelAnswer = "STRONG";
    }

    passwordLevel = levelAnswer;
    return passwordLevel;
  }

  function generatePassword(
    characterLength,
    includeUppercase,
    includeLowercase,
    numbers,
    includeSymbols
  ) {
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const symbolChars = '!@#$%^&*()_+-={}[];:"|,.<>?';

    let allowedChars = "";

    if (includeUppercase) {
      allowedChars += uppercaseChars;
    }

    if (includeLowercase) {
      allowedChars += lowercaseChars;
    }

    if (numbers) {
      allowedChars += numberChars;
    }

    if (includeSymbols) {
      allowedChars += symbolChars;
    }
    if (!includeAppercase && !includeLowercase && !numbers && !includeSymbols) {
      return (allowedChars += "Password");
    }

    let password = "";

    for (let i = 0; i < characterLength; i++) {
      const randomIndex = Math.floor(Math.random() * allowedChars.length);
      password += allowedChars[randomIndex];
    }

    return password;
  }

  function handleGeneratePassword() {
    const newPassword = generatePassword(
      characterLength,
      includeAppercase,
      includeLowercase,
      numbers,
      includeSymbols,
      passwordLevel
    );
    setShowMessage(
      !includeAppercase && !includeLowercase && !numbers && !includeSymbols
    );
    setPassword(newPassword);
    const newLevel = generateLevel(passwordLevel);
    setLevel(newLevel);
  }

  return (
    <div className={styles.app}>
      <h1 className={styles.header}>Password Generator</h1>
      <div className={styles.randomPassword}>
        <p className={styles.readyPassword}>{password}</p>
        <img
          alt="iconbutton"
          onClick={copyButton}
          src={myImage}
          className={styles.copyImage}
        />
      </div>
      <div className={styles.passwordOptions}>
        <div className={styles.lenghtDiv}>
          <p>Character Length</p>
          <p className={styles.number}>{characterLength}</p>
        </div>
        <div className={styles.slidecontainer}>
          <input
            className={styles.slider}
            style={{
              background: `linear-gradient(to right, #a4ffaf 0%, #a4ffaf ${
                characterLength * 5
              }%, #18171f 0%, #18171f 100%)`,
            }}
            type="range"
            min="1"
            max="20"
            id="myRange"
            onChange={(e) => setCharacterLength(e.target.value)}
            value={characterLength}
          />
        </div>

        <div className={styles.choose}>
          <label
            className={`${styles.inputBox} ${
              includeAppercase ? styles.checked : ""
            }`}
          >
            <input
              type="checkbox"
              className={styles.input}
              onChange={(e) => setAppercase(e.target.checked)}
              checked={includeAppercase}
            />
            <img
              src={iconCheck}
              alt="check icon"
              className={`${styles.iconCheck} ${
                includeAppercase ? styles.show : ""
              }`}
            />
          </label>
          <p className={styles.variant}>Include Uppercase Letters</p>
        </div>
        <div className={styles.choose}>
          <label
            className={`${styles.inputBox} ${
              includeLowercase ? styles.checked : ""
            }`}
          >
            <input
              type="checkbox"
              className={styles.input}
              onChange={(e) => setLowercase(e.target.checked)}
              checked={includeLowercase}
            />
            <img
              src={iconCheck}
              alt="check icon"
              className={`${styles.iconCheck} ${
                includeLowercase ? styles.show : ""
              }`}
            />
          </label>
          <p className={styles.variant}>Include Lowercase Letters</p>
        </div>
        <div className={styles.choose}>
          <label
            className={`${styles.inputBox} ${numbers ? styles.checked : ""}`}
          >
            <input
              type="checkbox"
              className={styles.input}
              onChange={(e) => setNumbers(e.target.checked)}
              checked={numbers}
            />
            <img
              alt="check icon"
              src={iconCheck}
              className={`${styles.iconCheck} ${numbers ? styles.show : ""}`}
            />
          </label>
          <p className={styles.variant}>Include Numbers</p>
        </div>
        <div className={styles.choose}>
          <label
            className={`${styles.inputBox} ${
              includeSymbols ? styles.checked : ""
            }`}
          >
            <input
              type="checkbox"
              className={styles.input}
              onChange={(e) => setSymbols(e.target.checked)}
              checked={includeSymbols}
            />
            <img
              alt="iconCheck"
              src={iconCheck}
              className={`${styles.iconCheck} ${
                includeSymbols ? styles.show : ""
              }`}
            />
          </label>
          <p className={styles.variant}>Include Symbols</p>
        </div>
        {showMessage && (
          <p className={styles.requiredAllow}>Must choose at least one</p>
        )}
        <div className={styles.level}>
          <p className={styles.strength}>STRENGTH</p>
          <div className={styles.visualDiv}>
            <p className={styles.strongLevel}>{passwordLevel}</p>
            <div
              className={styles.levelBox}
              style={{
                background:
                  passwordLevel === "TOO WEAK!"
                    ? "#F64A4A"
                    : passwordLevel === "WEAK"
                    ? "#FB7C58"
                    : passwordLevel === "MEDIUM"
                    ? "#F8CD65"
                    : passwordLevel === "STRONG"
                    ? "#A4FFAF"
                    : "",
              }}
            ></div>
            <div
              className={styles.levelBox}
              style={{
                background:
                  passwordLevel === "TOO WEAK"
                    ? "#FB7C58"
                    : passwordLevel === "WEAK"
                    ? "#FB7C58"
                    : passwordLevel === "MEDIUM"
                    ? "#F8CD65"
                    : passwordLevel === "STRONG"
                    ? "#A4FFAF"
                    : "",
              }}
            ></div>
            <div
              className={styles.levelBox}
              style={{
                background:
                  passwordLevel === "MEDIUM"
                    ? "#F8CD65"
                    : passwordLevel === "STRONG"
                    ? "#A4FFAF"
                    : "",
              }}
            ></div>
            <div
              className={styles.levelBox}
              style={{
                background: passwordLevel === "STRONG" ? "#A4FFAF" : "",
              }}
            ></div>
          </div>
        </div>

        <button
          type="submit"
          className={styles.forPadding}
          onClick={handleGeneratePassword}
        >
          GENERATE
          <img
            className={styles.rightArrow}
            src={rightArrow}
            alt="right arrow green"
          />
          <img
            className={styles.rightArrowGreen}
            src={rightArrowGreen}
            alt="right arrow green"
          />
        </button>
      </div>
    </div>
  );
}

export default App;
