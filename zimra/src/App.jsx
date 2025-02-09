import { useState, useRef, useEffect } from "react";
import "./styles/Envelope.css";

function App() {
  const [opened, setOpened] = useState(false);
  const [letterOpened, setLetterOpened] = useState(false);
  const letterRef = useRef(null);

  const handleClick = () => {
    setOpened(!opened);
  };

  const handleLetterClick = () => {
    setLetterOpened(!letterOpened);
  };

  useEffect(() => {
    function handleOutsideClick(event) {
      if (letterRef.current && !letterRef.current.contains(event.target)) {
        setLetterOpened(false);
      }
    }

    if (letterOpened) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("touchstart", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [letterOpened]);

  return (
    <>
      {!letterOpened && (
        <div className="container">
          {!opened && (
            <div className="envelope-closed" onClick={handleClick}>
              <img className="closed-back" src="/envelope-closed-back.png" />
              <img className="closed-front" src="/envelope-closed-front.png" />
            </div>
          )}

          {opened && (
            <div className="envelope-active" onClick={handleLetterClick}>
              <img className="open-back" src="/envelope-open-back.png" />
              <img className="open-front" src="/envelope-open-front.png" />
              <img className="letter-mini" src="/letter-mini.png" />
            </div>
          )}
        </div>
      )}

      {letterOpened && (
        <div className="letter-back">
          <img ref={letterRef} className="letter" src="/letter.png" />
        </div>
      )}
    </>
  );
}

export default App;
