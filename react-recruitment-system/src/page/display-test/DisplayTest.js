import React, {
    useEffect,
    useState
} from "react";
import axios from "axios";
import {
    FIREBASE_PATH
} from "../../constants";
import DisplayQuestions from "../../component/display-questions/DisplayQuestions";

export const DisplayTest = (props) => {

    /*----------------------- VARIABLE REGION -----------------------*/

    //TEST ARRAY WILL CONTAINS QUESTION ARRAYS AND IN RETURN PART WILL BE LOOPED AND AND IN
    //EVERY ITERATION QUESTIONARRAY WILL BE PASSED TO DISPLAYqUESTION COMPONENT

    const [questionArray, setQuestionArray] = useState([
        {
            "name": "vfvfvfv"
        },
        {
            "name": "vfvfvfv"
        },
        {
            "name": "vfvfvfv"
        },
        {
            "name": "vfvfvfv"
        },
  ]);

    const [testArray, setTestArray] = useState([]);
    const [load, setLoad] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get(FIREBASE_PATH+"/tests")
            .then(res => {
                setTestArray(res.data);
                //                setTestArray(Object.entries(res.data));
//                console.log(res.data)
                //         console.log(Object.entries(res.data));
                setLoad(true);
            })
            .catch(err => {
                setError(err.message);
                setLoad(true);
            })
    }, []);

    // console.log(testArray);

    /*------------------------ RETURN REGION ------------------------*/
    // if (load) {
    //   return (
    //     <>
    //
    //       {/*{testArray.map((it, index) => {*/}
    //       {/*  it.map((jt) => {*/}
    //       {/*    return (*/}
    //       {/*      <DisplayQuestions*/}
    //       {/*        key={index}*/}
    //       {/*        isChangeTest={false}*/}
    //       {/*        questionArray={Object.entries(jt)}*/}
    //       {/*      />*/}
    //       {/*    );*/}
    //       {/*  })*/}
    //       {/*})}*/}
    //
    //
    //       {/*{testArray.map((it, index) => {*/}
    //       {/*  return (*/}
    //       {/*    <DisplayQuestions*/}
    //       {/*      key={index}*/}
    //       {/*      isChangeTest={false}*/}
    //       {/*      questionArray={it}*/}
    //       {/*    />*/}
    //       {/*  );*/}
    //       {/*})}*/}
    //     </>
    //   );
    // } else {
    //   return (
    //     <div>
    //       Loading...
    //     </div>
    //   );
    // }

    //THIS SHOULD BE IN LOOP LIKE IN CODE ABOVE BUT CURRENTLY THERE IS A PROBLEM WITH ARRAY
    if (load) {
        let items = [];
        for (let test of testArray) {
            console.log(test);
            items.push(< DisplayQuestions questionArray = {
                    test.questions
                } testUUID = {test.testUUID} key = {test.testUUID}
                />);
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

export default DisplayTest;
