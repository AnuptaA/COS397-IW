import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Question from "@/components/TraversalQuestion";
import AnswerBox from "@/components/TraversalAnswer";
import Timer from "@/components/TraversalTimer";

export default function TraversalQuestion() {
  const router = useRouter();
  const { quest_id } = router.query;

  const [effectiveId, setEffectiveId] = useState<string>("26");
  const [questionText, setQuestionText] = useState<string>(
    "Loading question..."
  );
  const [questionImg, setQuestionImg] = useState<string>(
    "https://placehold.co/900x400"
  );
  const [questionPts, setQuestionPts] = useState<number>(1);
  const [timerStatus, setTimerStatus] = useState<boolean>(false);
  const [questionStatus, setQuestionStatus] = useState<boolean>(false);

  useEffect(() => {
    if (typeof quest_id === "string") {
      setEffectiveId(quest_id);
      fetch(`http://localhost:8080/traversals?quest_id=${quest_id}`)
        .then((response) => response.json())
        .then((data) => {
          setQuestionText(data.text);
          setQuestionImg(data.img);
          setQuestionPts(data.pts);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [quest_id]);

  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Traversal Question</title>
      <main>
        <NavBar />
        <div className="page-ele-cont">
          <div className="quest-ans-timer-cont">
            <Question
              quest_id={effectiveId}
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
                quest_id={effectiveId}
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
