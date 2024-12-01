import router from "next/router";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

/**
 * @param quest_id: corresponding question ID
 * @param isExpired: boolean indicating timer status; true indicates
 * time has expired, false indicates time remaining
 * @param setIsAnswered: useState function for toggling isAnswered
 * boolean; true indicates answered correctly, flase indicates
 * unanswered/incorrect
 * @param questions: array of Question objects
 */

type Question = {
  id: string;
  text: string;
};

type QuestionProps = {
  quest_id: string;
  isExpired: boolean;
  setIsAnswered: React.Dispatch<React.SetStateAction<boolean>>;
  questions: Question[];
};

const TrueFalseQuestionTable = ({
  quest_id,
  isExpired,
  setIsAnswered,
  questions,
}: QuestionProps) => {
  const MySwal = withReactContent(Swal);
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const [canSubmit, setCanSubmit] = useState<boolean>(true);
  const questType = "truefalse";

  // Function handling form submission, waits asynchronoously and then
  // sends a POST request
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (canSubmit) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/${questType}?quest_id=${quest_id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ answer: answers }),
          }
        );

        const data = await response.json();

        // Set state based on the response
        let valid = parseInt(data.isValid);

        // Handle the response directly here
        if (valid === 1) {
          MySwal.fire({
            title: "Correct!",
            text: data.message,
            icon: "success",
          });
          setCanSubmit(false);
          setIsAnswered(true);
        } else if (!isExpired && valid === 0) {
          MySwal.fire({
            icon: "error",
            title: "Oops...",
            text: data.message,
          });
        }
      } catch (error) {
        console.log("Error:", error);
      }
    }
  };

  const handleChange = (index: number, value: string) => {
    // create shallow copy of previous answers (THIS IS DANGEROUS)
    // review this later
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
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
    <form id="tf-form" onSubmit={handleSubmit}>
      <div id="tf-table-cont">
        <table>
          <thead>
            <tr>
              <th>True/False Question</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question, index) => (
              <tr key={question.id}>
                <td className="tf-quest">
                  <span>
                    <strong>{question.id}.</strong> {question.text}
                  </span>
                </td>
                <td className="radio-btns">
                  <div className="tf-input">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value="true"
                      onChange={() => handleChange(index, "T")}
                    />
                    <label>True</label>
                  </div>
                  <div className="tf-input">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value="false"
                      onChange={() => handleChange(index, "F")}
                    />
                    <label>False</label>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="ans-btns-cont">
        <button form="tf-form" id="tf-submit-btn" type="submit">
          SUBMIT
        </button>
        <button
          id="tf-sol-btn"
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
    </form>
  );
};

export default TrueFalseQuestionTable;
