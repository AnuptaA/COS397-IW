import React, { useState } from "react";
/**
 * @param questionId: corresponding question ID
 * @param questionText: corresponding question text fetched from server
 * @param questionImg: corresponding question image fetched from server
 */

interface QuestionProps {
  questionId: string;
  questionText: string;
  questionImg: string;
}

const Question: React.FC<QuestionProps> = ({
  questionId,
  questionText,
  questionImg,
}) => {
  const displayText = questionId + ". " + questionText;
  return (
    <div className="quest-box-cont">
      <div className="quest-text-cont">
        <p>{displayText}</p>
      </div>
      <div className="quest-img-cont">
        <img src={questionImg} alt="Question related" />
      </div>
    </div>
  );
};

export default Question;
