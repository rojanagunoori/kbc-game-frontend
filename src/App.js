


import { useEffect, useState } from "react";
import './App.css';
import io from "socket.io-client";
import Question from "./Question.js";
import Loader from "./Loader.js";
import Result from "./Result.js";
import NameEntry from "./NameEntry.js";


//const localhostUrl = "http://192.168.43.107:5000";
//const url="http://192.168.43.107:3000/join"
//const socketUrl = process.env.REACT_APP_SOCKET_URL || "http://localhost:3000";
//const qrCodeUrl = process.env.REACT_APP_QR_CODE_URL || "http://localhost:3001/join";

const localhostUrl =  "https://kbc-game-backend2.onrender.com";//process.env.REACT_APP_SOCKET_URL ||
const url = "https://kbc-game-projects.netlify.app/join"//"https://kbc-game-backend2.onrender.com/join";//process.env.REACT_APP_JOIN_URL || 
const qrCodeUrl = process.env.REACT_APP_QR_CODE_URL || "https://kbc-game-backend2.onrender.com/join";



//REACT_APP_SOCKET_URL=http://localhost:5000
//REACT_APP_JOIN_URL=http://localhost:3000/join
//REACT_APP_QR_CODE_URL=http://localhost:3000/join


//const localhostUrl = process.env.REACT_APP_SOCKET_URL || "http://localhost:5000";
//const url = process.env.REACT_APP_JOIN_URL || "http://localhost:3000/join";
//const qrCodeUrl = process.env.REACT_APP_QR_CODE_URL || "http://localhost:3000/join";

//const url = process.env.REACT_APP_JOIN_URL || "http://192.168.43.107:3000/join";
console.log(process.env.REACT_APP_SOCKET_URL,process.env.REACT_APP_JOIN_URL, process.env.REACT_APP_QR_CODE_URL)
const socket = io(localhostUrl, {
    withCredentials: true,
    reconnectionAttempts: 5,
    timeout: 20000
});

function App() {
    const [playerName, setPlayerName] = useState("");
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [numQuestions, setNumQuestions] = useState(5);
    const [timerDuration, setTimerDuration] = useState(10);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(timerDuration);
    const [message, setMessage] = useState("");
    const [gameOver, setGameOver] = useState(false);
    const [stage, setStage] = useState("nameEntry");
    const [selectedAnswer, setSelectedAnswer] = useState(null); 

    
   
    useEffect(() => {
        socket.emit("getCategories");

        socket.on("categories", (fetchedCategories) => {
            setCategories(fetchedCategories);
        });

        socket.on("nextQuestion", (question) => {
            setCurrentQuestion(question);
            setSelectedAnswer(null);
            setTimer(timerDuration);
            setMessage("");
        });

        socket.on("correct", () => {
            setMessage("Correct answer!");
            setScore(prev => prev + 1);
            setTimeout(nextQuestion, 3000);
        });

        socket.on("wrong", (correctAnswer) => {
            setMessage(`Wrong answer! The correct answer was: ${correctAnswer}`);
            setTimeout(nextQuestion, 3000);
        });
        socket.on("timeup", (correctAnswer) => {
            setMessage(`Time Up! The correct answer was: ${correctAnswer}`);
            setTimeout(nextQuestion, 3000);
        });

        socket.on("gameOver", () => {
            setGameOver(true);
            setStage("result");
        });

        return () => {
            socket.off("categories");
            socket.off("nextQuestion");
            socket.off("correct");
            socket.off("timeup");
            socket.off("wrong");
            socket.off("gameOver");
        };
    }, [timerDuration]);

    useEffect(() => {
        if (timer > 0 && currentQuestion) {
            const timerId = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);

            return () => clearInterval(timerId);
        } else if (timer === 0 && currentQuestion) {
            setMessage("Time's up!"); 
            socket.emit("answer", { answer: null }); 
          //  socket.emit("nextQuestion");
          setTimeout(() => {
            socket.emit("nextQuestion");
            setTimer(timerDuration); 
        }, 3000);
        }
    }, [timer, currentQuestion]);

    const handleCategoryChange = (category) => {
        setSelectedCategories(prev =>
            prev.includes(category) ? prev.filter(cat => cat !== category) : [...prev, category]
        );
    };

    const startGame = () => {
        let categoriesToUse = selectedCategories.length > 0 ? selectedCategories : categories.map(cat => cat.name);
    
      //  console.log("Starting game with categories:", categoriesToUse); // Log the categories being used
        socket.emit("startGame", { selectedCategories: categoriesToUse, numQuestions, playerName });
        setStage("question");
        //socket.emit("startGame", { selectedCategories, numQuestions, playerName });
       // setStage("question");
    };

    const nextQuestion = () => {
        socket.emit("nextQuestion");
    };

    const handleNameEntry = (name) => {
        setPlayerName(name);
        setStage("categorySelection");
    };

    if (stage === "nameEntry") {
        return <NameEntry onSubmitAnswer={handleNameEntry} url={url} />;
    }

    if (stage === "categorySelection") {
        return (
            <div>
                 <h1>KBC Quiz Game</h1>
                <h2>Select Categories and Questions</h2>
                {categories.map(cat => (
                    <div key={cat.name} >
                        <label>
                            <input
                                type="checkbox"
                                checked={selectedCategories.includes(cat.name)}
                                onChange={() => handleCategoryChange(cat.name)}
                            />
                            {cat.label}
                        </label>
                    </div>
                ))}
                <h2>Number of Questions</h2>
                <input
                    type="number"
                    value={numQuestions}
                    onChange={(e) => setNumQuestions(e.target.value)}
                />
                <h2>Timer Duration (seconds)</h2>
                <input
                    type="number"
                    value={timerDuration}
                    onChange={(e) => setTimerDuration(e.target.value)}
                />
                <br/>
                <button onClick={startGame} //disabled={selectedCategories.length === 0}
                >
                    Start Game
                </button>
            </div>
        );
    }

    return (
        <div>
    
            <h1>KBC Quiz Game</h1>
            <h2>Time Left: {timer} seconds</h2>
            {currentQuestion ? (
                <Question 
                question={currentQuestion} 
                selectedAnswer={selectedAnswer} // Pass selected answer to child
                setSelectedAnswer={setSelectedAnswer} // Pass function to set selected answer
                submitAnswer={(answer) => socket.emit("answer", { answer })}
            />
                /*<Question question={currentQuestion} submitAnswer={(answer) => socket.emit("answer", { answer })} />*/
            ) : (
                <Loader />
            )}
            {gameOver ? (
                <Result score={score} />
            ) : (
                message && <p className="result" >{message}</p>
            )}
        </div>
    );
}

export default App;


