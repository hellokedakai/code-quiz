var timer;
var counter = 10;
var displaytime = document.getElementById("time");
var footer = document.getElementById("progress").innerHTML;
var highscores = document.getElementById("highscores")


//COUNTDOWN
    function showtime() {
        var replaced = displaytime.innerHTML.replace('Time: ','Time: ' + counter);
        document.getElementById("time").appendChild(replaced);
    }

    function startcount() {
        timer = window.setTimeout("countdown()",1000);
        // console.log("countdown starts!");
    }

    function countdown() {
        counter = counter - 1;
        // console.log(counter);
        if (counter === 0){
            window.clearTimeout(timer);
            timer= null;
        }
        else{
            timer=window.setTimeout("countdown()",1000);
            showtime();
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
            this.score++;
            footer.innerHTML = "Correct!"
        } else {
            footer.innerHTML = "Wrong!"
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
        startH1 = document.getElementById("start1");
        var mainDiv = startH1.parentNode;
        //create quiz screen H1
        var quizH1 = document.createElement("H1");
        quizH1.setAttribute("id", "question");
        //replace h1
        mainDiv.replaceChild(quizH1, startH1);

        //remove p element from HTML
        var startP = document.getElementById("startP");
        startP.remove();

        //get startscreeen button container
        startBC = document.getElementById("start-button-container");
        //create quiz button container
        var quizBC = document.createElement("DIV");
        quizBC.setAttribute("class", "buttons");
        //replace startB
        mainDiv.replaceChild(quizBC, startBC);

        //remove start button
        startB = document.getElementById("start-button");
        startB.remove();

        //create buttons and append them to startBC
        for (var i=0; i < 4; i++) {
            var button = document.createElement("BUTTON");
            button.id = "btn" + i;
            document.getElementByClassName("buttons").appendChild(button);

            var span = document.createElement("SPAN");
            span.id= "choice" + i;
            document.getElementbyId(button.id).appendChild(span);
        }


        populate();
    };
 
//Questions
    function populate() {
        if(quiz.isEnded()) {
            showScores();
        }
        else {
            startcount();
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
    
            // showProgress();
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
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};
 
// create questions here
var questions = [
    new Question("Hyper Text Markup Language Stand For?", ["JavaScript", "XHTML","CSS", "HTML"], "HTML"),
    new Question("Which language is used for styling web pages?", ["HTML", "JQuery", "CSS", "XML"], "CSS"),
    new Question("Which is not a JavaScript Framework?", ["Python Script", "JQuery","Django", "NodeJS"], "Django"),
    new Question("Which is used for Connect To Database?", ["PHP", "HTML", "JS", "All"], "PHP"),
    new Question("Webdevtrick.com is about..", ["Web Design", "Graphic Design", "SEO & Development", "All"], "All")
];
 
// create quiz
var quiz = new Quiz(questions);
 
// display quiz screen
quizstart();
populate();