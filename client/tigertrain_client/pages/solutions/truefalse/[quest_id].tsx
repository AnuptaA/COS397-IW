import { useRouter } from "next/router";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import axios from "axios";

type Question = {
  id: string;
  text: string;
  answer: string;
  resources: string;
  prompt_str: string;
};

export default function Solution() {
  // Get URL query using dynamic router
  const router = useRouter();
  const { quest_id } = router.query;

  const [effectiveId, setEffectiveId] = useState<string>("26");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [explanations, setExplanations] = useState<Record<string, string>>({});
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

  // Hits the ChatGPT API to generate a solution
  const generateChatGPTExplanation = async (
    prompt: string, questionId: string
  ): Promise<string> => {
    console.log("Entered generateChatGPTExplanation");
    const apiKey = process.env.NEXT_PUBLIC_CHATGPT_API_KEY;

    if (!apiKey) {
      throw new Error("API key is missing");
    }
    try {
      console.log("prompt = ", prompt)
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o",
          messages: [
            {
              role: "user", // Role of the user
              content: prompt, // The content of the user query
            },
          ],
          max_tokens: 2000,
          temperature: 0.5,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      // Check if response structure is valid before accessing data
      const generatedText = response.data.choices?.[0]?.message?.content?.trim();
      if (!generatedText) {
        throw new Error("No text generated");
      }
      else {
        setExplanations((prev) => ({
          ...prev,
          [questionId]: generatedText,
        }));
      }
      console.log("Generated Text:", generatedText);
      return generatedText;
    } catch (error) {
      console.error("Error generating text:", error);
      throw error;
    }
  };

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

  useEffect(() => {
    // Fetch explanations for all questions
    questions.forEach((question) => {
      if (!explanations[question.id]) {
        generateChatGPTExplanation(question.prompt_str, question.id);
      }
    });
  }, [questions]);

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
                  <strong>{question.answer}</strong> -{" "}
                  {explanations[question.id] || "Generating explanation from ChatGPT..."}
                  <br />
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
