import React, { useRef, useContext } from "react";
import axios from "axios";
import { context } from "./App";

export default function QuizcardSetting({ options, setQuizcards }) {
  const { loading, setLoading } = useContext(context);

  const optionEl = useRef();
  const amountEl = useRef();

  function handleFormSubmit(e) {
    e.preventDefault();
    setLoading(true);

    axios
      .get("https://opentdb.com/api.php?amount=10", {
        params: {
          amount: amountEl.current.value,
          category: optionEl.current.selectedOptions[0].getAttribute("data-id"),
        },
      })
      .then((res) => {
        setLoading(false);
        setQuizcards(
          res.data.results.map((one, i) => {
            return {
              id: i,
              question: chgToReadableText(one.question),
              answer: chgToReadableText(one.correct_answer),
              options: [...one.incorrect_answers, one.correct_answer]
                .sort(() => Math.random() - 0.5)
                .map((one) => chgToReadableText(one)),
            };
          })
        );
      });
  }

  function chgToReadableText(str) {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = str;
    return textArea.value;
  }

  return (
    <>
      <div className="setting-container">
        <form action="" className="setting-form" onSubmit={handleFormSubmit}>
          <div className="category">
            <select
              name="slct"
              id="slct"
              defaultValue="Choose an option"
              ref={optionEl}
            >
              <option disabled>Choose an option</option>
              {options.map((option) => {
                return (
                  <option
                    value={option.name}
                    key={option.id}
                    data-id={option.id}
                  >
                    {option.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="main-setting">
            <div className="number">
              <input
                type="number"
                min="1"
                max="50"
                defaultValue="10"
                ref={amountEl}
              />
            </div>
            <div className="submit">
              <button>Generate</button>
            </div>
          </div>
        </form>
      </div>
      <div className={`${loading ? "loading" : "not-loading"}`}>
        <p>Loading...</p>
      </div>
    </>
  );
}
