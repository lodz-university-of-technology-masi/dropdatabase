import React, {useEffect, useState} from "react";
import axios from "axios";
import "./DisplayTest.css";
import {FIREBASE_PATH} from "../../constants";
import DisplayQuestions from "../../component/display-questions/DisplayQuestions";

export const DisplayTest = (props) => {


    /*----------------------- VARIABLE REGION -----------------------*/
    const [testArray, setTestArray] = useState([]);
    const [load, setLoad] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get(FIREBASE_PATH + "/tests")
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


    /*------------------------ RETURN REGION ------------------------*/
    //THIS SHOULD BE IN LOOP LIKE IN CODE ABOVE BUT CURRENTLY THERE IS A PROBLEM WITH ARRAY
    if (load) {
        let items = [];
        for (let test of testArray) {
            items.push(< DisplayQuestions questionArray={
                test.questions
            } testUUID={test.testUUID} key={test.testUUID} all={test}
            />);
        }
        return (items);
    } else {
        return (<
            div>
            Loading...
            <
                /div>
                );
                }
                };

                export default DisplayTest;;
