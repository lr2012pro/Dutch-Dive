let points = 0;
let badgeUnlocked = false;
let jokeUnlocked = false;
let currentTaskAnswers = null;
let currentTaskInputs = [];

const tasks = {
    vocabulary: [
        {
            title: "Spelling: Werkwoorden (tegenwoordige tijd)",
            description: "Spel de werkwoorden in de tegenwoordige tijd (tt).",
            questions: [
                "Ik **weren** uit de klas. (Ik ",
                "Jij **reizen** door Europa. (Jij ",
                "Hij **leven** in Amsterdam. (Hij ",
                "Wij **praten** met de leraar. (Wij ",
                "Jullie **leren** snel. (Jullie "
            ],
            answers: ["weer", "reist", "leeft", "praten", "leren"]
        },
        {
            title: "Spelling: Werkwoorden (verleden tijd)",
            description: "Vul de correcte verleden tijd in.",
            questions: [
                "Ik **fietsen** naar school. (Ik ",
                "Zij **kopen** een cadeau. (Zij ",
                "Wij **vallen** van de trap. (Wij ",
                "De hond **blaffen**. (De hond ",
                "Ik **doen** mijn huiswerk. (Ik "
            ],
            answers: ["fietste", "kocht", "vielen", "blafte", "deed"]
        },
        {
            title: "Grammatica: Voltooid Deelwoord",
            description: "Vul het correcte voltooid deelwoord in.",
            questions: [
                "Zij heeft haar tas **vinden**. (Zij heeft haar tas ",
                "Ik heb de deur **openen**. (Ik heb de deur ",
                "Jullie zijn naar huis **lopen**. (Jullie zijn naar huis ",
                "De kat heeft een muis **vangen**. (De kat heeft een muis ",
                "Wij hebben het boek **lezen**. (Wij hebben het boek "
            ],
            answers: ["gevonden", "geopend", "gelopen", "gevangen", "gelezen"]
        }
    ]
};

function startNewTask() {
    const taskType = 'vocabulary';
    const randomTaskSet = tasks[taskType];
    const randomTask = randomTaskSet[Math.floor(Math.random() * randomTaskSet.length)];
    
    currentTaskAnswers = randomTask.answers;

    document.getElementById('task-title').textContent = randomTask.title;
    document.getElementById('task-description').textContent = randomTask.description;
    
    const taskContent = document.getElementById('task-content');
    taskContent.innerHTML = '';
    currentTaskInputs = [];

    randomTask.questions.forEach((dutchSentence, index) => {
        const quizItem = document.createElement('div');
        quizItem.className = 'quiz-item';
        const inputId = 'q' + index;
        quizItem.innerHTML = `
            <label for="${inputId}">${dutchSentence}<input type="text" id="${inputId}")</label>
            <span class="feedback"></span>
        `;
        taskContent.appendChild(quizItem);
        currentTaskInputs.push(quizItem.querySelector('input'));
    });
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
