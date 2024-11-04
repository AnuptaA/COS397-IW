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
