import React, { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import QuestionTable from "@/components/QuestionTable";

type Question = {
  id: string;
  type: string;
  area: string;
};

export default function Home() {
  // Send GET request immediately upon load, set fetched data
  const [questions, setQuestions] = useState<Question[]>([]);
  useEffect(() => {
    fetch("http://localhost:8080/")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>TigerTrain Homepage</title>
      <main>
        <NavBar />
        <div className="landing-cont">
          <h1>Welcome to TigerTrain!</h1>
          <h2>Practice for your upcoming COS226 exam here!</h2>
          <hr />
        </div>
        <QuestionTable questions={questions} />
      </main>
      <Footer />
    </>
  );
}
