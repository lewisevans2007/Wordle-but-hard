const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}
$.getJSON('https://raw.githubusercontent.com/getify/dwordly-game/main/five-letter-words.json', function(data) {
    var words = data;
    var word = data[Math.floor(Math.random() * data.length)];
    localStorage.setItem('current_word', word);
});
async function check() {
    var guess = document.getElementById("input").value
    var current_word = localStorage.getItem('current_word');
    guess = guess.toUpperCase();
    if(guess.length != 5) {
        document.getElementById("status").innerHTML ="Please enter a <strong> 5 </strong>letter word";
        document.getElementById("input").style.animation = "error 1s forwards";
        await sleep(1000);
        document.getElementById("input").style.animation = "";
        return ""
    }
    document.getElementById("status").innerHTML ="";

    if (guess == current_word) {
        document.getElementById("status").innerHTML ="You got the guessing word!<br><br><button onclick='window.location.reload()'>Play Again</button>";
        return ""
    }
    var score = 0;
    var right_place = 0;
    var right_letter = 0;
    var letters_done = []
    for (var i = 0; i < current_word.length; i++) {
        console.log("Checking " + guess + " against " + current_word[i])
        if (guess[i] == current_word[i]) {
            console.log("Found a match!")
            score = score + 20;
            right_place = right_place + 1;
            letters_done.push(i);
        } else if(!letters_done.includes(i) && current_word.includes(guess[i])) {
            console.log("Found a letter match!")
            score = score + 10;
            right_letter = right_letter + 1;
        }
    }
    document.getElementById("input").value = "";
    document.getElementById("words").innerHTML = document.getElementById("words").innerHTML+"<p>"+guess+" - <strong>"+score+"%</strong> "+right_place+"-"+right_letter+"</p>".replace("<br>", "");
}

document.getElementById("input").addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        check();
    }
});