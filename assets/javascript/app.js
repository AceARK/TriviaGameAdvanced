var triviaQuestions = 
[
	{
	"question": "Which class at Hogwarts seemed like it was cursed, as no teacher lasted for more than a year?",
	"correct_answer": "Defense against the Dark Arts",
	"incorrect_answers": ["Arithmency","Transfiguration","Potions"],
	"src": ""
	},
	{
	"question": "Which creature did Hagrid own in his youth when he was accussed of being Slytherin's heir?",
	"correct_answer": "An Acromantula named Aragog",
	"incorrect_answers": ["Slytherin's monster, the Basilisk","Norwegian Ridgeback named Norbert","Hippogriff named Buckbeak"],
	"src": ""
	},
	{
	"question": "Another word for the Deluminator is",
	"correct_answer": "Put-outer",
	"incorrect_answers": ["Fireworks Lighter","Flashlight","Memory-stealer"],
	"src": ""
	},
	{
	"question": "Harry drinks _____ potion to turn into ____ in 'Harry Potter and the Chamber of Secrets'?",
	"correct_answer": "Polyjuice Potion, Crabbe",
	"incorrect_answers": ["Polyjuice Potion, Malfoy","Amortentia, Victor Krum","Felix Felicis, a stag"],
	"src": ""
	},
	{
	"question": "In 'Harry Potter and the Prisoner of Askaban', where does the Knight Bus drop Harry?",
	"correct_answer": "The Leaky Cauldron",
	"incorrect_answers": ["King's Cross Station","Hogwarts","Privet Drive"],
	"src": ""
	},
	{
	"question": "What is the name of Dumbledore's phoenix?",
	"correct_answer": "Fawkes",
	"incorrect_answers": ["Firenze","Hermes","Fierce"],
	"src": ""
	},
	{
	"question": "How many goal posts are there on a Quidditch pitch?",
	"correct_answer": "6",
	"incorrect_answers": ["3","2","8"],
	"src": ""
	},
	{
	"question": "Who is unanimously elected leader of Dumbledore's army?",
	"correct_answer": "Harry Potter",
	"incorrect_answers": ["Hermione Granger","Cho Chang","Neville Longbottom"],
	"src": ""
	},
	{
	"question": "What is the name of the fountain inside the Ministry of Magic?",
	"correct_answer": "Fountain of Magical Brethren",
	"incorrect_answers": ["Fountain of Fair Fortune","Magic is Might","Fountain of Eros"],
	"src": ""
	},
	{
	"question": "What is Lord Voldemort's real name?",
	"correct_answer": "Tom Marvolo Riddle",
	"incorrect_answers": ["Tom Gaunt Riddle","Salazar Slytherine","Marvolo Gaunt Riddle"],
	"src": ""
	}
]

var countdownInterval;

var game = {
	time: 5,
	countDownStarted: false,
	countDownEnd: false,
	questionCount: 0,
	usedQuestionsIndex: [],
	currentQuestion: "",
	rightAnswers: 0,
	wrongAnswers: 0,
	unanswered: 0,
	correctMessage: ['Way To Go!!!', 'You are Correct!!', 'You Rock!!', "Good Job!!"],
	wrongMessage: ['Sorry, Wrong Answer.', 'Better luck next time', 'Nope! Wrong Answer.'],

	displayQuestion : function displayQuestion()  {
		if(game.questionCount<10) {
			// choosing a question randomly from the list of questions
			var randomQuestionIndex = Math.floor(Math.random()*triviaQuestions.length);
			//console.log("Random index - " + randomQuestionIndex);
			// avoiding duplicate question indices
			while(game.usedQuestionsIndex.indexOf(randomQuestionIndex) != -1) {
				randomQuestionIndex = Math.floor(Math.random()*triviaQuestions.length);
				//console.log("Duplicate hence random index - " + randomQuestionIndex);
			}
			// pushing index of current question to usedQuestionsIndex to avoid repetitive questions
			game.usedQuestionsIndex.push(randomQuestionIndex);
			game.currentQuestion = triviaQuestions[randomQuestionIndex];
			console.log(game.currentQuestion.question);

			$("#question").html(game.currentQuestion.question);

			// choosing a random index to store correct answer
			var correctAnswerIndex = Math.floor(Math.random()*4);
			console.log("correct index " + correctAnswerIndex);
			var incorrectAnswersArrayIterator=0;
			// populating choices for the question
			for(var optionsIterator=0; optionsIterator<4; optionsIterator++) {
				// populating correct choice
				//console.log("optionsIterator = "+optionsIterator+", incorrectAnswersArrayIterator = " +incorrectAnswersArrayIterator);
				if(optionsIterator === correctAnswerIndex) {
					$("#option"+optionsIterator).html(game.currentQuestion.correct_answer);
					$("#option"+optionsIterator).data("answer", "correct");
					//console.log("correct answer at " + optionsIterator + " is " + game.currentQuestion.correct_answer);
				}
				// populating wrong choices
				else {
					$("#option"+optionsIterator).html(game.currentQuestion.incorrect_answers[incorrectAnswersArrayIterator]);
					incorrectAnswersArrayIterator++;
					$("#option"+optionsIterator).data("answer", "wrong");
					//console.log("wrong answer at " + optionsIterator + " is " + game.currentQuestion.incorrect_answers[incorrectAnswersArrayIterator]);
				}
			}
			game.questionCount++;
			console.log("Questions count - " + game.questionCount);
			if(!game.countDownStarted) {
				game.startCountdown();
			}	
		}
		else {
			game.endGame();
		}
	},

	startCountdown : function startCountdown() {
		countdownInterval = setInterval(game.decrementTimer,1000);
		game.countDownStarted = true;
	},

	decrementTimer : function decrementTimer() {
		$("#timeLeft").html(game.time);
		console.log("counting down - " + game.time);
		if(game.time>0){
			game.time--;
		}else {
			game.stopCountdown();
			game.countDownStarted = false;
			game.time=5;
			game.displayAnswer("none");
		}
	},

	stopCountdown : function stopCountdown() {
		game.countDownStarted = false;
		clearInterval(countdownInterval);
	},

	evaluateResults : function evaluateResults(choice) {

		console.log($(choice).data("answer"));

		switch($(choice).data('answer')) {
			case "correct":
				game.rightAnswers++;
				break;

			case "wrong":
				game.wrongAnswers++;
				break;

			default:
				break;
		}
		game.stopCountdown();
		game.countDownStarted = false;
		game.time=5;
		game.displayAnswer($(choice).data('answer'));
	},

	displayAnswer : function displayAnswer(string) {

		if(string === "correct") {
			var randomIndex = Math.floor(Math.random()*game.correctMessage.length);
			$("#message").html(game.correctMessage[randomIndex]);
		}
		else if(string === "wrong") {
			var randomIndex = Math.floor(Math.random()*game.wrongMessage.length);
			$("#message").html(game.wrongMessage[randomIndex]);   
		}
		else {
			$("#message").html("Time up!!");
		}
		
		$("#rightAnswer").html("The correct answer was - " + game.currentQuestion.correct_answer);
	 	$("#answerImage").html("<img src='"+game.currentQuestion.src+"'>");
	    setTimeout(game.proceed, 4500);
	},

	proceed : function proceed() {
		$("#displayAnswer").hide();
		$("#timeUp").hide();
		game.displayQuestion();
	},

	////////////////
	endGame : function endGame() {

		$("#correctAnswers").html(game.rightAnswers);
		$("#wrongAnswers").html(game.wrongAnswers);

		$("#unanswered").html(game.unanswered);
		$("#displayResults").show(); 
	
	 	
	    // setTimeout(function(){$(".displayResults").hide()},4500); ///////////// check if after end of game, it starts over without user input
	},


	///////////
	restartGame : function restartGame() {
		this.questionArray = [];
		this.questionCount = 0;
		this.rightAnswers = 0;
		this.wrongAnswers = 0;
		this.unanswered = 0;
		this.countDownStarted = false;
		this.countDownEnd = false
		this.game.displayQuestion();
	}

};

	
// program begins
$(document).ready(function(event) { 
	$("#displayAnswer").hide();
	$("#displayResults").hide();
	
  	$("#start").on("click",function(){
  		console.log("Start button clicked");
  		game.displayQuestion();
  	});

  	$(".answerOptions").on("click", function(){
  		game.stopCountdown();
  		game.evaluateResults(this);
  		// game.getGiphyImage(currentQuestion.queryWord);
  	});

  	$("#restartTrivia").on("click", function(){
  		game.restartGame();
  	});

});

