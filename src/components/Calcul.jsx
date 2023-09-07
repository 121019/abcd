import React, { Component } from "react";
import add from "../utils/calcul.js";

import blancheneigeskull from "/Assets/blancheneigeskull.jpg";
import monalisaskull from "/Assets/monalisaskull.jpg";
import femmeageeskull from "/Assets/femmeageeskull.jpg";
import zombieskull from "/Assets/zombieskull.png";
import supermanskull from "/Assets/supermanskull.jpg";
import personnageeffrayant from "/Assets/personnageeffrayant.jpg";
import personnageeffrayant1 from "/Assets/personnageeffrayant1.jpg";
import personnageeffrayant2 from "/Assets/personnageeffrayant2.jpg";
import personnageeffrayant3 from "/Assets/personnageeffrayant3.jpg";

import princess from "/Assets/princess.jpg";
import princess3 from "/Assets/princess3.jpg";
import princess1 from "/Assets/princess1.jpg";
import magiciendoz from "/Assets/magiciendoz.jpg";
import alladinpinup from "/Assets/alladinpinup.jpg";
import magiciendoz2pinup from "/Assets/magiciendoz2pinup.jpg";
import meregrandpinup from "/Assets/meregrandpinup.jpg";
import princessPinUp3 from "/Assets/princessPinUp3.jpg";
import blancheneigepinup2 from "/Assets/blancheneigepinup2.jpg";
import princess2 from "/Assets/princess2.jpg";

import "./Calcul.css";

const badResponseImages = [
  personnageeffrayant,
  personnageeffrayant1,
  personnageeffrayant2,
  personnageeffrayant3,
  zombieskull,
  blancheneigeskull,
  monalisaskull,
  supermanskull,
  femmeageeskull,
];

const goodResponseImages = [
  princess,
  princess1,
  princess3,
  princess2,
  magiciendoz,
  magiciendoz2pinup,
  blancheneigepinup2,
  meregrandpinup,
  alladinpinup,
  princessPinUp3,
];

let { correctAnswer, num1, num2 } = add();

console.log(correctAnswer);
class Calcul extends Component {
  constructor() {
    super();
    this.state = {
      num1: num1,
      num2: num2,
      answer: "",
      score: 0,
      feedback: "",
      goodResponseImage: null,
      badResponseImage: null,
      showConfirmation: true,
    };
  }

  checkAnswer = () => {
    const { answer, score } = this.state;

    if (parseInt(answer) === correctAnswer) {
      // correct answer
      this.playCorrectSound(); // For play the sound
      this.setState({
        score: score + 1,

        answer: "",
        feedback: <p className="goodReponse">Bonne réponse</p>,
        goodResponseImage:
          goodResponseImages[
            Math.floor(Math.random() * goodResponseImages.length)
          ],
        showConfirmation: false,
        playCorrectSound: true,
        playIncorrectSound: true,
      });
      //Reset Image after 6 sec
      setTimeout(() => {
        this.setState({ goodResponseImage: null });
      }, 6000);
    } else {
      this.playIncorrectSound(); //for play the sound
      this.setState({
        feedback: <p className="badReponse">Mauvaise réponse</p>,
        badResponseImage:
          badResponseImages[
            Math.floor(Math.random() * badResponseImages.length)
          ],
      });
      setTimeout(() => {
        this.setState({ badResponseImage: null });
      }, 6000);
    }
  };

  handleChange = (e) => {
    this.setState({ answer: e.target.value });
  };

  playCorrectSound() {
    let audio = new Audio("public/Assets/SF-fouet3.mp3");
    audio.play();
  }

  playIncorrectSound() {
    let audio = new Audio(
      "public/Assets/Female_Scream_Horror-NeoPhyTe-goodanswer.mp3"
    );
    audio.play();
  }

  handleNumericInputChange = (e) => {
    const numericValue = e.target.value.replace(/[^0-9]/);
    this.setState({ answer: numericValue });
  };

  render() {
    const {
      num1,
      num2,
      answer,
      score,
      feedback,
      badResponseImage,
      goodResponseImage,
      showConfirmation,
    } = this.state;

    const imageStyle = {
      height: "90svh",
    };
    return (
      <>
        <div className="calcul">
          <h1>Générateur de Calcul Mental</h1>
        </div>
        <div className="numbers">
          <p>
            <span className="num1">{num1}</span> +{" "}
            <span className="num2">{num2}</span> =
            <input
              type="text"
              value={answer}
              onChange={this.handleNumericInputChange}
              placeholder="Votre réponse"
            />
          </p>
        </div>
        <h2>{showConfirmation ? "T'es sur de toi ???" : ""}</h2>
        <div className="divButton">
          <button onClick={this.checkAnswer}>Valider...</button>
        </div>{" "}
        {feedback && <p>{feedback}</p>}
        <div className={`${showConfirmation ? "good-response" : ""}`}>
          <div className="picture">
            {goodResponseImage && (
              <img
                className="goodImage"
                src={goodResponseImage}
                alt="Image de bonne réponse"
                style={imageStyle}
              />
            )}
          </div>
        </div>
        <div className={`${showConfirmation ? "wrong-response" : ""}`}>
          {badResponseImage && (
            <img
              className="badImage"
              src={badResponseImage}
              alt="Image de mauvaise réponse"
              style={imageStyle}
            />
          )}
        </div>
        <div className="score">
          <p>Score : {score}</p>
        </div>
      </>
    );
  }
}

export default Calcul;
correctAnswer;
