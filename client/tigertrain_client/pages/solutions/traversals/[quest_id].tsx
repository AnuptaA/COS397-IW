import { useRouter } from "next/router";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function Solution() {
  // Get URL query using dynamic router
  const router = useRouter();
  const { quest_id } = router.query;

  const [effectiveId, setEffectiveId] = useState<string>("26");
  const [questionText, setQuestionText] = useState<string>("Loading");
  const [questionImg, setQuestionImg] = useState<string>(
    "https://placehold.co/900x400"
  );
  const [questionSol, setQuestionSol] = useState<string>("0,0,0,0,0");
  const [questionExp, setQuestionExp] = useState<string>(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  );
  const [questionResources, setQuestionResources] = useState<string>("Loading");
  const questType = "traversals";

  useEffect(() => {
    if (typeof quest_id === "string") {
      setEffectiveId(quest_id);
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/solutions/${questType}?quest_id=${quest_id}`)
        .then((response) => response.json())
        .then((data) => {
          setQuestionText(data.text);
          setQuestionImg(data.img);
          setQuestionSol(data.solution);
          setQuestionResources(data.resources);
          //   setQuestionExp(data.exp);          // save this for later
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [quest_id]);

  // used to format resources into a hyperlink, by default they are of
  // the form: "Lecture #N: {link to lecture N slides}; Section N of
  // Algorithms, 4th Edition by Sedgewick and Wayne" -> But the section
  // portion is not required
  const formatResources = () => {
    return questionResources.split("; ").map((resource, index, array) => {
      const lectureMatch = resource.match(/Lecture #(\d+): (https?:\/\/\S+)/);

      if (lectureMatch) {
        const [_, lectureNumber, link] = lectureMatch;
        return (
          <span key={index}>
            <a href={link} target="_blank" rel="noopener noreferrer">
              Lecture #{lectureNumber}
            </a>
            {index < array.length - 1 ? " | " : ""}
          </span>
        );
      }

      // Display non-lecture resources (like textbook sections)
      return (
        <span key={index}>
          {resource}
          {index < array.length - 1 ? " | " : ""}
        </span>
      );
    });
  };

  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Solution</title>
      <NavBar />
      <main>
        <div id="solution-cont">
          <ul>
            <li id="sol-quest-stmt">
              <p>
                <strong>{effectiveId}</strong>: {questionText}
              </p>
            </li>
            <li>
              <img id="sol-quest-img" src={questionImg} alt="Question" />
            </li>
            <li id="sol-sol">
              <strong>Solution</strong>: {questionSol}
            </li>
            <li id="explanation">Explanation: {questionExp} </li>
            <li id="explanation">
              <strong>Related resources:</strong> {formatResources()}
            </li>
            <li>
              <Link href={`/${questType.toLowerCase()}/${effectiveId}`}>
                Back to question
              </Link>
            </li>
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
