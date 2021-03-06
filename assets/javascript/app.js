// Trivia Questions data
var triviaQuestions = 
[
	{
	"question": "Which class at Hogwarts seemed like it was cursed, as no teacher lasted for more than a year?",
	"correct_answer": "Defense against the Dark Arts",
	"incorrect_answers": ["Arithmency","Transfiguration","Potions"],
	"src": "assets/images/defense.gif"
	},
	{
	"question": "Which creature did Hagrid own in his youth when he was accussed of being Slytherin's heir?",
	"correct_answer": "An Acromantula named Aragog",
	"incorrect_answers": ["Slytherin's monster, the Basilisk","Norwegian Ridgeback named Norbert","Hippogriff named Buckbeak"],
	"src": "assets/images/acromantula.gif"
	},
	{
	"question": "Another word for the Deluminator is",
	"correct_answer": "Put-outer",
	"incorrect_answers": ["Fireworks Lighter","Flashlight","Memory-stealer"],
	"src": "assets/images/deluminator.gif"
	},
	{
	"question": "Harry drinks _____ potion to turn into ____ in 'Harry Potter and the Chamber of Secrets'?",
	"correct_answer": "Polyjuice Potion, Crabbe",
	"incorrect_answers": ["Polyjuice Potion, Malfoy","Amortentia, Victor Krum","Felix Felicis, a stag"],
	"src": "assets/images/crabbe.gif"
	},
	{
	"question": "In 'Harry Potter and the Prisoner of Askaban', where does the Knight Bus drop Harry?",
	"correct_answer": "The Leaky Cauldron",
	"incorrect_answers": ["King's Cross Station","Hogwarts","Privet Drive"],
	"src": "assets/images/leakycauldron.gif"
	},
	{
	"question": "What is the name of Dumbledore's phoenix?",
	"correct_answer": "Fawkes",
	"incorrect_answers": ["Firenze","Hermes","Fierce"],
	"src": "assets/images/fawkes.gif"
	},
	{
	"question": "How many goal posts are there on a Quidditch pitch?",
	"correct_answer": "6",
	"incorrect_answers": ["3","2","8"],
	"src": "assets/images/quidditch.gif"
	},
	{
	"question": "Who is unanimously elected leader of Dumbledore's army?",
	"correct_answer": "Harry Potter",
	"incorrect_answers": ["Hermione Granger","Cho Chang","Neville Longbottom"],
	"src": "assets/images/dumblearmy.gif"
	},
	{
	"question": "What is the name of the fountain inside the Ministry of Magic?",
	"correct_answer": "Fountain of Magical Brethren",
	"incorrect_answers": ["Fountain of Fair Fortune","Magic is Might","Fountain of Eros"],
	"src": "assets/images/fountain.gif"
	},
	{
	"question": "What is Lord Voldemort's real name?",
	"correct_answer": "Tom Marvolo Riddle",
	"incorrect_answers": ["Tom Gaunt Riddle","Salazar Slytherine","Marvolo Gaunt Riddle"],
	"src": "assets/images/riddle.gif"
	},
	{
	"question": "Who was not a member of 'The Order of the Phoenix'?",
	"correct_answer": "Bellatrix Lestrange",
	"incorrect_answers": ["Mad-eye-Moody","Sirius Black","Rubeus Hagrid"],
	"src": "assets/images/bellatrix.gif"
	},
	{
	"question": "Who first shows Harry the diary of Tom Riddle?",
	"correct_answer": "Moaning Myrtle",
	"incorrect_answers": ["Ginny Weasley","Fawkes","Nearly Headless Nick"],
	"src": "assets/images/moaningmyrtle.gif"
	},
	{
	"question": "What are the three 'Unforgivable curses'?",
	"correct_answer": "Avada Kedavra, Crucio, Imperio",
	"incorrect_answers": ["Avada Kedavra, Crucio, Incarcerous","Impedimenta, Incarcerous and Incendio","Expelliarmus, Impedimenta, Expecto Patronum"],
	"src": "assets/images/curse.gif"
	},
	{
	"question": "What kind of creature is Dobby?",
	"correct_answer": "House-elf",
	"incorrect_answers": ["Goblin","Troll","Leprechaun"],
	"src": "assets/images/dobby.gif"
	},
	{
	"question": "What is the name of the book that Dumbledore bequeaths to Hermione in 'The Deathly Hallows'?",
	"correct_answer": "Tales of Beedle the Bard",
	"incorrect_answers": ["Tales of Gilderoy the Great","Tales of Crookshanks the Cat","Fantastic Beasts and Where to Find Them"],
	"src": "assets/images/beedlebard.gif"
	},
	{
	"question": "Which is the only book in the Harry Potter series that doesn't feature Lord Voldemort?",
	"correct_answer": "The Prisoner of Askaban",
	"incorrect_answers": ["The Sorcerer's Stone","The Deathly Hallows","The Order of the Phoenix"],
	"src": "assets/images/prisoneraskaban.gif"
	},
	{
	"question": "What spell is used in defense of a Boggart?",
	"correct_answer": "Riddikulus",
	"incorrect_answers": ["Ridiculous","Expelliarmus","Expecto Patronam"],
	"src": "assets/images/boggart.gif"
	},
	{
	"question": "What is the cure for Basilisk venom?",
	"correct_answer": "Phoenix tears",
	"incorrect_answers": ["Root of Mandrake","Bezoar","Dragon Fire'"],
	"src": "assets/images/phoenixtears.gif"
	}
]

// Global variables
var backgroundIndex = 0;
var countdownInterval;
var restartGameAfterSetTime;

// Game object
var game = {
	// Declaring variables
	time: 7,
	countDownStarted: false,
	countDownEnd: false,
	questionCount: 0,
	usedQuestionsIndex: [],
	currentQuestion: {},
	answerChosen: false,
	rightAnswers: 0,
	wrongAnswers: 0,
	unanswered: 0,
	correctAnswer: "",
	// Array of messages to be displayed in case of right and wrong answers
	correctMessage: ["Right Answer!!!", "You are Correct!!", "You're a Wiz!!", "Nicely Done!!"],
	wrongMessage: ['Sorry, Wrong Answer.', 'Better luck next time.', 'Nope! Wrong Answer.'],

	// Function to fetch trivia question JSON at random front list and populate questions and choices
	displayQuestion : function displayQuestion()  {
		// If 10 questions have not been displayed
		if(game.questionCount<10) {
			// choosing a question randomly from the list of questions
			var randomQuestionIndex = Math.floor(Math.random()*triviaQuestions.length);
			
			// avoiding duplicate question indices
			while(game.usedQuestionsIndex.indexOf(randomQuestionIndex) != -1) {
				randomQuestionIndex = Math.floor(Math.random()*triviaQuestions.length);
			}
			// pushing index of current question to usedQuestionsIndex to avoid repetitive questions
			game.usedQuestionsIndex.push(randomQuestionIndex);
			game.currentQuestion = triviaQuestions[randomQuestionIndex];

			$("#question").html(game.currentQuestion.question);

			// choosing a random index to store correct answer
			var correctAnswerIndex = Math.floor(Math.random()*4);
			
			var incorrectAnswersArrayIterator=0;
			// populating choices for the question
			for(var optionsIterator=0; optionsIterator<4; optionsIterator++) {
				// populating correct choice
				if(optionsIterator === correctAnswerIndex) {
					$("#option"+optionsIterator).html(game.currentQuestion.correct_answer);
					$("#option"+optionsIterator).data("answer", "correct");
				}else {
					// populating wrong choices
					$("#option"+optionsIterator).html(game.currentQuestion.incorrect_answers[incorrectAnswersArrayIterator]);
					incorrectAnswersArrayIterator++;
					$("#option"+optionsIterator).data("answer", "wrong");
				}
			}
			$(".answerOptions").css("min-height", "38px");
			// Reset flag to allow choices to be clicked
			game.answerChosen = false;
			// Increment question count
			game.questionCount++;
			
			// Hide start button and show question
			$("#start").hide();
			$(".triviaQuestion").show();
			// Calculate and display questions left
			$("#questionsLeft").html(10 - game.questionCount);
			// Start countdown and display timer
			if(!game.countDownStarted) {
				game.time = 7;
				$(".timer").show();
				$("#timeLeft").show();
				game.startCountdown();
			}	
		}else {
			// If question count = 10, call function to display results
			game.endGame();
		}
	},

	// Function to start countdown
	startCountdown : function startCountdown() {
		countdownInterval = setInterval(game.decrementTimer,1000);
		game.countDownStarted = true;
	},

	// Function to decrement timer
	decrementTimer : function decrementTimer() {
		$("#timeLeft").html(game.time);

		// switch condition to add color and sound to timer based on seconds left
		switch(game.time) {
			case 5:
				$("#timeLeft").css('background-color','#6aff00');
				$("#timeLeft").css('border','4px solid #409b00');
				break;

			case 3:
				$("#timeLeft").css('background-color','#e1ff00');
				$("#timeLeft").css('border','4px solid #a8a30a');
				$("#timerSound")[0].currentTime = 0;
				$("#timerSound")[0].play();
				break;

			case 2:
				$("#timeLeft").css('background-color','#ff9900');
				$("#timeLeft").css('border','4px solid #a36100');
				$("#timerSound")[0].currentTime = 0;
				$("#timerSound")[0].play();
				break;

			case 1:
				$("#timeLeft").css('background-color','#e23131');
				$("#timeLeft").css('border','4px solid #700c0c');
				$("#timerSound")[0].currentTime = 0;
				$("#timerSound")[0].play();
				break;

			case 0:
				$(".triviaQuestion").hide();
				$("#timeLeft").html("0");
				$("#timerEnd")[0].currentTime = 0;
				$("#timerEnd")[0].play();
				game.countDownStarted = false;
				game.answerChosen = true;
				game.displayAnswer("none");
				game.stopCountdown();
				break;

		}

		// Decrement timer if not = 0
		if(game.time>0){
			game.time--;
		}
	},

	// Stop countdown by clearing interval
	stopCountdown : function stopCountdown() {
		game.countDownStarted = false;
		clearInterval(countdownInterval);
	},

	// Function to evaluate choice after each click of choice
	evaluateResults : function evaluateResults(choice) {

		// switch case to detect correct and wrong answers
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
		// stop countdown, reset time and update flag
		game.stopCountdown();
		game.countDownStarted = false;
		game.time = 7;
		// hide trivia div, call function to display answer
		$(".triviaQuestion").hide();
		game.displayAnswer($(choice).data('answer'));
	},

	// Function to display answer and show gif at the end of each question
	displayAnswer : function displayAnswer(result) {

		// display one of correct messages randomly chosen
		if(result === "correct") {
			var randomIndex = Math.floor(Math.random()*game.correctMessage.length);
			$("#message").html("<span>" + game.correctMessage[randomIndex] + "</span>");
			$("#rightAnswer").html("");

		}else if(result === "wrong") {
			// display one of the wrong messages randomly chosen, and the correct answer
			var randomIndex = Math.floor(Math.random()*game.wrongMessage.length);
			$("#message").html("<span>" + game.wrongMessage[randomIndex] + "</span>"); 
			$("#rightAnswer").html("The correct answer was - <span>" + game.currentQuestion.correct_answer + "</span>");  
		}else {
			// display time up message and correct answer
			$("#message").html("<span>Time up!!</span>");
			$("#rightAnswer").html("The correct answer was - <span>" + game.currentQuestion.correct_answer + "</span>");
		}
		// display corresponding image
	 	$(".answerImage").html("<img src='"+game.currentQuestion.src+"'>");
	 	$("#displayAnswer").show();
	 	// Time out function to perform set of operations only after 4 secs
	    setTimeout(game.proceed, 4000);
	},

	// set of operations to be performed after displaying answer for 4 secs
	proceed : function proceed() {
		// hide all messages
		$("#displayAnswer").hide();
		$("#timeUp").hide();
		// reset timer color
		$("#timeLeft").css('background-color','#04ff00');
		$("#timeLeft").css('border','4px solid #028700');
		// call function to populate new question and choices
		game.displayQuestion();
		$("#timeLeft").html("8");
	},
	
	// Function to be called at end of each game round to display results
	endGame : function endGame() {

		// hide other divs in triviaRow
		$(".triviaQuestion").hide();
		$("#displayAnswer").hide();

		// display stats
		$("#correctAnswers").html(game.rightAnswers);
		$("#wrongAnswers").html(game.wrongAnswers);
		$("#unanswered").html(game.unanswered);
		
		// If user scored more than 5 correct, display message else display another
		(game.rightAnswers > 5) ? $("#exclamation").html("Good Job!!!") : $("#exclamation").html("All Done.");

		// show all of it
		$("#displayResults").show(); 
		
		// hide timer
		$(".timer").hide();
		$("#timeLeft").hide();
	 	
	 	// call restart game after 4.5 secs
	    restartGameAfterSetTime = setTimeout(function(){
	  		game.restartGame();
	  		
	    },4500); 
	},

	// restart function to reset all values and start trivia over
	restartGame : function restartGame() {
		game.time =  7;
		game.questionArray = [];
		game.questionCount = 0;
		game.usedQuestionsIndex =  [];
		game.currentQuestion =  {};
		game.correctAnswer =  "";
		game.answerChosen = false;
		game.rightAnswers = 0;
		game.wrongAnswers = 0;
		game.unanswered = 0;
		game.countDownStarted = false;
		game.countDownEnd = false
		game.displayQuestion();
		$(".timer").show();
		$("#timeLeft").show();
		$("#timeLeft").css('background-color','#04ff00');
		$("#timeLeft").css('border','4px solid #028700');
		$("#timeLeft").html("8");
		$("#displayResults").hide();
	},

	// Added feature to set a random background every 15 secs 
	setNewBackground : function setNewBackground() {
		backgroundIndex = Math.floor(Math.random()*19)+1;
		var backgroundURL = 'black url("assets/images/hpbackground'+ backgroundIndex +'.jpg") no-repeat center center fixed';
		$("body").css({'background': backgroundURL, 'background-size': '100% 100%'});

	}

};

// program begins
$(document).ready(function(event) { 

	// play theme
	$("#hpTheme")[0].currentTime = 0;
	$("#hpTheme")[0].play();

	// hide opening page after 2.5 secs (= scale animation)
	setTimeout(hideCover,2500);

	// change background every 15 secs
	setInterval(game.setNewBackground, 15000);

	// hide divs that show answers and stats
	$("#displayAnswer").hide();
	$("#displayResults").hide();
	
	// check for start button click
  	$("#start").on("click",function(){
  		// hide instruction and start button, call display question function
  		$(".instruction").hide();
  		$(".start").hide();
  		game.displayQuestion();
  	});

  	// Added feature to match choice hover color to timer countdown color
  	$(".answerOptions").hover(function(){
  		var timerColor = $("#timeLeft").css('background-color');
  		$(this).css('color', timerColor);
  		$(this).css('font-size', '27px');
  	}, function(){
  		$(this).css('color', 'white');
  		$(this).css('font-size', '25px');
  	});

  	// On choosing an answer, stop countdown and call evaluate results
  	$(".answerOptions").on("click", function(){
  		game.stopCountdown();
  		// to avoid clicking multiple options and changing answer
  		if(!game.answerChosen) {
  			game.evaluateResults(this);
  			game.answerChosen = true;
  		}
  	});

  	// On click of restart button, clear timeout set to hide answer div, and restart game
  	$("#restartTrivia").on("click", function(){
  		// to avoid multiple click of restart button
  			clearTimeout(restartGameAfterSetTime);
  			game.restartGame();  		
  	});

});

// hiding opening page
function hideCover() {
	$(".cover").hide();
}

