import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import TrueFalseQuestionTable from "@/components/TrueFalseQuestionTable";
import Timer from "@/components/TrueFalseTimer";

type Question = {
  id: string;
  text: string;
};

export default function TrueFalseQuestion() {
  // Get URL query using dynamic router
  const router = useRouter();
  const { quest_id } = router.query;

  const [effectiveId, setEffectiveId] = useState<string>("26");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [timerStatus, setTimerStatus] = useState<boolean>(false);
  const [questionStatus, setQuestionStatus] = useState<boolean>(false);
  const questType = "truefalse";
  const questionPts = 3;

  useEffect(() => {
    if (typeof quest_id === "string") {
      setEffectiveId(quest_id);
      fetch(`http://localhost:8080/${questType}?quest_id=${quest_id}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          console.log(quest_id);
          setQuestions(data);
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
      <title>True/False Question</title>
      <NavBar />
      <main>
        <div className="tf-quest-cont">
          <TrueFalseQuestionTable
            quest_id={effectiveId}
            isExpired={timerStatus}
            setIsAnswered={setQuestionStatus}
            questions={questions}
          />
          <Timer
            points={questionPts}
            isAnswered={questionStatus}
            setIsExpired={setTimerStatus}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
