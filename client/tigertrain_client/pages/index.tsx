import React, { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Question from "@/components/Question";
import AnswerBox from "@/components/Answer";
import Timer from "@/components/Timer";

export default function Home() {
  const [questionId, setQuestionId] = useState<string>("1");
  const [questionText, setQuestionText] = useState<string>(
    "Loading question..."
  );
  const [questionImg, setQuestionImg] = useState(
    "https://placehold.co/900x400"
  );
  const [questionPts, setQuestionPts] = useState<number>(1);
  const [timerStatus, setTimerStatus] = useState<boolean>(false);
  const [questionStatus, setQuestionStatus] = useState<boolean>(false);

  // Send GET request immediately upon load, set fetched data
  useEffect(() => {
    fetch("http://localhost:8080/traversals")
      .then((response) => response.json())
      .then((data) => {
        setQuestionId(data.id);
        setQuestionText(data.text);
        setQuestionImg(data.img);
        setQuestionPts(data.pts);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Traversal Question</title>
      <link rel="stylesheet" href="main.css" />
      <main>
        <NavBar />
        <div className="page-ele-cont">
          <div className="quest-ans-timer-cont">
            <Question
              questionId={questionId}
              questionText={questionText}
              questionImg={questionImg}
            />
            <div className="timer-ans-cont">
              <Timer
                points={questionPts}
                isAnswered={questionStatus}
                setIsExpired={setTimerStatus}
              />
              <AnswerBox
                isExpired={timerStatus}
                setIsAnswered={setQuestionStatus}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
