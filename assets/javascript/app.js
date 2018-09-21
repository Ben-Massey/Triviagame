$("#start-game").on("click", function() {
    $("#start-game").remove();
    game.loadQuestion();
  });
  $(document).on("click", ".answer-button", function(event) {
    game.clicked(event);
  });
  $(document).on("click", "#reset", function() {
    game.reset();
  });
  var questions = [
    {
      question: "what is the internet animal name for a dachshund?",
      choices: ["banana", "karate dog", "hot dog", "long boi"],
      correctAnswer: "long boi",
      image: "assets/images/long boi.jpg"
    },
    {
      question: "what is the internet animal name for an elephant?",
      choices: ["long nose", "flappy stompy", "snek face", "dumbo"],
      correctAnswer: "flappy stompy",
      image: "assets/images/elephant.jpg"
    },
    {
      question: "What is the internet name for a shark?",
      choices: ["murder torpedo", "slippery nom nom", "bloody fin", "nope"],
      correctAnswer: "murder torpedo",
      image: "assets/images/shark.jpg"
    },
    {
      question: "What is the internet name for a zebra?",
      choices: ["stripey", "strange horse", "prison poney", "galloper"],
      correctAnswer: "prison poney",
      image: "assets/images/zebra.jpg"
    },
    {
      question: "What is the internet name for a penguin?",
      choices: ["flap flap", "no fly", "formal chicken", "slide flap"],
      correctAnswer: "formal chicken",
      image: "assets/images/penguin.jpg"
    },
    {
      question:
        "What is the regular name for a fart squirrel?",
      choices: ["weasel", "skunk", "mouse", "llama"],
      correctAnswer: "skunk",
      image: "assets/images/skunk.jpg"
    }
  ];
  var game = {
    questions: questions,
    currentQuestion: 0,
    correct: 0,
    incorrect: 0,
    counter: 30,
    unanswered: 0,
  
    countdown: function() {
      game.counter--;
      $("#counter").html(game.counter);
      if (game.counter <= 0) {
        game.timeUp();
      }
    },
    loadQuestion: function() {
      timer = setInterval(game.countdown, 1000);
      $("#game-action").html(
        "<h2>Time Remaining <span id='counter'>30</span> Seconds</h2>"
      );
      $("#game-action").append(
        "<h2>" + questions[game.currentQuestion].question + "</h2>"
      );
      for (var i = 0; i < questions[game.currentQuestion].choices.length; i++) {
        $("#game-action").append(
          '<button class="answer-button"  id="button-' +
            i +
            '"data-name="' +
            questions[game.currentQuestion].choices[i] +
            '">' +
            questions[game.currentQuestion].choices[i] +
            "</button>"
        );
      }
    },
    nextQuestion: function() {
      game.counter = 30;
      $("#counter").html(game.counter);
      game.currentQuestion++;
      game.loadQuestion();
    },
    timeUp: function() {
      clearInterval(timer);
      game.unanswered++;
      $("#game-action").html("<h2>Time is up </h2>");
      $("#game-action").append(
        "<h3>The correct answer is: " +
          questions[game.currentQuestion].correctAnswer +
          "</h3>"
      );
      if (game.currentQuestion == questions.length - 1) {
        setTimeout(game.results, 3 * 1000);
      } else {
        setTimeout(game.nextQuestion, 3 * 1000);
      }
    },
    results: function() {
      clearInterval(timer);
      $("#game-action").html("<h3>Game Over</h3>");
      $("#game-action").append("<h3>Correct: " + game.correct + "</h3>");
      $("#game-action").append("<h3>Incorrect: " + game.incorrect + "</h3>");
      $("#game-action").append("<h3>Unanswered: " + game.unanswered + "</h3>");
      $("#game-action").append("<button id='reset'>Play Again</button>");
    },
    clicked: function(event) {
      clearInterval(timer);
      if (
        $(event.target).data("name") ==
        questions[game.currentQuestion].correctAnswer
      ) {
        game.answeredCorrectly();
      } else {
        game.answeredIncorrectly();
      }
    },
    answeredCorrectly: function() {
      clearInterval(timer);
      game.correct++;
      $("#game-action").html("<h2> You are correct!</h2>");
      $("#game-action").append(
        "<h3>The Correct Answer is: " +
          questions[game.currentQuestion].correctAnswer +
          "</h3>"
      );
      $("#game-action").append(
        '<img src="' + questions[game.currentQuestion].image + '"/>'
      );
      if (game.currentQuestion == questions.length - 1) {
        setTimeout(game.results, 3 * 1000);
      } else {
        setTimeout(game.nextQuestion, 3 * 1000);
      }
    },
    answeredIncorrectly: function() {
      clearInterval(timer);
      game.incorrect++;
      $("#game-action").html("<h2> You got that one wrong</h2>");
      $("#game-action").append(
        "<h3>The Correct Answer is: " +
          questions[game.currentQuestion].correctAnswer +
          "</h3>"
      );
      $("#game-action").append(
        '<img src="' + questions[game.currentQuestion].image + '"/>'
      );
      if (game.currentQuestion == questions.length - 1) {
        setTimeout(game.results, 3 * 1000);
      } else {
        setTimeout(game.nextQuestion, 3 * 1000);
      }
    },
    reset: function() {
      game.currentQuestion = 0;
      game.counter = 30;
      game.correct = 0;
      game.incorrect = 0;
      game.unanswered = 0;
      game.loadQuestion();
    }
  };