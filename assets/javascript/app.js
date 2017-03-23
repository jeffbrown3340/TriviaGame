var triviaQAs, correctAns, timer, rightAns, wrongAns, roundNumber = 0;

function loadQARound(tObj) {
    $("#d0").html(tObj.question);
    if ((tObj.incorrect_answers.length + 1) > 4) {
        alert("Program error -- too many incorrect_answers");
        return;
    }
    correctAns = Math.floor(Math.random() * tObj.incorrect_answers.length + 1) + 1;
    console.log("correctAns=", correctAns);
    var wrongAns = 0;
    for (divId = 1; divId <= 4; divId++) {
        if (divId === correctAns) {
            $("#d" + divId).html(tObj.correct_answer);
        } else {
            $("#d" + divId).html(tObj.incorrect_answers[wrongAns]);
            wrongAns++;
        }
    }
    runTimer();
}

function runTimer() {
    var timerSeconds = 10;
    $("#dt").attr("style", "display: block");
    timer = setInterval(function() {
            $("#dt").html("Seconds remaining: " + timerSeconds);
            timerSeconds--;
            if (timerSeconds < 0) {
                clearInterval(timer);
                answerHandler("Times up, please wait...");
            };
    }, 1000);
}

function answerHandler(msg) {
    $("#dt").html(msg);
    if (msg.includes("Correct!")) {
        rightAns++;
    } else {
        wrongAns++;
        $("#d"+correctAns).attr("style", "background-color: yellow");
    }
    displayScore();
    setTimeout(function(){}, 3000);
    $("#d"+correctAns).attr("style", "");
}

function initializeGame() {
    console.log("ready to initialize");
    $.ajax({ url: "https://opentdb.com/api.php?amount=10&type=multiple" }).done(function(response) { 
        triviaQAs = response.results;
        console.log("triviaQAs.length=", triviaQAs.length);
        loadQARound(triviaQAs[roundNumber]);
    });
    rightAns = 0;
    wrongAns = 0;
}

function displayScore() {
    $("#sp-score").html("Score: Right = " + rightAns + "; Wrong = " + wrongAns);
}

$(document).on("click", ".d-a", function(response) {
    console.log("this.id=", this.id);
    clearInterval(timer);
    if (this.id === "d" + correctAns) {        
        answerHandler("Correct! Please wait...")
    } else {
        answerHandler("Oops, wrong, please wait...");
    }
    roundNumber++;
    if (roundNumber > triviaQAs.length - 1) {
        $("#dt").html("Game over, click Start<br>to play again.");
        $("#b0").attr("style", "display:block");
    } else {
        setTimeout(loadQARound(triviaQAs[roundNumber]), 5000);
    }
});

function startReset() {
    $("#b0").attr("style", "display:none");
    initializeGame();
    displayScore();
}

$(document).on("click", "#b0", function() {startReset()});