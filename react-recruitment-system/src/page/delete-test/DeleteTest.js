import React, {useEffect, useState} from "react";
import {USER_SESSION_ID} from "../../constants";
import DisplayQuestions from "../../component/display-questions/DisplayQuestions";
import axios from "axios";
import {FIREBASE_PATH} from "../../constants";


export const DeleteTest = (props) => {

  /*----------------------- VARIABLE REGION -----------------------*/
  // TEMPORARY ARRAY TO DELETE
//  const [questionArray, setQuestionArray] = useState([
//    {"name": "vfvfvfv"},
//    {"name": "vfvfvfv"},
//    {"name": "vfvfvfv"},
//    {"name": "vfvfvfv"},
//  ]);

  const [testArray, setTestArray] = useState([]);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(FIREBASE_PATH + "/tests")
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

  const handleDeleteTest = (e) => {
      let test = {
          "user": {
            "userToken": USER_SESSION_ID
          },
          "testUUID": e.testUUID,
          "questions": e.questions
      };
      console.log(JSON.stringify(test));
//      console.log(questionArray)
//      let test = {
//          "user": {
//            "userToken": USER_SESSION_ID
//          },
//          "testUUID": uuidv4(),
//          "questions": questionArray
//      };
//      console.log(test);
      console.log(test);
      console.log(FIREBASE_PATH+"/test");
      axios.delete(FIREBASE_PATH+"/test", {
  headers: {
    'Content-Type': 'application/json'
  },
  data: test
}).then(() => {alert("Test has been deleted");window.location.reload()}).catch((error)=>console.log(error));
  };

  /*------------------------ RETURN REGION ------------------------*/

  //THIS SHOULD BE IN LOOP LIKE IN DISPLAY TEST BUT CURRENTLY THERE IS A PROBLEM WITH ARRAY
     if (load) {
        let items = [];
        for (let test of testArray) {
            console.log(test);
            items.push(<DisplayQuestions
                isRemovable={true}
                questionArray={test.questions}
                handleDeleteTest={handleDeleteTest}
                testUUID = {test.testUUID} 
                key = {test.testUUID}
                all = {test}
              />)
        }
        return(items);
    } else {
        return ( <
            div >
            Loading...
            <
            /div>
        );
    }
};

export default DeleteTest;
    