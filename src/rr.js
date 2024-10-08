
const functions = require('firebase-functions');
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const QRCode = require("qrcode");
const cors = require("cors");


const app = require('express')();
//const app = express();
const server = http.createServer(app);
//const allowedOrigin = process.env.ALLOWED_ORIGIN || "http://localhost:3000";
//const qrurl = process.env.QR_URL || "http://localhost:3000/join";
console.log( process.env.ALLOWED_ORIGIN,process.env.QR_URL)
//const qrurl = process.env.QR_URL || "http://192.168.43.107:3000/join";
const qrurl = process.env.QR_URL || "http://localhost:3000/join";
const allowedOrigin = process.env.ALLOWED_ORIGIN || "http://localhost:3000";



//const url="http://192.168.43.107:3000"
//const qrurl="http://localhost:5000/join"
const io = socketIo(server, {
    cors: {
        origin: allowedOrigin,//url,
        methods: ["GET", "POST"],
        credentials: true
    },
    pingInterval: 25000,
    pingTimeout: 60000,
});


const PORT = process.env.PORT || 5000;

app.use(cors({
    origin:allowedOrigin,// url,
    methods: ["GET", "POST"],
    credentials: true
}));

app.get("/qr", (req, res) => {
    QRCode.toDataURL(qrurl, (err, url) => {
        res.send(`<img src="${url}"/>`);
    });
});

const categories = {
    "veda": [
        { question: "What is the Rigveda primarily about?", options: ["Hymns", "Philosophy", "Rituals", "Medicine"], answer: 0 },
        { question: "Who is considered the sage of the Rigveda?", options: ["Vishwamitra", "Veda Vyasa", "Patanjali", "Brahmagupta"], answer: 0 },
        { question: "What language is the Rigveda written in?", options: ["Sanskrit", "Pali", "Prakrit", "Tamil"], answer: 0 },
        { question: "How many Mandalas are there in the Rigveda?", options: ["10", "12", "8", "15"], answer: 0 },
        { question: "Which deity is frequently mentioned in the Rigveda?", options: ["Indra", "Brahma", "Vishnu", "Shiva"], answer: 0 },
        { question: "What type of literature is the Rigveda?", options: ["Poetry", "Prose", "Drama", "Essay"], answer: 0 },
        { question: "Who compiled the Rigveda?", options: ["Veda Vyasa", "Valmiki", "Brahma", "Gautama"], answer: 0 },
        { question: "What is the main purpose of the hymns in the Rigveda?", options: ["To praise deities", "To tell stories", "To provide rituals", "To teach philosophy"], answer: 0 },
        { question: "Which Veda is known as the 'knowledge of hymns'?", options: ["Rigveda", "Samaveda", "Yajurveda", "Atharvaveda"], answer: 0 },
        { question: "The concept of 'Rta' in Rigveda refers to?", options: ["Order", "Chaos", "Sacrifice", "Creation"], answer: 0 },
        { question: "Who is the central character of the Mahabharata?", options: ["Rama", "Arjuna", "Krishna", "Draupadi"], answer: 1 },
        { question: "In the Ramayana, who is Rama's wife?", options: ["Sita", "Radha", "Tara", "Urmila"], answer: 0 },
        { question: "What is the Bhagavad Gita primarily about?", options: ["War strategies", "Philosophy and duty", "Devotion", "Rituals"], answer: 1 },
        { question: "Who is the author of the Mahabharata?", options: ["Valmiki", "Vyasa", "Kalidasa", "Tulsidas"], answer: 1 },
        { question: "In the Shiva Purana, who is Shiva's consort?", options: ["Sita", "Durga", "Parvati", "Lakshmi"], answer: 2 },
        { question: "Which avatar of Vishnu is known as the preserver?", options: ["Rama", "Krishna", "Narasimha", "Vamana"], answer: 1 },
        { question: "What is the name of Arjuna's bow?", options: ["Gandiva", "Vijaya", "Sharanga", "Pinaka"], answer: 0 },
        { question: "In the Ramayana, who is the king of Lanka?", options: ["Ravana", "Vibhishana", "Kumbhakarna", "Maricha"], answer: 0 },
        { question: "What does Krishna advise Arjuna to do in the Bhagavad Gita?", options: ["Flee from battle", "Fight for righteousness", "Seek peace", "Abandon all duties"], answer: 1 },
        { question: "Who is known as the 'Destroyer' among the Trimurti?", options: ["Brahma", "Vishnu", "Shiva", "Indra"], answer: 2 },
    
    ],
    "politics": [
        { question: "Who was the first Prime Minister of India?", options: ["Nehru", "Gandhi", "Ambedkar", "Patel"], answer: 0 },
        { question: "What is the supreme law of the land?", options: ["The Constitution", "The Parliament", "The Judiciary", "The President"], answer: 0 },
        { question: "What does the term 'democracy' literally mean?", options: ["Rule of the people", "Rule of the elite", "Rule of the king", "Rule of the majority"], answer: 0 },
        { question: "Which article of the Constitution of India provides for a single citizenship?", options: ["Article 5", "Article 14", "Article 16", "Article 19"], answer: 0 },
        { question: "Who is known as the 'Father of the Constitution' in India?", options: ["Ambedkar", "Nehru", "Gandhi", "Patel"], answer: 0 },
        { question: "What is the minimum age to vote in India?", options: ["18", "21", "25", "16"], answer: 0 },
        { question: "Which body is responsible for making laws in India?", options: ["Parliament", "Supreme Court", "President", "Cabinet"], answer: 0 },
        { question: "How many members are there in the Rajya Sabha?", options: ["250", "245", "300", "200"], answer: 0 },
        { question: "The President of India is elected by?", options: ["Electoral College", "Parliament", "Prime Minister", "State Legislatures"], answer: 0 },
        { question: "What is the term for the division of powers between the central and state governments?", options: ["Federalism", "Unitary", "Confederation", "Monarchy"], answer: 0 },
    ],
    "general knowledge": [
        { question: "What is the capital of France?", options: ["Rome", "Paris", "London", "Berlin"], answer: 1 },
        { question: "Who wrote 'Hamlet'?", options: ["Shakespeare", "Hemingway", "Tolkien", "Twain"], answer: 0 },
        { question: "What is the largest planet in our solar system?", options: ["Earth", "Mars", "Jupiter", "Saturn"], answer: 2 },
        { question: "Who painted the Mona Lisa?", options: ["Van Gogh", "Da Vinci", "Picasso", "Monet"], answer: 1 },
        { question: "Which element has the chemical symbol 'O'?", options: ["Gold", "Oxygen", "Osmium", "Hydrogen"], answer: 1 },
        { question: "What is the longest river in the world?", options: ["Amazon", "Nile", "Yangtze", "Mississippi"], answer: 1 },
        { question: "Which planet is known as the Red Planet?", options: ["Mars", "Venus", "Jupiter", "Saturn"], answer: 0 },
        { question: "What is the capital of Japan?", options: ["Seoul", "Beijing", "Tokyo", "Bangkok"], answer: 2 },
        { question: "Which is the largest ocean on Earth?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], answer: 3 },
        { question: "Who discovered gravity?", options: ["Einstein", "Newton", "Galileo", "Hawking"], answer: 1 },
    ],
    "science": [
        { question: "What is the chemical symbol for water?", options: ["H2O", "O2", "CO2", "H2"], answer: 0 },
        { question: "What planet is known for its rings?", options: ["Mars", "Earth", "Jupiter", "Saturn"], answer: 3 },
        { question: "What is the powerhouse of the cell?", options: ["Nucleus", "Mitochondria", "Ribosome", "Chloroplast"], answer: 1 },
        { question: "What gas do plants absorb?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], answer: 1 },
        { question: "What is the speed of light?", options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"], answer: 0 },
        { question: "What is the most abundant gas in the Earth's atmosphere?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], answer: 1 },
        { question: "What organ is responsible for pumping blood?", options: ["Liver", "Brain", "Heart", "Lungs"], answer: 2 },
        { question: "What is the chemical symbol for gold?", options: ["Ag", "Au", "Pb", "Fe"], answer: 1 },
        { question: "What is the primary source of energy for Earth?", options: ["The Sun", "The Moon", "The Earth itself", "Nuclear"], answer: 0 },
        { question: "What type of animal is a dolphin?", options: ["Fish", "Mammal", "Reptile", "Amphibian"], answer: 1 },
    ],
    "history": [
        { question: "Who was the first President of the USA?", options: ["Lincoln", "Washington", "Jefferson", "Adams"], answer: 1 },
        { question: "Which civilization built the pyramids?", options: ["Roman", "Greek", "Egyptian", "Mesoamerican"], answer: 2 },
        { question: "Who discovered America?", options: ["Vikings", "Columbus", "Magellan", "Cortez"], answer: 1 },
        { question: "What year did the Titanic sink?", options: ["1912", "1905", "1920", "1915"], answer: 0 },
        { question: "Which war was fought between the North and South regions in the USA?", options: ["World War I", "Civil War", "Revolutionary War", "Vietnam War"], answer: 1 },
        { question: "Who was the last Emperor of India?", options: ["Jahangir", "Bahadur Shah II", "Akbar", "Shivaji"], answer: 1 },
        { question: "What ancient wonder was located in Babylon?", options: ["The Hanging Gardens", "The Great Pyramid", "The Colossus", "The Lighthouse"], answer: 0 },
        { question: "Which country was the first to grant women the right to vote?", options: ["USA", "New Zealand", "UK", "Canada"], answer: 1 },
        { question: "What document declared the independence of the USA?", options: ["The Constitution", "The Bill of Rights", "The Declaration of Independence", "The Emancipation Proclamation"], answer: 2 },
        { question: "Who was known as the 'Iron Lady'?", options: ["Angela Merkel", "Margaret Thatcher", "Golda Meir", "Indira Gandhi"], answer: 1 },
    ],
    "literature": [
        { question: "Who wrote '1984'?", options: ["Orwell", "Huxley", "Bradbury", "Fitzgerald"], answer: 0 },
        { question: "What is the first book of the Bible?", options: ["Genesis", "Exodus", "Leviticus", "Numbers"], answer: 0 },
        { question: "Who is the author of 'Pride and Prejudice'?", options: ["Austen", "Brontë", "Dickens", "Twain"], answer: 0 },
        { question: "Which Shakespeare play features the character Othello?", options: ["Hamlet", "Othello", "Macbeth", "King Lear"], answer: 1 },
        { question: "What is the main theme of 'The Great Gatsby'?", options: ["Love", "Wealth", "Friendship", "Adventure"], answer: 1 },
        { question: "Who wrote 'The Catcher in the Rye'?", options: ["Salinger", "Hemingway", "Fitzgerald", "Poe"], answer: 0 },
        { question: "What is the genre of 'Moby Dick'?", options: ["Adventure", "Horror", "Romance", "Drama"], answer: 0 },
        { question: "Who wrote 'The Odyssey'?", options: ["Homer", "Virgil", "Ovid", "Plato"], answer: 0 },
        { question: "Which novel begins with 'Call me Ishmael'?", options: ["Moby Dick", "The Great Gatsby", "1984", "Pride and Prejudice"], answer: 0 },
        { question: "What is the main character's name in 'To Kill a Mockingbird'?", options: ["Scout", "Jem", "Atticus", "Boo"], answer: 0 },
    ],
};

/*
const categories = {
    "veda": [
        { question: "What is the Rigveda primarily about?", options: ["Hymns", "Philosophy", "Rituals", "Medicine"], answer: 0 },
        { question: "Who is considered the sage of the Rigveda?", options: ["Vishwamitra", "Veda Vyasa", "Patanjali", "Brahmagupta"], answer: 0 },
    ],
    "politics": [
        { question: "Who was the first Prime Minister of India?", options: ["Nehru", "Gandhi", "Ambedkar", "Patel"], answer: 0 },
        { question: "What is the supreme law of the land?", options: ["The Constitution", "The Parliament", "The Judiciary", "The President"], answer: 0 },
    ],
    "general knowledge": [
        { question: "What is the capital of France?", options: ["Rome", "Paris", "London", "Berlin"], answer: 1 },
        { question: "Who wrote 'Hamlet'?", options: ["Shakespeare", "Hemingway", "Tolkien", "Twain"], answer: 0 },
    ],
};
*/

app.get("/categories", (req, res) => {
    const categoryKeys = Object.keys(categories);
    const formattedCategories = categoryKeys.map(key => ({
        name: key,
        label: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')
    }));
    res.json(formattedCategories);
});

io.on("connection", (socket) => {
    console.log("A user connected: ", socket.id);
    socket.on("connect", () => {
    console.log("Connected to WebSocket server");
});

    socket.on("getCategories", () => {
        const categoryKeys = Object.keys(categories);
        const formattedCategories = categoryKeys.map(key => ({
            name: key,
            label: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')
        }));
        socket.emit("categories", formattedCategories);
    });

    socket.on("startGame", ({ selectedCategories, numQuestions, playerName }) => {
        const questionsToSend = [];
        
        selectedCategories.forEach(category => {
            const categoryQuestions = categories[category] || [];
            const shuffledQuestions = categoryQuestions.sort(() => 0.5 - Math.random()).slice(0, numQuestions);
            questionsToSend.push(...shuffledQuestions);
        });

        if (questionsToSend.length > 0) {
            let currentQuestionIndex = 0;
            socket.emit("nextQuestion", questionsToSend[currentQuestionIndex]);

            socket.on("nextQuestion", () => {
                currentQuestionIndex++;
                if (currentQuestionIndex < questionsToSend.length) {
                    socket.emit("nextQuestion", questionsToSend[currentQuestionIndex]);
                } else {
                    socket.emit("gameOver");
                }
            });

            socket.on("answer", ({ answer }) => {
                const correctAnswer = questionsToSend[currentQuestionIndex]?.answer;
                
                // Check if currentQuestionIndex is valid
                if (currentQuestionIndex < questionsToSend.length) {
                    if (answer === correctAnswer) {
                        socket.emit("correct");
                    }else if(answer === null){
                        const wrongAnswerMessage = questionsToSend[currentQuestionIndex]?.options[correctAnswer];
                        socket.emit("timeup", wrongAnswerMessage);
                    } else {
                        const wrongAnswerMessage = questionsToSend[currentQuestionIndex]?.options[correctAnswer];
                        socket.emit("wrong", wrongAnswerMessage);
                    }
                } else {
                    socket.emit("wrong", "No more questions available.");
                }
            });
        } else {
            socket.emit("gameOver");
        }
    });
});


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


//exports.api = functions.https.onRequest(app);