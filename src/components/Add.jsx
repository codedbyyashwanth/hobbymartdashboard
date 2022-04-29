
import database from "../util/config";
import { ref, onValue, update, set, push} from "firebase/database";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "./Loading";


const Edit = () => {
        const {pos} = useParams();
        let [submit, setSubmit] = useState(false)
        let [position, setPosition] = useState(0);
        const [loading, setLoading] = useState(true); 
        const [title, setTitle] = useState("");
        const [correctAns, setCorrectAns] = useState("");
        const [optionA, setOptionA] = useState("");
        const [optionB, setOptionB] = useState("");
        const [optionC, setOptionC] = useState("");
        const [optionD, setOptionD] = useState("");

        useEffect(() => {
                setLoading(() => false)
                setPosition(() => parseInt(pos));
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

        const Add = () => {
                const dataRef = ref(database, "quiz/questions/" + position);
                set(dataRef, {
                        answer : correctAns,
                        option : {
                                A : optionA,
                                B : optionB,
                                C : optionC,
                                D : optionD
                        },
                        title : title
                })

                setPosition(() => position+1);

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
                                                        <input onChange={changeTitle}  className='text' placeholder="Ex. What is the best motor for building drones ?"  />
                                                        <h4>Options</h4>
                                                        <div className="option-container">
                                                                <div className="options">
                                                                        <span>Option A</span>
                                                                        <input onChange={changeOA}  className="text" placeholder="Ex. DC Motors" />
                                                                </div>
                                                                <div className="options">
                                                                        <span>Option B</span>
                                                                        <input onChange={changeOB}  className="text" placeholder="Ex. Synchronous Motors"  />
                                                                </div>
                                                                <div className="options">
                                                                        <span>Option C</span>
                                                                        <input onChange={changeOC}  className="text"  placeholder="Ex. Induction Motors" />
                                                                </div>
                                                                <div className="options">
                                                                        <span>Option D</span>
                                                                        <input  onChange={changeOD} className="text" placeholder="Ex. Hyper-Specific Motors"  />
                                                                </div>
                                                        </div>
                                                        <div className="correct-option">
                                                                <span>Correct Opt.</span>
                                                                <input maxLength={1} onChange={changeCA}  className="text" placeholder="A" />
                                                        </div>
                                                        <div className="btn-container">
                                                                <button id="add-btn" onClick={Add}>Add Question</button>
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
                                                                                }}>Question Added</p>
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