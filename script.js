<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Duik in het Nederlands</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

        body {
            font-family: 'Poppins', sans-serif;
            background-color: #f0f4f8;
            color: #333;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 900px;
            margin: auto;
            background-color: #fff;
            padding: 30px;
            border-radius: 16px;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }
        header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
        }
        h1 {
            color: #1a237e;
            font-weight: 600;
            font-size: 2.5em;
            margin: 0;
        }
        #points-display {
            background-color: #4caf50;
            color: white;
            padding: 10px 20px;
            border-radius: 20px;
            font-weight: 600;
            font-size: 1.2em;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            display: flex;
            align-items: center;
        }
        #points-display span {
            margin-left: 8px;
        }
        .section {
            background-color: #e8f5e9;
            padding: 25px;
            border-radius: 12px;
            margin-bottom: 25px;
        }
        .section-title {
            color: #2e7d32;
            font-size: 1.8em;
            font-weight: 600;
            margin-bottom: 15px;
        }
        .quiz-item {
            display: flex;
            flex-direction: column;
            margin-bottom: 15px;
        }
        .quiz-item label {
            font-weight: 600;
            margin-bottom: 5px;
        }
        input[type="text"] {
            border: 1px solid #ccc;
            border-radius: 8px;
            padding: 10px;
            font-size: 1em;
            transition: border-color 0.3s;
        }
        input[type="text"]:focus {
            outline: none;
            border-color: #4caf50;
        }
        .feedback {
            font-weight: bold;
            margin-top: 5px;
            font-size: 0.9em;
        }
        .correct {
            color: #2e7d32;
        }
        .incorrect {
            color: #d32f2f;
        }
        button {
            background-color: #1a237e;
            color: white;
            border: none;
            padding: 12px 25px;
            border-radius: 25px;
            cursor: pointer;
            font-size: 1em;
            font-weight: 600;
            transition: background-color 0.3s, transform 0.2s;
        }
        button:hover {
            background-color: #0d1b54;
            transform: translateY(-2px);
        }
        #new-task-btn {
            background-color: #ff9800;
            margin-top: 10px;
        }
        #new-task-btn:hover {
            background-color: #e68900;
        }
        .shop-item {
            border: 1px solid #e0e0e0;
            padding: 15px;
            margin-bottom: 15px;
            border-radius: 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .shop-item h3 {
            margin: 0;
            color: #1a237e;
        }
        .unlocked {
            color: #2e7d32;
            font-style: italic;
            font-weight: 600;
        }
    </style>
</head>
<body onload="startNewTask()">
    <div class="container">
        <header>
            <h1>Duik in het Nederlands</h1>
            <div id="points-display">
                <span class="emoji">⭐</span>
                <span id="points-value">0</span> punten
            </div>
        </header>

        <div class="section">
            <h2 class="section-title" id="task-title">Begin een taak!</h2>
            <p id="task-description">Klik op de knop om een nieuwe woordenschat- of grammatica-taak te starten.</p>
            <div id="task-content">
                </div>
            <button id="check-button" onclick="checkCurrentTask()">Controleer Antwoorden</button>
            <button id="new-task-btn" onclick="startNewTask()">Nieuwe Taak</button>
        </div>

        <hr>

        <div class="section">
            <h2 class="section-title">Winkel (Shop) 🛍️</h2>
            <p>Geef je punten uit aan leuke dingen!</p>
            <div class="shop-item">
                <div>
                    <h3>Digitale Badge "Dierenexpert" 🐾</h3>
                    <p>Kosten: 5 punten</p>
                </div>
                <button id="buy-badge-btn" onclick="buyItem('badge', 5)">Koop</button>
                <span id="badge-status"></span>
            </div>
            <div class="shop-item">
                <div>
                    <h3>Nederlandse Mop (Dutch Joke) 😂</h3>
                    <p>Kosten: 3 punten</p>
                </div>
                <button id="buy-joke-btn" onclick="buyItem('joke', 3)">Koop</button>
                <p id="joke-content" style="display: none;"></p>
            </div>
        </div>
    </div>

    <script>
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
    </script>
</body>
</html>
