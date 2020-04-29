import React, { useState, useEffect } from "react";
import Quizcard from "./Quizcard";
import QuizcardSetting from "./QuizcardSetting";
import axios from "axios";

export const context = React.createContext();

export default function App() {
  const [quizcards, setQuizcards] = useState([]);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get("https://opentdb.com/api_category.php").then((res) => {
      setOptions(
        res.data.trivia_categories.map((one) => {
          return one;
        })
      );
    });
  }, []);

  const contextValues = {
    loading,
    setLoading,
  };

  return (
    <context.Provider value={contextValues}>
      <div className="container">
        <QuizcardSetting
          options={options}
          setQuizcards={setQuizcards}
        ></QuizcardSetting>
        <Quizcard flashcards={quizcards}></Quizcard>
      </div>
    </context.Provider>
  );
}
