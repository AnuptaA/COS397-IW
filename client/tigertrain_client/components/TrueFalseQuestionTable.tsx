import router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CSS from "csstype";

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

const incorrStyle: CSS.Properties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "red",
  fontSize: "1.25vw",
  marginBottom: "1vw",
};

const TrueFalseQuestionTable = ({
  quest_id,
  isExpired,
  setIsAnswered,
  questions,
}: QuestionProps) => {
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const [isValid, setIsValid] = useState<number>(-1);
  const [suppStyle, setSuppStyle] = useState<CSS.Properties>(incorrStyle);
  const [suppText, setSuppText] = useState<string>(" ");
  const [canSubmit, setCanSubmit] = useState<boolean>(true);
  const questType = "truefalse";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (canSubmit) {
      if (!quest_id || !canSubmit) {
        console.log("Quest ID is missing or submission is disabled.");
        return;
      }
      try {
        const response = await fetch(
          `http://localhost:8080/truefalse?quest_id=${quest_id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ answer: answers }),
          }
        );
        const data = await response.json();

        setIsValid(data.isValid);
        setSuppText(data.message);
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

  useEffect(() => {
    if (isValid === 1) {
      // Correct answer
      setSuppStyle({ color: "green" });
      setCanSubmit(false);
      setIsAnswered(true);
    } else if (!isExpired && isValid === 0) {
      // Incorrect answer, but time remaining
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
  }, [isValid, isExpired, quest_id]);

  if (!quest_id || !questions.length) return null;

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
      <p className="support-text" style={suppStyle}>
        {suppText}
      </p>
    </form>
  );
};

export default TrueFalseQuestionTable;
