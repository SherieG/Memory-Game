document.addEventListener("DOMContentLoaded", function() {
    //Card values to match in the game
    var cardValues = [
        "A", "A", "B", "B", "C", "C", "D", "D", "E", "E", "F", "F", "G", "G", "H", "H"
    ];

    var score = 0; //Player's score
    var time = 0; // Time count variable
    var flippedCards = [] //Array to hold flipped cards

    var grid = document.querySelector(".grid");
    var scoreElement = document.getElementById("score");
    var timeElement = document.getElementById("time");
    var overlay = document.querySelector(".overlay");
    var cards = []; // Array to hold card elements

    // Shuffle the card values using Fisher-Yates algorithm
    function shuffleArray(array) {
        for(var i = array.length - 1; i>0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    // Create card elements with event listener
    function createCards() {
        for(var i = 0; i<cardValues.length; i++) {
            var card = document.createElement("div");
            card.classList.add("card");
            card.dataset.value = cardValues[i];
            card.addEventListener("click", flipCard);
            cards.push(card);
            grid.appendChild(card);
        }
    }

    // Flip card on click event
    function flipCard() {
        if(this.classList.contains("flipped")) {
            return;
        }

        //Add 'flipped' class to the card
        this.classList.add("flipped");
        flippedCards.push(this);

        //If two cards are flipped. check for a match
        if(flippedCards.length === 2) {
            var card1 = flippedCards[0];
            var card2 = flippedCards[1];
            var value1 = card1.dataset.value;
            var value2 = card2.dataset.value;

            if(value1 === value2) {
                //Match found
                card1.classList.add("matched");
                card2.classList.add("matched");
                score++;
                scoreElement.textContent = score;

                if(score === cardValues.length/2) {
                    // All pairs matched, game over
                    stopTimer();
                    showOverlay();
                }
            } else {
                // Cards do not match, flip back after a delay
                setTimeout(function) {
                    card1.classList.remove("flipped");
                    card2.classList.remove("flipped");
                }, 1000;
            }

            flippedCards = [];
        }
    }

    //Start the timer
    function startTimer() {
        timeElement.textContent = time;
        setInterval(function() {
            time ++;
            timeElement.textContent = time;
        }, 1000);
    }

    // Stop the timer
    function stopTimer() {
        clearInterval(startTimer);
    }

    //Show overlay with game stats
    function showOverlay() {
        overlay.classList.add("show");
        overlay.innerHTML = <div class = "overlay-content">
            <h2>Game Over!</h2>
            <p class = "score">Score<span id="score">${score}</span></p>
            <p class="time">Time<span id="time">${time}</span>seconds</p>
            <button id="restart">Restart</button>
        </div>;

        var restartButton = document.getElementById("restart");
        restartButton.addEventListener("click", restartGame);
    }

    //Restart the game
    function restartGame() {
        score = 0;
        time = 0;
        flippedCards = [];

        scoreElement.textContent = score;
        timeElement.textContent = time;

        overlay.classList.remove("show");

        //Clear the grid
        while(grid.firstChild) {
            grid.firstChild.removeEventListener("click". flipCard);
            grid.firstChild.remove();
        }

        //Shuffle the card values and create new cards
        shuffleArray(cardValues);
        createCards();

        startTimer();
    }

    //Initialize the game
    function init() {
        shuffleArray(cardValues);
        createCards();
        startTimer();
    }

    init();
})
