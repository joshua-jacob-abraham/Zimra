import { useState, useRef, useEffect } from "react";
import domtoimage from "dom-to-image-more";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import "./styles/Envelope.css";

function Envelope() {
  const [opened, setOpened] = useState(false);
  const [letterOpened, setLetterOpened] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const letterRef = useRef(null);

  const { name1, name2 } = useParams();
  const juliet = name1 || "Juliet";
  const rom = name2 || "Romeo";
  const romeo = "-" + rom;

  const handleClick = () => {
    setOpened(!opened);
  };

  const handleLetterClick = () => {
    setLetterOpened(!letterOpened);
  };

  const handleHeartClick = (event) => {
    event.stopPropagation();

    const letterElement = document.querySelector(".letter-comp");
    if (!letterElement) return;

    domtoimage
      .toPng(letterElement, { quality: 1, scale: 2 })
      .then((dataUrl) => {
        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = `Letter_From_${romeo}_To_${juliet}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      })
      .catch((error) => {
        console.error("Error generating image:", error);
      });
  };

  const handleOutsideClick = (event) => {
    if (letterRef.current && !letterRef.current.contains(event.target)) {
      setLetterOpened(false);
      setOpened(false);
    }
  };

  const imagePaths = [
    "/envelope-open-front-textured.svg",
    "/envelope-closed-front-textured-svg.svg",
    "/envelope-open-back-textured.svg",
    "/letter-mini-modified.svg",
    "/letter.svg",
    "/heart-stamp.png",
  ];

  useEffect(() => {
    let loadedImages = 0;

    imagePaths.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedImages++;
        if (loadedImages === imagePaths.length) {
          setImagesLoaded(true);
          console.log("loaded");
        }
      };
    });
  }, []);

  useEffect(() => {
    if (letterOpened) {
      setTimeout(() => {
        setShowTooltip(true);
      }, 1500);

      setTimeout(() => {
        setShowTooltip(false);
      }, 6000);
    }
  }, [letterOpened]);

  if (!imagesLoaded) {
    return (
      <p
        style={{
          fontFamily: "Cedarville Cursive",
          fontWeight: "400",
          fontSize: "16px",
          fontStyle: "normal",
        }}
      >
        Patient as love &#9825;
      </p>
    );
  }

  return (
    <>
      {!letterOpened && imagesLoaded && (
        <div className="container">
          {!opened && (
            <div className="envelope-closed" onClick={handleClick}>
              <img
                className="closed-back"
                src="/envelope-open-front-textured.svg"
              />
              <img
                className="closed-front"
                src="/envelope-closed-front-textured-svg.svg"
              />
            </div>
          )}

          {opened && (
            <div className="envelope-active" onClick={handleLetterClick}>
              <img
                className="open-back"
                src="/envelope-open-back-textured.svg"
              />
              <img
                className="open-front"
                src="/envelope-open-front-textured.svg"
              />
              <img className="letter-mini" src="/letter-mini-modified.svg" />
            </div>
          )}

          <p className="the-to">To {juliet}</p>
        </div>
      )}

      {letterOpened && imagesLoaded && (
        <div className="letter-back" onClick={handleOutsideClick}>
          <div
            className="letter-comp"
            ref={letterRef}
            onClick={(e) => e.stopPropagation()}
          >
            <img className="letter" src="/letter.svg" />

            <p className={`tooltip ${showTooltip ? "fade-in" : "fade-out"}`}>
              Click to save <span className="heart-icon">&#9825;</span>
            </p>

            <img
              className="heart"
              src="/heart-stamp.png"
              onClick={handleHeartClick}
            />
            <p className="the-from">{romeo}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default Envelope;
