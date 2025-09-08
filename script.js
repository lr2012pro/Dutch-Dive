let points = 0;
let badgeUnlocked = false;
let jokeUnlocked = false;
let currentTaskAnswers = null;
let currentTaskInputs = [];

const tasks = {
    vocabulary: [
        {
            title: "Woordenschat: Dieren",
            description: "Match de Nederlandse woorden met de Engelse betekenissen. Vul het juiste nummer in het tekstvak in.",
            questions: {
                "De hond": "Dog",
                "De kat": "Cat",
                "Het paard": "Horse",
                "De vogel": "Bird",
                "De vis": "Fish"
            },
            answers: ["1", "2", "3", "4", "5"]
        },
        {
            title: "Woordenschat: Eten en Drinken",
            description: "Match de Nederlandse woorden met de Engelse betekenissen. Vul het juiste nummer in het tekstvak in.",
            questions: {
                "De appel": "Apple",
                "Het brood": "Bread",
                "De melk": "Milk",
                "Het water": "Water",
                "De kaas": "Cheese"
            },
            answers: ["1", "2", "3", "4", "5"]
        },
        {
            title: "Woordenschat: Kleding",
            description: "Match de Nederlandse woorden met de Engelse betekenissen. Vul het juiste nummer in het tekstvak in.",
            questions: {
                "De broek": "Pants",
                "Het shirt": "Shirt",
                "De schoenen": "Shoes",
                "De jas": "Jacket",
                "De sokken": "Socks"
            },
            answers: ["1", "2", "3", "4", "5"]
        }
    ],
    grammar: [
        {
            title: "Grammatica: Het Onvoltooid Verleden Tijd (OVT)",
            description: "Vervoeg de werkwoorden correct.",
            questions: [
                "Ik **luister** naar muziek. (OVT: Ik ",
                "Zij **speel** buiten. (OVT: Zij ",
                "Hij **werk** hard. (OVT: Hij "
            ],
            answers: ["luisterde", "speelde", "werkte"]
        },
        {
            title: "Grammatica: Voltooid Deelwoord",
            description: "Vervoeg de werkwoorden met 'hebben' of 'zijn'.",
            questions: [
                "Ik heb de deur **openen**. (Ik heb de deur ",
                "Jij bent **lopen** naar school. (Jij bent ",
                "Hij heeft de krant **lezen**. (Hij heeft de krant "
            ],
            answers: ["geopend", "gelopen", "gelezen"]
        }
    ]
};

function startNewTask() {
    const taskTypes = Object.keys(tasks);
    const randomType = taskTypes[Math.floor(Math.random() * taskTypes.length)];
    const randomTaskSet = tasks[randomType];
    const randomTask = randomTaskSet[Math.floor(Math.random() * randomTaskSet.length)];
    
    currentTaskAnswers = randomTask.answers;

    document.getElementById('task-title').textContent = randomTask.title;
    document.getElementById('task-description').textContent = randomTask.description;
    
    const taskContent = document.getElementById('task-content');
    taskContent.innerHTML = '';
    currentTaskInputs = [];

    if (randomType === 'vocabulary') {
        let listHtml = "<strong>De woorden:</strong>";
        Object.keys(randomTask.questions).forEach((word, index) => {
            listHtml += ` ${index + 1}. ${word}`;
        });
        taskContent.innerHTML += `<p>${listHtml}</p>`;

        Object.values(randomTask.questions).forEach(englishWord => {
            const quizItem = document.createElement('div');
            quizItem.className = 'quiz-item';
            quizItem.innerHTML = `
                <label for="${englishWord}">${englishWord}:</label>
                <input type="text" id="${englishWord}">
                <span class="feedback"></span>
            `;
            taskContent.appendChild(quizItem);
            currentTaskInputs.push(quizItem.querySelector('input'));
        });
    } else if (randomType === 'grammar') {
        randomTask.questions.forEach((dutchSentence, index) => {
            const quizItem = document.createElement('div');
            quizItem.className = 'quiz-item';
            const inputId = 'g' + index;
            quizItem.innerHTML = `
                <label for="${inputId}">${dutchSentence}<input type="text" id="${inputId}")</label>
                <span class="feedback"></span>
            `;
            taskContent.appendChild(quizItem);
            currentTaskInputs.push(quizItem.querySelector('input'));
        });
    }
}

function checkCurrentTask() {
    if (!currentTaskAnswers || currentTaskInputs.length === 0) {
        alert("Er is geen taak geladen. Klik op 'Nieuwe Taak' om te beginnen.");
        return;
    }

    let correctCount = 0;
    const totalQuestions = currentTaskInputs.length;
    
    currentTaskInputs.forEach((input, index) => {
        const feedbackElement = input.nextElementSibling;
        if (input.value.trim().toLowerCase() === currentTaskAnswers[index].toLowerCase()) {
            feedbackElement.textContent = "✅ Correct!";
            feedbackElement.className = "feedback correct";
            correctCount++;
        } else {
            feedbackElement.textContent = `❌ Fout. Het juiste antwoord is '${currentTaskAnswers[index]}'.`;
            feedbackElement.className = "feedback incorrect";
        }
    });

    let pointsEarned = correctCount;
    if (correctCount === totalQuestions) {
        pointsEarned += 10;
        alert(`Geweldig! Je hebt alles goed! Je verdient een bonus van 10 punten!`);
    }
    points += pointsEarned;
    updatePointsDisplay();
    alert(`Je hebt ${correctCount} van de ${totalQuestions} goed. Je verdient ${pointsEarned} punt(en). Totaal: ${points}.`);
}

function updatePointsDisplay() {
    document.getElementById('points-value').textContent = points;
}

function buyItem(item, cost) {
    if (points >= cost) {
        points -= cost;
        updatePointsDisplay();

        if (item === 'badge' && !badgeUnlocked) {
            badgeUnlocked = true;
            document.getElementById('badge-status').textContent = '✅ Ontgrendeld!';
            document.getElementById('buy-badge-btn').disabled = true;
        } else if (item === 'joke' && !jokeUnlocked) {
            jokeUnlocked = true;
            const jokes = [
                "Wat is de snelste manier om je kleren te drogen? Een droger gebruiken. 🤷‍♀️",
                "Waarom is de Domtoren de hoogste van Nederland? Omdat hij niet kan zitten. 🤣"
            ];
            const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
            document.getElementById('joke-content').textContent = randomJoke;
            document.getElementById('joke-content').style.display = 'block';
            document.getElementById('buy-joke-btn').disabled = true;
        }
    } else {
        alert(`❌ Je hebt niet genoeg punten! Je hebt ${points} punten, en je hebt ${cost} punten nodig.`);
    }
}
