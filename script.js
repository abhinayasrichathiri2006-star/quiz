// Quiz Data
const quizData = [
    {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correct: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correct: 1
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic", "Indian", "Arctic", "Pacific"],
        correct: 3
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["Jane Austen", "Charles Dickens", "William Shakespeare", "Mark Twain"],
        correct: 2
    },
    {
        question: "What is the smallest prime number?",
        options: ["0", "1", "2", "3"],
        correct: 2
    },
    {
        question: "Which country has the most population?",
        options: ["India", "United States", "Indonesia", "Brazil"],
        correct: 0
    },
    {
        question: "What is the chemical symbol for Gold?",
        options: ["Go", "Gd", "Au", "Ag"],
        correct: 2
    },
    {
        question: "In which year did World War II end?",
        options: ["1943", "1944", "1945", "1946"],
        correct: 2
    },
    {
        question: "What is the fastest land animal?",
        options: ["Lion", "Cheetah", "Gazelle", "Greyhound"],
        correct: 1
    },
    {
        question: "Which programming language is known as the 'language of the web'?",
        options: ["Python", "Java", "JavaScript", "C++"],
        correct: 2
    }
];

// Quiz State
let currentQuestion = 0;
let score = 0;
let answers = new Array(quizData.length).fill(null);
let timerInterval = null;
let timeLeft = 30;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('totalQuestions').textContent = quizData.length;
});

// Start Quiz
function startQuiz() {
    document.getElementById('startScreen').classList.add('hidden');
    document.getElementById('quizScreen').classList.remove('hidden');
    currentQuestion = 0;
    score = 0;
    answers = new Array(quizData.length).fill(null);
    loadQuestion();
    startTimer();
}

// Load Question
function loadQuestion() {
    const question = quizData[currentQuestion];
    document.getElementById('questionText').textContent = question.question;
    document.getElementById('currentQuestion').textContent = currentQuestion + 1;
    
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.className = 'option';
        if (answers[currentQuestion] === index) {
            button.classList.add('selected');
        }
        button.onclick = () => selectOption(index);
        optionsContainer.appendChild(button);
    });
    
    // Update button states
    document.getElementById('prevBtn').disabled = currentQuestion === 0;
    document.getElementById('nextBtn').textContent = currentQuestion === quizData.length - 1 ? 'Submit' : 'Next';
}

// Select Option
function selectOption(index) {
    answers[currentQuestion] = index;
    const options = document.querySelectorAll('.option');
    options.forEach((opt, idx) => {
        opt.classList.remove('selected');
        if (idx === index) {
            opt.classList.add('selected');
        }
    });
}

// Next Question
function nextQuestion() {
    if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        submitQuiz();
    }
}

// Previous Question
function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
}

// Submit Quiz
function submitQuiz() {
    clearInterval(timerInterval);
    document.getElementById('quizScreen').classList.add('hidden');
    document.getElementById('resultsScreen').classList.remove('hidden');
    
    // Calculate Score
    score = 0;
    answers.forEach((answer, index) => {
        if (answer === quizData[index].correct) {
            score++;
        }
    });
    
    const percentage = Math.round((score / quizData.length) * 100);
    document.getElementById('scoreText').textContent = `${score} / ${quizData.length}`;
    document.getElementById('scorePercentage').textContent = `${percentage}%`;
    
    // Show Summary
    const summary = document.getElementById('resultsSummary');
    summary.innerHTML = '';
    quizData.forEach((question, index) => {
        const isCorrect = answers[index] === question.correct;
        const div = document.createElement('div');
        div.className = `result-item ${isCorrect ? 'correct' : 'incorrect'}`;
        div.innerHTML = `
            <strong>Q${index + 1}: ${question.question}</strong><br>
            <span class="result-text">Your answer: ${answers[index] !== null ? question.options[answers[index]] : 'Not answered'}</span><br>
            <span class="result-text">Correct answer: ${question.options[question.correct]}</span>
        `;
        summary.appendChild(div);
    });
}

// Restart Quiz
function restartQuiz() {
    document.getElementById('resultsScreen').classList.add('hidden');
    document.getElementById('startScreen').classList.remove('hidden');
    currentQuestion = 0;
    score = 0;
    answers = new Array(quizData.length).fill(null);
    timeLeft = 30;
}

// Timer
function startTimer() {
    timeLeft = 30;
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft;
        
        if (timeLeft <= 10) {
            document.querySelector('.timer').classList.add('warning');
        }
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert('Time is up!');
            submitQuiz();
        }
    }, 1000);
}
