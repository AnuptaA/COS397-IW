interface QuestionProps {
  questionText: string;
  questionImg: string;
}

export default function Question({ questionText, questionImg }: QuestionProps) {
  return (
    <div className="quest-box-cont">
      <div className="quest-text-cont">
        <p>{questionText}</p>
      </div>
      <div className="quest-img-cont">
        <img src={questionImg} alt="Question related" />
      </div>
    </div>
  );
}
