import { useState, useEffect } from 'react';
import database from "../util/config";
import { ref, onValue, remove, update} from "firebase/database";
import "../styles/quiz.css";
import { Link } from 'react-router-dom';
import Loading from './Loading';

const Quiz = () => {
        const [loading, setLoading] = useState(true); 
        let [quizData, setQuizData] = useState([]);
        let [submit, setSubmit] = useState(false);
        let [started, setStarted] = useState(false);
        let [position, setPosition] = useState(1);

        const setDatas = (i, keys, title, correctAns, optionA, optionB, optionC, optionD) => {
                setQuizData((values) => {
                        return [
                                ...values, {
                                        i,
                                        keys,
                                        title,
                                        correctAns,
                                        optionA,
                                        optionB,
                                        optionC,
                                        optionD
                                }
                        ]
                })
        }

        const LoadQuiz = () => {
                const startedRef = ref(database, "quiz");
                onValue(startedRef, (snapshot) => {
                        const data = snapshot.val();
                        if (data.started)
                                setStarted(() => true)
                        else
                                setStarted(() => false)
                })
                const dataRef = ref(database, "quiz/questions" );
                onValue(dataRef, (snapshot) => {
                        setQuizData(() => [])
                        const data = snapshot.val();
                        let i = 0;
                        let pos = parseInt(Object.keys(data).at(Object.keys(data).length - 1));
                        console.log("Pos: " + pos)
                        setPosition(() =>  {
                                if (pos == null || pos === undefined)
                                        return 1;
                                else
                                        return pos+1;
                        });
                       for (let keys in data) {
                        const correctAns = data[keys].answer;
                        const title = data[keys].title;
                        const options = data[keys].option;
                        const optionA = options["A"];
                        const optionB = options["B"];
                        const optionC = options["C"];
                        const optionD = options["D"];
                        i++;

                        setDatas(i, keys, title, correctAns, optionA, optionB, optionC, optionD);

                       }

                       
                       
                })
                setLoading(() => false);
        }

        const LoadData = () => {
                LoadQuiz();
        }

        const checkBox = () => {
                const startedRef = ref(database, "quiz");
                update(startedRef, {
                        started : !started
                })
                setStarted(() => !started);
        }

        const Delete = (id) => {
                setSubmit(() => true)
                setTimeout(() => {
                        setSubmit(() => false)
                }, 3000)
                const dataRef = ref(database, "quiz/questions/" + id);
                remove(dataRef);
        }

        useEffect(() => {
                LoadData();
        }, []);

        return (
                <>
                       {
                               loading ? 
                               (        
                                       <Loading />
                               ) : (
                                <div className="question-container">
                                        <div id="btn-container">
                                                <div className="check-btn">
                                                        {
                                                                started ? (
                                                                        <input onClick={checkBox} id='start' type="checkbox" checked />
                                                                ) : (
                                                                        <input onClick={checkBox} id='start' type="checkbox"  />
                                                                )
                                                        }
                                                        <label for="start">Start Quiz</label>
                                                </div>
                                                <Link to={"/quiz/add/" + position} id='add-btn'>Add Quiz Question</Link>
                                        </div>
                                        <div className="heading">
                                                <h3>Quiz Questions</h3>
                                        </div>
                                        {
                                                quizData.map(({ i, keys, title, correctAns, optionA, optionB, optionC, optionD }) => (
                                                        <div className="question-layout">
                                                                <h4>Question {i} </h4>
                                                                <p className='text'>{title}</p>
                                                                <h4>Options</h4>
                                                                <div className="option-container">
                                                                        <div className="options">
                                                                                <span>Option A</span>
                                                                                <p className="text">{optionA}</p>
                                                                        </div>
                                                                        <div className="options">
                                                                                <span>Option B</span>
                                                                                <p className="text">{optionB}</p>
                                                                        </div>
                                                                        <div className="options">
                                                                                <span>Option C</span>
                                                                                <p className="text">{optionC}</p>
                                                                        </div>
                                                                        <div className="options">
                                                                                <span>Option D</span>
                                                                                <p className="text">{optionD}</p>
                                                                        </div>
                                                                </div>
                                                                <div className="correct-option">
                                                                        <span>Correct Opt.</span>
                                                                        <p className="text">{correctAns}</p>
                                                                </div>
                                                                <div className="btn-container" style={{ position:"relative" }}>
                                                                        <Link to={ "edit/" + keys } className='e-btn'>Edit Question</Link>
                                                                        <button onClick={() => { Delete(keys) }} id='delete-btn' >Delete Question</button>
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
                                                                        }}>Deleted</p>
                                                        </div>
                                                ) : ('')
                                        }
                                                                </div>
                                                        </div>

                                                ))
                                        }
                                </div>
                               )
                       }
                </>
        )
}

export default Quiz;