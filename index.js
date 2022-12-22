var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function nextSequence() {
  userClickedPattern = [];
  levelUp();
  var randomNumber = Math.random();
  randomNumber = Math.floor(randomNumber * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .animate({ opacity: 0 }, 150)
    .animate({ opacity: 100 }, 150);
  playColorAudio(randomChosenColour);
}
function playColorAudio(chosenColor) {
  var colorAudio = new Audio("./sounds/" + chosenColor + ".mp3");
  colorAudio.play();
}

$(document).keypress(function (event) {
  if (level == 0) {
    nextSequence();
  }
});

$(".btn").on("click", function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playColorAudio(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function levelUp() {
  level++;
  $("#level-title").text("Level " + level);
}

function checkAnswer(currentLevel) {
  console.log(gamePattern[currentLevel], userClickedPattern[currentLevel]);
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playColorAudio("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
}
