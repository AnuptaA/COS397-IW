import { useRouter } from "next/router";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

type Question = {
  id: string;
  text: string;
  answer: string;
  exp: string;
};

export default function Solution() {
  const router = useRouter();
  const { quest_id } = router.query;

  const [effectiveId, setEffectiveId] = useState<string>("26");
  const [questions, setQuestions] = useState<Question[]>([]);

  const questType = "truefalse";

  useEffect(() => {
    if (typeof quest_id === "string") {
      setEffectiveId(quest_id);
      fetch(`http://localhost:8080/solutions/${questType}?quest_id=${quest_id}`)
        .then((response) => response.json())
        .then((data) => {
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
      <title>Solution</title>
      <main>
        <NavBar />
        <div id="tf-solution-cont">
          <ul>
            {questions.map((question) => (
              <li key={question.id}>
                <p>
                  <strong>{question.id}.</strong> {question.text}
                </p>
                <p className="tf-ans">
                  <strong>{question.answer}</strong> - {question.exp} <small>
                    Related resources: This is a placeholder for the future.
                  </small>
                </p>
              </li>
            ))}
          </ul>
          <Link id="tf-back-link" href={`/${questType.toLowerCase()}/${effectiveId}`}>
            Back to question
          </Link>
        </div>
        <Footer />
      </main>
    </>
  );
}
