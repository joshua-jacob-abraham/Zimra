import { useState, useRef, useEffect } from "react";
import domtoimage from "dom-to-image";
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
  const [isLoaded, setIsLoaded] = useState(false);
  const letterRef = useRef(null);
  const { name1, name2 } = useParams();

  const juliet = name1 || "Juliet";
  const romeo = name2 || "Romeo";

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
      .toPng(letterElement)
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

  useEffect(() => {
    const images = document.querySelectorAll("img");
    let loadedImages = 0;

    images.forEach((img) => {
      if (img.complete) {
        loadedImages++;
      } else {
        img.onload = () => {
          loadedImages++;
          if (loadedImages === images.length) {
            setIsLoaded(true);
          }
        };
      }
    });

    if (loadedImages === images.length) {
      setIsLoaded(true);
    }
  }, []);

  return (
    <>
      {isLoaded && !letterOpened && (
        <div className="container">
          {!opened && (
            <div className="envelope-closed" onClick={handleClick}>
              <img
                className="closed-back"
                src="/envelope-open-front-textured.svg"
                loading="lazy"
              />
              <img
                className="closed-front"
                src="/envelope-closed-front-textured-svg.svg"
                loading="lazy"
              />
            </div>
          )}

          {opened && (
            <div className="envelope-active" onClick={handleLetterClick}>
              <img
                className="open-back"
                src="/envelope-open-back-textured.svg"
                loading="lazy"
              />
              <img
                className="open-front"
                src="/envelope-open-front-textured.svg"
                loading="lazy"
              />
              <img
                className="letter-mini"
                src="/letter-mini-modified.svg"
                loading="lazy"
              />
            </div>
          )}

          <p className="the-to">To {juliet}</p>
        </div>
      )}

      {isLoaded && letterOpened && (
        <div className="letter-back" onClick={handleOutsideClick}>
          <div
            className="letter-comp"
            ref={letterRef}
            onClick={(e) => e.stopPropagation()}
          >
            <img className="letter" src="/letter.svg" loading="lazy" />
            <img
              className="heart"
              src="/heart-stamp.png"
              loading="lazy"
              onClick={handleHeartClick}
            />
            <p className="the-from">-{romeo}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default Envelope;
