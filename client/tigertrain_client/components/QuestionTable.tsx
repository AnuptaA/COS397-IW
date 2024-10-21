import React, { useState, useEffect } from "react";
import Link from "next/link";

/**
 * @paramm questions: array of question objects fetched from server
 */

type Question = {
  id: string;
  type: string;
  area: string;
};

type QuestionProps = {
  questions: Question[];
};

const QuestionTable = ({ questions }: QuestionProps) => {
  return (
    <>
      <div id="quest-table-cont">
        <div className="table-wrapper">
          <table id="quest-table">
            <thead>
              <tr className="head-row">
                <th>ID</th>
                <th>Question Type</th>
                <th>Topic Area</th>
              </tr>
            </thead>
            <tbody>
              {/* Placeholder code to test scroll (overflow-y: auto) */}
              {/* {Array.from({ length: 20 }, (_, index) => (
                <tr className="data-row" key={index}>
                  <td>
                    <a href="#">Example ID {index + 1}</a>
                  </td>
                  <td>Example Question Type</td>
                  <td>Example Topic Area</td>
                </tr>
              ))} */}
              {questions.map((question) => (
                <tr className="data-row" key={question.id}>
                  <td>
                    <Link
                      href={`/${question.type.toLowerCase()}/${question.id}`}
                    >
                      {question.id}
                    </Link>
                  </td>
                  <td>{question.type}</td>
                  <td>{question.area}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default QuestionTable;
