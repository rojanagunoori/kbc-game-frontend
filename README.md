# 🎮 KBC Quiz Game

<video controls width="600">
  <source src="https://raw.githubusercontent.com/rojanagunoori/kbc-game-frontend/main/public/kbc-game.mp4" type="video/mp4">
</video>

![Screenshot 1](https://raw.githubusercontent.com/rojanagunoori/kbc-game-frontend/main/public/kbc-game1.png)

![Screenshot 2](https://raw.githubusercontent.com/rojanagunoori/kbc-game-frontend/main/public/kbc-game2.png)

![Screenshot 3](https://raw.githubusercontent.com/rojanagunoori/kbc-game-frontend/main/public/kbc-game3.png)

A real-time multiplayer quiz game inspired by _Kaun Banega Crorepati (KBC)_ built using **React**, **Node.js**, **Express**, and **Socket.IO**.

---

## 🔗 Important Links

- 🌐 Live Frontend: [https://kbc-game-projects.netlify.app/](https://kbc-game-projects.netlify.app/)
- ⚙️ Backend API: [https://kbc-game-backend2.onrender.com/](https://kbc-game-backend2.onrender.com/)
- 📦 Backend Repo: [https://github.com/rojanagunoori/kbc-game-backend2](https://github.com/rojanagunoori/kbc-game-backend2)
- 📦 Frontend Repo: [https://github.com/rojanagunoori/kbc-game-frontend](https://github.com/rojanagunoori/kbc-game-frontend)
- 📦 Full Project: [https://github.com/rojanagunoori/kbc-game](https://github.com/rojanagunoori/kbc-game)

---

## 📖 Project Overview

KBC Quiz Game is a **real-time interactive quiz platform** inspired by the popular Indian television show _Kaun Banega Crorepati (KBC)_. The application allows users to:

- Enter their name and join the game
- Select quiz categories dynamically
- Answer questions under a time constraint
- Receive instant feedback (correct/wrong/time up)
- Track their score in real-time

The system is powered by **WebSockets (Socket.IO)**, enabling seamless, low-latency communication between the frontend and backend. This ensures a smooth and engaging gameplay experience without page reloads.

The project is designed with scalability and modularity in mind, making it easy to extend with multiplayer features, authentication, and persistent storage.

---

## 🚀 Features

### 🎯 Core Gameplay Features

- Real-time quiz interaction using WebSockets
- Dynamic category selection
- Randomized question generation
- Timer-based answering system
- Instant feedback system (correct / wrong / timeout)

### 📊 User Experience Features

- Live countdown timer for each question
- Smooth transitions between questions
- Responsive UI for mobile and desktop
- Visual feedback messages

### 🔗 Integration Features

- QR code-based game joining system
- Environment-based configuration (.env)
- Cross-origin support using CORS

---

## 📁 Folder / Project Structure

### Frontend

```
src/
 ├── App.js
 ├── Question.js
 ├── Result.js
 ├── NameEntry.js
 ├── Loader.js
 └── styles.css
```

### Backend

```
server.js
.env
```

---

## 🛠️ Tech Stack / Environment

### 🎨 Frontend

- React (Component-based UI)
- Socket.IO Client (Real-time communication)
- CSS (Styling & responsiveness)

### ⚙️ Backend

- Node.js (Runtime environment)
- Express.js (Server framework)
- Socket.IO (WebSocket communication)
- QRCode (QR generation)
- CORS (Cross-origin handling)

---

## ⚙️ Installation / Setup

### Clone Repositories

```
git clone https://github.com/rojanagunoori/kbc-game-backend2
git clone https://github.com/rojanagunoori/kbc-game-frontend
```

### Backend Setup

```
cd kbc-game-backend2
npm install
npm start
```

### Frontend Setup

```
cd kbc-game-frontend
npm install
npm start
```

---

## 🔐 Environment Variables

### Backend (.env)

```
QR_URL=https://kbc-game-projects.netlify.app/join
ALLOWED_ORIGIN=https://kbc-game-projects.netlify.app
PORT=5000
```

### Frontend (.env)

```
REACT_APP_SOCKET_URL=https://kbc-game-backend2.onrender.com
REACT_APP_JOIN_URL=https://kbc-game-projects.netlify.app/join
REACT_APP_QR_CODE_URL=https://kbc-game-projects.netlify.app/join
```

---

## 🔌 API Usage

### 🌐 REST Endpoints

#### `GET /qr`

- Generates a QR code dynamically
- Encodes the join URL for easy access

#### `GET /categories`

- Returns all available quiz categories
- Used to populate category selection UI

---

### ⚡ Socket Events

#### 📤 Client → Server

- `getCategories` → Request category list
- `startGame` → Start game with selected categories and question count
- `answer` → Submit answer for current question
- `nextQuestion` → Request next question

#### 📥 Server → Client

- `categories` → Sends category list
- `nextQuestion` → Sends next question data
- `correct` → Indicates correct answer
- `wrong` → Indicates wrong answer with correct option
- `timeup` → Indicates time expired
- `gameOver` → Indicates end of quiz

---

## 🧩 Key Components

### 🔹 App.js

- Central controller of the application
- Manages global state (score, timer, stage, categories)
- Handles socket connections and event listeners
- Controls game flow (start → question → result)

### 🔹 Question.js

- Displays the current question and options
- Handles user answer selection
- Sends selected answer to server

### 🔹 Result.js

- Displays final score
- Provides option to restart the game

### 🔹 NameEntry.js

- Collects player name
- Displays QR code for joining
- Entry point of the application

### 🔹 Loader.js

- Shows loading spinner while fetching questions
- Improves perceived performance and UX

---

## 🔒 Security

- CORS configuration to restrict origins
- Environment variables for sensitive configs
- Controlled WebSocket communication

---

## ⚔️ Challenges Faced During Development

### 1. Real-time Socket Event Management

Handling Socket.IO events required careful structuring to avoid **duplicate listeners** and memory leaks. Nested event bindings initially caused multiple triggers, which were resolved by properly organizing listeners.

### 2. Timer Synchronization

Synchronizing the frontend timer with backend events was challenging. Ensuring accurate countdowns and handling edge cases (like time expiry) required precise state management.

### 3. CORS Issues in Deployment

While deploying on Render and Netlify, mismatched origins caused connection failures. This was resolved by:

- Correctly configuring `ALLOWED_ORIGIN`
- Ensuring environment variables were properly loaded

### 4. Maintaining Smooth UX

Balancing real-time updates with UI responsiveness required:

- Using loaders during delays
- Adding transition delays for feedback messages

---

## 🔮 Future Improvements

### 🎮 Gameplay Enhancements

- Multiplayer mode with live competition
- Leaderboard system (global & session-based)
- Lifelines (50:50, audience poll, skip)

### 🔐 System Improvements

- User authentication (JWT / OAuth)
- Persistent storage using database (MongoDB / PostgreSQL)

### 📈 Performance & Scaling

- Optimize socket handling for multiple users
- Add caching for questions

### 🎨 UI/UX Improvements

- Animations and sound effects
- Dark mode
- Better mobile responsiveness

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

---

## 🙏 Acknowledgments

- Socket.IO documentation
- React community
- Open-source contributors

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙋‍♀️ Author / Contact

**Nagunoori Roja**

- 📧 Email: [nagunooriroja@gmail.com](mailto:nagunooriroja@gmail.com)
- 🌐 GitHub: [https://github.com/rojanagunoori](https://github.com/rojanagunoori)
- 🌐 LinkedIn: [https://www.linkedin.com/in/nagunoori-roja-51b936267/](https://www.linkedin.com/in/nagunoori-roja-51b936267/)
- 🌐 Portfolio: [https://portfolio-roja.netlify.app/](https://portfolio-roja.netlify.app/)
- 🌐 LeetCode: [https://leetcode.com/u/dSdsi6XkI8/](https://leetcode.com/u/dSdsi6XkI8/)
- 🌐 Kaggle: [https://www.kaggle.com/nagunooriroja](https://www.kaggle.com/nagunooriroja)

---
