import router from "next/router";
import React, { useEffect, useState } from "react";

type Question = {
  id: string;
  text: string;
};

type QuestionProps = {
  questions: Question[];
};

const TrueFalseQuestionTable = ({ questions }: QuestionProps) => {
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});

  const handleChange = (quest_id: string, value: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [quest_id]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Submitted Answers:", answers);
    // You can handle the answers here, like sending them to an API
  };

  return (
    <form id="tf-form" onSubmit={handleSubmit}>
      <div id="tf-table-cont">
        <table>
          <thead>
            <tr>
              <th>True/False Question</th>
              {/* <th>Answer</th> */}
            </tr>
          </thead>
          <tbody>
            {questions.map((question) => (
              <tr key={question.id}>
                <td className="tf-quest">
                  <span>{question.text}</span>
                </td>
                <td className="radio-btns">
                  <div className="tf-input">
                    <label>
                      <input
                        type="radio"
                        name={question.id} // This keeps each question's answers separate
                        value="true"
                        checked={answers[question.id] === "true"}
                        onChange={() => handleChange(question.id, "true")}
                      />
                      True
                    </label>
                  </div>
                  <div className="tf-input">
                    <label>
                      <input
                        type="radio"
                        name={question.id} // This keeps each question's answers separate
                        value="false"
                        checked={answers[question.id] === "false"}
                        onChange={() => handleChange(question.id, "false")}
                      />
                      False
                    </label>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="ans-btns-cont">
        <button id="tf-submit-btn" type="submit">
          SUBMIT
        </button>
        <button id="tf-sol-btn" type="button" onClick={() => router.push(`/solutions/`)}>
          SHOW SOLUTION
        </button>
      </div>
    </form>
  );
};

export default TrueFalseQuestionTable;
