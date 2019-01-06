const contentSpace = document.getElementById('content_space');
const typingSpace = document.getElementById('typing_space');

const speedText = document.getElementById('speed');
const accuracyText = document.getElementById('accuracy');
const timeText = document.getElementById('time');
const timeLeftText = document.getElementById('time_left');

const content = `This lesson will teach you the keys to became a typing master. On this lesson you will learn the three basic rules you should always remember and and the basic hand positioning, and you will also start practicing with the first block of exercises.This lesson will teach you the keys to became a typing master. On this lesson you will learn the three basic rules you should always remember and and the basic hand positioning, and you will also start practicing with the first block of exercises.`;

contentSpace.innerText = content;

const maxTime = 120;
let time = 0;
let speed = 0;
let accuracy = 0;

const getTypingResult = function() {
  const originalText = content.trimRight().split(/[ \n]+/);
  const typedText = typingSpace.value.trimRight().split(/[ \n]+/);
  const correctCount = countCorrectWords(originalText, typedText);
  accuracy = getAccuracy(correctCount, typedText);
  speed = getSpeed(typedText);
  updateResultDivs(accuracy, speed);
};

const getAccuracy = function(correctCount, typedText) {
  return ((correctCount / typedText.length) * 100).toFixed(2);
};

const getSpeed = function(typedText) {
  return (typedText.length / (time / 60)).toFixed(2);
};

const updateResultDivs = function(accuracy, speed) {
  accuracyText.innerText = `ACCURACY : ${accuracy}`;
  speedText.innerText = `SPEED : ${speed}`;
};

const getTimeLeft = function() {
  let timeLeft = maxTime - time;
  let leftMinutes = Math.floor(timeLeft / 60);
  let leftSeconds = timeLeft % 60;
  updateLeftTimeDiv(leftMinutes, leftSeconds);
};

const updateLeftTimeDiv = function(leftMinutes, leftSeconds) {
  timeText.innerText = `TIME Left : ${leftMinutes} : ${leftSeconds}`;
};

const countCorrectWords = function(originalText, typedText) {
  let count = 0;
  for (let index = 0; index < typedText.length; index++) {
    if (originalText[index] == typedText[index]) count++;
  }
  return count;
};

const isTypingCompleted = function() {
  const lengthOfConetnt = content.trimRight().split(/[ \n]+/).length;
  const lengthOftypedContent = typingSpace.value.trimRight().split(/[ \n]+/)
    .length;
  return lengthOfConetnt == lengthOftypedContent;
};

setInterval(() => {
  if (time == 120 || isTypingCompleted()) {
    window.alert(`Well Done.\nSPEED : ${speed}\nACCURACY : ${accuracy}`);
    location.reload();
  }
  time++;
  getTypingResult();
  getTimeLeft();
}, 1000);
