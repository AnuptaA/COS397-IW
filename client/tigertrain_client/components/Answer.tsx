import React, { useState } from "react";

/**
 * @param user_answer: string input typed by user
 */

interface AnswerProps {
  user_answer: string;
}

const AnswerBox: React.FC<AnswerProps> = () => {
    const [inputData, setInputData] = useState("");

    const handleSubmit = () => {

    };

    const handleChange = () => {

    };

    return (
        <div className="ans-box-cont">
          <div className="ans-text-cont">
            <p>
              Enter your answer as a sequence of comma-separated integers. (ex:
              0,3,1,2,5,6,7,4,9,8)
            </p>
          </div>
          <div className="ans-input-cont">
            <form>
              <label htmlFor="user-ans">Type here:</label>
              <br />
              <input
                type="text"
                id="user-ans"
                name="user-ans"
                value={inputData}
                onChange={handleChange}
              />
              <br />
            </form>
          </div>
          <div className="submit-btn-cont">
            <button id="submit-btn" onClick={handleSubmit}>SUBMIT</button>
          </div>
        </div>
      );
}

export default AnswerBox;
