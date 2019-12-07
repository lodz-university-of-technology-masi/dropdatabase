import React, {useEffect, useState} from "react";
import {FIREBASE_PATH, USER_SESSION_ID} from "../../constants";
import DisplayQuestions from "../../component/display-questions/DisplayQuestions";
import axios from "axios";


export const DeleteTest = () => {

    /*----------------------- VARIABLE REGION -----------------------*/
    const [testArray, setTestArray] = useState([]);
    const [load, setLoad] = useState(false);
    const [setError] = useState('');

    useEffect(() => {
        axios.get(FIREBASE_PATH + "/tests")
            .then(res => {
                setTestArray(res.data);
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
        axios.delete(FIREBASE_PATH + "/test", {
            headers: {
                'Content-Type': 'application/json'
            },
            data: test
        }).then(() => {
            alert("Test has been deleted");
            window.location.reload()
        }).catch((error) => console.log(error));
    };

    /*------------------------ RETURN REGION ------------------------*/

    //THIS SHOULD BE IN LOOP LIKE IN DISPLAY TEST BUT CURRENTLY THERE IS A PROBLEM WITH ARRAY
    if (load) {
        let items = [];
        for (let test of testArray) {
            // console.log(test);
            items.push(<DisplayQuestions
                isRemovable={true}
                questionArray={test.questions}
                handleDeleteTest={handleDeleteTest}
                testUUID={test.testUUID}
                key={test.testUUID}
                all={test}
            />)
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

                export default DeleteTest;;
    