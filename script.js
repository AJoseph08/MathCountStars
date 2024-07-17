document.addEventListener('DOMContentLoaded', () => {
    const starsContainer = document.getElementById('stars-container');
    const choicesContainer = document.getElementById('choices-container');
    const niceJobMessage = document.getElementById('nice-job-message');
    const incorrectCounter = document.getElementById('incorrect-counter');
    const tryAgainButton = document.getElementById('try-again-button');
    const greyRectangle = document.querySelector('.grey-rectangle');
    const greenRectangle = document.querySelector('.green-rectangle');
    const maxScore = 5;
    let currentCorrectAnswer = 0;
    let score = 0;
    let incorrectAnswers = 0;

    function generateStarsAndChoices() {
        // Clear previous stars
        starsContainer.innerHTML = '';

        // Generate a random number of stars between 1 and 10
        const numberOfStars = Math.floor(Math.random() * 10) + 1;

        // Generate placeholders and place stars starting from the top left
        for (let i = 0; i < 10; i++) {
            const div = document.createElement('div');
            if (i < numberOfStars) {
                div.className = 'object';
            } else {
                div.className = 'placeholder';
            }
            starsContainer.appendChild(div);
        }

        // Generate three different random choices
        const choices = new Set();
        choices.add(numberOfStars);
        while (choices.size < 3) {
            choices.add(Math.floor(Math.random() * 10) + 1);
        }

        // Shuffle and display choices
        choicesContainer.innerHTML = '';
        Array.from(choices).sort(() => Math.random() - 0.5).forEach(choice => {
            const button = document.createElement('button');
            button.className = 'choice';
            button.textContent = choice;
            button.addEventListener('click', () => handleChoiceClick(choice, button));
            choicesContainer.appendChild(button);
        });

        // Set the current correct answer
        currentCorrectAnswer = numberOfStars;
    }

    function handleChoiceClick(choice, button) {
        if (choice === currentCorrectAnswer) {
            score = Math.min(score + 1, maxScore);
            updateProgressBar();
            if (score === maxScore) {
                showNiceJobMessage();
                endGame();
            } else {
                button.disabled = true;
                generateStarsAndChoices();
            }
        } else {
            button.classList.add('incorrect');
            button.disabled = true;
            incorrectAnswers++;
            updateIncorrectCounter();
            updateProgressBar(); // Update progress bar for incorrect answer
            if (score > 0) {
                score--;
            }
            updateProgressBar(); // Update progress bar for incorrect answer
        }
    }

    function updateProgressBar() {
        const percent = (score / maxScore) * 100;
        greenRectangle.style.width = percent + '%';
    }

    function updateIncorrectCounter() {
        incorrectCounter.textContent = `Incorrect Answers: ${incorrectAnswers}`;
    }

    function showNiceJobMessage() {
        niceJobMessage.style.display = 'block';
    }

    function endGame() {
        tryAgainButton.style.display = 'block';
        choicesContainer.querySelectorAll('button').forEach(button => {
            button.disabled = true;
        });
    }

    function resetGame() {
        niceJobMessage.style.display = 'none';
        tryAgainButton.style.display = 'none';
        score = 0;
        incorrectAnswers = 0;
        updateProgressBar();
        updateIncorrectCounter();
        generateStarsAndChoices();
        choicesContainer.querySelectorAll('button').forEach(button => {
            button.disabled = false;
            button.classList.remove('incorrect');
        });
    }

    tryAgainButton.addEventListener('click', resetGame);

    // Initialize the game
    generateStarsAndChoices();
});
