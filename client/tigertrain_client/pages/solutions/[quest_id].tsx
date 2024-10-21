import { useRouter } from "next/router";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function Solution() {
  const router = useRouter();
  const { quest_id } = router.query;

  const [effectiveId, setEffectiveId] = useState<string>("26");
  const [questionText, setQuestionText] = useState<string>("Loading");
  const [questionImg, setQuestionImg] = useState<string>(
    "https://placehold.co/900x400"
  );
  const [questionSol, setQuestionSol] = useState<string>("0,0,0,0,0");
  const [questionExp, setQuestionExp] = useState<string>("Loading explanation");
  const [questtionType, setQuestionType] = useState<string>("traversals");

  useEffect(() => {
    if (typeof quest_id === "string") {
      setEffectiveId(quest_id);
      fetch(`http://localhost:8080/solutions?quest_id=${quest_id}`)
        .then((response) => response.json())
        .then((data) => {
          setQuestionText(data.text);
          setQuestionImg(data.img);
          setQuestionSol(data.solution);
          //   setQuestionExp(data.exp);          // save this for later
          setQuestionType(data.type);
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
        <div id="solution-cont">
          <ul>
            <li id="sol-quest-stmt">
              <p>
                <strong>{effectiveId}</strong>: {questionText}
              </p>
            </li>
            <li>
              <img id="sol-quest-img" src={questionImg}></img>
            </li>
            <li id="sol-sol">
              <strong>Solution</strong>: {questionSol}
            </li>
            <li id="explanation">{questionExp}</li>
            <li>
              <Link
                href={`/${questtionType.toLowerCase()}/${effectiveId}`}
              >Back to question</Link>
            </li>
          </ul>
        </div>
        <Footer />
      </main>
    </>
  );
}
