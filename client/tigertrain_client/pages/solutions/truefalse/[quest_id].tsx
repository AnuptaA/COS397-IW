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
  resources: string;
};

export default function Solution() {
  // Get URL query using dynamic router
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

  // used to format resources into a hyperlink, by default they are of
  // the form: "Lecture #N: {link to lecture N slides}; Section N of
  // Algorithms, 4th Edition by Sedgewick and Wayne" -> But the section
  // portion is not required
  const formatResources = (resources: string): JSX.Element[] => {
    return resources.split(";").map((resource, index, array) => {
      // Trim spaces to prevent issues with leading/trailing whitespace
      const trimmedResource = resource.trim();

      // Match the resource pattern for a lecture (Lecture #X: URL)
      const lectureMatch = trimmedResource.match(
        /Lecture #(\d+): (https?:\/\/\S+)/
      );

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

      // For non-lecture resources, simply display the text
      return (
        <span key={index}>
          {trimmedResource}
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
        <div id="tf-solution-cont">
          <ul>
            {questions.map((question) => (
              <li key={question.id}>
                <p>
                  <strong>{question.id}.</strong> {question.text}
                </p>
                <p className="tf-ans">
                  <strong>{question.answer}</strong> - {question.exp}
                  <br></br>
                  <strong>Related resources:</strong>{" "}
                  {formatResources(question.resources)}
                </p>
              </li>
            ))}
          </ul>
          <Link
            id="tf-back-link"
            href={`/${questType.toLowerCase()}/${effectiveId}`}
          >
            Back to question
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
