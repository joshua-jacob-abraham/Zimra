import { useState, useRef } from "react";
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
    console.log("clicked");
  };

  const handleOutsideClick = (event) => {
    if (letterRef.current && !letterRef.current.contains(event.target)) {
      setLetterOpened(false);
      setOpened(false);
    }
  };

  return (
    <>
      {!letterOpened && (
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

      {letterOpened && (
        <div className="letter-back" onClick={handleOutsideClick}>
          <div
            className="letter-comp"
            ref={letterRef}
            onClick={(e) => e.stopPropagation()}
          >
            <img className="letter" src="/letter.svg" />
            <img
              className="heart"
              src="/heart-stamp.png"
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
