import router from "next/router";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

/**
 * @param quest_id: corresponding question ID
 * @param isExpired: boolean indicating timer status; true indicates
 *  time has expired, false indicates time remaining
 * @param setIsAnswered: useState function for toggling isAnswered
 * boolean; true indicates answered correctly, false indicates
 *  unanswered/incorrect
 */

type AnswerProps = {
  quest_id: string;
  isExpired: boolean;
  setIsAnswered: React.Dispatch<React.SetStateAction<boolean>>;
};

const AnswerBox = ({ quest_id, isExpired, setIsAnswered }: AnswerProps) => {
  const MySwal = withReactContent(Swal);
  const [inputData, setInputData] = useState<string>("");
  const [canSubmit, setCanSubmit] = useState<boolean>(true);
  const questType = "traversals";

  // Function handling form submission, waits asynchronoously and then
  // sends a POST request if input is non-empty
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (canSubmit) {
      if (inputData === "") {
        MySwal.fire({
          icon: "error",
          title: "Oops..",
          text: "Please enter a valid string.",
        });
      } else {
        try {
          const response = await fetch(
            `http://localhost:8080/${questType}?quest_id=${quest_id}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ answer: inputData }),
            }
          );

          const data = await response.json();

          // Set state based on the response
          let valid = parseInt(data.isValid);

          // Handle the response directly here
          if (valid === 1) {
            MySwal.fire({
              title: "Correct!",
              text: "Great work soldier!",
              icon: "success",
            });
            setCanSubmit(false);
            setIsAnswered(true);
          } else if (!isExpired && valid === 0) {
            MySwal.fire({
              icon: "error",
              title: "Oops...",
              text: "Incorrect, please try again.",
            });
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
    }
  };

  // Function handling user input; takes and sets input
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputData(event.target.value);
  };

  // Handle timer expiration
  useEffect(() => {
    if (isExpired) {
      MySwal.fire({
        icon: "error",
        title: "Time's Up!",
        text: "Your time has expired :(",
      });
      setCanSubmit(false);
      setIsAnswered(true);
    }
  }, [isExpired]);

  return (
    <div className="ans-box-cont">
      <div className="ans-text-cont">
        <p className="answer-helper-text">
          Enter your answer as a sequence of comma-separated integers. (ex:
          0,3,1,2,5,6,7,4,9,8)
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
          onClick={() => {
            if (quest_id) {
              router.push(`/solutions/${questType}/${quest_id}`);
            } else {
              console.log("Quest ID not available yet.");
            }
          }}
        >
          SHOW SOLUTION
        </button>
      </div>
    </div>
  );
};

export default AnswerBox;
