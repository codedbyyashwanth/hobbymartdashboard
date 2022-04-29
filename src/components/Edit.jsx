
import database from "../util/config";
import { ref, onValue, update} from "firebase/database";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "./Loading";


const Edit = () => {
        const {id} = useParams();
        let [submit, setSubmit] = useState(false)
        const [loading, setLoading] = useState(true); 
        const [quizData, setQuizData] = useState({});
        const [title, setTitle] = useState("");
        const [correctAns, setCorrectAns] = useState("");
        const [optionA, setOptionA] = useState("");
        const [optionB, setOptionB] = useState("");
        const [optionC, setOptionC] = useState("");
        const [optionD, setOptionD] = useState("");

        const setDatas = (title, correctAns, optionA, optionB, optionC, optionD) => {
                setQuizData((values) => {
                        return  {
                                        title,
                                        correctAns,
                                        optionA,
                                        optionB,
                                        optionC,
                                        optionD
                                }
                })
        }

        useEffect(() => {
                const dataRef = ref(database, "quiz/questions/" + id);
                onValue(dataRef, (snapshot) => {
                        const data = snapshot.val();
                        const title = data.title;
                        const correctAns = data.answer;
                        const options = data.option;
                        const optionA = options["A"];
                        const optionB = options["B"];
                        const optionC = options["C"];
                        const optionD = options["D"];

                        setTitle(() => title);
                        setCorrectAns(() => correctAns);
                        setOptionA(() => optionA)
                        setOptionB(() => optionB)
                        setOptionC(() => optionC)
                        setOptionD(() => optionD)

                        setLoading(() => false)
                })
        }, [])

        const changeTitle = (e) => {
                setTitle(e.target.value);
        }

        const changeOA = (e) => {
                setOptionA(e.target.value);
        }

        const changeOB = (e) => {
                setOptionB(e.target.value);
        }

        const changeOC = (e) => {
                setOptionC(e.target.value);
        }

        const changeOD = (e) => {
                setOptionD(e.target.value);
        }

        const changeCA = (e) => {
                setCorrectAns(e.target.value);
        }

        const Update = () => {
                const dataRef = ref(database, "quiz/questions/" + id);
                update(dataRef, {
                        answer : correctAns,
                        option : {
                                A : optionA,
                                B : optionB,
                                C : optionC,
                                D : optionD
                        },
                        title : title
                })

                setSubmit(() => true)
                setTimeout(() => {
                        setSubmit(() => false)
                }, 3000)
        }


        return (
                <>
                       {
                               loading ? (
                                       <Loading />
                               ) : 
                               (
                                <div className="question-container">
                                <div className="heading">
                                        <h3>Update Questions</h3>
                                </div>
                                                <div className="question-layout">
                                                        <h4>Question</h4>
                                                        <input onChange={changeTitle}  className='text' value={title} />
                                                        <h4>Options</h4>
                                                        <div className="option-container">
                                                                <div className="options">
                                                                        <span>Option A</span>
                                                                        <input onChange={changeOA}  className="text" value={optionA} />
                                                                </div>
                                                                <div className="options">
                                                                        <span>Option B</span>
                                                                        <input onChange={changeOB}  className="text" value={optionB} />
                                                                </div>
                                                                <div className="options">
                                                                        <span>Option C</span>
                                                                        <input onChange={changeOC}  className="text" value={optionC} />
                                                                </div>
                                                                <div className="options">
                                                                        <span>Option D</span>
                                                                        <input  onChange={changeOD} className="text" value={optionD} />
                                                                </div>
                                                        </div>
                                                        <div className="correct-option">
                                                                <span>Correct Opt.</span>
                                                                <input maxLength={1} onChange={changeCA}  className="text" value={correctAns} />
                                                        </div>
                                                        <div className="btn-container">
                                                                <button onClick={Update}>Update</button>
                                                        </div>
                                                </div>
                                                {
                                                        submit ? (
                                                                <div className="field">
                                                                        <p style={{ 
                                                                                fontSize: "0.85rem",
                                                                                color: "#000000", 
                                                                                fontWeight: "600",
                                                                                position: "absolute",
                                                                                padding: "10px 20px",
                                                                                top: "10%",
                                                                                left: "50%",
                                                                                transform: "translateX(-50%)",
                                                                                backgroundColor: "#ffffff",
                                                                                border: "1px solid rgba(0,0,0,0.5)",
                                                                                borderRadius: "10px",
                                                                                zIndex: "1000",
                                                                                boxShadow: "0 0 30px rgba(189, 189, 189, 0.63)"
                                                                                }}>Updated</p>
                                                                </div>
                                                        ) : ('')
                                                }
                                 </div>
                               )
                               
                       }
                </>
        )
}

export default Edit;