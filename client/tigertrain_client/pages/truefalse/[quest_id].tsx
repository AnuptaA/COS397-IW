import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import TrueFalseQuestionTable from "@/components/TrueFalseQuestionTable";
import Timer from "@/components/TrueFalseTimer";

type Question = {
    id: string
    text: string;
};

export default function TrueFalseQuestion() {
  const router = useRouter();
  const { quest_id } = router.query;

  const [effectiveId, setEffectiveId] = useState<string>("26");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionPts, setQuestionPts] = useState<number>(3);
  const [timerStatus, setTimerStatus] = useState<boolean>(false);
  const [questionStatus, setQuestionStatus] = useState<boolean>(false);

  useEffect(() => {
    if (typeof quest_id === "string") {
      setEffectiveId(quest_id);
      fetch(`http://localhost:8080/truefalse?quest_id=${quest_id}`)
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
      <main>
        <NavBar />
        <div className="tf-quest-cont">
          <TrueFalseQuestionTable questions={questions}/>
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
