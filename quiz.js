var timer;
var counter = 100;
var countdownId = 0;
var progress = document.getElementById("progress");
var footer = document.getElementById("footer");
var highscores = document.getElementById("highscores");


//COUNTDOWN

function start() {
    countdownId = setInterval("countdown()", 1000);
}

function countdown() {
    if (counter > 0) {
        counter = counter - 1;
        document.getElementById("time").innerHTML = "Time: " + counter;
    }
    else{
        clearInterval(countdown);
        document.getElementById("time").innerHTML = "GAME OVER";
        showScores();
    }
}



//SET UP QUIZ STUFF
    function Quiz(questions) {
        this.score = 0;
        this.questions = questions;
        this.questionIndex = 0;
    }

    //add methods to Quiz by using prototype property 
    Quiz.prototype.getQuestionIndex = function() {
        return this.questions[this.questionIndex];
    }
    
    Quiz.prototype.guess = function(answer) {
        if(this.getQuestionIndex().isCorrectAnswer(answer)) {
            this.score = this.score + 10;
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
 
//Questions
    function populate() {
        if(quiz.isEnded()) {
            
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
    var gameOverHTML = "<h1>All done!</h1>";
    gameOverHTML += "<h2 id='score'> Your final score is " + quiz.score + ". </h2>";
    gameOverHTML += "Enter initials: "
    var element = document.getElementById("challenge");
    element.innerHTML = gameOverHTML;

    // var formHTML = "<input type='form'>";
    // formHTML += "<input type='submit'>";
    // var form = document.getElementById("form");
    // form.innerHTML = formHTML;
};
 
// create questions here
var questions = [
    new Question("Hyper Text Markup Language Stand For?", ["JavaScript", "XHTML","CSS", "HTML"], "HTML"),
    new Question("Which language is used for styling web pages?", ["HTML", "JQuery", "CSS", "XML"], "CSS"),
    new Question("Which is not a JavaScript Framework?", ["Python Script", "JQuery","Django", "NodeJS"], "Django"),
    new Question("Which is used for Connect To Database?", ["PHP", "HTML", "JS", "All"], "PHP"),
    new Question("Frogs are usually good at...", ["Web Design", "Graphic Design", "SEO & Development", "All"], "All")
];
 
// create quiz
var quiz = new Quiz(questions);
