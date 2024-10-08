const Question = ({ question, selectedAnswer, setSelectedAnswer, submitAnswer }) => {
    const handleAnswer = (index) => {
        setSelectedAnswer(index);
        submitAnswer(index);
    };

    return (
        <div>
            <h2>{question.question}</h2>
            <ul>
                {question.options.map((option, index) => (
                    <li key={index}>
                        <button
                            className={`option-button ${selectedAnswer === index ? 'selected' : ''}`}
                            onClick={() => handleAnswer(index)}
                        >
                            {option}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Question;




/*const Question = ({ question, submitAnswer }) => {
    return (
        <div>
            <h2>{question.question}</h2>
            <ul>
                {question.options.map((option, index) => (
                    <li key={index}>
                        <button className="option-button" 
                        onClick={() => submitAnswer(index)}>{option}</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Question;
*/