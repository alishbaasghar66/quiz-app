// Dummy Questions
const questions = [
    { q: "HTML ka full form kya hai?", options: ["Hyper Text Markup Language", "High Text Machine Language", "Hyperlink Text Mark Language", "None"], answer: 0 },
    { q: "CSS ka use kis liye hota hai?", options: ["Styling", "Programming", "Database", "None"], answer: 0 },
     { q: "Who is making the Web standards?", options: ["Microsoft","google","Mozilla", "the world wide consortium"], answer: 0},
     { q: "Choose the correct HTML element for the largest heading?", options: ["h6", "h1", "h2", "h3"], answer: 0},
      { q: "What is the correct HTML element for inserting a line break?", options: ["br","break","p", "ib"]},
      { q: " Which HTML tag is used to define an internal style sheet?" , options: ["style","css","script","link"] , answer: 0},
      { q: "What is the correct HTML for creating a dropdown list?" , options: ["select","dropdown","list","br"], answer: 0 }
    

    // Add more questions up to 30...
];

let currentQuestion = 0;
let score = 0;
let timerInterval;

// Sign Up
document.getElementById("signup-btn").addEventListener("click", () => {
    let name = document.getElementById("signup-name").value;
    let email = document.getElementById("signup-email").value;
    let password = document.getElementById("signup-password").value;

    if (name && email && password) {
        localStorage.setItem(email, JSON.stringify({ name, email, password }));
        alert("Signup Successful! Please Login.");
    } else {
        alert("Please fill all fields.");
    }
});

// Login
document.getElementById("login-btn").addEventListener("click", () => {
    let email = document.getElementById("login-email").value;
    let password = document.getElementById("login-password").value;

    let user = JSON.parse(localStorage.getItem(email));
    if (user && user.password === password) {
        document.getElementById("auth-section").style.display = "none";
        document.getElementById("quiz-section").style.display = "block";
        startQuiz();
    } else {
        alert("Invalid credentials.");
    }
});

function startQuiz() {
    startTimer(30 * 60);
    showQuestion();
}

function showQuestion() {
    let q = questions[currentQuestion];
    document.getElementById("question").innerText = q.q;

    let optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";
    q.options.forEach((opt, index) => {
        let btn = document.createElement("button");
        btn.innerText = opt;
        btn.addEventListener("click", () => {
            if (index === q.answer) score++;
            currentQuestion++;
            if (currentQuestion < questions.length) {
                showQuestion();
            } else {
                endQuiz();
            }
        });
        optionsDiv.appendChild(btn);
    });
}

// Timer
function startTimer(seconds) {
    let timer = document.getElementById("timer");
    timerInterval = setInterval(() => {
        let min = Math.floor(seconds / 60);
        let sec = seconds % 60;
        timer.innerText = `Time Left: ${min}:${sec < 10 ? "0" + sec : sec}`;
        seconds--;

        if (seconds < 0) {
            clearInterval(timerInterval);
            endQuiz();
        }
    }, 1000);
}

function endQuiz() {
    clearInterval(timerInterval);
    document.getElementById("quiz-section").style.display = "none";
    document.getElementById("result-section").style.display = "block";

    let percentage = (score / questions.length) * 100;
    document.getElementById("score").innerText = `Score: ${score} / ${questions.length}`;
    document.getElementById("percentage").innerText = `Percentage: ${percentage.toFixed(2)}%`;

    localStorage.setItem("lastResult", JSON.stringify({ score, percentage }));
}
