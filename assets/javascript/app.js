var triviaQAs, roundNumber = 0,
    currAns, rightAns, wrongAns, timer;

function loadQARound(tObj) {
    $("#d0").text(tObj.question);
    correctAns = Math.floor(Math.random() * tObj.incorrect_answers.length + 1);
    console.log("correctAns=", correctAns);
    for (divId = 1, i = 0; i < tObj.incorrect_answers.length + 1; divId++, i++) {
        if (divId - 1 === correctAns) {
            $("#d" + divId).text(tObj.correct_answer);
            i--;
        } else {
            $("#d" + divId).text(tObj.incorrect_answers[i]);
        }
        if (divId - 1 === correctAns) {$("#d" + i).text(tObj.correct_answer)}
    }
    runTimer();
    console.log(triviaQAs);
}

function runTimer() {
    var timerSeconds = 3;
    timer = setInterval(function() {
            $("#dt").text("Seconds remaining: " + timerSeconds);
            timerSeconds--;
            if (timerSeconds <= 0) {
                stopTimer();
                $("#dt").text("Times up, please wait...");
                setTimeout(function() {}, 3000);
                $("#dt").css("style", "visibility:hidden");
            }
    });
}

function stopTimer() {
    clearInterval(timer);
}

function gameOver() {
    $("#b0").css("style", "visibility:visible");
}

function initializeGame() {
    console.log("ready to initialize");
    $.ajax({ url: "https://opentdb.com/api.php?amount=10" }).done(function(response) { 
        console.log("response=", response);
        triviaQAs = response.results;
        console.log("triviaQAs =", triviaQAs);
        console.log("triviaQAs[roundNumber] =", triviaQAs[roundNumber]);
        loadQARound(triviaQAs[roundNumber]);
    });
    $("#b0").css("style", "display:hidden");
    roundNumber = 0;
    rightAns = 0;
    wrongAns = 0;
}

$(document).on("click", ".d-a", function(response) {
    console.log("arguments=", arguments);
    console.log("this=", this);
});

$(document).on("click", "#b0", function() {
            initializeGame();
            });
