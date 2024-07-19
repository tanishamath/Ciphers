function getStarted() {
    window.location.href = "cipher.html";
}
function checkAnswer(guess) {
    var correctAnswer = "Caesar"; 

    if (guess === correctAnswer) {
      document.getElementById("result").textContent = "Correct! The easiest to crack cipher is the Caesar Cipher. The Caesar cipher is a shift cipher, one of the simplest forms of encryption in which each letter of the message is replaced by a letter a certain number of positions down in the alphabet.";
    } else {
      document.getElementById("result").textContent = "Wrong answer. Try again!";
    }
  }
