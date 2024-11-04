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
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true); // Add loading state to prevent re-fetching

  useEffect(() => {
    if (loading) {
      fetch("http://localhost:8080/")
        .then((response) => response.json())
        .then((data) => {
          setQuestions(data);
          setLoading(false); // Set loading to false once data is loaded
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [loading]); // Only re-fetch if loading is true

  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>TigerTrain Homepage</title>
      <NavBar />
      <main>
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
