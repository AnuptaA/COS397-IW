import React, { useState } from "react";

/**
 * @param quest_id: corresponding question ID
 * @param questionText: corresponding question text fetched from server
 * @param questionImg: corresponding question image path fetched from
 * server
 */

type QuestionProps = {
  quest_id: string;
  questionText: string;
  questionImg: string;
};

const Question = ({ quest_id, questionText, questionImg }: QuestionProps) => {
  return (
    <div className="quest-box-cont">
      <div className="quest-text-cont">
        <p> <strong>{quest_id}.</strong> {questionText}</p>
      </div>
      <div className="quest-img-cont">
        <img src={questionImg} alt="Question related" />
      </div>
    </div>
  );
};

export default Question;
