import React, { useState, useEffect } from "react";

const TrueFalseQuestionTable = () => {
  const [answers, setAnswers] = useState({});

  const questions = [
    { id: "q1", question: "Can pigs fly??" },
    { id: "q2", question: "Do I believe that I can touch the sky?" },
    { id: "q3", question: "Is the Earth flat?" },
    {
      id: "q4",
      question:
        "Are you the strongest because you're Gojo Satoru? Or are you Gojo Satoru because you're the strongest?",
    },
    {
        id: "q5",
        question:
        "What would you do for a Klondike bar?"
    }
  ];

  const handleChange = () => {};

  return (
    <>
      <div id="tf-table-cont">
        {/* <table id="tf-quest-table">
          <thead>
            <tr className="tf-head-row">
              <th>Question</th>
              <th>True/False</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question) => (
              <tr className="data-row" key={10}>
                <td>{question.questionText}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table> */}
        <table>
          <thead>
            <tr>
              <th>Question Statement</th>
              <th>Answer</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((item) => (
              <tr key={item.id}>
                <td className="tf-quest">
                  <span>{item.question}</span>
                </td>
                <td className="radio-btns">
                  <label>
                    <input type="radio" name={item.id} value="true" />
                    True
                  </label>
                  <label>
                    <input type="radio" name={item.id} value="false" />
                    False
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button id="tf-submit-btn">SUBMIT</button>
      </div>
    </>
  );
};

export default TrueFalseQuestionTable;
