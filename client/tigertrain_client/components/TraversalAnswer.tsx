import router from "next/router";
import React, { useEffect, useState } from "react";
import CSS from "csstype";

/**
 * @param quest_id: corresponding question ID
 * @param isExpired: boolean indicating timer status; true indicates
 *  time has expired, false indicates time remaining
 * @param setIsAnswered: useState function for toggling isAnswered
 * boolean; true indicates answered correctly, false indicates
 *  unanswered/incorrect
 */

type AnswerProps = {
  type: string;
  quest_id: string;
  isExpired: boolean;
  setIsAnswered: React.Dispatch<React.SetStateAction<boolean>>;
};

const incorrStyle: CSS.Properties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "red",
  fontSize: "1.25vw",
};

const AnswerBox = ({
  type,
  quest_id,
  isExpired,
  setIsAnswered,
}: AnswerProps) => {
  const [inputData, setInputData] = useState<string>("");
  const [suppStyle, setSuppStyle] = useState<CSS.Properties>(incorrStyle);
  const [suppText, setSuppText] = useState<string>(" ");
  const [isValid, setIsValid] = useState<number>(-1);
  const [canSubmit, setCanSubmit] = useState<boolean>(true);

  // Function handling form submission, waits asynchronoously and then
  // sends a POST request
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (canSubmit) {
      try {
        const response = await fetch(
          `http://localhost:8080/traversals?quest_id=${quest_id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ answer: inputData }),
          }
        );
        const data = await response.json();

        console.log("hello");
        console.log(data);
        console.log(parseInt(data.isValid));

        // set validation from server
        setIsValid(parseInt(data.isValid));
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  // Function handling user input; takes and sets input
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputData(event.target.value);
  };

  useEffect(() => {
    if (isValid === 1) {
      // Correct answer
      setSuppText("Correct, great work!");
      setSuppStyle({ color: "green" });
      setCanSubmit(false);
      setIsAnswered(true);
    } else if (!isExpired && isValid === 0) {
      // Incorrect answer, but time remaining
      setSuppText("Incorrect, try again.");
      setSuppStyle({ color: "red" });
    } else if (isExpired) {
      // Timer expired
      setSuppText("Your time has expired.");
      setSuppStyle({ color: "red" });
      setCanSubmit(false);
      setIsAnswered(true);
    } else {
      setSuppText(" ");
    }
  }, [isValid, isExpired]);

  return (
    <div className="ans-box-cont">
      <div className="ans-text-cont">
        <p className="answer-helper-text">
          Enter your answer as a sequence of comma-separated integers. (ex:
          0,3,1,2,5,6,7,4,9,8)
        </p>
        <p className="support-text" style={suppStyle}>
          {suppText}
        </p>
      </div>
      <div className="ans-input-cont">
        <form id="ans-form" onSubmit={handleSubmit}>
          <label htmlFor="user-ans">Type here:</label>
          <br />
          <input
            type="text"
            id="user-ans"
            name="user-ans"
            value={inputData}
            onChange={handleChange}
          />
          <br />
        </form>
      </div>
      <div className="ans-btns-cont">
        <button form="ans-form" id="submit-btn" type="submit">
          SUBMIT
        </button>
        <button
          id="solution-btn"
          type="button"
          onClick={() => router.push(`/solutions/${type}/${quest_id}`)}
        >
          SHOW SOLUTION
        </button>
      </div>
    </div>
  );
};

export default AnswerBox;
