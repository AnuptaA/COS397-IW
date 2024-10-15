import React, { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Question from "@/components/Question";
import Answer from "@/components/Answer";
import Timer from "@/components/Timer";

export default function Home() {
  const [questionText, setQuestionText] = useState("Loading question...");
  const [questionImg, setQuestionImg] = useState("");
  const [questionPts, setQuestionPoints] = useState(1);

  //   useEffect(() => {
  //     // Fetch data from Flask backend
  //     fetch("http://localhost:8080/api/home")
  //     .then(response => response.json())
  //     .then(data => {
  //         console.log(data);
  //     })
  //     .catch(error => {
  //         console.error("Error fetching data:", error);
  //     });
  //   }, []);

  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Example Checklist Question</title>
      <link rel="stylesheet" href="main.css" />
      <main>
        <NavBar />
        <div className="page-ele-cont">
          <div className="quest-ans-timer-cont">
            <Question questionText={questionText} questionImg={questionImg} />
            <div className="timer-ans-cont">
              <Timer points={questionPts} />
              <Answer />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}