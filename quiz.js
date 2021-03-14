var counter = 60;
var countdownId = 0;
var progress = document.getElementById("progress");
var footer = document.getElementById("footer");

var highscores = document.getElementById("highscores");
highscores.addEventListener("click", finalScreen);

var highScore = localStorage.getItem("highscore");

var scoreSubmit = document.getElementById("score-submit");

var startButton = document.getElementById("startB");
startButton.addEventListener("click", quizstart);

//COUNTDOWN
function start() {
    countdownId = setInterval("countdown()", 1000);
}
function countdown() {
    if (counter > 0) {
        counter = counter - 1;
        document.getElementById("time").innerHTML = "Time: " + counter;
    }
    else {
        clearInterval(countdownId);
        showScores();
    }
}
function stopcount() {
    clearInterval(countdownId);
}

//Set up quiz
function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

//add methods to quiz by using prototype property 
Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}
Quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score = this.score + 20;
        footer.style.visibility = "visible";
        progress.innerHTML = "Correct!";
    } else {
        this.score = this.score - 10;
        counter = counter - 10;
        footer.style.visibility = "visible";
        progress.innerHTML = "Wrong!"
    }
    this.questionIndex++;
}
Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}
//This is an object constructor
function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}
Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}

//Replace start screen with quiz screen
function quizstart() {
    //get startscreen H1
    var startH1 = document.getElementById("startH1");
    var mainDiv = startH1.parentNode;
    //create quiz screen H1
    var quizH1 = document.createElement("H1");
    quizH1.setAttribute("id", "question");
    //replace h1
    mainDiv.replaceChild(quizH1, startH1);

    //remove p element
    var startP = document.getElementById("startP");
    startP.remove();
    //remove start button
    var startB = document.getElementById("startB");
    startB.remove();
    

    //get startscreeen button container
    var startBC = document.getElementById("start-button-container");
    //create quiz button container
    var quizBC = document.createElement("DIV");
    quizBC.setAttribute("id", "buttons");
    //replace startBC
    mainDiv.replaceChild(quizBC, startBC);

    //create buttons and append them to startBC
    for (var i=0; i < 4; i++) {
        var button = document.createElement("BUTTON");
        button.id = "btn" + i;
        quizBC.appendChild(button);

        var span = document.createElement("SPAN");
        span.id = "choice" + i;
        button.appendChild(span);
    }
    start();
    populate();
};
 
// Questions
function populate() {
    if(quiz.isEnded()) {
        stopcount();
        showScores();
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;
        // show options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }
    }
};
// get the guess input and move onto next question
function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};
  
function showScores() {
    //If the quiz score is a negative value, set score to zero.
    if (quiz.score < 0) {
        quiz.score = 0;
    }
    //Show results 
    var quizH1 = document.getElementById("question");
    quizH1.innerHTML = "All done!";
    var results = document.createElement("P");
    results.innerHTML= "Your final score is " + quiz.score + ".";
    results.setAttribute("id","results");
    quizH1.appendChild(results);
    document.getElementById("buttons").remove();
    scoreSubmit.style.visibility = "visible";
    var submitButton = document.getElementById("submit");
    submitButton.addEventListener("click", saveScore);
};

function saveScore() {
    //get value from text field input
    var initials = document.getElementById("initials").value;
    //if your score is higher, set new highscore
    if (quiz.score > highScore) {
        localStorage.setItem("highscore", quiz.score);
        localStorage.setItem("initials", initials);
    }
    finalScreen();
}

//return to home/startscreen
function goToHomePage() {
    history.go(-1); return false;
    // document.location = './index.html'; 
}

//clear highscore when you press the "Clear Highscores" button
function clearHighScore() {
    localStorage.clear();
    var clearBoard = document.getElementById("score-board")
    clearBoard.innerHTML = "";

}

//Display highscore
function finalScreen() {
    var mainDiv = document.getElementById("challenge");
    mainDiv.innerHTML = '';

    var highScoreH1 = document.createElement("H1");
    highScoreH1.innerHTML = "High Score";
    mainDiv.appendChild(highScoreH1);

    if (!highScore) {
        localStorage.setItem("highscore", "0");
        localStorage.setItem("initials", "NO HIGHSCORE");
    }

    var scoreBoard = document.createElement("P");
    scoreBoard.innerHTML = localStorage.getItem("initials") + " " + localStorage.getItem("highscore");
    scoreBoard.setAttribute("id", "score-board");
    mainDiv.appendChild(scoreBoard);

    var header = document.getElementById("top-row");
    header.style.visibility = "hidden";

    var hsButtons = document.createElement("DIV");
    hsButtons.setAttribute("id", "hsButtonContainer");
    mainDiv.appendChild(hsButtons);

    var backButton = document.createElement("BUTTON");
    backButton.innerHTML = "Go Back";
    backButton.setAttribute("id", "back");
    backButton.setAttribute("onclick", "location.reload(true)");
    mainDiv.appendChild(backButton);

    var clearButton = document.createElement("BUTTON");
    clearButton.innerHTML = "Clear Highscores";
    clearButton.setAttribute("id", "back");
    clearButton.addEventListener("click", clearHighScore);
    mainDiv.appendChild(clearButton);

    hsButtons.appendChild(backButton);
    hsButtons.appendChild(clearButton);
}


// Questions info
var questions = [
    new Question("What is the default behavior called that is used to move declarations to the top of the current scope?", ["Jumping", "Arranging","Sorting", "Hoisting"], "Hoisting"),
    new Question("In JavaScript, what element is used to store and manipulate text, usually in multiples?", ["Variables", "Recorders", "Arrays", "Strings"], "Strings"),
    new Question("What is the element called that is used to describe the set of variables, objects, and functions you explicitly have access to?", ["Output Level", "Scope","Range", "Restriction"], "Scope"),
    new Question("What is the type of loop that continues through a block of code as long as the specified condition remains TRUE?", ["While Loop", "Else Loop", "Conditional Loop", "For Loop"], "While Loop"),
    new Question("What is the name of the statement that is used to exit or end a loop?", ["Conditional statement", "Falter statement", "Close statement", "Break statement"], "Break statement")
];
 
// Create the quiz
var quiz = new Quiz(questions);
