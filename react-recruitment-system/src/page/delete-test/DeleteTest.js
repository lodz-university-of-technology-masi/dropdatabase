import React, {useEffect, useState} from "react";
import DisplayQuestions from "../../component/display-questions/DisplayQuestions";
import axios from "axios";
import {FIREBASE_PATH} from "../../constants";

export const DeleteTest = (props) => {

  /*----------------------- VARIABLE REGION -----------------------*/
  // TEMPORARY ARRAY TO DELETE
  const [questionArray, setQuestionArray] = useState([
    {"name": "vfvfvfv"},
    {"name": "vfvfvfv"},
    {"name": "vfvfvfv"},
    {"name": "vfvfvfv"},
  ]);

  const [testArray, setTestArray] = useState([]);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(FIREBASE_PATH)
      .then(res => {
        setTestArray(res.data);
        // setTestArray(Object.entries(res.data));
        // console.log(res.data)
        // console.log(Object.entries(res.data));
        setLoad(true);
      })
      .catch(err => {
        setError(err.message);
        setLoad(true);
      })
  }, []);

  const handleDeleteTest = () => {

  };

  /*------------------------ RETURN REGION ------------------------*/

  //THIS SHOULD BE IN LOOP LIKE IN DISPLAY TEST BUT CURRENTLY THERE IS A PROBLEM WITH ARRAY
  return (
    <>
      <DisplayQuestions
        isRemovable={true}
        questionArray={questionArray}
        handleDeleteTest={handleDeleteTest}
      />
    </>
  );
};

export default DeleteTest;
    